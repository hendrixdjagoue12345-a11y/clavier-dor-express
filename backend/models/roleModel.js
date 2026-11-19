
const pool = require('../config/db');

// Rechercher un rôle à partir de son libellé
const trouverParLibelle = async (libelle) => {
  const [roles] = await pool.query(
    'SELECT id_role FROM role WHERE libelle = ?',
    [libelle]
  );

  return roles[0] || null;
};

module.exports = {
  trouverParLibelle,
};
