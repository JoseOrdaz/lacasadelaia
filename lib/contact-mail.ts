import nodemailer from 'nodemailer'

type ContactMessage = { name: string; email: string; message: string }

export async function sendContactEmail({ name, email, message }: ContactMessage) {
  const user = process.env.SMTP_USER || 'hola@lacasadelaia.com'
  const password = process.env.SMTP_PASSWORD
  if (!password) return false

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.serviciodecorreo.es',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user, pass: password },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `La Casa de la IA <${user}>`,
    to: process.env.CONTACT_TO || user,
    replyTo: email,
    subject: `Nueva consulta de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
  })
  return true
}
