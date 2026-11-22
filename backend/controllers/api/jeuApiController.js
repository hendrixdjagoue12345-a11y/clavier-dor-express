
const jeuService = require('../../services/jeuService');

// Créer une nouvelle partie
const creerPartie = async (req, res, next) => {
  try {
    const partie = await jeuService.creerPartie(req.utilisateur.id);

    return res.status(201).json({
      succes: true,
      message: 'Nouvelle partie créée avec succès.',
      partie,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

// Récupérer toutes les parties du joueur
const trouverMesParties = async (req, res, next) => {
  try {
    const parties = await jeuService.trouverPartiesUtilisateur(
      req.utilisateur.id
    );

    return res.status(200).json({
      succes: true,
      parties,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

// Récupérer les parties en cours du joueur
const trouverMesPartiesEnCours = async (req, res, next) => {
  try {
    const parties = await jeuService.trouverPartiesEnCours(
      req.utilisateur.id
    );

    return res.status(200).json({
      succes: true,
      parties,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

// Consulter une partie précise
const trouverMaPartie = async (req, res, next) => {
  try {
    const partie = await jeuService.trouverPartieUtilisateur(
      Number(req.params.id),
      req.utilisateur.id
    );

    return res.status(200).json({
      succes: true,
      partie,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

// Reprendre une partie
const reprendrePartie = async (req, res, next) => {
  try {
    const partie = await jeuService.reprendrePartie(
      Number(req.params.id),
      req.utilisateur.id
    );

    return res.status(200).json({
      succes: true,
      message: 'Partie récupérée avec succès.',
      partie,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

// Sauvegarder une partie
const sauvegarderPartie = async (req, res, next) => {
  try {
    const partie = await jeuService.sauvegarderPartie(
      Number(req.params.id),
      req.utilisateur.id
    );

    return res.status(200).json({
      succes: true,
      message: 'Partie sauvegardée.',
      partie,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

// Terminer une partie
const terminerPartie = async (req, res, next) => {
  try {
    const resultat = await jeuService.terminerPartie(
      Number(req.params.id),
      req.utilisateur.id
    );

    return res.status(200).json({
      succes: true,
      message: 'Partie terminée avec succès.',
      partie: resultat,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

module.exports = {
  creerPartie,
  trouverMesParties,
  trouverMesPartiesEnCours,
  trouverMaPartie,
  reprendrePartie,
  sauvegarderPartie,
  terminerPartie,
};
