
const tokenService = require('../../services/tokenService');
const authService = require('../../services/authService');

// Options communes des cookies
const optionsCookies = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

// Vérifier l'authentification de l'utilisateur
const verifierAuthentification = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  // Vérifier l'Access Token
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
      // On essaie de renouveler l'authentification.
    }
  }

  // Récupérer le Refresh Token
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.clearCookie('accessToken', optionsCookies);
    res.clearCookie('refreshToken', optionsCookies);
    
    return res.redirect('/connexion');
  }

  try {
    // Renouveler les deux tokens
    const resultat = await authService.renouveler(refreshToken);

    // Enregistrer le nouvel Access Token
    res.cookie('accessToken', resultat.accessToken, {
      ...optionsCookies,
      maxAge: 30 * 60 * 1000,
    });

    // Enregistrer le nouveau Refresh Token après rotation
    res.cookie('refreshToken', resultat.refreshToken, {
      ...optionsCookies,
      maxAge: 60 * 60 * 1000,
    });

    // Rendre les informations disponibles pour le contrôleur
    req.utilisateur = resultat.utilisateur;

    return next();
  } catch (erreur) {
    // Refresh Token invalide, expiré ou révoqué
    res.clearCookie('accessToken', optionsCookies);
    res.clearCookie('refreshToken', optionsCookies);

    return res.redirect('/connexion');
  }
};

module.exports = {
  verifierAuthentification,
};
