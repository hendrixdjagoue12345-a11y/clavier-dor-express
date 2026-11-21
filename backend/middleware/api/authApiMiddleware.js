
const tokenService = require('../../services/tokenService');

// Vérifier l'authentification d'un utilisateur de l'API mobile
const verifierAuthentification = (req, res, next) => {
  // Récupérer l'en-tête Authorization
  const authorization = req.get('Authorization');

  // Vérifier la présence du Bearer Token
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      succes: false,
      message: 'Authentification requise.',
    });
  }

  // Extraire le token après "Bearer "
  const accessToken = authorization.slice(7).trim();

  if (!accessToken) {
    return res.status(401).json({
      succes: false,
      message: 'Access Token manquant.',
    });
  }

  try {
    // Vérifier le token
    const donnees = tokenService.verifierAccessToken(accessToken);

    // Rendre les informations du joueur disponibles
    req.utilisateur = {
      id: donnees.id,
      nom: donnees.nom,
      email: donnees.email,
      role: donnees.role,
    };

    return next();
  } catch (erreur) {
    // Token invalide ou expiré
    return res.status(401).json({
      succes: false,
      message: 'Access Token invalide ou expiré.',
    });
  }
};

module.exports = {
  verifierAuthentification,
};
