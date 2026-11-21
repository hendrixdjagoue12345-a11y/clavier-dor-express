
const express = require('express');
const router = express.Router();

const authController = require('../../controllers/web/authController');
const validateMiddleware = require('../../middleware/validateMiddleware');

// Afficher le formulaire d'inscription
router.get('/inscription', authController.afficherFormulaireInscription);

// Traiter l'inscription
router.post('/inscription', validateMiddleware.validerInscription, authController.inscrire);

// Afficher le formulaire de connexion
router.get('/connexion', authController.afficherFormulaireConnexion);

// Traiter la connexion
router.post('/connexion', authController.connecter);

// Renouveler l'Access Token
router.post('/renouveler', authController.renouveler);

// Déconnecter l'utilisateur
router.post('/deconnexion', authController.deconnecter);

module.exports = router;
