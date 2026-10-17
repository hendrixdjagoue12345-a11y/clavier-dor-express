const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/inscription', authController.afficherFormulaireInscription);
router.post('/inscription', authController.inscrire);
router.get('/connexion', authController.afficherFormulaireConnexion);
router.post('/connexion', authController.connecter);

module.exports = router;
