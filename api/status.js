export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const PAYGIC_MID = 'MINDREADIN';
  const PAYGIC_PASSWORD = '6&nDDjc#ee#s';

  try {
    const { orderId } = req.body;
    
    const tokenRes = await fetch('https://server.paygic.in/api/v2/reseller/createResellerAuthToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rid: PAYGIC_MID, password: PAYGIC_PASSWORD }),
    });
    const tokenData = await tokenRes.json();
    const token = tokenData.data?.token;
    
    const statusRes = await fetch('https://server.paygic.in/api/v2/reseller/checkPaymentStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'token': token },
      body: JSON.stringify({ 
        rid: PAYGIC_MID, 
        mid: PAYGIC_MID, 
        merchantReferenceId: orderId 
      }),
    });
    
    const statusData = await statusRes.json();
    res.json(statusData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
