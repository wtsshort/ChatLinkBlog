# 🚀 تعليمات نشر WTSSHORT الكامل

## 📋 **خطوات النشر الصحيحة:**

### 1️⃣ إعداد قاعدة البيانات (Neon PostgreSQL)
```bash
# انتقل إلى: https://console.neon.tech/signup
# إنشاء حساب مجاني
# إنشاء مشروع جديد → احصل على DATABASE_URL
```

### 2️⃣ نشر على Vercel
```bash
# في terminal:
cd your-project
vercel login
vercel --prod

# إعداد المتغيرات في Vercel Dashboard:
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
GOOGLE_AI_API_KEY=your_google_ai_key
OPENAI_API_KEY=your_openai_key  
ADMIN_PASSWORD=your_secure_password
```

### 3️⃣ إنشاء الجداول في قاعدة البيانات
```sql
-- تشغيل في Neon SQL Editor:
CREATE TABLE whatsapp_links (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100),
  phone_number VARCHAR(20) NOT NULL,
  message TEXT,
  generated_link TEXT NOT NULL,
  custom_slug VARCHAR(50) UNIQUE,
  short_url VARCHAR(100),
  click_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP,
  is_protected BOOLEAN DEFAULT FALSE,
  password VARCHAR(255),
  tags TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  author VARCHAR(100),
  category VARCHAR(50),
  status VARCHAR(20) DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  featured_image TEXT,
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  keywords TEXT,
  og_title VARCHAR(70),
  og_description VARCHAR(160),
  focus_keyword VARCHAR(100),
  language VARCHAR(5) DEFAULT 'ar',
  reading_time INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## ✅ **ملفات جاهزة للنشر:**
- `api/` - جميع serverless functions
- `dist/public/` - frontend مبني
- `vercel.json` - إعدادات صحيحة
- `package-vercel.json` - dependencies مبسطة

## 🔧 **المميزات المتوفرة:**
✅ مولد روابط واتساب  
✅ تحليلات ونقرات  
✅ مدونة كاملة  
✅ Admin panel مع AI  
✅ دعم العربية والإنجليزية  
✅ تصميم responsive  

## 🌐 **رابط النشر:**
بعد النشر سيعمل على: `your-project.vercel.app`

## ⚠️ **ملاحظات مهمة:**
- تأكد من إعداد DATABASE_URL في Vercel
- جميع AI APIs يجب أن تكون متاحة
- كلمة مرور الإدارة: استخدم ADMIN_PASSWORD قوية