
const pool = require('../config/db');

const partieModel = require('../models/partieModel');
const categorieModel = require('../models/categorieModel');
const progressionModel = require('../models/progressionModel');
const progressionJokerModel = require('../models/progressionJokerModel');

// Créer une nouvelle partie avec ses progressions et ses jokers
const creerPartie = async (idUtilisateur) => {
  const categories = await categorieModel.trouverToutes();

  if (categories.length !== 5) {
    throw new Error(
      'Impossible de créer la partie : les cinq catégories sont requises.'
    );
  }

  const connexion = await pool.getConnection();
  let transactionDemarree = false;

  try {
    await connexion.beginTransaction();
    transactionDemarree = true;

    const idPartie = await partieModel.creer(
      idUtilisateur,
      connexion
    );

    const progressions = [];

    for (const categorie of categories) {
      const idProgression = await progressionModel.creer(
        idPartie,
        categorie.id_categorie,
        connexion
      );

      await progressionJokerModel.initialiser(
        idProgression,
        connexion
      );

      progressions.push({
        idProgression,
        idCategorie: categorie.id_categorie,
        nomCategorie: categorie.nom,
        score: 0,
        bossVaincu: false,
      });
    }

    await connexion.commit();
    transactionDemarree = false;

    return {
      idPartie,
      idUtilisateur,
      statut: 'en_cours',
      progressions,
    };
  } catch (erreur) {
    if (transactionDemarree) {
      await connexion.rollback();
    }

    throw erreur;
  } finally {
    connexion.release();
  }
};

// Récupérer toutes les parties d'un utilisateur
const trouverPartiesUtilisateur = async (idUtilisateur) => {
  return await partieModel.trouverParUtilisateur(idUtilisateur);
};

// Récupérer les parties en cours d'un utilisateur
const trouverPartiesEnCours = async (idUtilisateur) => {
  return await partieModel.trouverEnCoursParUtilisateur(idUtilisateur);
};

// Récupérer une partie appartenant à un utilisateur
const trouverPartieUtilisateur = async (idPartie, idUtilisateur) => {
  const partie = await partieModel.trouverParId(idPartie);

  if (!partie || partie.id_utilisateur !== idUtilisateur) {
    const erreur = new Error('Partie introuvable.');
    erreur.status = 404;
    throw erreur;
  }

  const progressions = await progressionModel.trouverParPartie(idPartie);

  return {
    ...partie,
    progressions,
  };
};

// Reprendre une partie en cours
const reprendrePartie = async (idPartie, idUtilisateur) => {
  const partie = await trouverPartieUtilisateur(idPartie, idUtilisateur);

  if (partie.statut !== 'en_cours') {
    const erreur = new Error('Cette partie est déjà terminée.');
    erreur.status = 400;
    throw erreur;
  }

  return partie;
};

// Sauvegarder une partie en cours
const sauvegarderPartie = async (idPartie, idUtilisateur) => {
  const partie = await trouverPartieUtilisateur(idPartie, idUtilisateur);

  if (partie.statut !== 'en_cours') {
    const erreur = new Error('Impossible de sauvegarder une partie terminée.');
    erreur.status = 400;
    throw erreur;
  }

  return partie;
};

// Terminer une partie
const terminerPartie = async (idPartie, idUtilisateur) => {
  const partie = await trouverPartieUtilisateur(idPartie, idUtilisateur);

  if (partie.statut !== 'en_cours') {
    const erreur = new Error('Cette partie est déjà terminée.');
    erreur.status = 400;
    throw erreur;
  }

  await partieModel.modifierStatut(idPartie, 'terminee');

  return {
    idPartie,
    statut: 'terminee',
  };
};

module.exports = {
  creerPartie,
  trouverPartiesUtilisateur,
  trouverPartiesEnCours,
  trouverPartieUtilisateur,
  reprendrePartie,
  sauvegarderPartie,
  terminerPartie,
};
