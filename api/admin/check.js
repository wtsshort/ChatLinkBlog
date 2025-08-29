// فحص حالة المصادقة - Serverless Function
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const authToken = req.headers.authorization || req.cookies?.admin_auth;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    const isAuthenticated = authToken === `Bearer ${adminPassword}` || authToken === adminPassword;
    
    res.json({ authenticated: isAuthenticated });
  } catch (error) {
    console.error('Auth check error:', error);
    res.json({ authenticated: false });
  }
}