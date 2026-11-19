// récupère l'utilisateur identifié par le middleware JWT 
// et transmet ses informations à la vue EJS

exports.afficherMenu = (req, res) => {
  res.render('jeu/menu', {
    utilisateur: req.utilisateur,
  });
};
