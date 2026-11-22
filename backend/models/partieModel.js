
const pool = require('../config/db');

// Créer une nouvelle partie
const creer = async (idUtilisateur, connexion = pool) => {
  const [resultat] = await connexion.query(
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
     ORDER BY date_derniere_sauvegarde DESC`
    ,
    [idUtilisateur]
  );

  return lignes;
};

// Récupérer les parties en cours d'un utilisateur
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

// Mettre à jour la date de dernière sauvegarde
const sauvegarder = async (idPartie) => {
  const [resultat] = await pool.query(
    `UPDATE partie
     SET date_derniere_sauvegarde = CURRENT_TIMESTAMP
     WHERE id_partie = ?
     AND statut = 'en_cours'`,
    [idPartie]
  );

  return resultat.affectedRows > 0;
};

// Terminer une partie encore en cours
const terminer = async (idPartie) => {
  const [resultat] = await pool.query(
    `UPDATE partie
     SET statut = 'terminee',
         date_derniere_sauvegarde = CURRENT_TIMESTAMP
     WHERE id_partie = ?
     AND statut = 'en_cours'`,
    [idPartie]
  );

  return resultat.affectedRows > 0;
};

module.exports = {
  creer,
  trouverParId,
  trouverParUtilisateur,
  trouverEnCoursParUtilisateur,
  sauvegarder,
  terminer,
};
