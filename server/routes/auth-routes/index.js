
const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../../controllers/auth-controller/index");
const authenticateMiddleware = require("../../middleware/auth-middleware");

const router = express.Router();

// Routes d'inscription et de connexion classiques
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", authenticateMiddleware, (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    data: {
      user,
    },
  });
});

// Route pour "Mot de passe oublié"
router.post("/forgot-password", forgotPassword);

// Route pour "Réinitialisation du mot de passe"
router.post("/reset-password", resetPassword);


// Route d'authentification Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback après connexion réussie avec Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "http://localhost:5173/home",
  })
);

// Route pour récupérer l'utilisateur connecté
router.get("/user", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;





























/*const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth-controller/index");
const authenticateMiddleware = require("../../middleware/auth-middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", authenticateMiddleware, (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    data: {
      user,
    },
  });
});

module.exports = router;*/