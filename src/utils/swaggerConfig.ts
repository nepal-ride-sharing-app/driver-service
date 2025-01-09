import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Driver Service API',
      version: '1.0.0',
      description: 'API documentation for the Driver Service',
    },
    servers: [
      {
        url: process.env.APP_URL || 'http://localhost:3000', // Use APP_URL from environment variables or fallback to localhost
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
