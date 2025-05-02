const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");

// ✅ Importation des fonctions de gestion de session
const { getSession, updateSession } = require("../../chatbotState");

router.post("/chat", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ response: "Erreur : données manquantes." });
  }

  const session = getSession(userId);
  const step = session.step;
  let reply = "";

  try {
    if (step === 1) {
      updateSession(userId, "objectif", message);
      reply = "2️⃣ Super ! À quel niveau es-tu ? (Débutant / Intermédiaire / Avancé)";
    } else if (step === 2) {
      updateSession(userId, "level", message);
      reply = "3️⃣ As-tu déjà des connaissances ou des prérequis ? (Exemple : HTML, Python, Linux...)";
    } else if (step === 3) {
      updateSession(userId, "connaissances", message.split(/[, ]+/));
      reply = "4️⃣ Souhaites-tu suivre un parcours de formation guidé ? (Oui / Non)";
    } else if (step === 4) {
      updateSession(userId, "wantsLearningPath", message.toLowerCase().includes("oui"));

      const { objectif, level, connaissances, wantsLearningPath } = session.data;

      // 🔍 Recherche des formations dans la base
      const results = await Course.find({
        level: { $regex: level, $options: "i" },
        $or: [
          { title: { $regex: objectif, $options: "i" } },
          { category: { $regex: objectif, $options: "i" } },
          { description: { $regex: objectif, $options: "i" } }
        ]
      });

      if (wantsLearningPath && results.length > 0) {
        reply = `🚀 Voici ton parcours personnalisé pour devenir ${objectif} :\n\n`;
        results.forEach((course, i) => {
          reply += `${i + 1}. ${course.title} (${course.level})\n➡️ ${course.image || "Lien non disponible"}\n\n`;
        });
      } else if (results.length > 0) {
        reply = `📚 Voici des formations recommandées pour toi :\n`;
        results.forEach((course) => {
          reply += `- ${course.title} (${course.level})\n`;
        });
      } else {
        reply = "😕 Désolé, je n’ai pas trouvé de formations correspondant à ton profil.";
      }
    }

    return res.json({ response: reply });
  } catch (error) {
    console.error("Erreur dans le chatbot :", error);
    return res.status(500).json({ response: "Une erreur est survenue dans le chatbot." });
  }
});

module.exports = router;
