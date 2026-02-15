import express, { type Express } from "express";
import { isAuthenticated, getUserId } from "../auth";
import { asyncHandler } from "../errorHandler";
import { StreamChat } from "stream-chat";
import { storage } from "../storage";

export function registerStreamRoutes(app: Express) {
  // Ensure the global community channel exists at server startup.
  // This creates a single, authoritative channel 'community-support' and
  // prevents relying on clients to create new channels.
  (async () => {
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;
    if (!apiKey || !apiSecret) {
      console.warn('STREAM_API_KEY / STREAM_API_SECRET not configured; skipping community channel creation');
      return;
    }

    try {
      const serverClient = StreamChat.getInstance(apiKey, apiSecret);
      const channel = serverClient.channel('messaging', 'community-support', {
        name: 'Community Support',
        created_by_id: 'system',
        // Optionally set channel config here (e.g., mutes, moderation)
      });
      // create() will succeed if the channel does not exist; if it exists it'll throw - catch and ignore.
      try {
        await channel.create();
        console.info('Created Stream channel: community-support');
      } catch (err: any) {
        // If already exists, Stream may return an error - ignore that
        console.info('Community channel already exists or create returned error:', err?.message || err);
      }
    } catch (err: any) {
      console.warn('Failed to ensure community channel exists:', err?.message || err);
    }
  })();

  // Endpoint to mint a Stream token for the authenticated user
  app.get(
    "/api/stream/token",
    isAuthenticated,
    asyncHandler(async (req: any, res) => {
      const userId = getUserId(req);

      const apiKey = process.env.STREAM_API_KEY;
      const apiSecret = process.env.STREAM_API_SECRET;

      if (!apiKey || !apiSecret) {
        return res.status(500).json({ message: "Stream API keys not configured" });
      }

      // Initialize server client
      const serverClient = StreamChat.getInstance(apiKey, apiSecret);

      // Optionally upsert the user so Stream knows about the user (display name and image)
      const displayName = req.auth?.firstName || req.auth?.sessionClaims?.firstName || req.auth?.userId;
      const image = req.auth?.imageUrl || null;

      try {
        await serverClient.upsertUser({ id: userId, name: displayName, image });
      } catch (err) {
        // Non-fatal - continue to create token even if upsert fails
        console.warn("Stream upsertUser failed:", err);
      }

      const token = serverClient.createToken(userId);

      // Ensure the channel exists (idempotent)
      try {
        const channel = serverClient.channel('messaging', 'community-support', { name: 'Community Support' });
        await channel.create();
      } catch {
        // ignore errors - channel may already exist
      }

      res.json({ token, apiKey, channel: { id: 'community-support', type: 'messaging' }, user: { id: userId, name: displayName, image } });
    })
  );

  // Report / flag a message for moderation
  app.post(
    "/api/stream/report",
    isAuthenticated,
    asyncHandler(async (req: any, res) => {
      const { messageId, reason } = req.body;
      const userId = getUserId(req);

      if (!messageId) {
        return res.status(400).json({ message: "messageId is required" });
      }

      const apiKey = process.env.STREAM_API_KEY;
      const apiSecret = process.env.STREAM_API_SECRET;
      if (!apiKey || !apiSecret) {
        return res.status(500).json({ message: "Stream API keys not configured" });
      }

      const serverClient = StreamChat.getInstance(apiKey, apiSecret);

      try {
        // Use Stream moderation flag API via server client
        await serverClient.flagMessage(messageId, { user_id: userId, reason: reason || "reported" });
        // Persist moderation report in central moderation table
        try {
          await storage.createModerationReport({
            reporterId: userId,
            reportedUserId: req.body.reportedUserId || null,
            source: 'stream',
            sourceId: messageId,
            channelId: req.body.channelId || 'community-support',
            reason: reason || 'reported',
            description: req.body.description || null,
            status: 'pending',
          });
        } catch (dbErr) {
          console.warn('Failed to persist moderation report:', dbErr);
        }

        res.json({ success: true });
      } catch (err: any) {
        console.warn("Failed to flag message on Stream:", err);
        // Store basic report in app logs / DB if desired. For now return success:false
        res.status(500).json({ success: false, message: err?.message || String(err) });
      }
    })
  );

  // Join the single community channel (server ensures only this channel is used)
  app.post(
    "/api/stream/join",
    isAuthenticated,
    asyncHandler(async (req: any, res) => {
      const userId = getUserId(req);
      const apiKey = process.env.STREAM_API_KEY;
      const apiSecret = process.env.STREAM_API_SECRET;
      if (!apiKey || !apiSecret) {
        return res.status(500).json({ message: "Stream API keys not configured" });
      }

      const serverClient = StreamChat.getInstance(apiKey, apiSecret);
      try {
        const channel = serverClient.channel('messaging', 'community-support');
        // ensure the channel exists
        try {
          await channel.create();
        } catch {}
        // add the user as a member (idempotent)
        await channel.addMembers([userId]);
        res.json({ success: true, channel: { id: 'community-support', type: 'messaging' } });
      } catch (err: any) {
        console.warn('Failed to add member to community channel:', err?.message || err);
        res.status(500).json({ success: false, message: err?.message || String(err) });
      }
    })
  );
}

export default registerStreamRoutes;
