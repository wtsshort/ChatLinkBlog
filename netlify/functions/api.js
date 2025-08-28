const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Simple in-memory storage for Netlify
const storage = {
  links: [
    {
      id: 'demo1',
      phoneNumber: '+966123456789',
      message: 'مرحباً، أهلاً وسهلاً!',
      customSlug: 'demo',
      generatedLink: 'https://wa.me/966123456789?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%87%D9%84%D8%A7%D9%8B%20%D9%88%D8%B3%D9%87%D9%84%D8%A7%D9%8B%21',
      clickCount: 1523,
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo2',
      phoneNumber: '+966987654321',
      message: 'أريد الاستفسار عن الخدمات',
      customSlug: 'inquiry',
      generatedLink: 'https://wa.me/966987654321?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA',
      clickCount: 850,
      createdAt: new Date().toISOString()
    }
  ],
  posts: [
    {
      id: 'post1',
      title: 'كيفية استخدام WhatsApp Business لتنمية أعمالك',
      slug: 'whatsapp-business-guide',
      content: 'دليل شامل لاستخدام WhatsApp Business في التسويق الرقمي...',
      excerpt: 'تعرف على أفضل الطرق لاستخدام واتساب بيزنس لتنمية عملك',
      status: 'published',
      views: 1250,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'post2',
      title: '10 نصائح للتسويق عبر واتساب',
      slug: 'whatsapp-marketing-tips',
      content: 'نصائح مهمة وفعالة للتسويق عبر تطبيق واتساب...',
      excerpt: 'أهم النصائح لتسويق ناجح عبر واتساب',
      status: 'published',
      views: 980,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// CORS for Netlify
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API Routes
app.get('/api/stats', async (req, res) => {
  try {
    const totalLinks = storage.links.length;
    const totalClicks = storage.links.reduce((sum, link) => sum + (link.clickCount || 0), 0);
    const totalPosts = storage.posts.length;
    const totalViews = storage.posts.reduce((sum, post) => sum + (post.views || 0), 0);

    res.json({
      totalLinks,
      totalClicks,
      totalPosts,
      totalViews
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

// WhatsApp Links API
app.post('/api/whatsapp-links', async (req, res) => {
  try {
    const { phoneNumber, message, customSlug } = req.body;
    
    // Create WhatsApp link
    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = phoneNumber.replace(/[^+\d]/g, '');
    const generatedLink = `https://wa.me/${cleanNumber.replace('+', '')}?text=${encodedMessage}`;
    
    const newLink = {
      id: Date.now().toString(),
      phoneNumber,
      message,
      customSlug: customSlug || `link-${Date.now()}`,
      generatedLink,
      clickCount: 0,
      createdAt: new Date().toISOString()
    };
    
    storage.links.push(newLink);
    res.json(newLink);
  } catch (error) {
    console.error('Error creating WhatsApp link:', error);
    res.status(400).json({ message: 'Invalid link data' });
  }
});

app.get('/api/whatsapp-links', async (req, res) => {
  try {
    res.json(storage.links);
  } catch (error) {
    console.error('Error fetching WhatsApp links:', error);
    res.status(500).json({ message: 'Failed to fetch links' });
  }
});

app.post('/api/whatsapp-links/:id/click', async (req, res) => {
  try {
    const { id } = req.params;
    const link = storage.links.find(l => l.id === id);
    if (link) {
      link.clickCount = (link.clickCount || 0) + 1;
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error incrementing click count:', error);
    res.status(500).json({ message: 'Failed to record click' });
  }
});

app.delete('/api/whatsapp-links/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const index = storage.links.findIndex(l => l.id === id);
    if (index !== -1) {
      storage.links.splice(index, 1);
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting WhatsApp link:', error);
    res.status(500).json({ message: 'Failed to delete link' });
  }
});

// Blog Posts API
app.get('/api/blog-posts', async (req, res) => {
  try {
    res.json(storage.posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
});

app.get('/api/blog-posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = storage.posts.find(p => p.slug === slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.views = (post.views || 0) + 1;
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
});

// Convert Express app to serverless function
const handler = serverless(app);

module.exports = { handler };