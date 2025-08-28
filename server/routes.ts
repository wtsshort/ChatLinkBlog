import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWhatsappLinkSchema, insertBlogPostSchema } from "@shared/schema";
import { generateArticle, generateSEOData, generateImagePrompt } from "./ai";
import { requireAuth, loginAdmin, logoutAdmin, checkAuth } from "./auth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // WhatsApp Link Routes
  app.post("/api/whatsapp-links", async (req, res) => {
    try {
      const validatedData = insertWhatsappLinkSchema.parse(req.body);
      const link = await storage.createWhatsappLink(validatedData);
      res.json(link);
    } catch (error) {
      console.error("Error creating WhatsApp link:", error);
      res.status(400).json({ message: "Invalid link data" });
    }
  });

  app.get("/api/whatsapp-links", async (req, res) => {
    try {
      const links = await storage.getAllWhatsappLinks();
      res.json(links);
    } catch (error) {
      console.error("Error fetching WhatsApp links:", error);
      res.status(500).json({ message: "Failed to fetch links" });
    }
  });

  app.post("/api/whatsapp-links/:id/click", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.incrementClickCount(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error incrementing click count:", error);
      res.status(500).json({ message: "Failed to record click" });
    }
  });

  app.delete("/api/whatsapp-links/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteWhatsappLink(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting WhatsApp link:", error);
      res.status(500).json({ message: "Failed to delete link" });
    }
  });

  // Blog Post Routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Increment view count
      await storage.incrementBlogPostViews(post.id);
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.put("/api/blog-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // Analytics Routes
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Admin Authentication Routes
  app.post("/api/admin/login", loginAdmin);
  app.post("/api/admin/logout", logoutAdmin);
  app.get("/api/admin/check", checkAuth);

  // AI Article Generation Routes
  app.post("/api/admin/generate-article", requireAuth, async (req, res) => {
    try {
      const { topic, language = 'ar' } = req.body;
      
      if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
      }

      // إنشاء المقال
      const article = await generateArticle(topic, language);
      
      // إنشاء بيانات SEO
      const seoData = await generateSEOData(article.content, language);
      
      // إنشاء وصف للصورة
      const imagePrompt = await generateImagePrompt(article.title, language);
      
      // دمج البيانات
      const fullArticle = {
        ...article,
        ...seoData,
        featuredImagePrompt: imagePrompt,
        language,
        author: 'AI Assistant'
      };
      
      res.json(fullArticle);
      
    } catch (error: any) {
      console.error("Error generating article:", error);
      const message = error.message || (language === 'ar' ? "فشل في إنشاء المقال" : "Failed to generate article");
      res.status(500).json({ message });
    }
  });

  // Protected Blog Management Routes
  app.post("/api/admin/blog-posts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.put("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.delete("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
