
const tokenService = require('../services/tokenService');
const authService = require('../services/authService');

// Options du cookie Access Token
const optionsCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

// Vérifier l'authentification de l'utilisateur
const verifierAuthentification = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  // Essayer de vérifier l'Access Token
  if (accessToken) {
    try {
      const donnees = tokenService.verifierAccessToken(accessToken);

      req.utilisateur = {
        id: donnees.id,
        nom: donnees.nom,
        email: donnees.email,
        role: donnees.role,
      };

      return next();
    } catch (erreur) {
      // Access Token invalide ou expiré.
      // On essaie maintenant le Refresh Token.
    }
  }

  // Récupérer le Refresh Token
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.clearCookie('accessToken', optionsCookie);
    return res.redirect('/connexion');
  }

  try {
    // Renouveler automatiquement l'Access Token
    const resultat = await authService.renouveler(refreshToken);

    // Enregistrer le nouvel Access Token
    res.cookie('accessToken', resultat.accessToken, {
      ...optionsCookie,
      maxAge: 30 * 60 * 1000,
    });

    // Rendre les informations disponibles pour le contrôleur
    req.utilisateur = resultat.utilisateur;

    return next();
  } catch (erreur) {
    // Refresh Token invalide ou expiré
    res.clearCookie('accessToken', optionsCookie);
    res.clearCookie('refreshToken', {
      ...optionsCookie,
      maxAge: 60 * 60 * 1000,
    });

    return res.redirect('/connexion');
  }
};

module.exports = {
  verifierAuthentification,
};
