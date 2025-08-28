import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: any;
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://wtsshort.com/og-image.jpg",
  ogType = "website",
  article,
  structuredData,
  noIndex = false
}: SEOHeadProps) {
  const { language, locationData } = useLanguage();

  // Default SEO data based on language
  const defaultSEO = {
    en: {
      title: "WTSSHORT - Free WhatsApp Link Generator | Create Custom WhatsApp Links Instantly",
      description: "Create professional WhatsApp links with custom messages for free. Perfect for businesses, customer support, and marketing campaigns. Analytics, QR codes, and more!",
      keywords: "WhatsApp link generator, WhatsApp link, custom WhatsApp message, business WhatsApp, WhatsApp marketing, customer support, QR code generator, free WhatsApp tools"
    },
    ar: {
      title: "WTSSHORT - مولد روابط واتساب المجاني | أنشئ روابط واتساب مخصصة فوراً",
      description: "أنشئ روابط واتساب احترافية مع رسائل مخصصة مجاناً. مثالي للشركات ودعم العملاء والحملات التسويقية. تحليلات ورموز QR والمزيد!",
      keywords: "مولد روابط واتساب، رابط واتساب، رسالة واتساب مخصصة، واتساب الأعمال، تسويق واتساب، دعم العملاء، مولد رمز QR، أدوات واتساب مجانية"
    }
  };

  const seoTitle = title || defaultSEO[language].title;
  const seoDescription = description || defaultSEO[language].description;
  const seoKeywords = keywords || defaultSEO[language].keywords;
  const currentUrl = canonical || window.location.href;

  useEffect(() => {
    // Update title
    document.title = seoTitle;

    // Update or create meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    updateMetaTag('author', 'WTSSHORT');
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    updateMetaProperty('og:title', seoTitle);
    updateMetaProperty('og:description', seoDescription);
    updateMetaProperty('og:type', ogType);
    updateMetaProperty('og:url', currentUrl);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:site_name', 'WTSSHORT');
    updateMetaProperty('og:locale', language === 'ar' ? 'ar_SA' : 'en_US');

    // Add alternative locales
    const altLocale = language === 'ar' ? 'en_US' : 'ar_SA';
    updateMetaProperty('og:locale:alternative', altLocale);

    // Update Twitter cards
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', seoTitle, 'name');
    updateMetaTag('twitter:description', seoDescription, 'name');
    updateMetaTag('twitter:image', ogImage, 'name');
    updateMetaTag('twitter:site', '@wtsshort', 'name');

    // Update canonical URL
    updateCanonicalTag(currentUrl);

    // Add hreflang tags for international SEO
    updateHreflangTags(currentUrl);

    // Update HTML lang and dir attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    // Add article-specific meta tags
    if (article && ogType === 'article') {
      if (article.publishedTime) updateMetaProperty('article:published_time', article.publishedTime);
      if (article.modifiedTime) updateMetaProperty('article:modified_time', article.modifiedTime);
      if (article.author) updateMetaProperty('article:author', article.author);
      if (article.section) updateMetaProperty('article:section', article.section);
      if (article.tags) {
        article.tags.forEach(tag => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'article:tag');
          meta.setAttribute('content', tag);
          document.head.appendChild(meta);
        });
      }
    }

    // Add structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    } else {
      // Add default structured data
      updateStructuredData(getDefaultStructuredData());
    }

    // Add geographic targeting if available
    if (locationData) {
      updateMetaTag('geo.region', `${locationData.countryCode}-${locationData.region}`);
      updateMetaTag('geo.placename', locationData.city);
      updateMetaTag('geo.position', `${locationData.latitude || ''};${locationData.longitude || ''}`);
      updateMetaTag('ICBM', `${locationData.latitude || ''}, ${locationData.longitude || ''}`);
    }

  }, [seoTitle, seoDescription, seoKeywords, currentUrl, ogImage, ogType, language, locationData, article, structuredData, noIndex]);

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const updateMetaProperty = (property: string, content: string) => {
    updateMetaTag(property, content, 'property');
  };

  const updateCanonicalTag = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  };

  const updateHreflangTags = (baseUrl: string) => {
    // Remove existing hreflang tags
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(tag => tag.remove());

    // Add new hreflang tags
    const languages = [
      { code: 'en', region: 'en-US' },
      { code: 'ar', region: 'ar-SA' },
      { code: 'x-default', region: 'x-default' }
    ];

    languages.forEach(({ code, region }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', region);
      
      const url = new URL(baseUrl);
      if (code !== 'x-default') {
        url.searchParams.set('lang', code);
      }
      link.setAttribute('href', url.toString());
      
      document.head.appendChild(link);
    });
  };

  const updateStructuredData = (data: any) => {
    // Remove existing structured data
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  const getDefaultStructuredData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "WTSSHORT",
      "description": seoDescription,
      "url": "https://wtsshort.com",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web Browser",
      "permissions": "none",
      "installUrl": "https://wtsshort.com",
      "screenshot": "https://wtsshort.com/screenshot.jpg",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "2547",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "provider": {
        "@type": "Organization",
        "name": "WTSSHORT",
        "url": "https://wtsshort.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://wtsshort.com/logo.svg",
          "width": "512",
          "height": "512"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "availableLanguage": ["English", "Arabic"],
          "areaServed": "Worldwide"
        },
        "sameAs": [
          "https://twitter.com/wtsshort",
          "https://facebook.com/wtsshort",
          "https://linkedin.com/company/wtsshort"
        ]
      },
      "keywords": seoKeywords,
      "inLanguage": language === 'ar' ? 'ar-SA' : 'en-US',
      "isAccessibleForFree": true,
      "usageInfo": "https://wtsshort.com/terms",
      "privacyPolicy": "https://wtsshort.com/privacy"
    };

    // Add location-specific data if available
    if (locationData) {
      (baseSchema as any).serviceArea = {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": locationData.latitude || 0,
          "longitude": locationData.longitude || 0
        },
        "geoRadius": "50000"
      };
    }

    return baseSchema;
  };

  return null; // This component only manages head tags
}

// Helper component for page-specific SEO
export function BlogPostSEO({ 
  post, 
  canonical 
}: { 
  post: {
    title: string;
    excerpt: string;
    publishedAt: string;
    updatedAt?: string;
    author?: string;
    tags?: string[];
    slug: string;
  };
  canonical?: string;
}) {
  const { language } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author || "WTSSHORT Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WTSSHORT",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wtsshort.com/logo.svg"
      }
    },
    "url": canonical || `https://wtsshort.com/blog/${post.slug}`,
    "image": `https://wtsshort.com/blog/${post.slug}/og-image.jpg`,
    "keywords": post.tags?.join(", ") || "",
    "inLanguage": language === 'ar' ? 'ar-SA' : 'en-US',
    "isAccessibleForFree": true
  };

  return (
    <SEOHead
      title={`${post.title} | WTSSHORT Blog`}
      description={post.excerpt}
      canonical={canonical}
      ogType="article"
      article={{
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        author: post.author,
        section: "Technology",
        tags: post.tags
      }}
      structuredData={structuredData}
    />
  );
}