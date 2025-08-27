import { 
  whatsappLinks, 
  blogPosts,
  type WhatsappLink, 
  type InsertWhatsappLink,
  type BlogPost,
  type InsertBlogPost 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // WhatsApp Links
  createWhatsappLink(link: InsertWhatsappLink): Promise<WhatsappLink>;
  getWhatsappLink(id: string): Promise<WhatsappLink | undefined>;
  getAllWhatsappLinks(): Promise<WhatsappLink[]>;
  incrementClickCount(id: string): Promise<void>;
  deleteWhatsappLink(id: string): Promise<void>;
  
  // Blog Posts
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
  incrementBlogPostViews(id: string): Promise<void>;
  
  // Analytics
  getStats(): Promise<{
    totalLinks: number;
    totalClicks: number;
    totalPosts: number;
    totalViews: number;
  }>;
}

export class MemStorage implements IStorage {
  private whatsappLinks: Map<string, WhatsappLink>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.whatsappLinks = new Map();
    this.blogPosts = new Map();
    
    // Initialize with some sample blog posts
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const samplePosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "10 WhatsApp Marketing Strategies That Actually Work",
        slug: "whatsapp-marketing-strategies",
        content: "# 10 WhatsApp Marketing Strategies That Actually Work\n\nWhatsApp has become one of the most powerful marketing channels...",
        excerpt: "Discover proven WhatsApp marketing techniques that can boost your customer engagement and drive more sales...",
        author: "Sarah Johnson",
        category: "WhatsApp Marketing",
        status: "published",
        views: 1234,
        createdAt: new Date("2023-12-15"),
        updatedAt: new Date("2023-12-15"),
      },
      {
        id: randomUUID(),
        title: "How to Automate Customer Support with WhatsApp",
        slug: "whatsapp-customer-support",
        content: "# How to Automate Customer Support with WhatsApp\n\nAutomating customer support can significantly improve response times...",
        excerpt: "Learn how to set up automated WhatsApp responses and chatbots to improve your customer service efficiency...",
        author: "Mike Chen",
        category: "Business Tips",
        status: "published",
        views: 856,
        createdAt: new Date("2023-12-10"),
        updatedAt: new Date("2023-12-10"),
      },
      {
        id: randomUUID(),
        title: "Measuring WhatsApp Marketing ROI: Key Metrics to Track",
        slug: "whatsapp-marketing-roi",
        content: "# Measuring WhatsApp Marketing ROI\n\nTracking the right metrics is crucial for understanding the success of your WhatsApp marketing campaigns...",
        excerpt: "Understand which metrics matter most for your WhatsApp marketing campaigns and how to measure success...",
        author: "Alex Rodriguez",
        category: "Analytics",
        status: "published",
        views: 492,
        createdAt: new Date("2023-12-05"),
        updatedAt: new Date("2023-12-05"),
      }
    ];

    samplePosts.forEach(post => {
      this.blogPosts.set(post.id, post);
    });
  }

  // WhatsApp Links
  async createWhatsappLink(insertLink: InsertWhatsappLink): Promise<WhatsappLink> {
    const id = randomUUID();
    const link: WhatsappLink = {
      ...insertLink,
      id,
      clickCount: 0,
      createdAt: new Date(),
    };
    this.whatsappLinks.set(id, link);
    return link;
  }

  async getWhatsappLink(id: string): Promise<WhatsappLink | undefined> {
    return this.whatsappLinks.get(id);
  }

  async getAllWhatsappLinks(): Promise<WhatsappLink[]> {
    return Array.from(this.whatsappLinks.values());
  }

  async incrementClickCount(id: string): Promise<void> {
    const link = this.whatsappLinks.get(id);
    if (link) {
      link.clickCount = (link.clickCount || 0) + 1;
      this.whatsappLinks.set(id, link);
    }
  }

  async deleteWhatsappLink(id: string): Promise<void> {
    this.whatsappLinks.delete(id);
  }

  // Blog Posts
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const post = this.blogPosts.get(id);
    if (!post) {
      throw new Error("Post not found");
    }
    
    const updatedPost: BlogPost = {
      ...post,
      ...updateData,
      updatedAt: new Date(),
    };
    
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<void> {
    this.blogPosts.delete(id);
  }

  async incrementBlogPostViews(id: string): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.views = (post.views || 0) + 1;
      this.blogPosts.set(id, post);
    }
  }

  // Analytics
  async getStats(): Promise<{
    totalLinks: number;
    totalClicks: number;
    totalPosts: number;
    totalViews: number;
  }> {
    const links = Array.from(this.whatsappLinks.values());
    const posts = Array.from(this.blogPosts.values());
    
    return {
      totalLinks: links.length,
      totalClicks: links.reduce((sum, link) => sum + (link.clickCount || 0), 0),
      totalPosts: posts.length,
      totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
    };
  }
}

export const storage = new MemStorage();
