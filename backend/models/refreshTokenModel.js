
// Responsable uniquement des opérations SQL liées aux Refresh Tokens

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

// Effectuer la rotation d'un Refresh Token
const rotater = async (
  ancienTokenHash,
  nouveauTokenHash,
  nouvelleDateExpiration
) => {
  const connexion = await pool.getConnection();

  try {
    await connexion.beginTransaction();

    // Verrouiller l'ancien token pendant la transaction
    const [tokens] = await connexion.query(
      `SELECT *
       FROM refresh_token
       WHERE token_hash = ?
       FOR UPDATE`,
      [ancienTokenHash]
    );

    const ancienToken = tokens[0];

    if (!ancienToken) {
      await connexion.rollback();
      return { statut: 'introuvable' };
    }

    // Détecter une éventuelle réutilisation
    if (ancienToken.date_revocation !== null) {
      await connexion.query(
        `UPDATE refresh_token
         SET date_revocation = CURRENT_TIMESTAMP
         WHERE famille_id = ?
           AND date_revocation IS NULL`,
        [ancienToken.famille_id]
      );

      await connexion.commit();

      return { statut: 'reutilisation' };
    }

    // Vérifier l'expiration
    if (new Date(ancienToken.date_expiration) <= new Date()) {
      await connexion.query(
        `UPDATE refresh_token
         SET date_revocation = CURRENT_TIMESTAMP
         WHERE token_hash = ?`,
        [ancienTokenHash]
      );

      await connexion.commit();

      return { statut: 'expire' };
    }

    // Invalider l'ancien token et enregistrer son successeur
    await connexion.query(
      `UPDATE refresh_token
       SET date_revocation = CURRENT_TIMESTAMP,
           remplace_par_hash = ?
       WHERE token_hash = ?
         AND date_revocation IS NULL`,
      [nouveauTokenHash, ancienTokenHash]
    );

    await connexion.query(
      `INSERT INTO refresh_token
        (id_utilisateur, token_hash, famille_id, date_expiration)
       VALUES (?, ?, ?, ?)`,
      [
        ancienToken.id_utilisateur,
        nouveauTokenHash,
        ancienToken.famille_id,
        nouvelleDateExpiration,
      ]
    );

    await connexion.commit();

    return {
      statut: 'renouvele',
      idUtilisateur: ancienToken.id_utilisateur,
      familleId: ancienToken.famille_id,
    };
  } catch (erreur) {
    await connexion.rollback();
    throw erreur;
  } finally {
    connexion.release();
  }
};

module.exports = {
  creer,
  trouverParHash,
  revoquer,
  revoquerFamille,
  rotater,
};
