import type { Request, Response, NextFunction } from 'express';

// نظام حماية بسيط للمدونة الشخصية
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // يفضل تغييره في متغيرات البيئة

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization || req.cookies?.admin_auth;
  
  if (authToken === `Bearer ${ADMIN_PASSWORD}` || authToken === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized - Admin access required' });
  }
}

export function loginAdmin(req: Request, res: Response) {
  const { password } = req.body;
  
  if (password === ADMIN_PASSWORD) {
    // إعداد كوكي للمصادقة
    res.cookie('admin_auth', ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // أسبوع
    });
    
    res.json({ success: true, token: ADMIN_PASSWORD });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
}

export function logoutAdmin(req: Request, res: Response) {
  res.clearCookie('admin_auth');
  res.json({ success: true });
}

export function checkAuth(req: Request, res: Response) {
  const authToken = req.headers.authorization || req.cookies?.admin_auth;
  const isAuthenticated = authToken === `Bearer ${ADMIN_PASSWORD}` || authToken === ADMIN_PASSWORD;
  
  res.json({ authenticated: isAuthenticated });
}