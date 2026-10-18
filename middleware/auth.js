// Bloque l'accès aux pages réservées aux utilisateurs connectés
exports.exigerConnexion = (req, res, next) => {
  if (!req.session.utilisateur) {
    return res.redirect('/connexion');
  }
  next();
};