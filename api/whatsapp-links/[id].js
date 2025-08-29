// إدارة رابط واتساب محدد - Serverless Function
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    if (req.method === 'POST' && req.url.includes('/click')) {
      // زيادة عداد النقرات
      await sql`
        UPDATE whatsapp_links 
        SET click_count = COALESCE(click_count, 0) + 1
        WHERE id = ${id}
      `;
      return res.json({ success: true });
    }
    
    if (req.method === 'DELETE') {
      // حذف الرابط
      await sql`DELETE FROM whatsapp_links WHERE id = ${id}`;
      return res.json({ success: true });
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('WhatsApp Link Operation Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}