// contient les routes utilisées par l'application mobile.


const express = require('express');
const router = express.Router();
const validateMiddleware = require('../../middleware/validateMiddleware');

const authApiController = require('../../controllers/api/authApiController');

// Inscription et connexion
router.post('/inscription', validateMiddleware.validerInscription, authApiController.inscrire);
router.post('/connexion', authApiController.connecter);

module.exports = router;
