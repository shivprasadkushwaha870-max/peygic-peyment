export default async function handler(req, res) {
  const { orderId, txn_id } = req.query;
  
  // Redirect to success page with order details
  res.redirect(`/success.html?orderId=${orderId}&txnId=${txn_id || ''}`);
}
