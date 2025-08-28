import { Handler } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';
import cookieParser from 'cookie-parser';
import { MemStorage } from '../../server/storage';

const app = express();

// Initialize storage
const storage = new MemStorage();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());

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

// API Routes (simplified for Netlify Functions)
app.get('/api/stats', async (req, res) => {
  try {
    const links = await storage.getAllWhatsappLinks();
    const posts = await storage.getAllBlogPosts();
    
    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, link) => sum + (link.clickCount || 0), 0);
    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

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
    const link = await storage.createWhatsappLink(req.body);
    res.json(link);
  } catch (error) {
    console.error('Error creating WhatsApp link:', error);
    res.status(400).json({ message: 'Invalid link data' });
  }
});

app.get('/api/whatsapp-links', async (req, res) => {
  try {
    const links = await storage.getAllWhatsappLinks();
    res.json(links);
  } catch (error) {
    console.error('Error fetching WhatsApp links:', error);
    res.status(500).json({ message: 'Failed to fetch links' });
  }
});

app.post('/api/whatsapp-links/:id/click', async (req, res) => {
  try {
    const { id } = req.params;
    await storage.incrementClickCount(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error incrementing click count:', error);
    res.status(500).json({ message: 'Failed to record click' });
  }
});

app.delete('/api/whatsapp-links/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await storage.deleteWhatsappLink(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting WhatsApp link:', error);
    res.status(500).json({ message: 'Failed to delete link' });
  }
});

// Blog Posts API
app.get('/api/blog-posts', async (req, res) => {
  try {
    const posts = await storage.getAllBlogPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
});

app.get('/api/blog-posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await storage.getBlogPostBySlug(slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    await storage.incrementBlogPostViews(post.id);
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
});

// Convert Express app to serverless function
const handler = serverless(app);

export { handler };