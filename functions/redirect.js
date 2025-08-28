const links = [
  {
    customSlug: 'hello',
    generatedLink: 'https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%21%20%D9%83%D9%8A%D9%81%20%D9%8A%D9%85%D9%83%D9%86%D9%86%D9%8A%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%AA%D9%83%D8%9F'
  },
  {
    customSlug: 'store',
    generatedLink: 'https://wa.me/966509876543?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%20%D9%88%D8%B3%D9%87%D9%84%D8%A7%D9%8B%20%D8%A8%D9%83%D9%85%20%D9%81%D9%8A%20%D9%85%D8%AA%D8%AC%D8%B1%D9%86%D8%A7'
  }
];

exports.handler = async (event, context) => {
  try {
    const slug = event.path.split('/').pop();
    
    if (!slug || slug === 's') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Slug required' })
      };
    }

    const link = links.find(l => l.customSlug === slug);
    
    if (!link) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/html' },
        body: `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>الرابط غير موجود - WTSSHORT</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
    .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #25D366; margin-bottom: 20px; }
    p { color: #666; line-height: 1.6; }
    a { color: #25D366; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>عذراً، الرابط غير موجود</h1>
    <p>الرابط المطلوب غير متوفر أو قد يكون قد انتهت صلاحيته.</p>
    <p><a href="/">العودة للصفحة الرئيسية</a></p>
  </div>
</body>
</html>`
      };
    }

    return {
      statusCode: 302,
      headers: {
        'Location': link.generatedLink,
        'Cache-Control': 'no-cache'
      }
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Server error' })
    };
  }
};