import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useIPDetection } from "./use-ip-detection";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isAutoDetected: boolean;
  locationData: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { locationData, isLoading } = useIPDetection();
  const [language, setLanguage] = useState<Language>("en");
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  const t = (key: string): string => {
    // Simple translation lookup - in a real app, this would be more sophisticated
    const translations: Record<Language, Record<string, string>> = {
      en: {
        "nav.home": "Home",
        "nav.blog": "Blog",
        "nav.dashboard": "Dashboard",
        "hero.title": "Generate WhatsApp Links",
        "hero.highlight": "Instantly",
        "hero.subtitle": "Create professional WhatsApp links with custom messages. Perfect for businesses, customer support, and marketing campaigns.",
        "generator.title": "Create Your WhatsApp Link",
        "generator.phone": "Phone Number",
        "generator.message": "Message (Optional)",
        "generator.generate": "Generate WhatsApp Link",
        "features.title": "Why Choose WTSSHORT?",
        "features.subtitle": "Streamline your WhatsApp communication with our powerful link generator",
        "blog.title": "Blog",
        "blog.subtitle": "Tips, tutorials, and insights about WhatsApp marketing and communication",
        "dashboard.title": "Dashboard",
        "dashboard.subtitle": "Manage your content and track analytics",
      },
      ar: {
        "nav.home": "الرئيسية",
        "nav.blog": "المدونة",
        "nav.dashboard": "لوحة التحكم",
        "hero.title": "إنشاء روابط واتساب",
        "hero.highlight": "فوراً",
        "hero.subtitle": "أنشئ روابط واتساب احترافية مع رسائل مخصصة. مثالي للشركات ودعم العملاء والحملات التسويقية.",
        "generator.title": "أنشئ رابط واتساب الخاص بك",
        "generator.phone": "رقم الهاتف",
        "generator.message": "الرسالة (اختيارية)",
        "generator.generate": "إنشاء رابط واتساب",
        "features.title": "لماذا تختار WTSSHORT؟",
        "features.subtitle": "بسّط تواصلك عبر واتساب مع منشئ الروابط القوي لدينا",
        "blog.title": "المدونة",
        "blog.subtitle": "نصائح وبرامج تعليمية ورؤى حول تسويق واتساب والتواصل",
        "dashboard.title": "لوحة التحكم",
        "dashboard.subtitle": "إدارة المحتوى وتتبع التحليلات",
      },
    };

    return translations[language][key] || key;
  };

  // Auto-detect language based on IP location
  useEffect(() => {
    if (!isLoading && locationData) {
      const savedLanguage = localStorage.getItem('preferred_language');
      const autoDetectedLanguage = localStorage.getItem('auto_detected_language');
      
      if (savedLanguage) {
        // User has manually selected a language, respect their choice
        setLanguage(savedLanguage as Language);
        setIsAutoDetected(false);
      } else if (autoDetectedLanguage && !savedLanguage) {
        // Auto-detect based on location
        setLanguage(autoDetectedLanguage as Language);
        setIsAutoDetected(true);
        
        // Update HTML attributes
        document.documentElement.lang = autoDetectedLanguage;
        document.documentElement.dir = autoDetectedLanguage === 'ar' ? 'rtl' : 'ltr';
      }
    }
  }, [locationData, isLoading]);

  // Enhanced setLanguage function
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsAutoDetected(false);
    localStorage.setItem('preferred_language', lang);
    
    // Update HTML attributes for SEO
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update page title and meta description based on language
    updatePageMetadata(lang);
  };

  const updatePageMetadata = (lang: Language) => {
    const titles = {
      en: "WTSSHORT - Free WhatsApp Link Generator | Create Custom WhatsApp Links Instantly",
      ar: "WTSSHORT - مولد روابط واتساب المجاني | أنشئ روابط واتساب مخصصة فوراً"
    };
    
    const descriptions = {
      en: "Create professional WhatsApp links with custom messages for free. Perfect for businesses, customer support, and marketing campaigns. Analytics, QR codes, and more!",
      ar: "أنشئ روابط واتساب احترافية مع رسائل مخصصة مجاناً. مثالي للشركات ودعم العملاء والحملات التسويقية. تحليلات ورموز QR والمزيد!"
    };

    document.title = titles[lang];
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[lang]);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    
    if (ogTitle) ogTitle.setAttribute('content', titles[lang]);
    if (ogDescription) ogDescription.setAttribute('content', descriptions[lang]);
    if (ogLocale) ogLocale.setAttribute('content', lang === 'ar' ? 'ar_SA' : 'en_US');
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      isAutoDetected,
      locationData 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
