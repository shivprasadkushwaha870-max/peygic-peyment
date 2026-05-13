export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { customer_name, customer_email, customer_mobile } = req.body;
    const orderId = `COURSE_${Date.now()}`;

    // Email ko body se lein (jo form se aa raha hai)
    const customerEmail = customer_email || '';

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
    
    if (!tokenData.status || !tokenData.data || !tokenData.data.token) {
      return res.status(500).json({ error: 'Token failed: ' + (tokenData.msg || 'Unknown') });
    }
    
    const token = tokenData.data.token;

    // Step 2: Create Payment Page
    const callbackUrl = `https://peygic-payment.vercel.app/api/callback?orderId=${orderId}&email=${encodeURIComponent(customerEmail)}`;
    
    const payRes = await fetch('https://server.paygic.in/api/v2/createPaymentPage', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        mid: 'MINDREADIN',
        merchantReferenceId: orderId,
        amount: '4.00',
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
