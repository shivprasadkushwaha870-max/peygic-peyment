import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  const email = req.query.email || '';
  const name = req.query.name || '';

const { data, error } = await resend.emails.send({

  from: 'SuperMind <support@thesupermind.online>',

  to: [email],

  subject: '🌟 Welcome to the Memory Boost & Telepathy Course! 🌟',

  text: `🌟 Welcome to the Memory Boost & Telepathy Course! 🌟

Congratulations and a warm welcome!

You have successfully enrolled in our Memory Enhancement + Telepathy & Mind Reading Course.

You haven’t just joined a course — you have taken the first powerful step toward unlocking the hidden potential of your mind.

In this course, you will learn:

🧠 Powerful techniques to improve memory and focus

🔮 Telepathy concepts explained step by step

🎤 Confidence building, performance skills & stage presence

Course link:
https://drive.google.com/file/d/1hLxX4pn_HzHTXTyKufCgUIAW66vqqlxi/view?usp=drivesdk

Alpha Brain Waves' Instantly:
https://drive.google.com/file/d/1ph1zM-1Dmng37BHD_pR-a1FDvKQzRueI/view?usp=drivesdk

Bonus:
https://drive.google.com/drive/folders/1PkZ9nQ_mF0bxcV9bdO2ym-K3yAnCiw6r

✨ Practical methods used by professional mentalists

Each lesson is designed to be simple, practical, and result-oriented.

Practice regularly, trust the process, and you will see real transformation.

👉 Remember:
A trained mind can achieve what an ordinary mind cannot.

We’re excited to have you on this journey.

Welcome once again, and let the mind magic begin! 🚀

Thankyou

THesuper mind team

WhatsApp no. 7400933412

Email:
shivprasadkushwaha870@gmail.com`

});

  if (error) {

    return res.status(400).json(error);

  }

  console.log(data);

  return res.redirect(
    'https://thesupermind.online/tq'
  );

}
