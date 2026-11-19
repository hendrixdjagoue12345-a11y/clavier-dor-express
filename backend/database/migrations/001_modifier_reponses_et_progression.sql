-- Permet d'enregistrer une question passée sans réponse
ALTER TABLE reponse_enregistre
MODIFY COLUMN reponse_donnee ENUM('a', 'b', 'c', 'd') NULL;

-- Enregistre le joker utilisé sur une question
ALTER TABLE reponse_enregistre
ADD COLUMN id_joker_utilise INT NULL
AFTER reponse_donnee;

-- Lie le joker utilisé à la table joker
ALTER TABLE reponse_enregistre
ADD CONSTRAINT fk_reponse_joker
FOREIGN KEY (id_joker_utilise)
REFERENCES joker(id_joker);