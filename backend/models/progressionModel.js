
const pool = require('../config/db');

// Créer une progression pour une catégorie dans une partie
const creer = async (idPartie, idCategorie, connexion = pool) => {
  const [resultat] = await connexion.query(
    `INSERT INTO progression (id_partie, id_categorie)
     VALUES (?, ?)`,
    [idPartie, idCategorie]
  );

  return resultat.insertId;
};

// Rechercher une progression par son identifiant
const trouverParId = async (idProgression) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM progression
     WHERE id_progression = ?`,
    [idProgression]
  );

  return lignes[0] || null;
};

// Récupérer toutes les progressions d'une partie
const trouverParPartie = async (idPartie) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM progression
     WHERE id_partie = ?
     ORDER BY id_categorie ASC`,
    [idPartie]
  );

  return lignes;
};

// Rechercher la progression d'une catégorie dans une partie
const trouverParPartieEtCategorie = async (idPartie, idCategorie) => {
  const [lignes] = await pool.query(
    `SELECT *
     FROM progression
     WHERE id_partie = ?
     AND id_categorie = ?`,
    [idPartie, idCategorie]
  );

  return lignes[0] || null;
};

// Modifier le score d'une progression
const modifierScore = async (idProgression, score) => {
  const [resultat] = await pool.query(
    `UPDATE progression
     SET score = ?
     WHERE id_progression = ?`,
    [score, idProgression]
  );

  return resultat.affectedRows > 0;
};

// Indiquer si le boss d'une catégorie est vaincu
const modifierBossVaincu = async (idProgression, bossVaincu) => {
  const [resultat] = await pool.query(
    `UPDATE progression
     SET boss_vaincu = ?
     WHERE id_progression = ?`,
    [bossVaincu ? 1 : 0, idProgression]
  );

  return resultat.affectedRows > 0;
};

module.exports = {
  creer,
  trouverParId,
  trouverParPartie,
  trouverParPartieEtCategorie,
  modifierScore,
  modifierBossVaincu,
};
