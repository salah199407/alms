require("dotenv").config()
console.log("Using MONGO_URI:", process.env.MONGO_URI);

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

// Importation des routes
const authRoutes = require("./routes/auth-routes/index")
const mediaRoutes = require("./routes/instructor-routes/media-routes")
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes")
const instructorCategoryRoutes = require("./routes/instructor-routes/category-routes")
const studentViewCourseRoutes = require("./routes/student-routes/course-routes")
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes")
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes")
const courseHomeRoutes = require("./routes/course-routes/course-home-routes")
const userRoutes = require("./routes/user-routes/user-routes")
const organizationRoutes = require("./routes/organisation-routes/organization-routes")
const authenticate = require("./middleware/auth-middleware")

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

// Configuration CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://odc-learning.com",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}

// Middleware de base
app.use(cors(corsOptions))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Connexion à MongoDB avec gestion d'erreur
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté avec succès"))
  .catch((error) => {
    console.error("❌ Erreur de connexion MongoDB:", error)
    process.exit(1)
  })

// Configuration de la session
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000 // 24 heures
  }
}))

// Configuration de Passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => done(null, profile)))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

// Routes d'authentification Google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

app.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: process.env.FRONTEND_URL || "https://odc-learning.com/home",
}))

// Routes API
app.use("/api/auth", authRoutes)
app.use("/api/media", mediaRoutes)
app.use("/api/instructor/course", instructorCourseRoutes)
app.use("/api/instructor/categories", instructorCategoryRoutes)
app.use("/api/student/course", studentViewCourseRoutes)
app.use("/api/student/courses", studentCoursesRoutes)
app.use("/api/student/progress", studentCourseProgressRoutes)
app.use("/api/courses", courseHomeRoutes)
app.use("/api/users", authenticate, userRoutes)
app.use("/api/organizations", authenticate, organizationRoutes)

// Route de santé
app.get("/health", (req, res) => res.json({ status: "healthy" }))

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Une erreur est survenue",
    error: process.env.NODE_ENV === "development" ? err : {}
  })
})

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route non trouvée"
  })
})

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
  console.log(`🌐 API disponible à ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`)
})
