// إدارة روابط واتساب - Serverless Function
import { neon } from '@neondatabase/serverless';

// مخطط التحقق من صحة البيانات
const validateWhatsAppLink = (data) => {
  if (!data.phoneNumber || !data.message) {
    throw new Error('Phone number and message are required');
  }
  
  // تنظيف رقم الهاتف
  const cleanNumber = data.phoneNumber.replace(/[^+\d]/g, '');
  if (!cleanNumber.startsWith('+') || cleanNumber.length < 10) {
    throw new Error('Invalid phone number format');
  }
  
  return {
    phoneNumber: cleanNumber,
    message: data.message,
    title: data.title || '',
    customSlug: data.customSlug || null,
    tags: data.tags || null
  };
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    if (req.method === 'GET') {
      // جلب جميع الروابط
      const links = await sql`
        SELECT * FROM whatsapp_links 
        ORDER BY created_at DESC
      `;
      return res.json(links);
    }
    
    if (req.method === 'POST') {
      // إنشاء رابط جديد
      const validatedData = validateWhatsAppLink(req.body);
      
      // إنشاء رابط واتساب
      const encodedMessage = encodeURIComponent(validatedData.message);
      const cleanNumber = validatedData.phoneNumber.replace('+', '');
      const generatedLink = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
      
      // حفظ في قاعدة البيانات
      const [link] = await sql`
        INSERT INTO whatsapp_links 
        (title, phone_number, message, generated_link, custom_slug, tags)
        VALUES (
          ${validatedData.title},
          ${validatedData.phoneNumber},
          ${validatedData.message},
          ${generatedLink},
          ${validatedData.customSlug},
          ${validatedData.tags}
        )
        RETURNING *
      `;
      
      return res.json(link);
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('WhatsApp Links API Error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}