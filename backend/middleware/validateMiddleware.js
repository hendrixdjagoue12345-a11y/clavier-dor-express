
const validerInscription = (req, res, next) => {
  const corps = req.body ?? {};

  const nomBrut = corps.nom;
  const emailBrut = corps.email;
  const motDePasse = corps.mot_de_passe ?? corps.motDePasse;

  // Vérifier que les champs sont présents et sont des chaînes
  if (
    typeof nomBrut !== 'string' ||
    typeof emailBrut !== 'string' ||
    typeof motDePasse !== 'string' ||
    !nomBrut.trim() ||
    !emailBrut.trim() ||
    !motDePasse
  ) {
    const erreur = new Error('Tous les champs sont obligatoires.');
    erreur.status = 400;
    return next(erreur);
  }

  // Nettoyer et normaliser les données
  const nom = nomBrut.trim();
  const email = emailBrut.trim().toLowerCase();

  // Vérifier la longueur du nom
  if (nom.length < 2) {
    const erreur = new Error('Le nom doit contenir au moins 2 caractères.');
    erreur.status = 400;
    return next(erreur);
  }

  // Vérifier le format de l'adresse e-mail
  const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formatEmail.test(email)) {
    const erreur = new Error('Adresse e-mail invalide.');
    erreur.status = 400;
    return next(erreur);
  }

  // Vérifier la longueur du mot de passe
  if (motDePasse.length < 8) {
    const erreur = new Error(
      'Le mot de passe doit contenir au moins 8 caractères.'
    );
    erreur.status = 400;
    return next(erreur);
  }

  // Transmettre les données normalisées aux contrôleurs
  req.body.nom = nom;
  req.body.email = email;

  return next();
};

module.exports = {
  validerInscription,
};
