
const pool = require('../config/db');

// Récupérer toutes les catégories dans l'ordre
const trouverToutes = async () => {
  const [lignes] = await pool.query(
    `SELECT id_categorie, nom
     FROM categorie
     ORDER BY id_categorie ASC`
  );

  return lignes;
};

module.exports = {
  trouverToutes,
};
