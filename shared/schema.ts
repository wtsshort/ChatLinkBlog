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
}).extend({
  // تحديد الحقول المطلوبة والاختيارية بوضوح
  title: z.string().min(1, "Title is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  content: z.string().min(1, "Content is required"),
  status: z.string().default("draft"),
  language: z.string().default("ar"),
  readingTime: z.number().default(0),
  // جعل جميع حقول SEO اختيارية مع حدود مناسبة
  metaTitle: z.string().max(70).optional().or(z.literal("")),
  metaDescription: z.string().max(160).optional().or(z.literal("")),
  keywords: z.string().optional().or(z.literal("")),
  ogTitle: z.string().max(70).optional().or(z.literal("")),
  ogDescription: z.string().max(160).optional().or(z.literal("")),
  focusKeyword: z.string().max(100).optional().or(z.literal("")),
  author: z.string().max(100).optional().or(z.literal("")),
  category: z.string().max(50).optional().or(z.literal("")),
  excerpt: z.string().optional().or(z.literal("")),
  featuredImage: z.string().optional().or(z.literal("")),
});

export type InsertWhatsappLink = z.infer<typeof insertWhatsappLinkSchema>;
export type WhatsappLink = typeof whatsappLinks.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
