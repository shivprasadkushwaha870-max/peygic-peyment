// callback.js - YE BHEJE EMAIL AUR REDIRECT KARE
export default async function handler(req, res) {
  const { orderId, email } = req.query;
  
  // Email bhejo
  if (email && email.includes('@')) {
    await fetch('https://api.resend.com/emails', { ... });
  }
  
  // Thank You page par redirect
  res.setHeader('Location', `https://thesupermind.online/tq/?orderId=${orderId}`);
  res.status(302).end();
}
