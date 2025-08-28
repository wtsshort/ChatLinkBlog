// Simple storage for demonstration
const storage = {
  links: [
    {
      id: 'demo1',
      customSlug: 'demo',
      generatedLink: 'https://wa.me/966123456789?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%87%D9%84%D8%A7%D9%8B%20%D9%88%D8%B3%D9%87%D9%84%D8%A7%D9%8B%21',
      clickCount: 1523
    },
    {
      id: 'demo2', 
      customSlug: 'inquiry',
      generatedLink: 'https://wa.me/966987654321?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA',
      clickCount: 850
    }
  ]
};

exports.handler = async (event, context) => {
  try {
    const pathParts = event.path.split('/');
    const slug = pathParts[pathParts.length - 1];
    
    if (!slug) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Slug is required' })
      };
    }

    // Get the WhatsApp link by custom slug
    const link = storage.links.find(l => l.customSlug === slug);
    
    if (!link) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Link not found' })
      };
    }

    // Increment click count
    link.clickCount = (link.clickCount || 0) + 1;

    // Redirect to WhatsApp
    return {
      statusCode: 302,
      headers: {
        Location: link.generatedLink,
        'Cache-Control': 'no-cache'
      }
    };
    
  } catch (error) {
    console.error('Error in redirect function:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};