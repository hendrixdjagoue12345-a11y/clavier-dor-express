// responsable uniquement des opérations SQL liées aux Refresh Tokens


const pool = require('../config/db');

// Enregistrer un nouveau Refresh Token
const creer = async (
  idUtilisateur,
  tokenHash,
  familleId,
  dateExpiration
) => {
  const [resultat] = await pool.query(
    `INSERT INTO refresh_token
      (id_utilisateur, token_hash, famille_id, date_expiration)
     VALUES (?, ?, ?, ?)`,
    [idUtilisateur, tokenHash, familleId, dateExpiration]
  );

  return resultat.insertId;
};

// Rechercher un Refresh Token par son hash
const trouverParHash = async (tokenHash) => {
  const [tokens] = await pool.query(
    `SELECT *
     FROM refresh_token
     WHERE token_hash = ?`,
    [tokenHash]
  );

  return tokens[0] || null;
};

// Révoquer un Refresh Token
const revoquer = async (tokenHash) => {
  const [resultat] = await pool.query(
    `UPDATE refresh_token
     SET date_revocation = CURRENT_TIMESTAMP
     WHERE token_hash = ?
       AND date_revocation IS NULL`,
    [tokenHash]
  );

  return resultat.affectedRows > 0;
};

// Révoquer toute une famille de Refresh Tokens
const revoquerFamille = async (familleId) => {
  const [resultat] = await pool.query(
    `UPDATE refresh_token
     SET date_revocation = CURRENT_TIMESTAMP
     WHERE famille_id = ?
       AND date_revocation IS NULL`,
    [familleId]
  );

  return resultat.affectedRows;
};

module.exports = {
  creer,
  trouverParHash,
  revoquer,
  revoquerFamille,
};
