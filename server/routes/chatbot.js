const express = require('express');
const axios = require('axios');
const Course = require('../models/Course'); // adapte ce chemin si besoin
const router = express.Router();

router.post('/analyze-message', async (req, res) => {
  const { message } = req.body;

  try {
    // 🔗 Appel du micro-service Python en local
    const response = await axios.post('http://localhost:5005/analyze', { message });
    const { categorie_detectee } = response.data;

    // 🔍 Requête MongoDB pour trouver les cours liés à cette catégorie
    const courses = await Course.find({
      $or: [
        { category: { $regex: new RegExp(categorie_detectee, 'i') } },
        { title: { $regex: new RegExp(categorie_detectee, 'i') } },
        { description: { $regex: new RegExp(categorie_detectee, 'i') } }
      ]
    });

    res.json({
      cours_recommandes: courses,
      analyse: response.data
    });
  } catch (error) {
    console.error("Erreur analyse-message :", error.message);
    res.status(500).json({ error: "Erreur lors du traitement du message utilisateur" });
  }
});

module.exports = router;
