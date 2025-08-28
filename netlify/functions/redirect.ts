import { Handler } from '@netlify/functions';
import { MemStorage } from '../../server/storage';

const storage = new MemStorage();

export const handler: Handler = async (event, context) => {
  try {
    const pathParts = event.path.split('/');
    const slug = pathParts[pathParts.length - 1];
    
    if (!slug) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Slug is required' })
      };
    }

    // Get the WhatsApp link by custom slug
    const link = await storage.getWhatsappLinkBySlug(slug);
    
    if (!link) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Link not found' })
      };
    }

    // Increment click count
    await storage.incrementClickCount(link.id);

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
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};