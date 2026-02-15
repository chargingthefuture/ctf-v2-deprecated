import express, { type Express } from "express";
import { isAuthenticated, getUserId } from "../auth";
import { asyncHandler } from "../errorHandler";
import { StreamChat } from "stream-chat";

export function registerStreamRoutes(app: Express) {
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

      res.json({ token, apiKey, user: { id: userId, name: displayName, image } });
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
        res.json({ success: true });
      } catch (err: any) {
        console.warn("Failed to flag message on Stream:", err);
        // Store basic report in app logs / DB if desired. For now return success:false
        res.status(500).json({ success: false, message: err?.message || String(err) });
      }
    })
  );
}

export default registerStreamRoutes;
