
const bcrypt = require('bcrypt');

const utilisateurModel = require('../models/utilisateurModel');
const roleModel = require('../models/roleModel');
const tokenService = require('./tokenService');

// Inscrire un nouvel utilisateur
const inscrire = async (nom, email, motDePasse) => {
  const existe = await utilisateurModel.emailExiste(email);

  if (existe) {
    const erreur = new Error('Cette adresse e-mail est déjà utilisée.');
    erreur.code = 'EMAIL_DEJA_UTILISE';
    throw erreur;
  }

  const role = await roleModel.trouverParLibelle('Joueur');

  if (!role) {
    throw new Error('Le rôle Joueur est introuvable.');
  }

  const motDePasseHache = await bcrypt.hash(motDePasse, 10);

  return utilisateurModel.creer(
    nom,
    email,
    motDePasseHache,
    role.id_role
  );
};

// Connecter un utilisateur et générer ses tokens
const connecter = async (email, motDePasse) => {
  const utilisateur = await utilisateurModel.trouverParEmail(email);

  const motDePasseValide = utilisateur
    ? await bcrypt.compare(motDePasse, utilisateur.mot_de_passe)
    : false;

  if (!motDePasseValide) {
    const erreur = new Error('Adresse e-mail ou mot de passe incorrect.');
    erreur.code = 'IDENTIFIANTS_INVALIDES';
    throw erreur;
  }

  const utilisateurConnecte = {
    id: utilisateur.id_utilisateur,
    nom: utilisateur.nom,
    email: utilisateur.email,
    role: utilisateur.role,
  };

  const accessToken = tokenService.genererAccessToken(utilisateurConnecte);
  const refreshToken = tokenService.genererRefreshToken(utilisateurConnecte);

  return {
    utilisateur: utilisateurConnecte,
    accessToken,
    refreshToken,
  };
};


// Renouveler l'Access Token à partir du Refresh Token
const renouveler = async (refreshToken) => {
  // Vérifier le Refresh Token
  const donnees = tokenService.verifierRefreshToken(refreshToken);

  // Retrouver l'utilisateur dans la base de données
  const utilisateur = await utilisateurModel.trouverParId(donnees.id);

  if (!utilisateur) {
    const erreur = new Error('Utilisateur introuvable.');
    erreur.code = 'UTILISATEUR_INTROUVABLE';
    throw erreur;
  }

  // Préparer les informations actualisées de l'utilisateur
  const utilisateurConnecte = {
    id: utilisateur.id_utilisateur,
    nom: utilisateur.nom,
    email: utilisateur.email,
    role: utilisateur.role,
  };

  // Générer un nouvel Access Token
  const accessToken = tokenService.genererAccessToken(utilisateurConnecte);

  return {
    utilisateur: utilisateurConnecte,
    accessToken,
  };
};


module.exports = {
  inscrire,
  connecter,
  renouveler,
};
