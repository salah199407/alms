const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  updateUser,
  createUser, // à ajouter au contrôleur user-controller.js
} = require("../../controllers/user-controller/user-controller");

const { getAllCourses } = require("../../controllers/super-admin/course-controller");

// ✅ Routes pour la gestion des utilisateurs
router.post("/", createUser);       // Créer un utilisateur (fonction spécifique du user-controller)
router.get("/", getAllUsers);       // Obtenir tous les utilisateurs
router.put("/:userId/role", updateUserRole); // Modifier le rôle utilisateur
router.put("/:userId", updateUser); // Modifier un utilisateur
router.delete("/:userId", deleteUser); // Supprimer un utilisateur

// ✅ Route supplémentaire pour récupérer tous les cours
router.get("/courses", getAllCourses);

module.exports = router

