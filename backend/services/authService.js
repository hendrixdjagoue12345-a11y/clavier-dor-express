
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const utilisateurModel = require('../models/utilisateurModel');
const roleModel = require('../models/roleModel');
const refreshTokenModel = require('../models/refreshTokenModel');
const tokenService = require('./tokenService');

// Calculer le hash SHA-256 d'un Refresh Token
const calculerHashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

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

  // Créer le compte et récupérer son identifiant
  const idUtilisateur = await utilisateurModel.creer(
    nom,
    email,
    motDePasseHache,
    role.id_role
  );

  // Récupérer les informations publiques du nouveau compte
  const utilisateur = await utilisateurModel.trouverParId(idUtilisateur);

  if (!utilisateur) {
    throw new Error('Impossible de récupérer le compte créé.');
  }

  // Retourner uniquement les informations publiques
  return {
    id: utilisateur.id_utilisateur,
    nom: utilisateur.nom,
    email: utilisateur.email,
    role: utilisateur.role,
  };
};

// Connecter un utilisateur et générer ses tokens et enregistre uniquement le hash du Refresh Token.
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

  // Générer les tokens
  const accessToken = tokenService.genererAccessToken(utilisateurConnecte);
  const refreshToken = tokenService.genererRefreshToken(utilisateurConnecte);

  // Créer une famille de Refresh Tokens
  const familleId = crypto.randomUUID();

  // Hasher le Refresh Token avant son stockage
  const tokenHash = calculerHashToken(refreshToken);

  // Définir sa date d'expiration
  const dateExpiration = new Date(Date.now() + 60 * 60 * 1000);

  // Enregistrer le Refresh Token dans la base de données
  await refreshTokenModel.creer(
    utilisateurConnecte.id,
    tokenHash,
    familleId,
    dateExpiration
  );

  return {
    utilisateur: utilisateurConnecte,
    accessToken,
    refreshToken,
  };
};

// Renouveler les tokens à partir d'un Refresh Token
const renouveler = async (refreshToken) => {
  // Vérifier la signature, le type et l'expiration du JWT
  const donnees = tokenService.verifierRefreshToken(refreshToken);

  // Calculer le hash de l'ancien Refresh Token
  const ancienTokenHash = calculerHashToken(refreshToken);

  // Générer le nouveau Refresh Token
  const nouveauRefreshToken = tokenService.genererRefreshToken({
    id: donnees.id,
  });

  const nouveauTokenHash = calculerHashToken(nouveauRefreshToken);

  const nouvelleDateExpiration = new Date(
    Date.now() + 60 * 60 * 1000
  );

  // Effectuer la rotation dans une transaction SQL
  const resultat = await refreshTokenModel.rotater(
    ancienTokenHash,
    nouveauTokenHash,
    nouvelleDateExpiration
  );

  if (resultat.statut !== 'renouvele') {
    const erreur = new Error('Impossible de renouveler le Refresh Token.');
    erreur.code = resultat.statut.toUpperCase();
    throw erreur;
  }

  // Retrouver les informations actualisées de l'utilisateur
  const utilisateur = await utilisateurModel.trouverParId(
    resultat.idUtilisateur
  );

  if (!utilisateur) {
    const erreur = new Error('Utilisateur introuvable.');
    erreur.code = 'UTILISATEUR_INTROUVABLE';
    throw erreur;
  }

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
    refreshToken: nouveauRefreshToken,
  };
};

// Déconnecter un utilisateur en révoquant son Refresh Token en DB
const deconnecter = async (refreshToken) => {
  if (!refreshToken) {
    return false;
  }

  const tokenHash = calculerHashToken(refreshToken);

  return refreshTokenModel.revoquer(tokenHash);
};

module.exports = {
  inscrire,
  connecter,
  renouveler,
  deconnecter,
};
