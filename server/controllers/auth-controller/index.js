const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../../utils/emailService");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const checkUser = await User.findOne({ userEmail });

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    process.env.JWT_SECRET, // ✅ C'est .env qui contient la vraie clé
    { expiresIn: "120m" }
  );
  

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });

};

// 📌 1️⃣ Mot de passe oublié
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ userEmail: email }); // Recherche de l'utilisateur
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Le token expire dans 1 heure
    await user.save();

    // Créer le lien de réinitialisation (à adapter avec ton domaine et la route)
    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

    // Contenu de l'email
    const emailContent = `
       <h2>Réinitialisation du mot de passe</h2>
        <img src="http://localhost:5173/logo.png" alt="Logo de l'organisation" width="150" />
        <p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a href="${resetUrl}">Réinitialiser le mot de passe</a>
        <p>Ce lien expire dans 1 heure.</p>
    `;

    // Envoyer l'email
    await sendEmail({
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: emailContent,
    });

    // Réponse au client
    res.json({ success: true, message: "Reset link sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 2️⃣ Réinitialisation du mot de passe
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({ 
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Vérifier si le token est encore valide
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password successfully reset" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
