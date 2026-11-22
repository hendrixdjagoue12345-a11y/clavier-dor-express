
const pool = require('../config/db');

// Initialiser les jokers d'une progression
const initialiser = async (idProgression, connexion = pool) => {
  const [resultat] = await connexion.query(
    `INSERT INTO progression_joker
      (id_progression, id_joker)
     SELECT ?, id_joker
     FROM joker`,
    [idProgression]
  );

  return resultat.affectedRows;
};

// Récupérer les jokers d'une progression
const trouverParProgression = async (idProgression) => {
  const [lignes] = await pool.query(
    `SELECT
       pj.id_progression_joker,
       pj.id_progression,
       pj.id_joker,
       j.nom,
       j.description,
       pj.quantite_initiale,
       pj.quantite_restante
     FROM progression_joker pj
     INNER JOIN joker j
       ON pj.id_joker = j.id_joker
     WHERE pj.id_progression = ?
     ORDER BY pj.id_joker ASC`,
    [idProgression]
  );

  return lignes;
};

// Récupérer un joker précis dans une progression
const trouverParProgressionEtJoker = async (
  idProgression,
  idJoker
) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM progression_joker
     WHERE id_progression = ?
     AND id_joker = ?`,
    [idProgression, idJoker]
  );

  return lignes[0] || null;
};

// Consommer une unité d'un joker disponible
const consommer = async (idProgression, idJoker) => {
  const [resultat] = await pool.query(
    `UPDATE progression_joker
     SET quantite_restante = quantite_restante - 1
     WHERE id_progression = ?
     AND id_joker = ?
     AND quantite_restante > 0`,
    [idProgression, idJoker]
  );

  return resultat.affectedRows > 0;
};

module.exports = {
  initialiser,
  trouverParProgression,
  trouverParProgressionEtJoker,
  consommer,
};
