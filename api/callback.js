export default async function handler(req, res) {

  const email = req.query.email || '';
  const name = req.query.name || '';

  return res.send(`
    <h1>Payment Success</h1>
    <p>Email: ${email}</p>
    <p>Name: ${name}</p>
    <script>
      window.location.href = "https://thesupermind.online/tq";
    </script>
  `);

}
