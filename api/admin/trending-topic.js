// إنشاء مواضيع ترندي عشوائية للمقالات
const trendingTopics = [
  'أفضل أدوات الذكاء الاصطناعي للأعمال 2025',
  'كيفية استخدام ChatGPT لزيادة الإنتاجية', 
  'مستقبل التجارة الإلكترونية مع الذكاء الاصطناعي',
  'استراتيجيات التسويق عبر وسائل التواصل الاجتماعي 2025',
  'كيفية تحسين موقعك لمحركات البحث SEO',
  'كيفية بدء مشروع تجاري ناجح من الصفر',
  'أفضل طرق الربح من الإنترنت 2025',
  'تحسين الصحة النفسية والتخلص من التوتر',
  'أفضل المهارات المطلوبة في سوق العمل 2025'
];

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // التحقق من المصادقة
    const authToken = req.headers.authorization || req.cookies?.admin_auth;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (!authToken || (authToken !== `Bearer ${adminPassword}` && authToken !== adminPassword)) {
      return res.status(401).json({ message: 'Unauthorized - Admin access required' });
    }

    // إختيار موضوع عشوائي
    const randomIndex = Math.floor(Math.random() * trendingTopics.length);
    const topic = trendingTopics[randomIndex];
    
    res.json({ topic });
  } catch (error) {
    console.error('Error getting trending topic:', error);
    res.status(500).json({ message: 'Failed to get trending topic' });
  }
}