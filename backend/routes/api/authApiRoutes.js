// contient les routes utilisées par l'application mobile.

const express = require('express');
const router = express.Router();
const validateMiddleware = require('../../middleware/validateMiddleware');

const authApiController = require('../../controllers/api/authApiController');

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Inscription et connexion des joueurs
 */

/**
 * @swagger
 * /api/auth/inscription:
 *   post:
 *     summary: Inscrire un nouveau joueur
 *     description: Crée un compte joueur après validation des informations fournies.
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - motDePasse
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Hendrix
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joueur@example.com
 *               motDePasse:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: motdepasse123
 *     responses:
 *       201:
 *         description: Inscription réussie
 *       400:
 *         description: Données invalides ou champs obligatoires manquants
 *       409:
 *         description: Cette adresse e-mail est déjà utilisée
 *       500:
 *         description: Erreur interne du serveur
 */
router.post(
  '/inscription',
  validateMiddleware.validerInscription,
  authApiController.inscrire
);

/**
 * @swagger
 * /api/auth/connexion:
 *   post:
 *     summary: Connecter un joueur
 *     description: Authentifie un joueur et retourne ses tokens d'accès et de renouvellement.
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - motDePasse
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joueur@example.com
 *               motDePasse:
 *                 type: string
 *                 format: password
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: Données manquantes ou invalides
 *       401:
 *         description: Identifiants incorrects
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/connexion', authApiController.connecter);

module.exports = router;
 