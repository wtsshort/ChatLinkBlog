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
  getWhatsappLinkBySlug(slug: string): Promise<WhatsappLink | undefined>;
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
    // إضافة بعض الروابط التجريبية بأرقام واقعية
    this.whatsappLinks.set('demo-1', {
      id: 'demo-1',
      title: 'مرحبا بك في خدماتنا',
      phoneNumber: '+966501234567',
      message: 'أهلاً وسهلاً! أود الاستفسار عن خدماتكم',
      generatedLink: 'https://wa.me/966501234567?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%20%D9%88%D8%B3%D9%87%D9%84%D8%A7%D9%8B%21%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85',
      customSlug: null,
      shortUrl: '/services',
      clickCount: 1547,
      expiresAt: null,
      isProtected: false,
      password: null,
      tags: 'خدمات، استفسار',
      createdAt: new Date('2023-12-10'),
      updatedAt: new Date('2023-12-10'),
    });

    this.whatsappLinks.set('demo-2', {
      id: 'demo-2',
      title: 'طلب عرض سعر',
      phoneNumber: '+966507654321',
      message: 'السلام عليكم، أريد عرض سعر للمنتج',
      generatedLink: 'https://wa.me/966507654321?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D9%84%D9%84%D9%85%D9%86%D8%AA%D8%AC',
      customSlug: 'quote',
      shortUrl: '/quote',
      clickCount: 892,
      expiresAt: null,
      isProtected: false,
      password: null,
      tags: 'مبيعات، عروض',
      createdAt: new Date('2023-12-08'),
      updatedAt: new Date('2023-12-08'),
    });

    this.whatsappLinks.set('demo-3', {
      id: 'demo-3',
      title: 'دعم فني',
      phoneNumber: '+966502345678',
      message: 'مرحبا، أحتاج مساعدة تقنية',
      generatedLink: 'https://wa.me/966502345678?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%A9%20%D8%AA%D9%82%D9%86%D9%8A%D8%A9',
      customSlug: null,
      shortUrl: '/support',
      clickCount: 634,
      expiresAt: null,
      isProtected: false,
      password: null,
      tags: 'دعم، تقني',
      createdAt: new Date('2023-12-05'),
      updatedAt: new Date('2023-12-05'),
    });

    const samplePosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "10 استراتيجيات تسويق واتساب فعالة",
        slug: "whatsapp-marketing-strategies",
        content: "# 10 استراتيجيات تسويق واتساب فعالة\n\nأصبح واتساب من أقوى قنوات التسويق الرقمي...",
        excerpt: "اكتشف تقنيات تسويق واتساب المثبتة التي يمكنها زيادة تفاعل العملاء ورفع المبيعات...",
        author: "سارة أحمد",
        category: "تسويق واتساب",
        status: "published",
        views: 15847,
        featuredImage: null,
        metaTitle: "10 استراتيجيات تسويق واتساب فعالة لزيادة المبيعات",
        metaDescription: "تعلم أفضل 10 استراتيجيات لتسويق واتساب تساعدك على زيادة التفاعل والمبيعات",
        keywords: "تسويق واتساب, استراتيجيات التسويق, زيادة المبيعات",
        ogTitle: "10 استراتيجيات تسويق واتساب فعالة",
        ogDescription: "اكتشف تقنيات تسويق واتساب المثبتة لزيادة تفاعل العملاء",
        focusKeyword: "تسويق واتساب",
        language: "ar",
        readingTime: 5,
        createdAt: new Date("2023-12-15"),
        updatedAt: new Date("2023-12-15"),
      },
      {
        id: randomUUID(),
        title: "أتمتة خدمة العملاء عبر واتساب",
        slug: "whatsapp-customer-support",
        content: "# كيفية أتمتة خدمة العملاء عبر واتساب\n\nيمكن لأتمتة خدمة العملاء تحسين أوقات الاستجابة بشكل كبير...",
        excerpt: "تعلم كيفية إعداد الردود التلقائية وروبوتات الدردشة لتحسين كفاءة خدمة العملاء...",
        author: "محمد علي",
        category: "نصائح الأعمال",
        status: "published",
        views: 8923,
        featuredImage: null,
        metaTitle: "أتمتة خدمة العملاء عبر واتساب - دليل شامل",
        metaDescription: "تعلم كيفية أتمتة خدمة العملاء عبر واتساب لتحسين الكفاءة وتوفير الوقت",
        keywords: "أتمتة خدمة العملاء, واتساب, روبوتات الدردشة",
        ogTitle: "أتمتة خدمة العملاء عبر واتساب",
        ogDescription: "دليل شامل لأتمتة خدمة العملاء عبر واتساب",
        focusKeyword: "أتمتة خدمة العملاء",
        language: "ar",
        readingTime: 4,
        createdAt: new Date("2023-12-10"),
        updatedAt: new Date("2023-12-10"),
      },
      {
        id: randomUUID(),
        title: "قياس عائد الاستثمار في تسويق واتساب",
        slug: "whatsapp-marketing-roi",
        content: "# قياس عائد الاستثمار في تسويق واتساب\n\nتتبع المقاييس الصحيحة أمر بالغ الأهمية لفهم نجاح حملات تسويق واتساب...",
        excerpt: "فهم المقاييس الأكثر أهمية لحملات تسويق واتساب وكيفية قياس النجاح...",
        author: "أحمد محمد",
        category: "التحليلات",
        status: "published",
        views: 12456,
        featuredImage: null,
        metaTitle: "قياس عائد الاستثمار في تسويق واتساب - المقاييس الرئيسية",
        metaDescription: "تعلم كيفية قياس عائد الاستثمار في تسويق واتساب والمقاييس المهمة للنجاح",
        keywords: "عائد الاستثمار, تسويق واتساب, قياس الأداء",
        ogTitle: "قياس عائد الاستثمار في تسويق واتساب",
        ogDescription: "المقاييس الرئيسية لقياس نجاح تسويق واتساب",
        focusKeyword: "عائد الاستثمار",
        language: "ar",
        readingTime: 3,
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
    
    // إنشاء slug قصير فريد
    const generateShortSlug = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    let shortSlug = insertLink.customSlug || generateShortSlug();
    
    // التأكد من أن الslug فريد
    const existingLinks = Array.from(this.whatsappLinks.values());
    while (existingLinks.some(link => link.customSlug === shortSlug)) {
      shortSlug = generateShortSlug();
    }

    // إنشاء الرابط المختصر بدومين الموقع
    const baseUrl = process.env.REPLIT_DOMAINS ? 
      `https://${process.env.REPLIT_DOMAINS.split(',')[0]}` : 
      'https://wtsshort.com';
    const shortUrl = `${baseUrl}/s/${shortSlug}`;
    
    const link: WhatsappLink = {
      id,
      title: insertLink.title || null,
      phoneNumber: insertLink.phoneNumber,
      message: insertLink.message || null,
      generatedLink: insertLink.generatedLink,
      customSlug: shortSlug,
      shortUrl,
      clickCount: 0,
      expiresAt: insertLink.expiresAt || null,
      isProtected: insertLink.isProtected || false,
      password: insertLink.password || null,
      tags: insertLink.tags || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.whatsappLinks.set(id, link);
    return link;
  }

  async getWhatsappLink(id: string): Promise<WhatsappLink | undefined> {
    return this.whatsappLinks.get(id);
  }

  async getWhatsappLinkBySlug(slug: string): Promise<WhatsappLink | undefined> {
    return Array.from(this.whatsappLinks.values()).find(link => link.customSlug === slug);
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
    
    // حساب وقت القراءة (كلمات في الدقيقة)
    const wordsPerMinute = insertPost.language === 'ar' ? 180 : 200;
    const wordCount = insertPost.content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    const post: BlogPost = {
      ...insertPost,
      id,
      views: 0,
      readingTime,
      language: insertPost.language || 'ar',
      excerpt: insertPost.excerpt || null,
      author: insertPost.author || null,
      category: insertPost.category || null,
      status: insertPost.status || 'draft',
      featuredImage: insertPost.featuredImage || null,
      metaTitle: insertPost.metaTitle || null,
      metaDescription: insertPost.metaDescription || null,
      keywords: insertPost.keywords || null,
      ogTitle: insertPost.ogTitle || null,
      ogDescription: insertPost.ogDescription || null,
      focusKeyword: insertPost.focusKeyword || null,
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
