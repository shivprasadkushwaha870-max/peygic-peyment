import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  const email = req.query.email || '';
  const name = req.query.name || '';

  const { data, error } = await resend.emails.send({

    from: 'SuperMind <onboarding@thesupermind.online>',

    to: [email],

    subject: '🌟 Welcome to the Memory Boost & Telepathy Course! 🌟',

    html: `

      <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">  <div style="max-width:650px;margin:auto;background:white;padding:35px;border-radius:12px;"><h1 style="text-align:center;color:#111;">
  🌟 Welcome to the Memory Boost & Telepathy Course! 🌟
</h1>

<p style="font-size:16px;color:#333;">
  Congratulations and a warm welcome!
</p>

<p style="font-size:16px;color:#333;">
  You have successfully enrolled in our
  <strong>Memory Enhancement + Telepathy & Mind Reading Course.</strong>
</p>

<p style="font-size:16px;color:#333;line-height:1.8;">
  You haven’t just joined a course —
  you have taken the first powerful step toward unlocking
  the hidden potential of your mind.
</p>

<h2 style="margin-top:30px;color:#111;">
  In this course, you will learn:
</h2>

<ul style="font-size:16px;color:#444;line-height:1.9;">

  <li>🧠 Powerful techniques to improve memory and focus</li>

  <li>🔮 Telepathy concepts explained step by step</li>

  <li>🎤 Confidence building, performance skills & stage presence</li>

  <li>✨ Practical methods used by professional mentalists</li>

</ul>

<div style="margin-top:35px;">

  <a
    href="https://drive.google.com/file/d/1hLxX4pn_HzHTXTyKufCgUIAW66vqqlxi/view?usp=drivesdk"
    style="
      display:inline-block;
      background:#111;
      color:white;
      padding:14px 22px;
      text-decoration:none;
      border-radius:8px;
      margin-bottom:15px;
    "
  >
    📘 Open Course
  </a>

  <br><br>

  <a
    href="https://drive.google.com/file/d/1ph1zM-1Dmng37BHD_pR-a1FDvKQzRueI/view?usp=drivesdk"
    style="
      display:inline-block;
      background:#444;
      color:white;
      padding:14px 22px;
      text-decoration:none;
      border-radius:8px;
      margin-bottom:15px;
    "
  >
    🎧 Alpha Brain Waves Instantly
  </a>

  <br><br>

  <a
    href="https://drive.google.com/drive/folders/1PkZ9nQ_mF0bxcV9bdO2ym-K3yAnCiw6r"
    style="
      display:inline-block;
      background:#0066cc;
      color:white;
      padding:14px 22px;
      text-decoration:none;
      border-radius:8px;
    "
  >
    🎁 Access Bonus Material
  </a>

</div>

<p style="
  margin-top:35px;
  font-size:16px;
  color:#333;
  line-height:1.9;
">

  Each lesson is designed to be simple,
  practical, and result-oriented.

  <br><br>

  Practice regularly, trust the process,
  and you will see real transformation.

</p>

<blockquote style="
  margin-top:25px;
  padding:15px;
  background:#f3f3f3;
  border-left:4px solid #111;
  color:#333;
  font-size:16px;
">

  👉 Remember:
  A trained mind can achieve what an ordinary mind cannot.

</blockquote>

<p style="
  margin-top:30px;
  font-size:16px;
  color:#333;
  line-height:1.8;
">

  We’re excited to have you on this journey.

  <br><br>

  Welcome once again,
  and let the mind magic begin! 🚀

</p>

<hr style="margin:35px 0;">

<p style="
  text-align:center;
  color:#666;
  font-size:15px;
  line-height:1.8;
">

  Thank You ❤️<br><br>

  <strong>TheSuperMind Team</strong><br>

  📱 WhatsApp: 7400933412<br>

  📧 Email: shivprasadkushwaha870@gmail.com

</p>

  </div></div>

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
