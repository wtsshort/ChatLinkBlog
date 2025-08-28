exports.handler = async (event, context) => {
  try {
    const slug = event.path.split('/').pop();
    
    // Simple redirect data
    const redirects = {
      'hello': 'https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B',
      'support': 'https://wa.me/966509876543?text=%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%A9'
    };
    
    if (redirects[slug]) {
      return {
        statusCode: 302,
        headers: {
          'Location': redirects[slug],
          'Cache-Control': 'no-cache'
        }
      };
    }
    
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'text/html' },
      body: `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>الرابط غير موجود</title>
  <style>
    body { font-family: Arial; text-align: center; padding: 50px; }
    .container { max-width: 400px; margin: 0 auto; }
    h1 { color: #25D366; }
  </style>
</head>
<body>
  <div class="container">
    <h1>عذراً، الرابط غير موجود</h1>
    <p><a href="/">العودة للصفحة الرئيسية</a></p>
  </div>
</body>
</html>`
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'خطأ في الخادم' })
    };
  }
};