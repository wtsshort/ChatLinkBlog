// إدارة مقالات المدونة - Serverless Function
import { neon } from '@neondatabase/serverless';

// دالة توليد slug من العنوان
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[أ-ي]/g, (match) => {
      const arabicMap = {
        'أ': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh',
        'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's',
        'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q',
        'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y'
      };
      return arabicMap[match] || match;
    })
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    if (req.method === 'GET') {
      // جلب جميع المقالات المنشورة
      const posts = await sql`
        SELECT * FROM blog_posts 
        WHERE status = 'published'
        ORDER BY created_at DESC
      `;
      return res.json(posts);
    }
    
    if (req.method === 'POST') {
      // إنشاء مقال جديد
      const { title, content, excerpt, author, category, language = 'ar' } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
      
      const slug = generateSlug(title);
      const readingTime = Math.ceil(content.split(' ').length / 200);
      
      const [post] = await sql`
        INSERT INTO blog_posts 
        (title, slug, content, excerpt, author, category, language, reading_time, status)
        VALUES (
          ${title},
          ${slug},
          ${content},
          ${excerpt || ''},
          ${author || 'المحرر'},
          ${category || 'عام'},
          ${language},
          ${readingTime},
          'published'
        )
        RETURNING *
      `;
      
      return res.json(post);
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Blog Posts API Error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}