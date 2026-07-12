import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Setup email data
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Must use authenticated email to avoid spam blocks
      replyTo: email,
      to: process.env.SMTP_RECEIVER,
      subject: `New Contact Request from ${name} via Portfolio`,
      text: `You have received a new message from your portfolio contact form.\n\nName/Alias: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: monospace; padding: 20px; border: 4px solid black; background-color: #f4f4f0; color: black;">
          <h2 style="text-transform: uppercase; border-bottom: 2px solid black; padding-bottom: 10px; margin-top: 0;">New Transmission Received</h2>
          <p><strong>Name/Alias:</strong> ${name}</p>
          <p><strong>Reply-To:</strong> <a href="mailto:${email}" style="color: blue;">${email}</a></p>
          <div style="background-color: #ffffff; padding: 15px; border: 2px solid black; margin-top: 20px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <p style="font-size: 10px; margin-top: 20px; opacity: 0.7;">SYSTEM_GENERATED_VIA_PORTFOLIO</p>
        </div>
      `,
    };

    // Setup auto-reply email for the visitor
    const autoReplyOptions = {
      from: `"Sayan_CtrlZ" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Transmission Received: Thanks for connecting!`,
      text: `Hello ${name},\n\nI have received your message and will get back to you within 24 hours.\n\nYour original message:\n${message}\n\nBest,\nSayan_CtrlZ`,
      html: `
        <div style="font-family: monospace; padding: 20px; border: 4px solid black; background-color: #f4f4f0; color: black;">
          <h2 style="text-transform: uppercase; border-bottom: 2px solid black; padding-bottom: 10px; margin-top: 0;">Transmission Confirmed</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>This is an automated confirmation that your transmission has been successfully received by my mainframe. I will review your query and respond typically within 24 hours.</p>
          <div style="background-color: #ffffff; padding: 15px; border: 2px solid black; margin-top: 20px;">
            <p style="font-weight: bold; margin-top: 0; margin-bottom: 10px;">YOUR ORIGINAL MESSAGE:</p>
            <p style="white-space: pre-wrap; margin: 0; opacity: 0.8;">${message}</p>
          </div>
          <p style="font-weight: bold; margin-top: 20px; font-size: 1.2em;">>_ Sayan_CtrlZ</p>
        </div>
      `,
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
