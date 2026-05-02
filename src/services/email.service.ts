import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendContactEmail = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'RicardoRC@richsof.com',
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d7a6e;">Nuevo mensaje de contacto</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Nombre:</td><td style="padding: 8px;">${data.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Asunto:</td><td style="padding: 8px;">${data.subject}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">Enviado desde portafolio.reyes.richsof.com</p>
      </div>
    `,
  });
};
