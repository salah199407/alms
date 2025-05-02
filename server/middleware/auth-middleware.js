const jwt = require("jsonwebtoken");

// Vérification du token
const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

// Middleware d'authentification
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authenticate;

