
const errorMiddleware = (erreur, req, res, next) => {
  console.error(erreur);

  if (res.headersSent) {
    return next(erreur);
  }

  return res.status(500).send('Une erreur interne est survenue.');
};

module.exports = errorMiddleware;
