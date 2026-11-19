
require('dotenv').config();

const jwt = require('jsonwebtoken');

// Récupérer les clés secrètes
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

// Vérifier que les deux clés existent
if (!accessSecret || !refreshSecret) {
  throw new Error(
    'Les variables JWT_ACCESS_SECRET et JWT_REFRESH_SECRET sont obligatoires.'
  );
}

// Générer un Access Token valable 30 minutes
const genererAccessToken = (utilisateur) => {
  return jwt.sign(
    {
      id: utilisateur.id,
      nom: utilisateur.nom,
      email: utilisateur.email,
      role: utilisateur.role,
      type: 'access',
    },
    accessSecret,
    {
      expiresIn: '30m',
      algorithm: 'HS256',
    }
  );
};

// Générer un Refresh Token valable 1 heure
const genererRefreshToken = (utilisateur) => {
  return jwt.sign(
    {
      id: utilisateur.id,
      type: 'refresh',
    },
    refreshSecret,
    {
      expiresIn: '1h',
      algorithm: 'HS256',
    }
  );
};

// Vérifier un Access Token
const verifierAccessToken = (token) => {
  const donnees = jwt.verify(token, accessSecret, {
    algorithms: ['HS256'],
  });

  if (donnees.type !== 'access') {
    throw new Error('Type de token invalide.');
  }

  return donnees;
};

// Vérifier un Refresh Token
const verifierRefreshToken = (token) => {
  const donnees = jwt.verify(token, refreshSecret, {
    algorithms: ['HS256'],
  });

  if (donnees.type !== 'refresh') {
    throw new Error('Type de token invalide.');
  }

  return donnees;
};

module.exports = {
  genererAccessToken,
  genererRefreshToken,
  verifierAccessToken,
  verifierRefreshToken,
};
