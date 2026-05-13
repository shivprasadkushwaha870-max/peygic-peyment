import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  const email = req.query.email || '';
  const name = req.query.name || '';

  const { data, error } = await resend.emails.send({

    from: 'SuperMind <onboarding@thesupermind.online>',

    to: [email],

    subject: 'Payment Successful',

    html: `

      <div style="font-family:Arial;padding:20px">

        <h2>
          Thank You ${name}
        </h2>

        <p>
          Aapka payment successful ho gaya hai.
        </p>

        <p>
          Product details aapke email par bhej di gayi hain.
        </p>

        <h3>
          Thank You ❤️
        </h3>

      </div>

    `,

  });

  if (error) {

    return res.status(400).json(error);

  }

  console.log(data);

  return res.redirect(
    'https://thesupermind.online/tq'
  );

}
