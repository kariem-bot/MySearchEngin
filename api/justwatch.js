// Vercel Serverless Function (/api/justwatch)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const response = await fetch('https://apis.justwatch.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) StreamRadar/2.0'
      },
      body
    });
    const data = await response.text();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(response.status).send(data);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
