// تحويل الروابط المختصرة - Serverless Function
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).json({ message: 'Slug is required' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // البحث عن الرابط بالـ slug
    const [link] = await sql`
      SELECT * FROM whatsapp_links 
      WHERE custom_slug = ${slug}
      LIMIT 1
    `;
    
    if (!link) {
      // إذا لم يوجد الرابط، عرض صفحة 404 مخصصة
      return res.status(404).send(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <title>الرابط غير موجود - WTSSHORT</title>
          <style>
            body { font-family: Arial; text-align: center; padding: 50px; background: #f8fafc; }
            .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; }
            .error { color: #ef4444; font-size: 3rem; margin-bottom: 20px; }
            h1 { color: #374151; margin-bottom: 15px; }
            p { color: #6b7280; margin-bottom: 30px; }
            .btn { background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error">🔗❌</div>
            <h1>الرابط غير موجود</h1>
            <p>عذراً، الرابط الذي تبحث عنه غير موجود أو تم حذفه.</p>
            <a href="/" class="btn">العودة للصفحة الرئيسية</a>
          </div>
        </body>
        </html>
      `);
    }
    
    // تسجيل النقرة وزيادة العداد
    await sql`
      UPDATE whatsapp_links 
      SET click_count = COALESCE(click_count, 0) + 1
      WHERE id = ${link.id}
    `;
    
    // التحويل إلى واتساب
    res.redirect(302, link.generated_link);
    
  } catch (error) {
    console.error('Short URL redirect error:', error);
    
    // صفحة خطأ مخصصة
    return res.status(500).send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>خطأ في الخادم - WTSSHORT</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 50px; background: #f8fafc; }
          .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; }
          .error { color: #ef4444; font-size: 3rem; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error">⚠️</div>
          <h1>حدث خطأ</h1>
          <p>عذراً، حدث خطأ في النظام. يرجى المحاولة مرة أخرى.</p>
        </div>
      </body>
      </html>
    `);
  }
}