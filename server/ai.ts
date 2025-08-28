import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateArticle(topic: string, language: string = 'ar') {
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
      model: 'gemini-1.5-pro',
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
      category: 'مقالات عامة',
      status: 'draft'
    };
    
  } catch (error) {
    console.error('Error generating article:', error);
    throw new Error('فشل في إنشاء المقال');
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