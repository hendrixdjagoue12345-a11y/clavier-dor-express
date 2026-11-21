
const errorMiddleware = (erreur, req, res, next) => {
  console.error(erreur);

  if (res.headersSent) {
    return next(erreur);
  }

  // Identifier les erreurs liées à une adresse e-mail déjà utilisée
  const emailDejaUtilise =
    erreur.code === 'EMAIL_DEJA_UTILISE' ||
    erreur.code === 'ER_DUP_ENTRY';

  // Déterminer le statut HTTP approprié
  const statut = emailDejaUtilise ? 409 : erreur.status || 500;

  // Réponse JSON pour l'application mobile
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(statut).json({
      succes: false,
      message:
        statut < 500
          ? erreur.message
          : 'Une erreur interne est survenue.',
    });
  }

  // Réafficher le formulaire Web en cas d'erreur de validation
  if (
    req.method === 'POST' &&
    req.path === '/inscription' &&
    erreur.status === 400
  ) {
    return res.status(400).render('auth/inscription', {
      erreur: erreur.message,
      nom: req.body?.nom || '',
      email: req.body?.email || '',
    });
  }

  // Réponse générique pour les autres erreurs Web
  return res
    .status(statut)
    .send('Une erreur interne est survenue.');
};

module.exports = errorMiddleware;
