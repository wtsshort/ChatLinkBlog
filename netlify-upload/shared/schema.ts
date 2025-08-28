import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const whatsappLinks = pgTable("whatsapp_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  message: text("message"),
  generatedLink: text("generated_link").notNull(),
  customSlug: varchar("custom_slug", { length: 50 }).unique(),
  shortUrl: varchar("short_url", { length: 100 }),
  clickCount: integer("click_count").default(0),
  expiresAt: timestamp("expires_at"),
  isProtected: boolean("is_protected").default(false),
  password: varchar("password", { length: 255 }),
  tags: text("tags"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

// جدول قوالب الرسائل
export const messageTemplates = pgTable("message_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }),
  language: varchar("language", { length: 5 }).default("ar"),
  isDefault: boolean("is_default").default(false),
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// جدول تتبع النقرات المتقدم
export const linkClicks = pgTable("link_clicks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  linkId: varchar("link_id").references(() => whatsappLinks.id),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
  country: varchar("country", { length: 50 }),
  city: varchar("city", { length: 100 }),
  deviceType: varchar("device_type", { length: 20 }),
  referer: text("referer"),
  clickedAt: timestamp("clicked_at").defaultNow(),
});

export const insertWhatsappLinkSchema = createInsertSchema(whatsappLinks).omit({
  id: true,
  clickCount: true,
  createdAt: true,
  updatedAt: true,
  shortUrl: true,
}).extend({
  title: z.string().max(100).optional().or(z.literal("")),
  customSlug: z.string().max(50).optional().or(z.literal("")),
  expiresAt: z.date().optional().nullable(),
  isProtected: z.boolean().default(false),
  password: z.string().max(255).optional().or(z.literal("")),
  tags: z.string().optional().or(z.literal("")),
});

export const insertMessageTemplateSchema = createInsertSchema(messageTemplates).omit({
  id: true,
  usageCount: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLinkClickSchema = createInsertSchema(linkClicks).omit({
  id: true,
  clickedAt: true,
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

export type InsertMessageTemplate = z.infer<typeof insertMessageTemplateSchema>;
export type MessageTemplate = typeof messageTemplates.$inferSelect;

export type InsertLinkClick = z.infer<typeof insertLinkClickSchema>;
export type LinkClick = typeof linkClicks.$inferSelect;
