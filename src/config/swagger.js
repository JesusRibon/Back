import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Configuración de Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gestión de Deudas",
      version: "1.0.0",
      description: "Documentación de la API de gestión de deudas entre amigos",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
