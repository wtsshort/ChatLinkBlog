// تسجيل دخول الإدارة - Serverless Function
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    
    if (password === adminPassword) {
      // إعداد كوكي للمصادقة
      res.setHeader('Set-Cookie', [
        `admin_auth=${adminPassword}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${
          process.env.NODE_ENV === 'production' ? '; Secure' : ''
        }`
      ]);
      
      res.json({ 
        success: true, 
        token: adminPassword,
        message: 'تم تسجيل الدخول بنجاح'
      });
    } else {
      res.status(401).json({ 
        message: 'كلمة مرور خاطئة',
        success: false 
      });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'خطأ في النظام' });
  }
}