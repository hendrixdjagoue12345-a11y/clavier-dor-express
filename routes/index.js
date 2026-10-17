const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { titre: "Clavier d'Or" });
});

module.exports = router;
