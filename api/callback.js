export default async function handler(req, res) {

  try {

    const email = req.query.email || '';
    const name = req.query.name || '';

    const response = await fetch(
      'https://api.resend.com/emails',
      {

        method: 'POST',

        headers: {

          'Authorization':
            `Bearer ${process.env.RESEND_API_KEY}`,

          'Content-Type': 'application/json'

        },

        body: JSON.stringify({

          from: 'onboarding@resend.dev',

          to: email,

          subject: 'Payment Successful',

          html: `
            <h1>Thank You ${name}</h1>
            <p>Payment successful.</p>
          `

        })

      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({

      error: error.message

    });

  }

}
