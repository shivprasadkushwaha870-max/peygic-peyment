export default async function handler(req, res) {
  const { orderId } = req.query;
  
  // Redirect to thank you page
  res.setHeader('Location', `https://thesupermind.online/tq/?orderId=${orderId || ''}`);
  res.status(302).end();
}
