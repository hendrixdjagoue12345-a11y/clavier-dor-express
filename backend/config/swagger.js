
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: "Clavier d'Or API",
      version: '1.0.0',
      description: "Documentation de l'API du projet Clavier d'Or",
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement local',
      },
    ],
  },

  // Emplacement des fichiers contenant les commentaires Swagger
  apis: ['./routes/api/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
