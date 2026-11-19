
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Charger les variables d'environnement
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

// Importer les routes Web
const authRoutes = require('./routes/web/authRoutes');
const menuRoutes = require('./routes/web/menuRoutes');

// Importer le middleware de gestion des erreurs
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Configurer le moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Configurer les ressources statiques
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Traiter les données des requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Lire les cookies envoyés par le navigateur
app.use(cookieParser());

// Enregistrer les routes Web
app.use('/', authRoutes);
app.use('/', menuRoutes);

// Rediriger la page d'accueil vers la connexion
app.get('/', (req, res) => {
  return res.redirect('/connexion');
});

// Gestion centralisée des erreurs
app.use(errorMiddleware);

// Exporter l'application
module.exports = app;
