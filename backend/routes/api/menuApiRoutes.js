
/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Récupérer le menu de l'utilisateur connecté
 *     description: Retourne les informations de l'utilisateur authentifié.
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succes:
 *                   type: boolean
 *                   example: true
 *                 utilisateur:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     nom:
 *                       type: string
 *                       example: HENDRIX
 *                     email:
 *                       type: string
 *                       example: hendrix@example.com
 *                     role:
 *                       type: string
 *                       example: Joueur
 *       401:
 *         description: Access Token absent, invalide ou expiré.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succes:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Authentification requise.
 */

// Définit les routes du menu de l'API mobile.

const express = require('express');
const router = express.Router();

const menuApiController = require('../../controllers/api/menuApiController');
const authApiMiddleware = require('../../middleware/api/authApiMiddleware');

// Renvoyer le menu uniquement si l'utilisateur possède un JWT valide
router.get(
  '/menu',
  authApiMiddleware.verifierAuthentification,
  menuApiController.afficherMenu
);

module.exports = router;
