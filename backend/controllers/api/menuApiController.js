// Renvoyer les informations de l'utilisateur connecté à l'application mobile
exports.afficherMenu = (req, res) => {
  return res.status(200).json({
    succes: true,
    utilisateur: req.utilisateur,
  });
};