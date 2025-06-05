import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Configuration du transporteur SMTP Zoho
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'contact@gloriam-consulting.com', // votre adresse email Zoho
        pass: process.env.ZOHO_MAIL_PASSWORD // à configurer dans les variables d'environnement
      }
    });

    // Configuration de l'email
    const mailOptions = {
      from: '"Formulaire de contact Gloriam Consulting" <contact@gloriam-consulting.com>',
      to: 'contact@gloriam-consulting.com',
      replyTo: email,
      subject: `[Contact Site Web] ${subject}`,
      html: `
        <h3>Nouveau message du formulaire de contact</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
} 