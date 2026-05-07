export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone } = req.body;

  const SECRET = 'RYDER_MD_SECRET_2026_7X9kLmNpQwRtYz';

  if (!phone) {
    return res.status(400).json({ error: 'Missing phone number' });
  }

  console.log('📡 Phone:', phone);

  try {
    // UPDATED: New panel URL - node.1.prexzyvilla.site:2046
    const response = await fetch('http://node.1.prexzyvilla.site:2046/request-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, secret: SECRET }),
    });

    const data = await response.json();
    console.log('📡 Response status:', response.status);
    console.log('📡 Response data:', data);
    
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to connect to WhatsApp bot' });
  }
}