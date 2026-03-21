export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const JSONBIN_KEY = '$2a$10$fkPEWzfTALriuCYyeBvuvO0go4Uc13O/HWwhVaOAIohPjwCov7LQ.';

  try {
    const datos = req.body;
    
    const resp = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY,
        'X-Bin-Name': datos.codigo || 'ficha',
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify(datos)
    });

    const result = await resp.json();
    return res.status(200).json({ id: result.metadata.id });

  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
