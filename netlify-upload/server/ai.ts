import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';

// قائمة المواضيع الترندية المحسنة للـ SEO
const trendingTopics = [
  // التكنولوجيا والذكاء الاصطناعي
  'أفضل أدوات الذكاء الاصطناعي للأعمال 2025',
  'كيفية استخدام ChatGPT لزيادة الإنتاجية',
  'مستقبل التجارة الإلكترونية مع الذكاء الاصطناعي',
  'أمن المعلومات والحماية من الهجمات السيبرانية',
  'تطوير تطبيقات الجوال بأحدث التقنيات',
  
  // التسويق الرقمي
  'استراتيجيات التسويق عبر وسائل التواصل الاجتماعي 2025',
  'كيفية تحسين موقعك لمحركات البحث SEO',
  'التسويق بالمحتوى: دليل شامل للمبتدئين',
  'إعلانات جوجل: كيفية زيادة المبيعات',
  'التسويق عبر البريد الإلكتروني بفعالية',
  
  // ريادة الأعمال والاستثمار
  'كيفية بدء مشروع تجاري ناجح من الصفر',
  'الاستثمار في العملات الرقمية: دليل المبتدئين',
  'إدارة الأموال الشخصية والتوفير الذكي',
  'أفضل طرق الربح من الإنترنت 2025',
  'بناء علامة تجارية قوية عبر الإنترنت',
  
  // الصحة واللياقة
  'أفضل تمارين اللياقة البدنية في المنزل',
  'النظام الغذائي الصحي لخسارة الوزن',
  'تحسين الصحة النفسية والتخلص من التوتر',
  'فوائد النوم الصحي وطرق تحسين جودة النوم',
  'الرياضة والتغذية للحصول على جسم صحي',
  
  // التعليم والتطوير الذاتي
  'أفضل المهارات المطلوبة في سوق العمل 2025',
  'كيفية تعلم لغة جديدة بسرعة وفعالية',
  'تطوير مهارات القيادة والإدارة',
  'فن إدارة الوقت وزيادة الإنتاجية',
  'بناء السيرة الذاتية المثالية للحصول على وظيفة',
  
  // السفر والسياحة
  'أفضل وجهات السفر الاقتصادية 2025',
  'نصائح السفر الآمن والتخطيط المثالي',
  'السياحة البيئية وحماية الطبيعة',
  'أماكن سياحية مخفية يجب زيارتها',
  'دليل السفر للمملكة العربية السعودية',
  
  // البيئة والاستدامة
  'طرق حماية البيئة في الحياة اليومية',
  'الطاقة المتجددة ومستقبل الطاقة النظيفة',
  'تقليل النفايات والعيش المستدام',
  'تأثير التغير المناخي وحلول عملية',
  'الزراعة المستدامة والأمن الغذائي'
];

// دالة لاختيار موضوع ترندي عشوائي
export function getRandomTrendingTopic(): string {
  const randomIndex = Math.floor(Math.random() * trendingTopics.length);
  return trendingTopics[randomIndex];
}

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

// دالة لإنشاء المقال باستخدام Groq (أسرع وأكثر استقراراً)
export async function generateArticleWithGroq(topic: string, language: string = 'ar') {
  try {
    const prompt = language === 'ar' ? `
أنت كاتب محتوى خبير ومتخصص في إنتاج مقالات عالية الجودة مع خبرة 15 عام في كتابة المحتوى الرقمي.
اكتب مقالاً استثنائياً ومتقناً حول: "${topic}"

معايير الجودة العالية:
• 2500-3500 كلمة من المحتوى العميق والقيم
• أسلوب أكاديمي راقي مع لمسة عملية
• عنوان مقنع ومحسّن لمحركات البحث مع كلمات مفتاحية قوية
• بنية هرمية احترافية مع عناوين فرعية جذابة
• فقرات غنية ومترابطة (120-200 كلمة لكل فقرة)
• معلومات حديثة وموثقة مع أمثلة عملية
• إحصائيات ودراسات حديثة عندما يكون ذلك مناسباً
• نصائح عملية قابلة للتطبيق
• خاتمة قوية مع ملخص شامل ودعوة للعمل
• متوافق 100% مع معايير Google AdSense
• محتوى حصري وأصلي تماماً

متطلبات خاصة:
• ادمج رابط https://wtsshort.com بطريقة طبيعية في سياق المقال (مثل: "ولمزيد من الأدوات المفيدة، يمكنك زيارة wtsshort.com" أو "كما نجد في منصات مثل wtsshort.com")
• استخدم كلمات انتقالية قوية بين الفقرات
• اكتب بأسلوب يجذب القارئ ويحافظ على انتباهه
• أضف أسئلة بلاغية لزيادة التفاعل

قواعد الكتابة الصارمة:
- عنوان رئيسي واضح وجذاب بدون رموز
- عناوين فرعية بسيطة ومعبرة
- لا تستخدم * أو ** أو # في النص نهائياً
- نص عادي واضح ومهني بدون تنسيق
- تدفق طبيعي ومنطقي للأفكار
    ` : `
You are an expert content writer with 15+ years of experience in creating premium digital content.
Write an exceptional and sophisticated article about: "${topic}"

Premium Quality Standards:
• 2500-3500 words of deep, valuable, and engaging content
• Academic yet practical writing style
• Compelling SEO-optimized title with strong keywords
• Professional hierarchical structure with engaging subheadings
• Rich, interconnected paragraphs (120-200 words each)
• Up-to-date, well-researched information with practical examples
• Recent statistics and studies when relevant
• Actionable, implementable advice
• Strong conclusion with comprehensive summary and call-to-action
• 100% compliant with Google AdSense standards
• Original and unique content

Special Requirements:
• Naturally integrate the link https://wtsshort.com within the article context (like: "For more useful tools, visit wtsshort.com" or "As found on platforms like wtsshort.com")
• Use strong transitional words between paragraphs
• Write in an engaging style that maintains reader attention
• Include rhetorical questions to increase engagement

Strict Writing Rules:
- Clear and compelling main title without symbols
- Simple and expressive subheadings
- Do NOT use *, **, or # symbols in text at all
- Plain, clear, professional text without formatting
- Natural and logical flow of ideas
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant", // نموذج سريع ومتاح
      temperature: 0.7,
      max_tokens: 8000, // زيادة للمقالات الأطول والأكثر تفصيلاً
    });
    
    const content = completion.choices[0]?.message?.content || '';
    
    // تنظيف واستخراج العنوان
    let title = topic;
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      title = firstLine.replace(/^#+\s*/, '').replace(/\*+/g, '').trim() || topic;
    }
    
    // تنظيف المحتوى من علامات markdown
    const cleanContent = content
      .replace(/#{1,6}\s*/g, '') // إزالة # من العناوين
      .replace(/\*\*(.+?)\*\*/g, '$1') // إزالة **bold**
      .replace(/\*(.+?)\*/g, '$1') // إزالة *italic*
      .replace(/\n\s*\n\s*\n/g, '\n\n') // تنظيف الأسطر الزائدة
      .trim();
    
    // إنشاء slug من العنوان
    const slug = title
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // استخراج المقدمة وتنظيفها
    const paragraphs = cleanContent.split('\n').filter((p: string) => {
      const clean = p.trim();
      return clean && clean.length > 20; // فقرات ذات معنى
    });
    const excerpt = paragraphs[0] ? paragraphs[0].substring(0, 160) + '...' : '';
    
    return {
      title,
      content: cleanContent,
      excerpt,
      slug: slug || `article-${Date.now()}`,
      category: language === 'ar' ? 'مقالات عامة' : 'General Articles',
      status: 'draft'
    };
    
  } catch (error: any) {
    console.error('Error generating article with Groq:', error);
    throw error; // سيتم التعامل معه في الدالة الرئيسية
  }
}

// دالة إنشاء المقال مع نظام الاحتياط (Groq -> Gemini -> Sample)
export async function generateArticle(topic: string, language: string = 'ar') {
  // المحاولة الأولى: Groq (الأسرع والأفضل)
  try {
    console.log('Trying Groq AI...');
    return await generateArticleWithGroq(topic, language);
  } catch (groqError: any) {
    console.log('Groq failed, trying Gemini...', groqError.message);
    
    // المحاولة الثانية: Google Gemini
    try {
    const prompt = language === 'ar' ? `
أنت كاتب محتوى خبير ومتخصص في إنتاج مقالات عالية الجودة مع خبرة 15 عام في كتابة المحتوى الرقمي.
اكتب مقالاً استثنائياً ومتقناً حول: "${topic}"

معايير الجودة العالية:
• 2500-3500 كلمة من المحتوى العميق والقيم
• أسلوب أكاديمي راقي مع لمسة عملية
• عنوان مقنع ومحسّن لمحركات البحث مع كلمات مفتاحية قوية
• بنية هرمية احترافية مع عناوين فرعية جذابة
• فقرات غنية ومترابطة (120-200 كلمة لكل فقرة)
• معلومات حديثة وموثقة مع أمثلة عملية
• إحصائيات ودراسات حديثة عندما يكون ذلك مناسباً
• نصائح عملية قابلة للتطبيق
• خاتمة قوية مع ملخص شامل ودعوة للعمل
• متوافق 100% مع معايير Google AdSense
• محتوى حصري وأصلي تماماً

متطلبات خاصة:
• ادمج رابط https://wtsshort.com بطريقة طبيعية في سياق المقال (مثل: "ولمزيد من الأدوات المفيدة، يمكنك زيارة wtsshort.com" أو "كما نجد في منصات مثل wtsshort.com")
• استخدم كلمات انتقالية قوية بين الفقرات
• اكتب بأسلوب يجذب القارئ ويحافظ على انتباهه
• أضف أسئلة بلاغية لزيادة التفاعل

قواعد الكتابة الصارمة:
- عنوان رئيسي واضح وجذاب بدون رموز
- عناوين فرعية بسيطة ومعبرة
- لا تستخدم * أو ** أو # في النص نهائياً
- نص عادي واضح ومهني بدون تنسيق
- تدفق طبيعي ومنطقي للأفكار
    ` : `
You are an expert content writer with 15+ years of experience in creating premium digital content.
Write an exceptional and sophisticated article about: "${topic}"

Premium Quality Standards:
• 2500-3500 words of deep, valuable, and engaging content
• Academic yet practical writing style
• Compelling SEO-optimized title with strong keywords
• Professional hierarchical structure with engaging subheadings
• Rich, interconnected paragraphs (120-200 words each)
• Up-to-date, well-researched information with practical examples
• Recent statistics and studies when relevant
• Actionable, implementable advice
• Strong conclusion with comprehensive summary and call-to-action
• 100% compliant with Google AdSense standards
• Original and unique content

Special Requirements:
• Naturally integrate the link https://wtsshort.com within the article context (like: "For more useful tools, visit wtsshort.com" or "As found on platforms like wtsshort.com")
• Use strong transitional words between paragraphs
• Write in an engaging style that maintains reader attention
• Include rhetorical questions to increase engagement

Strict Writing Rules:
- Clear and compelling main title without symbols
- Simple and expressive subheadings
- Do NOT use *, **, or # symbols in text at all
- Plain, clear, professional text without formatting
- Natural and logical flow of ideas
    `;

      const response = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });
    
    const content = response.text || '';
    
    // تنظيف واستخراج العنوان
    let title = topic;
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      title = firstLine.replace(/^#+\s*/, '').replace(/\*+/g, '').trim() || topic;
    }
    
    // تنظيف المحتوى من علامات markdown
    const cleanContent = content
      .replace(/#{1,6}\s*/g, '') // إزالة # من العناوين
      .replace(/\*\*(.+?)\*\*/g, '$1') // إزالة **bold**
      .replace(/\*(.+?)\*/g, '$1') // إزالة *italic*
      .replace(/\n\s*\n\s*\n/g, '\n\n') // تنظيف الأسطر الزائدة
      .trim();
    
    // إنشاء slug من العنوان
    const slug = title
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // استخراج المقدمة وتنظيفها
    const paragraphs = cleanContent.split('\n').filter((p: string) => {
      const clean = p.trim();
      return clean && clean.length > 20; // فقرات ذات معنى
    });
    const excerpt = paragraphs[0] ? paragraphs[0].substring(0, 160) + '...' : '';
    
      return {
        title,
        content: cleanContent,
        excerpt,
        slug: slug || `article-${Date.now()}`,
        category: language === 'ar' ? 'مقالات عامة' : 'General Articles',
        status: 'draft'
      };
      
    } catch (geminiError: any) {
      console.log('Both Groq and Gemini failed, using sample content...', geminiError.message);
      
      // المحاولة الثالثة: محتوى تجريبي
      return generateSampleArticle(topic, language);
    }
  }
}

export async function generateSEOData(content: string, language: string = 'ar') {
  try {
    const prompt = language === 'ar' ? `
      اقرأ المقال التالي وأنشئ بيانات SEO مُحسَّنة:
      
      ${content.substring(0, 1000)}...
      
      المطلوب في صيغة JSON:
      {
        "metaTitle": "عنوان SEO (60 حرف كحد أقصى)",
        "metaDescription": "وصف SEO (155 حرف كحد أقصى)", 
        "keywords": "كلمة1, كلمة2, كلمة3",
        "ogTitle": "عنوان Open Graph",
        "ogDescription": "وصف Open Graph",
        "focusKeyword": "الكلمة المفتاحية الرئيسية"
      }
    ` : `
      Read the following article and generate optimized SEO data:
      
      ${content.substring(0, 1000)}...
      
      Required in JSON format:
      {
        "metaTitle": "SEO title (max 60 chars)",
        "metaDescription": "SEO description (max 155 chars)", 
        "keywords": "keyword1, keyword2, keyword3",
        "ogTitle": "Open Graph title",
        "ogDescription": "Open Graph description",
        "focusKeyword": "main focus keyword"
      }
    `;

    const response = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt
    });
    
    const jsonText = response.text || '';
    
    // استخراج JSON من النص
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      focusKeyword: ''
    };
    
  } catch (error) {
    console.error('Error generating SEO data:', error);
    return {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      focusKeyword: ''
    };
  }
}

// دالة لإنشاء محتوى تجريبي عند فشل الـ AI
function generateSampleArticle(topic: string, language: string = 'ar') {
  const sampleContent = language === 'ar' ? `
# ${topic}

## مقدمة

هذا مقال تجريبي حول موضوع "${topic}". يحتوي هذا المقال على محتوى أساسي يمكن تطويره وتحسينه لاحقاً.

## النقاط الرئيسية

### النقطة الأولى
شرح مفصل للنقطة الأولى المتعلقة بالموضوع.

### النقطة الثانية  
توضيح للنقطة الثانية وأهميتها في السياق.

### النقطة الثالثة
تحليل للنقطة الثالثة وتطبيقاتها العملية.

## الخلاصة

في الختام، يعتبر موضوع "${topic}" من المواضيع المهمة التي تستحق الدراسة والاهتمام.
  ` : `
# ${topic}

## Introduction

This is a sample article about "${topic}". This article contains basic content that can be developed and improved later.

## Key Points

### First Point
Detailed explanation of the first point related to the topic.

### Second Point
Clarification of the second point and its importance in context.

### Third Point
Analysis of the third point and its practical applications.

## Conclusion

In conclusion, the topic of "${topic}" is an important subject that deserves study and attention.
  `;

  const title = language === 'ar' ? topic : topic;
  const slug = title
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  const excerpt = language === 'ar' 
    ? `مقال شامل حول ${topic} يتضمن النقاط الرئيسية والمعلومات المهمة.`
    : `Comprehensive article about ${topic} including key points and important information.`;

  return {
    title,
    content: sampleContent,
    excerpt,
    slug: slug || `article-${Date.now()}`,
    category: language === 'ar' ? 'مقالات عامة' : 'General Articles',
    status: 'draft'
  };
}

export async function generateImagePrompt(articleTitle: string, language: string = 'ar') {
  try {
    const prompt = language === 'ar' ? `
      بناءً على عنوان المقال: "${articleTitle}"
      
      اكتب وصفاً مفصلاً بالإنجليزية لصورة مناسبة للمقال.
      الوصف يجب أن يكون:
      - مهني وعالي الجودة
      - مناسب للمحتوى
      - بدون نصوص في الصورة
      - بألوان جميلة ومتناسقة
      
      اكتب فقط الوصف باللغة الإنجليزية بدون أي إضافات.
    ` : `
      Based on the article title: "${articleTitle}"
      
      Write a detailed description in English for a suitable image for the article.
      The description should be:
      - Professional and high quality
      - Suitable for the content
      - No text in the image
      - Beautiful and harmonious colors
      
      Write only the description in English without any additions.
    `;

    const response = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt
    });
    
    return response.text?.trim() || 'Professional, high-quality, modern illustration';
    
  } catch (error) {
    console.error('Error generating image prompt:', error);
    return 'Professional, high-quality, modern illustration';
  }
}

// دالة لإنشاء صورة للمقال باستخدام AI
export async function generateArticleImage(prompt: string, title: string = 'article'): Promise<string> {
  try {
    // تنظيف العنوان لاستخدامه في اسم الملف
    const cleanTitle = title
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50) || 'article';
    
    const imagePath = `attached_assets/generated_images/${cleanTitle}_${Date.now()}.png`;
    
    // إنشاء الصورة باستخدام Replit's image generation
    // هذه عبارة عن placeholder - سيتم استبدالها بالرابط الفعلي للصورة المُولَّدة
    
    // محاولة إنشاء صورة حقيقية بـ Gemini
    try {
      const imageResponse = await genAI.models.generateContent({
        model: 'gemini-2.0-flash-preview-image-generation',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseModalities: ['TEXT', 'IMAGE'] }
      });
      
      const candidates = imageResponse.candidates;
      if (candidates && candidates.length > 0) {
        const content = candidates[0].content;
        if (content && content.parts) {
          for (const part of content.parts) {
            if (part.inlineData && part.inlineData.data) {
              // استخدام الصورة المُولدة
              console.log(`Generated real image for: ${title}`);
              return `data:image/png;base64,${part.inlineData.data}`;
            }
          }
        }
      }
    } catch (imageError: any) {
      console.log('Gemini image generation failed:', imageError?.message || 'Unknown error');
    }
    
    // استخدام صورة placeholder جميلة من Picsum
    const placeholderImageUrl = `https://picsum.photos/800/400?random=${Date.now()}&blur=1`;
    
    console.log(`Using placeholder image for: ${title}`);
    console.log(`Image prompt was: ${prompt}`);
    
    return placeholderImageUrl;
    
  } catch (error) {
    console.error('Error generating article image:', error);
    // إرجاع صورة افتراضية في حالة الفشل
    return 'https://via.placeholder.com/800x400/6366f1/ffffff?text=Article+Image';
  }
}