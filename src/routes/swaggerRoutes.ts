// filepath: /Users/Shared/CODING-SHARED/Ride Sharing App/Rider-App-Development/services/driver-service/src/routes/swaggerRoutes.ts
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../utils/swaggerConfig';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
