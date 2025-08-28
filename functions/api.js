// Simple API for WTSSHORT
const data = {
  links: [
    {
      id: '1',
      phoneNumber: '+966501234567',
      message: 'مرحباً! كيف يمكنني مساعدتك؟',
      customSlug: 'hello',
      generatedLink: 'https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%21%20%D9%83%D9%8A%D9%81%20%D9%8A%D9%85%D9%83%D9%86%D9%86%D9%8A%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%AA%D9%83%D8%9F',
      clickCount: 1250,
      createdAt: '2024-08-28T10:00:00.000Z'
    },
    {
      id: '2',
      phoneNumber: '+966509876543',
      message: 'أهلاً وسهلاً بكم في متجرنا',
      customSlug: 'store',
      generatedLink: 'https://wa.me/966509876543?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%20%D9%88%D8%B3%D9%87%D9%84%D8%A7%D9%8B%20%D8%A8%D9%83%D9%85%20%D9%81%D9%8A%20%D9%85%D8%AA%D8%AC%D8%B1%D9%86%D8%A7',
      clickCount: 890,
      createdAt: '2024-08-28T11:30:00.000Z'
    }
  ],
  posts: [
    {
      id: '1',
      title: 'دليل استخدام واتساب للأعمال',
      slug: 'whatsapp-business-guide',
      content: 'واتساب بيزنس هو تطبيق مجاني ومخصص للشركات الصغيرة والمتوسطة. يوفر أدوات قوية للتواصل مع العملاء وإدارة الرسائل بكفاءة عالية.',
      excerpt: 'تعلم كيفية استخدام واتساب بيزنس لتنمية عملك',
      status: 'published',
      views: 1450,
      createdAt: '2024-08-25T09:00:00.000Z',
      updatedAt: '2024-08-28T12:00:00.000Z'
    },
    {
      id: '2',
      title: 'أفضل ممارسات التسويق عبر واتساب',
      slug: 'whatsapp-marketing-best-practices',
      content: 'التسويق عبر واتساب يتطلب استراتيجية محددة وخطة واضحة. من المهم احترام خصوصية العملاء وتقديم محتوى مفيد وذو قيمة.',
      excerpt: 'استراتيجيات فعالة للتسويق عبر واتساب',
      status: 'published',
      views: 980,
      createdAt: '2024-08-26T14:30:00.000Z',
      updatedAt: '2024-08-28T10:15:00.000Z'
    }
  ]
};

exports.handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Stats endpoint
    if (path.endsWith('/stats') && httpMethod === 'GET') {
      const totalLinks = data.links.length;
      const totalClicks = data.links.reduce((sum, link) => sum + link.clickCount, 0);
      const totalPosts = data.posts.length;
      const totalViews = data.posts.reduce((sum, post) => sum + post.views, 0);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          totalLinks,
          totalClicks,
          totalPosts,
          totalViews
        })
      };
    }

    // WhatsApp links endpoints
    if (path.includes('whatsapp-links')) {
      if (httpMethod === 'GET') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data.links)
        };
      }

      if (httpMethod === 'POST') {
        const newLink = JSON.parse(body);
        const id = Date.now().toString();
        const encodedMessage = encodeURIComponent(newLink.message);
        const cleanNumber = newLink.phoneNumber.replace(/[^+\d]/g, '').replace('+', '');
        
        const link = {
          id,
          phoneNumber: newLink.phoneNumber,
          message: newLink.message,
          customSlug: newLink.customSlug || `link-${id}`,
          generatedLink: `https://wa.me/${cleanNumber}?text=${encodedMessage}`,
          clickCount: 0,
          createdAt: new Date().toISOString()
        };
        
        data.links.push(link);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(link)
        };
      }
    }

    // Blog posts endpoints
    if (path.includes('blog-posts')) {
      if (httpMethod === 'GET') {
        const segments = path.split('/');
        const slug = segments[segments.length - 1];
        
        // Single post by slug
        if (slug && slug !== 'blog-posts') {
          const post = data.posts.find(p => p.slug === slug);
          if (post) {
            post.views++;
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify(post)
            };
          } else {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ message: 'Post not found' })
            };
          }
        }
        
        // All posts
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data.posts)
        };
      }
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
      body: JSON.stringify({ message: 'Server error', error: error.message })
    };
  }
};