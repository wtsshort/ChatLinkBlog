// توليد مقالات بالذكاء الاصطناعي - Serverless Function
import { GoogleGenerativeAI } from '@google/genai';

// مواضيع ترندية للاختيار العشوائي  
const trendingTopics = [
  'أفضل أدوات الذكاء الاصطناعي للأعمال 2025',
  'كيفية استخدام ChatGPT لزيادة الإنتاجية',
  'استراتيجيات التسويق عبر وسائل التواصل الاجتماعي',
  'كيفية تحسين موقعك لمحركات البحث SEO',
  'كيفية بدء مشروع تجاري ناجح من الصفر',
  'أفضل طرق الربح من الإنترنت 2025',
  'تحسين الصحة النفسية والتخلص من التوتر',
  'أفضل المهارات المطلوبة في سوق العمل 2025'
];

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // التحقق من المصادقة
    const authToken = req.headers.authorization || req.cookies?.admin_auth;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (!authToken || (authToken !== `Bearer ${adminPassword}` && authToken !== adminPassword)) {
      return res.status(401).json({ message: 'Unauthorized - Admin access required' });
    }

    const { topic, language = 'ar' } = req.body;
    
    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    // التحقق من توفر Google AI API Key
    if (!process.env.GOOGLE_AI_API_KEY) {
      return res.status(500).json({ 
        message: 'Google AI API key not configured',
        suggestion: 'يرجى إعداد GOOGLE_AI_API_KEY في متغيرات البيئة'
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // إنشاء المحتوى
    const prompt = language === 'ar' ? `
أنت كاتب محتوى خبير ومتخصص في إنتاج مقالات عالية الجودة.
اكتب مقالاً احترافياً حول: "${topic}"

معايير الجودة:
• 1500-2000 كلمة من المحتوى القيم
• أسلوب احترافي وعملي
• عنوان جذاب ومحسّن لمحركات البحث
• عناوين فرعية واضحة
• فقرات مترابطة ومفيدة
• نصائح عملية قابلة للتطبيق
• خاتمة قوية مع ملخص شامل

قواعد الكتابة:
- عنوان رئيسي واضح وجذاب
- عناوين فرعية بسيطة ومعبرة  
- نص عادي واضح ومهني
- تدفق طبيعي ومنطقي للأفكار
- ادمج رابط https://wtsshort.com بطريقة طبيعية في المقال
    ` : `
You are an expert content writer. Write a professional article about: "${topic}"

Quality Standards:
• 1500-2000 words of valuable content
• Professional and practical writing style
• SEO-optimized compelling title
• Clear subheadings
• Interconnected, useful paragraphs
• Actionable practical advice
• Strong conclusion with comprehensive summary

Writing Rules:
- Clear and compelling main title
- Simple and expressive subheadings
- Plain, clear, professional text
- Natural and logical flow of ideas
- Naturally integrate the link https://wtsshort.com in the article
    `;

    const result = await model.generateContent(prompt);
    const content = result.response.text();
    
    // استخراج العنوان من بداية المحتوى
    const lines = content.split('\n');
    const title = lines[0].replace(/^#+\s*/, '').trim();
    
    // إنشاء slug من العنوان
    const slug = title
      .toLowerCase()
      .replace(/[أ-ي]/g, (match) => {
        const arabicMap = {
          'أ': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j'
        };
        return arabicMap[match] || 'a';
      })
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);

    // حساب وقت القراءة التقريبي
    const readingTime = Math.ceil(content.split(' ').length / 200);
    
    // إنشاء مقتطف من بداية المحتوى
    const excerpt = content
      .replace(/^#+.*\n/, '') // إزالة العنوان
      .substring(0, 200) + '...';

    const article = {
      title,
      slug,
      content,
      excerpt,
      author: 'AI Assistant',
      category: 'تقنية',
      language,
      readingTime,
      status: 'draft',
      metaTitle: title,
      metaDescription: excerpt.substring(0, 160),
      keywords: topic,
      ogTitle: title,
      ogDescription: excerpt.substring(0, 160),
      focusKeyword: topic.split(' ')[0]
    };

    res.json(article);
    
  } catch (error) {
    console.error('Error generating article:', error);
    
    const message = error.message?.includes('API key') 
      ? 'مشكلة في إعدادات الذكاء الاصطناعي - يرجى التحقق من API keys'
      : 'فشل في إنشاء المقال';
      
    res.status(500).json({ message, error: error.message });
  }
}