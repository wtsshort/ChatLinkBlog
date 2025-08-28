# دليل رفع WTSSHORT على Netlify

## الطريقة الأولى: رفع مجلد dist المبني مسبقاً

### 1. تحميل ملفات البناء
```bash
# انسخ محتويات مجلد dist/public إلى جهازك
```

### 2. إعدادات Netlify
1. اذهب إلى [Netlify](https://www.netlify.com)
2. اسحب مجلد `dist/public` إلى Netlify
3. أو اختر "Deploy manually" ثم ارفع مجلد `dist/public`

### 3. إعدادات مهمة في Netlify
- **Build command**: اتركه فارغ (لأننا رفعنا ملفات مبنية مسبقاً)
- **Publish directory**: `/` (المجلد الجذر)
- **Redirects**: أضف ملف `_redirects` في المجلد

## الطريقة الثانية: ربط مع GitHub

### 1. ارفع الكود على GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

### 2. ربط Netlify مع GitHub
1. في Netlify اختر "New site from Git"
2. اختر GitHub repository
3. إعدادات البناء:
   - **Build command**: `cd client && npm run build`
   - **Publish directory**: `dist/public`
   - **Environment variables**: أضف GEMINI_API_KEY و DATABASE_URL

## متطلبات قاعدة البيانات

### استخدم Neon Database (مجاني)
1. سجل في [Neon](https://neon.tech)
2. أنشئ قاعدة بيانات جديدة
3. انسخ connection string
4. أضفه في Netlify Environment variables:
   - Key: `DATABASE_URL`
   - Value: `postgresql://username:password@host/database?sslmode=require`

## Environment Variables المطلوبة
```
DATABASE_URL=postgresql://...
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

## ملف _redirects (مهم لـ SPA)
أنشئ ملف `_redirects` في مجلد dist/public:
```
/*    /index.html   200
/s/*  /api/redirect/:splat  302
```

## تحسينات SEO للنشر
- تأكد من robots.txt
- تأكد من sitemap.xml  
- أضف Google Analytics
- أضف Google AdSense

## نصائح الأداء
- فعل "Asset optimization" في Netlify
- فعل "Pretty URLs"  
- فعل "HTTPS"
- أضف Custom domain إذا توفر

## استكشاف الأخطاء
- تحقق من Build logs في Netlify
- تأكد من Environment variables
- تحقق من اتصال قاعدة البيانات
- راجع Function logs للAPI errors