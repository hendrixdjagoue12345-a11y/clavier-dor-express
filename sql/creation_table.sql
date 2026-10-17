-- Clavier d'Or : schéma de la base de données, aligné sur le MCD v2
-- ATTENTION : ce script SUPPRIME la base clavier_dor puis la recrée.
-- Après exécution, relancer 02_insertions.sql pour remettre les 100 questions.

DROP DATABASE IF EXISTS clavier_dor;

CREATE DATABASE clavier_dor
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clavier_dor;

-- Rôles des utilisateurs (Joueur, Administrateur)
CREATE TABLE role (
  id_role  INT AUTO_INCREMENT PRIMARY KEY,
  libelle  VARCHAR(50) NOT NULL UNIQUE
);

-- Comptes utilisateurs (inscription / connexion)
CREATE TABLE utilisateur (
  id_utilisateur  INT AUTO_INCREMENT PRIMARY KEY,
  nom             VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe    VARCHAR(255) NOT NULL,  -- toujours haché (bcrypt), jamais en clair
  id_role         INT NOT NULL,
  FOREIGN KEY (id_role) REFERENCES role(id_role)
);

-- Parties jouées (nouvelle partie, reprise, historique)
CREATE TABLE partie (
  id_partie                 INT AUTO_INCREMENT PRIMARY KEY,
  id_utilisateur            INT NOT NULL,
  date_creation             DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_derniere_sauvegarde  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  statut                    ENUM('en_cours', 'terminee') NOT NULL DEFAULT 'en_cours',
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

-- Catégories du quiz
CREATE TABLE categorie (
  id_categorie  INT AUTO_INCREMENT PRIMARY KEY,
  nom           VARCHAR(100) NOT NULL UNIQUE
);

-- Questions (20 par catégorie)
CREATE TABLE question (
  id_question    INT AUTO_INCREMENT PRIMARY KEY,
  id_categorie   INT NOT NULL,
  enonce         TEXT NOT NULL,
  reponse_a      VARCHAR(255) NOT NULL,
  reponse_b      VARCHAR(255) NOT NULL,
  reponse_c      VARCHAR(255) NOT NULL,
  reponse_d      VARCHAR(255) NOT NULL,
  bonne_reponse  ENUM('a', 'b', 'c', 'd') NOT NULL,
  FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
);

-- Progression d'une partie dans chaque catégorie (score + boss vaincu ou non)
CREATE TABLE progression (
  id_progression  INT AUTO_INCREMENT PRIMARY KEY,
  id_partie       INT NOT NULL,
  id_categorie    INT NOT NULL,
  score           INT NOT NULL DEFAULT 0,
  boss_vaincu     BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (id_partie) REFERENCES partie(id_partie) ON DELETE CASCADE,
  FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie),
  UNIQUE (id_partie, id_categorie)  -- une seule progression par catégorie et par partie
);

-- Types de jokers disponibles
CREATE TABLE joker (
  id_joker     INT AUTO_INCREMENT PRIMARY KEY,
  nom          VARCHAR(50) NOT NULL UNIQUE,
  description  VARCHAR(255)
);

-- Stock de jokers d'une progression (quantité de départ et quantité restante)
CREATE TABLE progression_joker (
  id_progression_joker  INT AUTO_INCREMENT PRIMARY KEY,
  id_progression        INT NOT NULL,
  id_joker              INT NOT NULL,
  quantite_initiale     INT NOT NULL DEFAULT 1,
  quantite_restante     INT NOT NULL DEFAULT 1,
  FOREIGN KEY (id_progression) REFERENCES progression(id_progression) ON DELETE CASCADE,
  FOREIGN KEY (id_joker) REFERENCES joker(id_joker),
  UNIQUE (id_progression, id_joker),
  CHECK (quantite_restante >= 0 AND quantite_restante <= quantite_initiale)
);

-- Réponses données pendant une partie (permet de reprendre en plein quiz)
CREATE TABLE reponse_enregistre (
  id_reponse_enregistre  INT AUTO_INCREMENT PRIMARY KEY,
  id_partie              INT NOT NULL,
  id_question            INT NOT NULL,
  reponse_donnee         ENUM('a', 'b', 'c', 'd') NOT NULL,
  est_correcte           BOOLEAN NOT NULL,
  date_reponse           DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_partie) REFERENCES partie(id_partie) ON DELETE CASCADE,
  FOREIGN KEY (id_question) REFERENCES question(id_question),
  UNIQUE (id_partie, id_question)  -- une même question n'est répondue qu'une fois par partie
);

-- Données de base
-- Les catégories doivent rester dans cet ordre (ids 1 à 5 utilisés par 02_insertions.sql)

INSERT INTO role (libelle) VALUES
  ('Joueur'),
  ('Administrateur');

INSERT INTO categorie (nom) VALUES
  ('Algorithmes'),
  ('Métiers de l''informatique'),
  ('Logique'),
  ('Culture générale'),
  ('Anglais');

-- Jokers du jeu
INSERT INTO joker (nom, description) VALUES
  ('50/50', 'Supprime deux mauvaises réponses'),
  ('Passer', 'Passe la question sans pénalité'),
  ('Seconde chance', 'Permet de répondre une deuxième fois après une mauvaise réponse');
