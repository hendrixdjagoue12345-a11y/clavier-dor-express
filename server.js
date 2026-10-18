
require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = express();

// Vérifie que le secret de session est configuré
if (!process.env.SESSION_SECRET) {
  throw new Error('La variable SESSION_SECRET est manquante dans le fichier .env');
}

// Moteur de vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Gestion des sessions
app.use(
  session({
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
  })
);

// Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);

// Gestion des erreurs
app.use((erreur, req, res, next) => {
  console.error(erreur);

  if (res.headersSent) {
    return next(erreur);
  }

  return res.status(500).send('Une erreur interne est survenue');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur Clavier d'Or démarré sur http://localhost:${PORT}`);
});
