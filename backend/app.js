// Initialiser Express.
// Configurer EJS.
// Enregistrer les middlewares.
// Configurer les sessions.
// Enregistrer les routes.
// Enregistrer la gestion des erreurs.
// Exporter l'application.

// configure Express, EJS, les middlewares et les routes, puis exporte l'application.

require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const authRoutes = require('../routes/authRoutes');
const menuRoutes = require('../routes/menuRoutes');
const errorMiddleware = require('../middleware/errorMiddleware');

const app = express();

// Vérification de la configuration des sessions
if (!process.env.SESSION_SECRET) {
  throw new Error('La variable SESSION_SECRET est manquante dans le fichier .env');
}

// Configuration des vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de traitement des requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des sessions
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

// Page d'accueil
app.get('/', (req, res) => {
  if (req.session.utilisateur) {
    return res.redirect('/menu');
  }

  return res.redirect('/connexion');
});

// Enregistrement des routes
app.use('/', authRoutes);
app.use('/', menuRoutes);

// Gestion centralisée des erreurs
app.use(errorMiddleware);

module.exports = app;
