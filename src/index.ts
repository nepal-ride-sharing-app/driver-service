import { Express } from 'express';
import {
  appSetupAfterRoutesAndMiddleware,
  appSetupBeforeRoutesAndMiddleware,
} from 'ride-sharing-app-common';
import setupRoutes from './routes';
import setupMiddleware from './middleware';

export const initializeServer = (app: Express) => {
  appSetupBeforeRoutesAndMiddleware(app);
  setupRoutes(app);
  setupMiddleware(app);
  appSetupAfterRoutesAndMiddleware(app);
};

export default initializeServer;
