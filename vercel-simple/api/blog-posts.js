const posts = [
  {
    id: '1',
    title: 'دليل واتساب للأعمال',
    slug: 'whatsapp-business-guide',
    content: 'واتساب بيزنس هو تطبيق مجاني ومخصص للشركات الصغيرة والمتوسطة...',
    excerpt: 'تعلم كيفية استخدام واتساب بيزنس لتنمية عملك',
    status: 'published',
    views: 650,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'نصائح التسويق عبر واتساب',
    slug: 'whatsapp-marketing-tips',
    content: 'التسويق عبر واتساب يتطلب استراتيجية محددة...',
    excerpt: 'أفضل الطرق للتسويق الفعال عبر واتساب',
    status: 'published',
    views: 480,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json(posts);
}