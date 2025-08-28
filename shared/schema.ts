import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const whatsappLinks = pgTable("whatsapp_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  message: text("message"),
  generatedLink: text("generated_link").notNull(),
  clickCount: integer("click_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  author: varchar("author", { length: 100 }),
  category: varchar("category", { length: 50 }),
  status: varchar("status", { length: 20 }).default("draft"),
  views: integer("views").default(0),
  featuredImage: text("featured_image"),
  metaTitle: varchar("meta_title", { length: 70 }),
  metaDescription: varchar("meta_description", { length: 160 }),
  keywords: text("keywords"),
  ogTitle: varchar("og_title", { length: 70 }),
  ogDescription: varchar("og_description", { length: 160 }),
  focusKeyword: varchar("focus_keyword", { length: 100 }),
  language: varchar("language", { length: 5 }).default("ar"),
  readingTime: integer("reading_time").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertWhatsappLinkSchema = createInsertSchema(whatsappLinks).omit({
  id: true,
  clickCount: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  views: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertWhatsappLink = z.infer<typeof insertWhatsappLinkSchema>;
export type WhatsappLink = typeof whatsappLinks.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
