export default async function handler(req, res) {
  const { orderId, email } = req.query;  // email bhi lein
  
  // Email bhejne ka code
  if (email && email.includes('@')) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
          to: email,
          subject: '✅ Payment Successful - The Super Mind',
          html: `<div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #667eea;">🎉 Thank You!</h2>
            <p>Aapka payment successful ho gaya.</p>
            <div style="background: #f0f4ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Status:</strong> ✅ SUCCESS</p>
            </div>
          </div>`,
        }),
      });
    } catch (err) {
      console.error('Email error:', err);
    }
  }
  
  // Thank You page par redirect
  res.setHeader('Location', `https://thesupermind.online/tq/?orderId=${orderId || ''}`);
  res.status(302).end();
}
