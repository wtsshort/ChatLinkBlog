export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const stats = {
    totalLinks: 3,
    totalClicks: 1450,
    totalPosts: 2,
    totalViews: 850
  };

  res.status(200).json(stats);
}