
const pool = require('../config/db');

// Créer une nouvelle partie
const creer = async (idUtilisateur) => {
  const [resultat] = await pool.query(
    `INSERT INTO partie (id_utilisateur)
     VALUES (?)`,
    [idUtilisateur]
  );

  return resultat.insertId;
};

// Rechercher une partie par son identifiant
const trouverParId = async (idPartie) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM partie
     WHERE id_partie = ?`,
    [idPartie]
  );

  return lignes[0] || null;
};

// Récupérer toutes les parties d'un utilisateur
const trouverParUtilisateur = async (idUtilisateur) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM partie
     WHERE id_utilisateur = ?
     ORDER BY date_derniere_sauvegarde DESC`,
    [idUtilisateur]
  );

  return lignes;
};

// Récupérer les parties encore en cours d'un utilisateur
const trouverEnCoursParUtilisateur = async (idUtilisateur) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM partie
     WHERE id_utilisateur = ?
     AND statut = 'en_cours'
     ORDER BY date_derniere_sauvegarde DESC`,
    [idUtilisateur]
  );

  return lignes;
};

// Modifier le statut d'une partie
const modifierStatut = async (idPartie, statut) => {
  if (!['en_cours', 'terminee'].includes(statut)) {
    throw new Error('Statut de partie invalide.');
  }

  const [resultat] = await pool.query(
    `UPDATE partie
     SET statut = ?
     WHERE id_partie = ?`,
    [statut, idPartie]
  );

  return resultat.affectedRows > 0;
};

module.exports = {
  creer,
  trouverParId,
  trouverParUtilisateur,
  trouverEnCoursParUtilisateur,
  modifierStatut,
};
