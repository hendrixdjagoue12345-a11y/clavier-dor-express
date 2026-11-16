
const express = require('express');
const router = express.Router();

const authController = require('../../controllers/web/authController');

// Afficher le formulaire d'inscription
router.get('/inscription', authController.afficherFormulaireInscription);

// Traiter l'inscription
router.post('/inscription', authController.inscrire);

// Afficher le formulaire de connexion
router.get('/connexion', authController.afficherFormulaireConnexion);

// Traiter la connexion
router.post('/connexion', authController.connecter);

// Déconnecter l'utilisateur
router.post('/deconnexion', authController.deconnecter);

module.exports = router;
