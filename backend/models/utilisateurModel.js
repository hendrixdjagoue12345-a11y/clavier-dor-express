
// Contient les requêtes SQL liées aux utilisateurs.

const pool = require('../config/db');

// Rechercher un utilisateur et son rôle à partir de son adresse e-mail
const trouverParEmail = async (email) => {
  const [utilisateurs] = await pool.query(
    `SELECT u.id_utilisateur, u.nom, u.email, u.mot_de_passe,
            r.libelle AS role
     FROM utilisateur u
     INNER JOIN role r ON r.id_role = u.id_role
     WHERE u.email = ?`,
    [email]
  );

  return utilisateurs[0] || null;
};

// Rechercher un utilisateur et son rôle à partir de son identifiant
const trouverParId = async (id) => {
  const [utilisateurs] = await pool.query(
    `SELECT u.id_utilisateur, u.nom, u.email,
            r.libelle AS role
     FROM utilisateur u
     INNER JOIN role r ON r.id_role = u.id_role
     WHERE u.id_utilisateur = ?`,
    [id]
  );

  return utilisateurs[0] || null;
};

// Vérifier si une adresse e-mail est déjà utilisée
const emailExiste = async (email) => {
  const [utilisateurs] = await pool.query(
    'SELECT id_utilisateur FROM utilisateur WHERE email = ?',
    [email]
  );

  return utilisateurs.length > 0;
};

// Enregistrer un nouvel utilisateur
const creer = async (nom, email, motDePasseHache, idRole) => {
  const [resultat] = await pool.query(
    `INSERT INTO utilisateur (nom, email, mot_de_passe, id_role)
     VALUES (?, ?, ?, ?)`,
    [nom, email, motDePasseHache, idRole]
  );

  return resultat.insertId;
};

// Exporter les fonctions du modèle
module.exports = {
  trouverParEmail,
  trouverParId,
  emailExiste,
  creer,
};
