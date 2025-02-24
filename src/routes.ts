import { Express } from 'express';
import testingPurposeRoutes from './routes/testingPurposeRoutes';
import swaggerRoutes from './routes/swaggerRoutes';
import { isDevelopmentMode } from './utils/helpers';

export const setupRoutes = (app: Express) => {
  if (isDevelopmentMode()) {
    app.use('/swagger', swaggerRoutes);
    app.use('/testing-purpose', testingPurposeRoutes);
  }
};

export default setupRoutes;
