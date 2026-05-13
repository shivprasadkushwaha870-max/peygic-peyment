export default async function handler(req, res) {

  try {

    const { email, name } = req.body;

    // =========================
    // SEND EMAIL WITH RESEND
    // =========================

    await fetch("https://api.resend.com/emails", {

      method: "POST",

      headers: {

        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        from: "onboarding@resend.dev",

        to: email,

        subject: "Payment Successful",

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

        `

      })

    });

    // =========================
    // REDIRECT
    // =========================

    return res.status(200).json({

      success: true,

      redirect:
        "https://thesupermind.online/tq"

    });

  } catch (error) {

    return res.status(500).json({

      error: error.message

    });

  }

}
