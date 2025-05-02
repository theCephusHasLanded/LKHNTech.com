const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get form data from request body
    const { name, email, company, message, services = [] } = req.body;

    // Create transporter (configure based on GoDaddy email)
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net', // GoDaddy SMTP server
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'cephus@lkhntech.com', // Your GoDaddy email
        pass: process.env.EMAIL_PASSWORD, // Use environment variable for security
      },
    });

    // Format the services array if present
    const servicesText = services.length > 0 
      ? `\nServices interested in: ${services.join(', ')}`
      : '';

    // Create email content
    const mailOptions = {
      from: 'LKHN Tech Website <cephus@lkhntech.com>',
      to: 'cephus@lkhntech.com',
      cc: 'christinacephus@pursuit.org',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}${servicesText}

Message:
${message}

---
This email was sent from the contact form on LKHNTech.com
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
${services.length > 0 ? `<p><strong>Services interested in:</strong> ${services.join(', ')}</p>` : ''}
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
<hr>
<p><em>This email was sent from the contact form on LKHNTech.com</em></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
  }
}