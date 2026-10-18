const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Inscription
router.get('/inscription', authController.afficherFormulaireInscription);
router.post('/inscription', authController.inscrire);

// Connexion
router.get('/connexion', authController.afficherFormulaireConnexion);
router.post('/connexion', authController.connecter);

// Déconnexion
router.post('/deconnexion', authController.deconnecter);

module.exports = router;
