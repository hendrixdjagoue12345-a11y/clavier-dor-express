
const pool = require('../config/db');

// Enregistrer une réponse donnée par le joueur
const creer = async (
  idPartie,
  idQuestion,
  reponseDonnee,
  estCorrecte,
  idJokerUtilise = null
) => {
  const [resultat] = await pool.query(
    `INSERT INTO reponse_enregistre
      (id_partie, id_question, reponse_donnee, est_correcte, id_joker_utilise)
     VALUES (?, ?, ?, ?, ?)`,
    [
      idPartie,
      idQuestion,
      reponseDonnee,
      estCorrecte ? 1 : 0,
      idJokerUtilise
    ]
  );

  return resultat.insertId;
};

// Récupérer une réponse par son identifiant
const trouverParId = async (idReponse) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM reponse_enregistre
     WHERE id_reponse_enregistre = ?`,
    [idReponse]
  );

  return lignes[0] || null;
};

// Récupérer toutes les réponses d'une partie
const trouverParPartie = async (idPartie) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM reponse_enregistre
     WHERE id_partie = ?
     ORDER BY date_reponse ASC`,
    [idPartie]
  );

  return lignes;
};

// Rechercher la réponse donnée à une question dans une partie
const trouverParPartieEtQuestion = async (idPartie, idQuestion) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM reponse_enregistre
     WHERE id_partie = ?
     AND id_question = ?`,
    [idPartie, idQuestion]
  );

  return lignes[0] || null;
};

// Modifier une réponse déjà enregistrée
const modifier = async (
  idPartie,
  idQuestion,
  reponseDonnee,
  estCorrecte,
  idJokerUtilise = null
) => {
  const [resultat] = await pool.query(
    `UPDATE reponse_enregistre
     SET reponse_donnee = ?,
         est_correcte = ?,
         id_joker_utilise = ?,
         date_reponse = CURRENT_TIMESTAMP
     WHERE id_partie = ?
     AND id_question = ?`,
    [
      reponseDonnee,
      estCorrecte ? 1 : 0,
      idJokerUtilise,
      idPartie,
      idQuestion
    ]
  );

  return resultat.affectedRows;
};

// Compter les bonnes réponses dans une catégorie précise
const compterBonnesReponses = async (idPartie, idCategorie) => {
  const [lignes] = await pool.query(
    `SELECT COUNT(*) AS total
     FROM reponse_enregistre r
     INNER JOIN question q
       ON r.id_question = q.id_question
     WHERE r.id_partie = ?
     AND q.id_categorie = ?
     AND r.est_correcte = 1`,
    [idPartie, idCategorie]
  );

  return lignes[0].total;
};

module.exports = {
  creer,
  trouverParId,
  trouverParPartie,
  trouverParPartieEtQuestion,
  modifier,
  compterBonnesReponses,
};
