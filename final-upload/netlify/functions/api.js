// Very simple API that works on Netlify
exports.handler = (event, context) => {
  console.log('API called:', event.path, event.httpMethod);
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  // Simple test data
  const stats = {
    totalLinks: 3,
    totalClicks: 1250,
    totalPosts: 2,
    totalViews: 980
  };

  const links = [
    {
      id: '1',
      phoneNumber: '+966501234567',
      message: 'مرحباً بك! كيف يمكنني مساعدتك؟',
      customSlug: 'hello',
      generatedLink: 'https://wa.me/966501234567?text=مرحباً',
      clickCount: 650
    },
    {
      id: '2', 
      phoneNumber: '+966509876543',
      message: 'أهلاً وسهلاً بكم في متجرنا',
      customSlug: 'store',
      generatedLink: 'https://wa.me/966509876543?text=مرحباً',
      clickCount: 600
    }
  ];

  try {
    if (event.path.includes('stats') || event.queryStringParameters?.endpoint === 'stats') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(stats)
      };
    }

    if (event.path.includes('whatsapp-links') || event.queryStringParameters?.endpoint === 'links') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(links)
      };
    }

    if (event.path.includes('blog-posts') || event.queryStringParameters?.endpoint === 'posts') {
      const posts = [
        {
          id: '1',
          title: 'دليل واتساب للأعمال',
          slug: 'whatsapp-guide',
          content: 'دليل شامل',
          views: 500
        }
      ];
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(posts)
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'WTSSHORT API Working', stats, links })
    };

  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ error: 'Something went wrong', stats, links })
    };
  }
};