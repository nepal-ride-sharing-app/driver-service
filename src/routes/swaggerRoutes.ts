import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { createSwaggerSpec } from '@nrsa/common/express-app/services/swagger';

const router = Router();

const swaggerSpec = createSwaggerSpec({
  title: process.env.APP_NAME || 'API',
  version: process.env.APP_VERSION || '1.0.0',
  description: process.env.APP_DESCRIPTION || 'API Documentation',
  schemas: {},
  routeDirs: ['src/routes/'],
  serverUrl: process.env.APP_URL || 'http://localhost:3000',
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
