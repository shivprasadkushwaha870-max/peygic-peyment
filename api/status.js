export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { orderId } = req.body;

    // Get Token
    const tokenRes = await fetch('https://server.paygic.in/api/v3/createMerchantToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mid: 'MINDREADIN',
        password: 'abcde@864',
        expiry: false
      }),
    });
    
    const tokenData = await tokenRes.json();
    const token = tokenData.data?.token;

    // Check Status
    const statusRes = await fetch('https://server.paygic.in/api/v2/checkPaymentStatus', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        mid: 'MINDREADIN',
        merchantReferenceId: orderId,
      }),
    });

    const statusData = await statusRes.json();
    res.json(statusData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
