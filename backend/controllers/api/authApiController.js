
const authService = require('../../services/authService');

// Inscrire un nouveau joueur depuis l'application mobile
const inscrire = async (req, res, next) => {
  try {
    const { nom, email, motDePasse } = req.body;

    const resultat = await authService.inscrire(
      nom,
      email,
      motDePasse
    );

    return res.status(201).json({
      succes: true,
      message: 'Inscription réussie.',
      utilisateur: resultat,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

// Connecter un joueur depuis l'application mobile
const connecter = async (req, res, next) => {
  try {
    const { email, motDePasse } = req.body;

    const resultat = await authService.connecter(
      email,
      motDePasse
    );

    return res.status(200).json({
      succes: true,
      message: 'Connexion réussie.',
      utilisateur: resultat.utilisateur,
      accessToken: resultat.accessToken,
      refreshToken: resultat.refreshToken,
    });
  } catch (erreur) {
    return next(erreur);
  }
};

module.exports = {
  inscrire,
  connecter,
};
