
-- Migration : création de la table des Refresh Tokens

CREATE TABLE refresh_token (
  id_refresh_token INT AUTO_INCREMENT PRIMARY KEY,
  id_utilisateur INT NOT NULL,

  -- Empreinte SHA-256 du Refresh Token
  token_hash CHAR(64) NOT NULL UNIQUE,

  -- Identifiant commun aux tokens d'une même session
  famille_id CHAR(36) NOT NULL,

  date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_expiration DATETIME NOT NULL,
  date_revocation DATETIME NULL,

  -- Empreinte du token qui remplace celui-ci
  remplace_par_hash CHAR(64) NULL,

  FOREIGN KEY (id_utilisateur)
    REFERENCES utilisateur(id_utilisateur)
    ON DELETE CASCADE,

  INDEX idx_refresh_token_utilisateur (id_utilisateur),
  INDEX idx_refresh_token_famille (famille_id)
);
