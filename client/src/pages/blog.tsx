import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import BlogCard from "@/components/blog-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { type BlogPost } from "@shared/schema";
import { SEOHead } from "@/components/seo-head";

export default function Blog() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const filteredPosts = posts?.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory && post.status === 'published';
  }) || [];

  const categories = Array.from(new Set(posts?.map(post => post.category).filter(Boolean))) || [];

  const faqItems = [
    {
      question: language === 'ar' ? 'كيف تعمل روابط واتساب؟' : 'How do WhatsApp links work?',
      answer: language === 'ar' 
        ? 'تستخدم روابط واتساب تنسيق wa.me لفتح واتساب تلقائياً برقم هاتف محدد ورسالة اختيارية مملوءة مسبقاً. عندما ينقر المستخدمون على الرابط، يفتح واتساب مع المحادثة جاهزة للبدء.'
        : 'WhatsApp links use the wa.me format to automatically open WhatsApp with a specific phone number and optional pre-filled message. When users click the link, WhatsApp opens with the conversation ready to start.',
    },
    {
      question: language === 'ar' ? 'هل روابط واتساب مجانية الاستخدام؟' : 'Are WhatsApp links free to use?',
      answer: language === 'ar'
        ? 'نعم! إنشاء روابط واتساب من خلال منشئنا مجاني تماماً. يمكنك إنشاء روابط غير محدودة دون أي رسوم.'
        : 'Yes! Creating WhatsApp links through our generator is completely free. You can create unlimited links without any charges.',
    },
    {
      question: language === 'ar' ? 'هل يمكنني تتبع نقرات الروابط؟' : 'Can I track link clicks?',
      answer: language === 'ar'
        ? 'نعم، نوفر تتبع النقرات لجميع الروابط المُنشأة. يمكنك رؤية عدد الأشخاص الذين نقروا على روابط واتساب الخاصة بك وتحليل الأداء.'
        : 'Yes, we provide click tracking for all generated links. You can see how many people have clicked on your WhatsApp links and analyze the performance.',
    },
  ];

  // SEO structured data for blog page
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": language === 'ar' ? "مدونة WTSSHORT" : "WTSSHORT Blog",
    "description": language === 'ar'
      ? "نصائح وبرامج تعليمية ورؤى حول تسويق واتساب والتواصل الرقمي الاحترافي"
      : "Tips, tutorials, and insights about WhatsApp marketing and professional digital communication",
    "url": "https://wtsshort.com/blog",
    "author": {
      "@type": "Organization",
      "name": "WTSSHORT",
      "url": "https://wtsshort.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WTSSHORT",
      "logo": "https://wtsshort.com/logo.svg"
    },
    "blogPost": filteredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://wtsshort.com/blog/${post.slug}`,
      "datePublished": (post as any).publishedAt || post.createdAt,
      "author": {
        "@type": "Person",
        "name": "WTSSHORT Team"
      }
    })),
    "numberOfItems": filteredPosts.length,
    "itemListElement": filteredPosts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `https://wtsshort.com/blog/${post.slug}`
      }
    }))
  };

  return (
    <>
      <SEOHead
        title={language === 'ar' 
          ? "مدونة WTSSHORT | نصائح وإرشادات تسويق واتساب وأدوات التواصل الرقمي"
          : "WTSSHORT Blog | WhatsApp Marketing Tips & Digital Communication Tools Guide"
        }
        description={language === 'ar'
          ? "اكتشف أحدث نصائح تسويق واتساب، إرشادات استخدام أدوات التواصل الرقمي، وخبرات احترافية لتحسين استراتيجيات التواصل مع العملاء."
          : "Discover the latest WhatsApp marketing tips, digital communication tools guides, and professional insights to enhance your customer communication strategies."
        }
        keywords={language === 'ar'
          ? "مدونة واتساب، تسويق واتساب، نصائح واتساب، أدوات تواصل، استراتيجيات تسويق، دعم العملاء، أتمتة واتساب، تحليلات واتساب"
          : "WhatsApp blog, WhatsApp marketing, WhatsApp tips, communication tools, marketing strategies, customer support, WhatsApp automation, WhatsApp analytics"
        }
        canonical="https://wtsshort.com/blog"
        ogImage="https://wtsshort.com/og-image-blog.jpg"
        structuredData={blogStructuredData}
      />
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Blog Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {language === 'ar' ? 'المدونة' : 'Blog'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'نصائح وبرامج تعليمية ورؤى حول تسويق واتساب والتواصل'
            : 'Tips, tutorials, and insights about WhatsApp marketing and communication'
          }
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder={language === 'ar' ? 'البحث في المقالات...' : 'Search articles...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="search-input"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48" data-testid="category-select">
            <SelectValue placeholder={language === 'ar' ? 'جميع الفئات' : 'All Categories'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category || ''}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Blog Posts Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-xl h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12" data-testid="no-posts">
          <p className="text-muted-foreground">
            {language === 'ar' ? 'لم يتم العثور على مقالات.' : 'No articles found.'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && filteredPosts.length > 0 && (
        <div className="flex justify-center mb-16">
          <nav className="flex items-center space-x-2">
            <Button variant="outline" disabled>
              {language === 'ar' ? 'السابق' : 'Previous'}
            </Button>
            <Button className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">
              {language === 'ar' ? 'التالي' : 'Next'}
            </Button>
          </nav>
        </div>
      )}

      {/* FAQ Section */}
      <div className="bg-muted py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {language === 'ar' 
                ? 'اعثر على إجابات للأسئلة الشائعة حول إنشاء روابط واتساب'
                : 'Find answers to common questions about WhatsApp link generation'
              }
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="hover:bg-muted/50 transition-colors text-left">
                  <span className="font-medium text-foreground">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
    </>
  );
}
