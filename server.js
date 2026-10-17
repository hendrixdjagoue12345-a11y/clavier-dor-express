require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = express();

// Moteur de vues (le "V" du MVC)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true })); // pour lire les formulaires
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // CSS, images...

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_dev',
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur Clavier d'Or démarré sur http://localhost:${PORT}`);
});
