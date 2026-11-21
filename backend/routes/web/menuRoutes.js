// Définit les routes du menu et des pages associées.

const express = require('express');
const router = express.Router();

const menuController = require('../../controllers/web/menuController');
const authMiddleware = require('../../middleware/web/authMiddleware');

// Afficher le menu uniquement si l'utilisateur possède un JWT valide
router.get(
  '/menu',
  authMiddleware.verifierAuthentification,
  menuController.afficherMenu
);

module.exports = router;