import { sql } from 'drizzle-orm';
import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const moderationReports = pgTable('moderation_reports', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  reporterId: varchar('reporter_id').notNull(),
  reportedUserId: varchar('reported_user_id'),
  source: varchar('source', { length: 50 }).notNull(),
  sourceId: varchar('source_id'),
  channelId: varchar('channel_id'),
  reason: varchar('reason', { length: 100 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  resolution: text('resolution'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  notifiedAt: timestamp('notified_at'),
});

export const insertModerationReportSchema = createInsertSchema(moderationReports).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  notifiedAt: true,
});

export type InsertModerationReport = z.infer<typeof insertModerationReportSchema>;
export type ModerationReport = typeof moderationReports.$inferSelect;
