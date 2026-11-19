
require('dotenv').config();

const jwt = require('jsonwebtoken');

// Vérifier que la clé secrète existe
if (!process.env.JWT_SECRET) {
  throw new Error('La variable JWT_SECRET est manquante dans le fichier .env');
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
    process.env.JWT_SECRET,
    {
      expiresIn: '30m',
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
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
};

// Vérifier un Access Token
const verifierAccessToken = (token) => {
  const donnees = jwt.verify(token, process.env.JWT_SECRET);

  if (donnees.type !== 'access') {
    throw new Error('Type de token invalide.');
  }

  return donnees;
};

// Vérifier un Refresh Token
const verifierRefreshToken = (token) => {
  const donnees = jwt.verify(token, process.env.JWT_SECRET);

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
