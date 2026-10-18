const express = require('express');
const router = express.Router();
const { exigerConnexion } = require('../middleware/auth');

router.get('/menu', exigerConnexion, (req, res) => {
  res.render('menu', { utilisateur: req.session.utilisateur });
});

router.get('/', (req, res) => {
  res.render('index', { titre: "Clavier d'Or" });
});

module.exports = router;
