// centralise la configuration des sessions Web. 
// doit définir la configuration des sessions.


const session = require('express-session');

// Vérifier que le secret de session est configuré.
if (!process.env.SESSION_SECRET) {
  throw new Error('La variable SESSION_SECRET est manquante dans le fichier .env');
}

// Configuration des sessions Web.
const sessionConfig = session({
  name: 'clavierdor.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2,
  },
});

module.exports = sessionConfig;
