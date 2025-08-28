import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

// دالة لإنشاء المقال باستخدام Groq (أسرع وأكثر استقراراً)
export async function generateArticleWithGroq(topic: string, language: string = 'ar') {
  try {
    const prompt = language === 'ar' ? `
      اكتب مقالاً شاملاً وعالي الجودة حول موضوع: "${topic}"
      
      المطلوب:
      1. مقال من 1500-2000 كلمة
      2. تحسين محركات البحث SEO
      3. العنوان الرئيسي جذاب ومحسن للبحث
      4. عناوين فرعية H2, H3 منظمة
      5. فقرات متوسطة الطول (50-100 كلمة لكل فقرة)
      6. استخدام الكلمات المفتاحية بشكل طبيعي
      7. محتوى مفيد وقيم للقارئ
      8. خاتمة تلخص النقاط الرئيسية
      9. تجنب المحتوى المكرر
      10. مناسب لـ Google AdSense
      
      اكتب بصيغة مارك داون مع عناوين واضحة.
      ابدأ بالعنوان الرئيسي بـ #، ثم العناوين الفرعية بـ ## و ###
    ` : `
      Write a comprehensive, high-quality article about: "${topic}"
      
      Requirements:
      1. 1500-2000 words article
      2. SEO optimized content
      3. Catchy main title optimized for search
      4. Well-structured H2, H3 headings
      5. Medium-length paragraphs (50-100 words each)
      6. Natural keyword usage
      7. Valuable and useful content for readers
      8. Conclusion summarizing main points
      9. Avoid duplicate content
      10. Google AdSense friendly
      
      Write in Markdown format with clear headings.
      Start with main title using #, then subheadings with ## and ###
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-70b-versatile", // أفضل نموذج للنصوص الطويلة
      temperature: 0.7,
      max_tokens: 4000,
    });
    
    const content = completion.choices[0]?.message?.content || '';
    
    // استخراج العنوان من المحتوى
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : topic;
    
    // إنشاء slug من العنوان
    const slug = title
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '') // السماح بالعربية والإنجليزية والأرقام
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // استخراج المقدمة كملخص
    const paragraphs = content.split('\n').filter((p: string) => p.trim() && !p.startsWith('#'));
    const excerpt = paragraphs[0] ? paragraphs[0].substring(0, 160) + '...' : '';
    
    return {
      title,
      content,
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
      اكتب مقالاً شاملاً وعالي الجودة حول موضوع: "${topic}"
      
      المطلوب:
      1. مقال من 1500-2000 كلمة
      2. تحسين محركات البحث SEO
      3. العنوان الرئيسي جذاب ومحسن للبحث
      4. عناوين فرعية H2, H3 منظمة
      5. فقرات متوسطة الطول (50-100 كلمة لكل فقرة)
      6. استخدام الكلمات المفتاحية بشكل طبيعي
      7. محتوى مفيد وقيم للقارئ
      8. خاتمة تلخص النقاط الرئيسية
      9. تجنب المحتوى المكرر
      10. مناسب لـ Google AdSense
      
      اكتب بصيغة مارك داون مع عناوين واضحة.
      ابدأ بالعنوان الرئيسي بـ #، ثم العناوين الفرعية بـ ## و ###
    ` : `
      Write a comprehensive, high-quality article about: "${topic}"
      
      Requirements:
      1. 1500-2000 words article
      2. SEO optimized content
      3. Catchy main title optimized for search
      4. Well-structured H2, H3 headings
      5. Medium-length paragraphs (50-100 words each)
      6. Natural keyword usage
      7. Valuable and useful content for readers
      8. Conclusion summarizing main points
      9. Avoid duplicate content
      10. Google AdSense friendly
      
      Write in Markdown format with clear headings.
      Start with main title using #, then subheadings with ## and ###
    `;

      const response = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });
    
    const content = response.text || '';
    
    // استخراج العنوان من المحتوى
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : topic;
    
    // إنشاء slug من العنوان
    const slug = title
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '') // السماح بالعربية والإنجليزية والأرقام
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // استخراج المقدمة كملخص
    const paragraphs = content.split('\n').filter((p: string) => p.trim() && !p.startsWith('#'));
    const excerpt = paragraphs[0] ? paragraphs[0].substring(0, 160) + '...' : '';
    
      return {
        title,
        content,
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
    
    // في الوقت الحالي، نعيد رابط placeholder
    const placeholderImageUrl = `https://via.placeholder.com/800x400/4f46e5/ffffff?text=${encodeURIComponent(cleanTitle)}`;
    
    console.log(`Generated image for: ${title}`);
    console.log(`Image prompt: ${prompt}`);
    console.log(`Placeholder URL: ${placeholderImageUrl}`);
    
    return placeholderImageUrl;
    
  } catch (error) {
    console.error('Error generating article image:', error);
    // إرجاع صورة افتراضية في حالة الفشل
    return 'https://via.placeholder.com/800x400/6366f1/ffffff?text=Article+Image';
  }
}