export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const PAYGIC_MID = 'MINDREADIN';
  const PAYGIC_PASSWORD = '6&nDDjc#ee#s';

  try {
    const { amount, customer_name, customer_email, customer_mobile } = req.body;
    const orderId = `ORD_${Date.now()}`;
    
    // Get token
    const tokenRes = await fetch('https://server.paygic.in/api/v2/reseller/createResellerAuthToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rid: PAYGIC_MID, password: PAYGIC_PASSWORD }),
    });
    const tokenData = await tokenRes.json();
    const token = tokenData.data?.token;
    
    // Create payment
    const payRes = await fetch('https://server.paygic.in/api/v2/reseller/createPaymentRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'token': token },
      body: JSON.stringify({
        rid: PAYGIC_MID,
        mid: PAYGIC_MID,
        amount,
        merchantReferenceId: orderId,
        customer_name,
        customer_email,
        customer_mobile
      }),
    });
    
    const payData = await payRes.json();
    res.json({ ...payData, orderId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
