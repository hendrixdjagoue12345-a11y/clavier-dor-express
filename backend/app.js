
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Charger les variables d'environnement
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

// Importer les routes Web
const authRoutes = require('./routes/web/authRoutes');
const menuRoutes = require('./routes/web/menuRoutes');

// Importer les routes API pour l'application mobile
const authApiRoutes = require('./routes/api/authApiRoutes');
const menuApiRoutes = require('./routes/api/menuApiRoutes');
const jeuApiRoutes = require('./routes/api/jeuApiRoutes');

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

// Afficher la documentation interactive des API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Enregistrer les routes Web
app.use('/', authRoutes);
app.use('/', menuRoutes);

// Enregistrer les routes API pour l'application mobile
app.use('/api/auth', authApiRoutes);
app.use('/api', menuApiRoutes);
app.use('/api', jeuApiRoutes);

// Rediriger la page d'accueil vers la connexion
app.get('/', (req, res) => {
  return res.redirect('/connexion');
});

// Gestion centralisée des erreurs
app.use(errorMiddleware);

// Exporter l'application
module.exports = app;
