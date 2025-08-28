const links = [
  {
    id: '1',
    phoneNumber: '+966501234567',
    message: 'مرحباً! كيف يمكنني مساعدتك؟',
    customSlug: 'hello',
    generatedLink: 'https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B',
    clickCount: 750,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    phoneNumber: '+966509876543',
    message: 'أهلاً وسهلاً بكم في متجرنا',
    customSlug: 'store',
    generatedLink: 'https://wa.me/966509876543?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B',
    clickCount: 700,
    createdAt: new Date().toISOString()
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(links);
    return;
  }

  if (req.method === 'POST') {
    try {
      const { phoneNumber, message, customSlug } = req.body;
      const newLink = {
        id: Date.now().toString(),
        phoneNumber,
        message,
        customSlug: customSlug || `link-${Date.now()}`,
        generatedLink: `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`,
        clickCount: 0,
        createdAt: new Date().toISOString()
      };
      
      links.push(newLink);
      res.status(200).json(newLink);
    } catch (error) {
      res.status(400).json({ message: 'Invalid data' });
    }
    return;
  }

  res.status(405).json({ message: 'Method not allowed' });
}