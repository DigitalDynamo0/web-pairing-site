export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // UPDATED: New panel URL - node.1.prexzyvilla.site:2046
    const response = await fetch('http://node.1.prexzyvilla.site:2046/status');
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to connect to WhatsApp bot' });
  }
}