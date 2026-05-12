export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const PAYGIC_PASSWORD = '6&nDDjc#ee#s';
  const RID_CANDIDATES = ['MINDREADIN', 'PAYGIC', 'ADMIN', 'RESELLER', 'MERCHANT', 'DEFAULT'];

  for (const rid of RID_CANDIDATES) {
    try {
      const response = await fetch('https://server.paygic.in/api/v2/reseller/createResellerAuthToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rid, password: PAYGIC_PASSWORD }),
      });
      const data = await response.json();
      if (data.status === true) {
        return res.json({ found: true, rid, message: 'RID detected!' });
      }
    } catch (e) {}
  }
  
  res.json({ found: false, message: 'No RID found' });
}
