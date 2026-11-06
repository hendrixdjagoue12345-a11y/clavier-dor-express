-- Clavier d'Or - Jeu de données : questions
-- 20 questions x 5 catégories = 100 questions
-- id_categorie : 1=Algorithmes, 2=Métiers de l''informatique,
--                3=Logique, 4=Culture générale, 5=Anglais

USE clavier_dor;

-- Catégorie 1 : Algorithmes
INSERT INTO question (id_categorie, enonce, reponse_a, reponse_b, reponse_c, reponse_d, bonne_reponse) VALUES
(1, 'Qu''est-ce qu''une variable en programmation ?', 'Un espace de stockage nommé pour une valeur', 'Une fonction', 'Un type de boucle', 'Un fichier', 'a'),
(1, 'Quelle structure permet de répéter une action plusieurs fois ?', 'Une condition', 'Une boucle', 'Une variable', 'Un commentaire', 'b'),
(1, 'Que fait une instruction "if" ?', 'Elle répète du code', 'Elle exécute du code seulement si une condition est vraie', 'Elle déclare une variable', 'Elle arrête le programme', 'b'),
(1, 'Qu''est-ce qu''une fonction en programmation ?', 'Un bloc de code réutilisable qui effectue une tâche', 'Un type de donnée', 'Une erreur du programme', 'Une base de données', 'a'),
(1, 'Quel type de données stocke un nombre entier ?', 'String', 'Boolean', 'Integer', 'Array', 'c'),
(1, 'Que représente une boucle "while" ?', 'Elle s''exécute tant qu''une condition est vraie', 'Elle s''exécute une seule fois', 'Elle stocke des données', 'Elle définit une fonction', 'a'),
(1, 'Qu''est-ce qu''un tableau (array) en programmation ?', 'Une variable unique', 'Une collection ordonnée de plusieurs valeurs', 'Une boucle', 'Une fonction', 'b'),
(1, 'Que signifie "débugger" un programme ?', 'L''écrire depuis le début', 'Corriger les erreurs qu''il contient', 'Le supprimer', 'Le compiler', 'b'),
(1, 'Quel opérateur permet de vérifier si deux valeurs sont égales en JavaScript ?', '=', '==', '+', ';', 'b'),
(1, 'Qu''est-ce qu''un commentaire dans le code ?', 'Une ligne exécutée par le programme', 'Une note ignorée par l''ordinateur, pour les développeurs', 'Une erreur', 'Une variable', 'b'),
(1, 'Que fait l''opérateur booléen "ET" (AND) ?', 'Il est vrai si au moins une condition est vraie', 'Il est vrai seulement si toutes les conditions sont vraies', 'Il inverse une valeur', 'Il additionne des nombres', 'b'),
(1, 'Qu''est-ce qu''une condition "else" ?', 'Elle s''exécute si la condition "if" est fausse', 'Elle s''exécute toujours', 'Elle déclare une variable', 'Elle stoppe le programme', 'a'),
(1, 'Quel est le rôle d''un algorithme ?', 'Décorer une interface', 'Décrire une suite d''étapes pour résoudre un problème', 'Stocker des mots de passe', 'Afficher des images', 'b'),
(1, 'Qu''est-ce qu''une chaîne de caractères (string) ?', 'Un nombre décimal', 'Une suite de caractères (texte)', 'Une valeur vraie/fausse', 'Une boucle', 'b'),
(1, 'Que permet de faire une boucle "for" avec un compteur ?', 'Répéter une action un nombre précis de fois', 'Stocker une seule valeur', 'Vérifier une condition unique', 'Arrêter le programme', 'a'),
(1, 'Qu''est-ce qu''un booléen ?', 'Un type qui vaut vrai ou faux', 'Un tableau de nombres', 'Une chaîne de caractères', 'Une fonction', 'a'),
(1, 'Que fait l''instruction "return" dans une fonction ?', 'Elle supprime la fonction', 'Elle renvoie une valeur depuis la fonction', 'Elle crée une boucle', 'Elle affiche une erreur', 'b'),
(1, 'Qu''est-ce qu''un paramètre dans une fonction ?', 'Une valeur donnée en entrée à la fonction', 'Le nom de la fonction', 'Une erreur de syntaxe', 'Un commentaire', 'a'),
(1, 'Que signifie "compiler" un programme, pour les langages qui le nécessitent ?', 'L''exécuter directement sans transformation', 'Le traduire en code machine avant exécution', 'Le supprimer', 'Le documenter', 'b'),
(1, 'Qu''est-ce qu''un indice (index) dans un tableau ?', 'La valeur maximale du tableau', 'La position d''un élément dans le tableau', 'Le nombre total d''éléments', 'Un type de boucle', 'b');

-- Catégorie 2 : Métiers de l'informatique
INSERT INTO question (id_categorie, enonce, reponse_a, reponse_b, reponse_c, reponse_d, bonne_reponse) VALUES
(2, 'Quel métier conçoit l''architecture technique globale d''un système d''information ?', 'Développeur front-end', 'Architecte logiciel', 'Community manager', 'Chef de projet marketing', 'b'),
(2, 'Quel est le rôle principal d''un DevOps ?', 'Créer des designs graphiques', 'Faciliter la collaboration dev/exploitation et automatiser les déploiements', 'Gérer uniquement la paie', 'Faire de la publicité en ligne', 'b'),
(2, 'Que fait un administrateur systèmes et réseaux ?', 'Il gère et maintient serveurs, réseaux et infrastructures', 'Il conçoit des interfaces utilisateur', 'Il rédige des contrats juridiques', 'Il code exclusivement des jeux vidéo', 'a'),
(2, 'Quel métier se concentre sur l''analyse des données pour en tirer des informations utiles ?', 'Data analyst', 'Community manager', 'UX writer', 'Technicien réseau', 'a'),
(2, 'Qu''est-ce qu''un développeur "full-stack" ?', 'Un développeur qui travaille uniquement sur les bases de données', 'Un développeur qui travaille à la fois sur le front-end et le back-end', 'Un développeur spécialisé uniquement en sécurité', 'Un développeur qui ne fait que des tests', 'b'),
(2, 'Quel métier est responsable de la sécurité informatique d''une entreprise ?', 'RSSI (Responsable de la Sécurité des Systèmes d''Information)', 'Chef de produit', 'Designer UX', 'Community manager', 'a'),
(2, 'Que fait un chef de projet informatique ?', 'Il code exclusivement l''application', 'Il planifie, coordonne et suit l''avancement d''un projet', 'Il répare le matériel informatique', 'Il vend des ordinateurs', 'b'),
(2, 'Quel métier conçoit l''expérience et l''ergonomie d''une interface utilisateur ?', 'Designer UX/UI', 'Administrateur base de données', 'Technicien de maintenance', 'Ingénieur réseau', 'a'),
(2, 'Qu''est-ce qu''un DBA (Database Administrator) ?', 'Un développeur de jeux vidéo', 'Un administrateur qui gère et optimise les bases de données', 'Un graphiste', 'Un commercial', 'b'),
(2, 'Quel métier teste les logiciels pour détecter les bugs avant leur mise en production ?', 'Testeur QA (Quality Assurance)', 'Community manager', 'Designer graphique', 'Comptable', 'a'),
(2, 'Que fait un ingénieur en intelligence artificielle ?', 'Il conçoit des sites web statiques uniquement', 'Il développe des modèles et algorithmes d''apprentissage automatique', 'Il gère la paie', 'Il répare les imprimantes', 'b'),
(2, 'Quel métier gère le support technique auprès des utilisateurs (tickets, dépannage) ?', 'Technicien support / helpdesk', 'Data scientist', 'UX designer', 'Product owner', 'a'),
(2, 'Qu''est-ce qu''un Product Owner dans une équipe agile ?', 'La personne qui écrit tout le code', 'La personne qui représente les besoins métier et priorise le travail', 'Le responsable du réseau uniquement', 'Le graphiste de l''équipe', 'b'),
(2, 'Quel métier se spécialise dans le test d''intrusion pour trouver des failles de sécurité ?', 'Pentester (testeur d''intrusion)', 'Community manager', 'UX writer', 'Support niveau 1', 'a'),
(2, 'Que fait un développeur mobile ?', 'Il conçoit uniquement des sites web', 'Il développe des applications pour smartphones et tablettes', 'Il gère les réseaux sociaux', 'Il configure des imprimantes', 'b'),
(2, 'Quel métier s''occupe de la gestion et l''analyse de grands volumes de données (Big Data) ?', 'Data engineer', 'Community manager', 'Designer print', 'Réceptionniste', 'a'),
(2, 'Qu''est-ce qu''un Scrum Master ?', 'Un développeur senior uniquement', 'La personne qui facilite l''application de la méthode agile Scrum', 'Un technicien réseau', 'Un designer', 'b'),
(2, 'Quel métier conçoit et maintient les infrastructures cloud (AWS, Azure, GCP...) ?', 'Ingénieur cloud', 'Community manager', 'Graphiste', 'Traducteur', 'a'),
(2, 'Que fait un développeur back-end ?', 'Il crée uniquement l''apparence visuelle d''un site', 'Il développe la logique serveur, les bases de données et les API', 'Il gère les réseaux sociaux', 'Il fait de la maintenance matérielle uniquement', 'b'),
(2, 'Quel métier s''occupe de la maintenance du parc informatique d''une entreprise ?', 'Technicien informatique', 'Data scientist', 'UX designer', 'Community manager', 'a');

-- Catégorie 3 : Logique
INSERT INTO question (id_categorie, enonce, reponse_a, reponse_b, reponse_c, reponse_d, bonne_reponse) VALUES
(3, 'Complète la suite : 2, 4, 8, 16, ... ?', '20', '24', '32', '30', 'c'),
(3, 'Si tous les chats sont des mammifères et que Félix est un chat, alors :', 'Félix est un mammifère', 'Félix n''est pas un mammifère', 'On ne peut rien dire', 'Félix est un reptile', 'a'),
(3, 'Complète la suite : 1, 1, 2, 3, 5, 8, ... ?', '11', '13', '12', '10', 'b'),
(3, 'Combien font 7 × 8 ?', '54', '56', '64', '49', 'b'),
(3, 'Si A > B et B > C, alors :', 'A > C', 'A < C', 'A = C', 'On ne peut rien dire', 'a'),
(3, 'Quel nombre complète la suite : 3, 6, 9, 12, ... ?', '14', '15', '16', '18', 'b'),
(3, 'Un train part à 14h et met 2h30 pour arriver. À quelle heure arrive-t-il ?', '16h00', '16h30', '17h00', '15h30', 'b'),
(3, 'Quelle est la valeur logique de "NON (vrai ET faux)" ?', 'Vrai', 'Faux', 'Indéterminé', 'Les deux', 'a'),
(3, 'Complète la suite : Z, Y, X, W, ... ?', 'U', 'V', 'T', 'S', 'b'),
(3, 'Si tous les A sont B, et qu''aucun B n''est C, alors :', 'Aucun A n''est C', 'Tous les A sont C', 'Certains A sont C', 'On ne peut rien dire', 'a'),
(3, 'Quel est le résultat de (5 + 3) × 2 - 4 ?', '10', '12', '14', '16', 'b'),
(3, 'Complète la suite logique : cercle, carré, cercle, carré, ... ?', 'Triangle', 'Cercle', 'Carré', 'Losange', 'b'),
(3, 'Paul dit : "Je mesure 1m80, j''ai les yeux bleus, je suis né en 1990". S''il ment sur une seule de ces trois affirmations, que peut-on affirmer ?', 'Au moins deux de ses affirmations sont vraies', 'Toutes ses affirmations sont fausses', 'On ne peut jamais savoir', 'Il ment forcément sur son âge', 'a'),
(3, 'Quel est l''intrus dans cette liste : Carré, Triangle, Cercle, Rouge ?', 'Carré', 'Triangle', 'Cercle', 'Rouge', 'd'),
(3, 'Si aujourd''hui on est mercredi, quel jour serons-nous dans 10 jours ?', 'Samedi', 'Dimanche', 'Vendredi', 'Lundi', 'a'),
(3, 'Combien de côtés a un hexagone ?', '5', '6', '7', '8', 'b'),
(3, 'Quelle est la suite logique : 100, 50, 25, 12.5, ... ?', '6', '6.25', '5', '10', 'b'),
(3, 'Si "tous les carrés sont des rectangles", peut-on dire que "tous les rectangles sont des carrés" ?', 'Oui, toujours', 'Non, ce n''est pas toujours vrai', 'C''est la même chose', 'Aucun rectangle n''est un carré', 'b'),
(3, 'Complète la suite : 5, 10, 20, 40, ... ?', '60', '70', '80', '45', 'c'),
(3, 'Si un train roule à 60 km/h, quelle distance parcourt-il en 3 heures ?', '120 km', '150 km', '180 km', '200 km', 'c');

-- Catégorie 4 : Culture générale
INSERT INTO question (id_categorie, enonce, reponse_a, reponse_b, reponse_c, reponse_d, bonne_reponse) VALUES
(4, 'Qui a écrit "Les Misérables" ?', 'Victor Hugo', 'Émile Zola', 'Albert Camus', 'Molière', 'a'),
(4, 'Quel est le plus long fleuve de France ?', 'La Seine', 'La Loire', 'Le Rhône', 'La Garonne', 'b'),
(4, 'Quel réalisateur a créé la saga cinématographique "Star Wars" ?', 'Steven Spielberg', 'George Lucas', 'James Cameron', 'Christopher Nolan', 'b'),
(4, 'Quel groupe britannique a sorti l''album "Abbey Road" ?', 'The Rolling Stones', 'The Beatles', 'Queen', 'Pink Floyd', 'b'),
(4, 'Dans quel jeu vidéo incarne-t-on un plombier italien nommé Mario ?', 'Sonic the Hedgehog', 'Super Mario Bros', 'The Legend of Zelda', 'Pac-Man', 'b'),
(4, 'Quel est le symbole chimique de l''or ?', 'Ag', 'Au', 'Fe', 'Or', 'b'),
(4, 'Qui a peint "La Joconde" ?', 'Vincent van Gogh', 'Pablo Picasso', 'Léonard de Vinci', 'Claude Monet', 'c'),
(4, 'Quelle est la capitale de l''Italie ?', 'Milan', 'Venise', 'Rome', 'Naples', 'c'),
(4, 'Quel film raconte le naufrage du Titanic et a remporté l''Oscar du meilleur film en 1998 ?', 'Titanic', 'Braveheart', 'Gladiator', 'Forrest Gump', 'a'),
(4, 'Combien de temps dure généralement une partie d''échecs entre joueurs expérimentés ?', 'Quelques minutes', 'De plusieurs dizaines de minutes à plusieurs heures', 'Toujours exactement 1 heure', 'Une journée entière', 'b'),
(4, 'Qui est l''auteur de la saga littéraire "Harry Potter" ?', 'J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin', 'Stephen King', 'b'),
(4, 'Quel jeu vidéo de construction en blocs a été créé par Mojang ?', 'Fortnite', 'Minecraft', 'Roblox', 'Terraria', 'b'),
(4, 'Quelle est la monnaie utilisée au Japon ?', 'Le won', 'Le yen', 'Le yuan', 'Le ringgit', 'b'),
(4, 'Quel compositeur autrichien a écrit "La Flûte enchantée" ?', 'Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Frédéric Chopin', 'b'),
(4, 'Dans quelle ville se déroule principalement le jeu vidéo "Grand Theft Auto V" ?', 'Liberty City', 'Los Santos', 'Vice City', 'San Fierro', 'b'),
(4, 'Quel réalisateur français est connu pour "Le Fabuleux Destin d''Amélie Poulain" ?', 'Luc Besson', 'Jean-Pierre Jeunet', 'Claude Lelouch', 'François Truffaut', 'b'),
(4, 'Combien y a-t-il de joueurs sur le terrain dans une équipe de football (hors remplaçants) ?', '9', '10', '11', '12', 'c'),
(4, 'Quel est le plus haut sommet du monde ?', 'Le Mont Blanc', 'Le K2', 'L''Everest', 'Le Kilimandjaro', 'c'),
(4, 'Quel écrivain français est l''auteur de "L''Étranger" ?', 'Albert Camus', 'Jean-Paul Sartre', 'Marcel Proust', 'Gustave Flaubert', 'a'),
(4, 'Quel est le nom du personnage principal de la série de jeux vidéo "The Legend of Zelda" ?', 'Zelda', 'Link', 'Ganon', 'Epona', 'b');

-- Catégorie 5 : Anglais
INSERT INTO question (id_categorie, enonce, reponse_a, reponse_b, reponse_c, reponse_d, bonne_reponse) VALUES
(5, 'Comment dit-on "ordinateur" en anglais ?', 'Computer', 'Keyboard', 'Screen', 'Mouse', 'a'),
(5, 'Quelle est la traduction correcte de "Je suis fatigué" ?', 'I am tired', 'I am happy', 'I am hungry', 'I am cold', 'a'),
(5, 'Complète : "She ___ to school every day."', 'go', 'goes', 'going', 'gone', 'b'),
(5, 'Quel est le pluriel de "child" ?', 'childs', 'children', 'childes', 'child''s', 'b'),
(5, 'Que signifie "to develop" en français ?', 'Effacer', 'Développer', 'Détruire', 'Décorer', 'b'),
(5, 'Quelle phrase est correctement formée au passé ?', 'I go to Paris yesterday', 'I went to Paris yesterday', 'I goes to Paris yesterday', 'I going to Paris yesterday', 'b'),
(5, 'Comment dit-on "clavier" en anglais ?', 'Screen', 'Mouse', 'Keyboard', 'Cable', 'c'),
(5, 'Complète : "There ___ many books on the table."', 'is', 'are', 'be', 'was', 'b'),
(5, 'Dans un contexte informatique, que signifie "bug" ?', 'Un insecte', 'Une erreur ou un défaut dans un programme', 'Un objet physique', 'Une base de données', 'b'),
(5, 'Choisis la bonne forme : "If it rains, I ___ stay home."', 'will', 'would', 'am', 'was', 'a'),
(5, 'Que signifie "deadline" ?', 'Une ligne droite', 'Une date limite', 'Une erreur de code', 'Un serveur', 'b'),
(5, 'Complète : "I have ___ apple."', 'a', 'an', 'the', 'some', 'b'),
(5, 'Quel est le contraire de "difficult" ?', 'Hard', 'Easy', 'Complex', 'Complicated', 'b'),
(5, 'Comment dit-on "je pense que" en anglais ?', 'I think that', 'I thought', 'I am think', 'I thinking', 'a'),
(5, 'Quelle est la traduction de "network" ?', 'Réseau', 'Ordinateur', 'Logiciel', 'Base de données', 'a'),
(5, 'Complète : "They ___ finished the project yet."', 'haven''t', 'hasn''t', 'didn''t', 'not', 'a'),
(5, 'Quel mot signifie "développeur" en anglais ?', 'Designer', 'Developer', 'Manager', 'Engineer', 'b'),
(5, 'Choisis la traduction correcte de "Quelle heure est-il ?"', 'What time is it?', 'What hour is it?', 'Which time is?', 'How much time is it?', 'a'),
(5, 'Que signifie "to debug" ?', 'Créer un bug', 'Corriger les erreurs d''un programme', 'Supprimer un fichier', 'Installer un logiciel', 'b'),
(5, 'Complète : "This is the ___ book I have ever read."', 'gooder', 'best', 'more good', 'goodest', 'b');
