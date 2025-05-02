const nodemailer = require("nodemailer");
require("dotenv").config();

// Configuration de nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Utilisation des variables d'environnement
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Fonction d'envoi d'email
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log(`📧 Email envoyé à ${to}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
};

module.exports = sendEmail;