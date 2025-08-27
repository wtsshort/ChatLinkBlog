import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
