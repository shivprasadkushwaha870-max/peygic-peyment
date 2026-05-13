export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;
  console.log('Webhook received:', data);

  const status = data.txnStatus || data.status;
  if (status !== 'SUCCESS') {
    return res.json({ received: true, status: 'not_success' });
  }

  const customerEmail = data.data?.payerEmail || data.email;
  const customerName = data.data?.payerName || 'Customer';
  const amount = data.data?.amount || data.amount;
  const orderId = data.data?.orderId || data.orderId;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to: customerEmail,
        subject: `✅ Payment Successful - Order #${orderId}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #667eea;">🎉 Thank You ${customerName}!</h2>
            <p>Aapka payment successful ho gaya.</p>
            <div style="background: #f0f4ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>Amount:</strong> ₹${amount}</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Status:</strong> ✅ SUCCESS</p>
            </div>
            <p>Aapko jald hi product details milengi!</p>
            <p style="color: #888; margin-top: 30px;">The Super Mind Team</p>
          </div>
        `,
      }),
    });

    return res.json({ success: true, message: 'Email sent!' });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: err.message });
  }
}
