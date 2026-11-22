
const express = require('express');
const router = express.Router();

const jeuApiController = require('../../controllers/api/jeuApiController');
const authApiMiddleware = require('../../middleware/api/authApiMiddleware');

// Toutes les routes du jeu nécessitent une authentification
router.use(authApiMiddleware.verifierAuthentification);

/**
 * @swagger
 * tags:
 *   name: Jeu
 *   description: Gestion des parties du joueur
 */

/**
 * @swagger
 * /api/jeu/parties:
 *   post:
 *     summary: Créer une nouvelle partie
 *     tags: [Jeu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Partie créée avec ses cinq progressions.
 *       401:
 *         description: Authentification requise.
 */
router.post('/jeu/parties', jeuApiController.creerPartie);

/**
 * @swagger
 * /api/jeu/parties:
 *   get:
 *     summary: Récupérer toutes les parties du joueur
 *     tags: [Jeu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des parties.
 *       401:
 *         description: Authentification requise.
 */
router.get('/jeu/parties', jeuApiController.trouverMesParties);

/**
 * @swagger
 * /api/jeu/parties/en-cours:
 *   get:
 *     summary: Récupérer les parties en cours
 *     tags: [Jeu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des parties en cours.
 */
router.get(
  '/jeu/parties/en-cours',
  jeuApiController.trouverMesPartiesEnCours
);

/**
 * @swagger
 * /api/jeu/parties/{id}:
 *   get:
 *     summary: Consulter une partie précise
 *     tags: [Jeu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la partie.
 *       404:
 *         description: Partie introuvable.
 */
router.get('/jeu/parties/:id', jeuApiController.trouverMaPartie);

/**
 * @swagger
 * /api/jeu/parties/{id}/reprise:
 *   get:
 *     summary: Reprendre une partie en cours
 *     tags: [Jeu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partie récupérée.
 *       400:
 *         description: Partie déjà terminée.
 *       404:
 *         description: Partie introuvable.
 */
router.get(
  '/jeu/parties/:id/reprise',
  jeuApiController.reprendrePartie
);

/**
 * @swagger
 * /api/jeu/parties/{id}:
 *   patch:
 *     summary: Sauvegarder une partie en cours
 *     tags: [Jeu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partie sauvegardée.
 *       400:
 *         description: Partie déjà terminée.
 *       404:
 *         description: Partie introuvable.
 */
router.patch(
  '/jeu/parties/:id',
  jeuApiController.sauvegarderPartie
);

/**
 * @swagger
 * /api/jeu/parties/{id}/terminer:
 *   patch:
 *     summary: Terminer une partie
 *     tags: [Jeu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partie terminée.
 *       404:
 *         description: Partie introuvable.
 */
router.patch(
  '/jeu/parties/:id/terminer',
  jeuApiController.terminerPartie
);

module.exports = router;
