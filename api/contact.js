const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const services = {
      frontend: 'Custom Frontend',
      backend: 'Backend Development',
      database: 'Database Architecture',
      ecommerce: 'E-commerce',
      admin: 'Admin Dashboard',
      api: 'API Integration',
      other: 'Other',
    };

    const emailBody = `
New Contact Form Submission
===========================
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Service: ${services[service] || service || 'N/A'}
Budget: ${budget || 'N/A'}

Message:
${message}
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_TO,
      subject: `New Contact from ${name} - HAMASDev Portfolio`,
      text: emailBody.trim(),
      replyTo: email,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};
