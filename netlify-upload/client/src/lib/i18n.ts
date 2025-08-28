export const translations = {
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      dashboard: "Dashboard",
    },
    hero: {
      title: "Generate WhatsApp Links",
      highlight: "Instantly",
      subtitle: "Create professional WhatsApp links with custom messages. Perfect for businesses, customer support, and marketing campaigns.",
    },
    generator: {
      title: "Create Your WhatsApp Link",
      phone: "Phone Number",
      phonePlaceholder: "+1234567890",
      phoneHelp: "Include country code (e.g., +1, +44, +966)",
      message: "Message (Optional)",
      messagePlaceholder: "Hello! I'm interested in your services...",
      messageHelp: "Pre-fill the WhatsApp message for your users",
      generate: "Generate WhatsApp Link",
      linkLabel: "Your WhatsApp Link:",
      clicksTracked: "clicks tracked",
    },
    features: {
      title: "Why Choose WTSSHORT?",
      subtitle: "Streamline your WhatsApp communication with our powerful link generator",
      instant: {
        title: "Instant Generation",
        description: "Create WhatsApp links in seconds with our user-friendly interface",
      },
      analytics: {
        title: "Click Analytics",
        description: "Track link performance with detailed click analytics and insights",
      },
      multilang: {
        title: "Multi-Language",
        description: "Support for Arabic and English with RTL text support",
      },
    },
    blog: {
      title: "Blog",
      subtitle: "Tips, tutorials, and insights about WhatsApp marketing and communication",
      searchPlaceholder: "Search articles...",
      readMore: "Read More →",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Manage your content and track analytics",
      newPost: "New Post",
      exportCsv: "Export CSV",
      totalLinks: "Total Links",
      totalClicks: "Total Clicks",
      blogPosts: "Blog Posts",
      pageViews: "Page Views",
    },
    toast: {
      linkCopied: "Link copied to clipboard!",
      linkGenerated: "WhatsApp link generated successfully!",
      phoneRequired: "Please enter a phone number",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      blog: "المدونة",
      dashboard: "لوحة التحكم",
    },
    hero: {
      title: "إنشاء روابط واتساب",
      highlight: "فوراً",
      subtitle: "أنشئ روابط واتساب احترافية مع رسائل مخصصة. مثالي للشركات ودعم العملاء والحملات التسويقية.",
    },
    generator: {
      title: "أنشئ رابط واتساب الخاص بك",
      phone: "رقم الهاتف",
      phonePlaceholder: "+966501234567",
      phoneHelp: "تضمين رمز البلد (مثل +966، +971، +1)",
      message: "الرسالة (اختيارية)",
      messagePlaceholder: "مرحبا! أنا مهتم بخدماتكم...",
      messageHelp: "املأ مسبقاً رسالة واتساب للمستخدمين",
      generate: "إنشاء رابط واتساب",
      linkLabel: "رابط واتساب الخاص بك:",
      clicksTracked: "نقرة مُتتبعة",
    },
    features: {
      title: "لماذا تختار WTSSHORT؟",
      subtitle: "بسّط تواصلك عبر واتساب مع منشئ الروابط القوي لدينا",
      instant: {
        title: "إنشاء فوري",
        description: "أنشئ روابط واتساب في ثوانٍ مع واجهتنا سهلة الاستخدام",
      },
      analytics: {
        title: "تحليل النقرات",
        description: "تتبع أداء الروابط مع تحليلات وإحصائيات مفصلة",
      },
      multilang: {
        title: "متعدد اللغات",
        description: "دعم للعربية والإنجليزية مع دعم النص من اليمين لليسار",
      },
    },
    blog: {
      title: "المدونة",
      subtitle: "نصائح وبرامج تعليمية ورؤى حول تسويق واتساب والتواصل",
      searchPlaceholder: "البحث في المقالات...",
      readMore: "اقرأ المزيد ←",
    },
    dashboard: {
      title: "لوحة التحكم",
      subtitle: "إدارة المحتوى وتتبع التحليلات",
      newPost: "منشور جديد",
      exportCsv: "تصدير CSV",
      totalLinks: "إجمالي الروابط",
      totalClicks: "إجمالي النقرات",
      blogPosts: "منشورات المدونة",
      pageViews: "مشاهدات الصفحة",
    },
    toast: {
      linkCopied: "تم نسخ الرابط إلى الحافظة!",
      linkGenerated: "تم إنشاء رابط واتساب بنجاح!",
      phoneRequired: "يرجى إدخال رقم الهاتف",
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
