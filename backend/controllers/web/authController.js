
const authService = require('../../services/authService');

// Options communes des cookies
const optionsCookies = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

// Afficher le formulaire d'inscription
exports.afficherFormulaireInscription = (req, res) => {
  res.render('auth/inscription', {
    titre: "Inscription - Clavier d'Or",
    fichierCss: '/css/pages/auth.css',
    erreur: null,
    nom: '',
    email: '',
  });
};

// Traiter l'inscription

exports.inscrire = async (req, res, next) => {
  const { nom, email, mot_de_passe: motDePasse } = req.body;

  try {
    await authService.inscrire(nom, email, motDePasse);

    return res.redirect('/connexion');
  } catch (erreur) {
    if (
      erreur.code === 'EMAIL_DEJA_UTILISE' ||
      erreur.code === 'ER_DUP_ENTRY'
    ) {
      return res.status(409).render('auth/inscription', {
        titre: "Inscription - Clavier d'Or",
        fichierCss: '/css/pages/auth.css',
        erreur: 'Cette adresse e-mail est déjà utilisée.',
        nom,
        email,
      });
    }

    return next(erreur);
  }
};


// Afficher le formulaire de connexion
exports.afficherFormulaireConnexion = (req, res) => {
  res.render('auth/connexion', {
    titre: "Connexion - Clavier d'Or",
    fichierCss: '/css/pages/auth.css',
    erreur: null,
    email: '',
  });
};

// Traiter la connexion
exports.connecter = async (req, res, next) => {
  const email = req.body.email?.trim().toLowerCase();
  const motDePasse = req.body.mot_de_passe;

  if (!email || !motDePasse) {
    return res.status(400).render('auth/connexion', {
      titre: "Connexion - Clavier d'Or",
      fichierCss: '/css/pages/auth.css',
      erreur: 'Tous les champs sont obligatoires.',
      email: email || '',
    });
  }

  try {
    // Vérifier les identifiants et récupérer les tokens
    const { accessToken, refreshToken } =
      await authService.connecter(email, motDePasse);

    // Stocker les tokens dans des cookies HttpOnly
    res.cookie('accessToken', accessToken, {
      ...optionsCookies,
      maxAge: 30 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      ...optionsCookies,
      maxAge: 60 * 60 * 1000,
    });

    return res.redirect('/menu');
  } catch (erreur) {
    if (erreur.code === 'IDENTIFIANTS_INVALIDES') {
      return res.status(401).render('auth/connexion', {
        titre: "Connexion - Clavier d'Or",
        fichierCss: '/css/pages/auth.css',
        erreur: 'Adresse e-mail ou mot de passe incorrect.',
        email,
      });
    }

    return next(erreur);
  }
};

// Renouveler les tokens
exports.renouveler = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.clearCookie('accessToken', optionsCookies);
    res.clearCookie('refreshToken', optionsCookies);
    return res.redirect('/connexion');
  }

  try {
    // Vérifier l'ancien Refresh Token et effectuer sa rotation
    const { accessToken, refreshToken: nouveauRefreshToken } =
      await authService.renouveler(refreshToken);

    // Remplacer le cookie Access Token
    res.cookie('accessToken', accessToken, {
      ...optionsCookies,
      maxAge: 30 * 60 * 1000,
    });

    // Remplacer également le cookie Refresh Token
    res.cookie('refreshToken', nouveauRefreshToken, {
      ...optionsCookies,
      maxAge: 60 * 60 * 1000,
    });

    return res.redirect('/menu');
  } catch (erreur) {
    // Refresh Token invalide ou utilisateur introuvable
    res.clearCookie('accessToken', optionsCookies);
    res.clearCookie('refreshToken', optionsCookies);

    return res.redirect('/connexion');
  }
};

// Déconnecter l'utilisateur
exports.deconnecter = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  try {
    // Révoquer le Refresh Token dans la base de données
    await authService.deconnecter(refreshToken);

    // Supprimer les cookies du navigateur
    res.clearCookie('accessToken', optionsCookies);
    res.clearCookie('refreshToken', optionsCookies);

    return res.redirect('/connexion');
  } catch (erreur) {
    return next(erreur);
  }
};
