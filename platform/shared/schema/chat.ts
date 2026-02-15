import { sql } from 'drizzle-orm';
import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const chatMessages = pgTable('chat_messages', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  channelId: varchar('channel_id').notNull().default('community-support'),
  userId: varchar('user_id').notNull(),
  userName: varchar('user_name'),
  userImage: text('user_image'),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).pick({
  channelId: true,
  userId: true,
  userName: true,
  userImage: true,
  text: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
