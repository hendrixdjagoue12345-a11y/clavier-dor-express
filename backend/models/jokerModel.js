
const pool = require('../config/db');

// Récupérer tous les jokers
const trouverTous = async () => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM joker
     ORDER BY id_joker ASC`
  );

  return lignes;
};

// Récupérer un joker par son identifiant
const trouverParId = async (idJoker) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM joker
     WHERE id_joker = ?`,
    [idJoker]
  );

  return lignes[0] || null;
};

module.exports = {
  trouverTous,
  trouverParId,
};
