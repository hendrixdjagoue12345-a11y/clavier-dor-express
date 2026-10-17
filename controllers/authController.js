exports.inscrire = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  if (!nom || !email || !mot_de_passe) {
    return res.status(400).send('Tous les champs sont obligatoires');
  }
   
  const bcrypt = require('bcrypt');
  try {
    const [existants] = await pool.query(
      'SELECT id_utilisateur FROM utilisateur WHERE email = ?',
      [email]
    );
    if (existants.length > 0) {
      return res.status(400).send('Cet email est déjà utilisé');
    }

    const hash = await bcrypt.hash(mot_de_passe, 10);

    await pool.query(
      `INSERT INTO utilisateur (nom, email, mot_de_passe, id_role)
       VALUES (?, ?, ?, (SELECT id_role FROM role WHERE libelle = 'Joueur'))`,
      [nom, email, hash]
    );

    res.redirect('/connexion');
  } catch (erreur) {
    console.error(erreur);
    res.status(500).send("Erreur lors de l'inscription");
  }
};