// Contrôleur d'authentification : inscription, connexion, déconnexion
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Affiche le formulaire d'inscription
exports.afficherFormulaireInscription = (req, res) => {
  res.render('inscription');
};

// Crée un nouveau compte avec le rôle "Joueur"
exports.inscrire = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  if (!nom || !email || !mot_de_passe) {
    return res.status(400).send('Tous les champs sont obligatoires');
  }

  try {
    // L'email doit être unique
    const [existants] = await pool.query(
      'SELECT id_utilisateur FROM utilisateur WHERE email = ?',
      [email]
    );
    if (existants.length > 0) {
      return res.status(400).send('Cet email est déjà utilisé');
    }

    // Le mot de passe est haché, jamais stocké en clair
    const hash = await bcrypt.hash(mot_de_passe, 10);

    await pool.query(
      `INSERT INTO utilisateur (nom, email, mot_de_passe, id_role)
       VALUES (?, ?, ?, (SELECT id_role FROM role WHERE libelle = 'Joueur'))`,
      [nom, email, hash]
    );

    res.redirect('/connexion');
  } catch (erreur) {
    console.error(erreur);
    res.status(500).send("Erreur lors de l'inscription");
  }
};

// Affiche le formulaire de connexion
exports.afficherFormulaireConnexion = (req, res) => {
  res.render('connexion');
};

// Vérifie l'email et le mot de passe, puis ouvre la session
exports.connecter = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).send('Tous les champs sont obligatoires');
  }

  try {
    const [lignes] = await pool.query(
      `SELECT u.id_utilisateur, u.nom, u.mot_de_passe, r.libelle AS role
       FROM utilisateur u
       JOIN role r ON r.id_role = u.id_role
       WHERE u.email = ?`,
      [email]
    );

    const utilisateur = lignes[0];
    const motDePasseValide =
      utilisateur && (await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe));

    // Même message dans les deux cas : on ne révèle pas si l'email existe
    if (!motDePasseValide) {
      return res.status(401).send('Email ou mot de passe incorrect');
    }

    req.session.utilisateur = {
      id: utilisateur.id_utilisateur,
      nom: utilisateur.nom,
      role: utilisateur.role,
    };
    res.redirect('/menu');
  } catch (erreur) {
    console.error(erreur);
    res.status(500).send('Erreur lors de la connexion');
  }
};

// Détruit la session et renvoie vers l'accueil
exports.deconnecter = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};