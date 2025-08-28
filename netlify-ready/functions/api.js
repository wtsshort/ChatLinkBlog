exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  // Simple data
  const data = {
    totalLinks: 2,
    totalClicks: 1450,
    totalPosts: 2,
    totalViews: 850,
    links: [
      {
        id: '1',
        phoneNumber: '+966501234567',
        message: 'مرحباً! كيف يمكنني مساعدتك؟',
        customSlug: 'hello',
        generatedLink: 'https://wa.me/966501234567?text=مرحباً',
        clickCount: 750,
        createdAt: new Date().toISOString()
      }
    ],
    posts: [
      {
        id: '1',
        title: 'دليل استخدام واتساب للأعمال',
        slug: 'whatsapp-guide',
        content: 'دليل شامل لاستخدام واتساب في الأعمال',
        excerpt: 'تعلم كيفية استخدام واتساب بيزنس',
        status: 'published',
        views: 450,
        createdAt: new Date().toISOString()
      }
    ]
  };

  try {
    if (event.path.includes('/stats')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          totalLinks: data.totalLinks,
          totalClicks: data.totalClicks,
          totalPosts: data.totalPosts,
          totalViews: data.totalViews
        })
      };
    }

    if (event.path.includes('/whatsapp-links')) {
      if (event.httpMethod === 'GET') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data.links)
        };
      }
      
      if (event.httpMethod === 'POST') {
        const newLink = JSON.parse(event.body);
        const link = {
          id: Date.now().toString(),
          phoneNumber: newLink.phoneNumber,
          message: newLink.message,
          customSlug: newLink.customSlug || 'new-link',
          generatedLink: `https://wa.me/${newLink.phoneNumber.replace('+', '')}?text=${encodeURIComponent(newLink.message)}`,
          clickCount: 0,
          createdAt: new Date().toISOString()
        };
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(link)
        };
      }
    }

    if (event.path.includes('/blog-posts')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data.posts)
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ message: 'Not found' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Server error' })
    };
  }
};