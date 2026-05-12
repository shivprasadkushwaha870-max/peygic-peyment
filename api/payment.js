export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { amount, customer_name, customer_email, customer_mobile } = req.body;
    const orderId = `ORD_${Date.now()}`;

    // Step 1: Get Token
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
    
    if (!tokenData.status || !tokenData.data?.token) {
      return res.status(500).json({ error: 'Token generation failed: ' + (tokenData.msg || 'Unknown') });
    }
    
    const token = tokenData.data.token;

    // Step 2: Create Payment Page
    const callbackUrl = `https://peygic-payment.vercel.app/api/callback?orderId=${orderId}`;
    
    const payRes = await fetch('https://server.paygic.in/api/v2/createPaymentPage', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        mid: 'MINDREADIN',
        merchantReferenceId: orderId,
        amount: parseFloat(amount).toFixed(2),
        customer_mobile: customer_mobile,
        customer_name: customer_name,
        customer_email: customer_email,
        redirect_URL: callbackUrl,
        failed_URL: callbackUrl,
      }),
    });

    const payData = await payRes.json();
    res.json({ ...payData, orderId });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
