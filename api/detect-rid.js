export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const PAYGIC_PASSWORD = 'abcde@864';  // ← YE CORRECT PASSWORD HAI
  const PAYGIC_MID = 'MINDREADIN';
  
  // Try MID as RID first
  try {
    const response = await fetch('https://server.paygic.in/api/v2/reseller/createResellerAuthToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rid: PAYGIC_MID, password: PAYGIC_PASSWORD }),
    });
    const data = await response.json();
    if (data.status === true) {
      return res.json({ found: true, rid: PAYGIC_MID, message: 'RID = MID detected!' });
    }
  } catch (e) {}
  
  res.json({ found: false, message: 'No RID found' });
}
