const express = require("express");
const multer = require("multer");
const authenticate = require("../../middleware/auth-middleware");
const {
  createOrganization,
  updateOrganization,
  deleteOrganization,
  createUserForOrganization,
  getAllOrganizations,
  getOrganizationDetails
} = require("../../controllers/organisation-controller/organization-controller");

const router = express.Router();

// ✅ Configure multer pour l'upload
const upload = multer({ dest: "uploads/" });

// ✅ ROUTES

// Créer une organisation (Super Admin)
router.post("/create", authenticate, upload.single("image"), createOrganization);

// Modifier une organisation (Super Admin)
router.put("/:id", authenticate, upload.single("image"), updateOrganization);

// Supprimer une organisation (Super Admin)
router.delete("/:id", authenticate, deleteOrganization);

// Lister toutes les organisations (Super Admin)
router.get("/", authenticate, getAllOrganizations);

// Détails d’une organisation (Super Admin)
router.get("/:id", authenticate, getOrganizationDetails);

// Créer un utilisateur dans une organisation (Org Admin)
router.post("/create-user", authenticate, createUserForOrganization);

module.exports = router;
