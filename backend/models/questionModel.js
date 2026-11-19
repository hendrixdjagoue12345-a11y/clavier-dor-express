
const pool = require('../config/db');

// Récupérer une question par son identifiant
// Sans révéler la bonne réponse au joueur
const trouverParId = async (idQuestion) => {
  const [lignes] = await pool.query(
    `SELECT
       id_question,
       id_categorie,
       enonce,
       reponse_a,
       reponse_b,
       reponse_c,
       reponse_d
     FROM question
     WHERE id_question = ?`,
    [idQuestion]
  );

  return lignes[0] || null;
};

// Récupérer toutes les questions d'une catégorie
// Toujours dans l'ordre croissant des identifiants
const trouverParCategorie = async (idCategorie) => {
  const [lignes] = await pool.query(
    `SELECT
       id_question,
       id_categorie,
       enonce,
       reponse_a,
       reponse_b,
       reponse_c,
       reponse_d
     FROM question
     WHERE id_categorie = ?
     ORDER BY id_question ASC`,
    [idCategorie]
  );

  return lignes;
};

// Vérifier la réponse d'un joueur côté serveur
const verifierReponse = async (idQuestion, reponse) => {
  const [lignes] = await pool.query(
    `SELECT bonne_reponse
     FROM question
     WHERE id_question = ?`,
    [idQuestion]
  );

  if (lignes.length === 0) {
    return false;
  }

  return lignes[0].bonne_reponse === String(reponse).toLowerCase();
};

module.exports = {
  trouverParId,
  trouverParCategorie,
  verifierReponse,
};
