import { Express } from 'express';
import {
  appSetupAfterRoutesAndMiddleware,
  appSetupBeforeRoutesAndMiddleware,
} from 'ride-sharing-app-common';
import setupRoutes from './routes';

export const initializeServer = (app: Express) => {
  appSetupBeforeRoutesAndMiddleware(app);
  setupRoutes(app);
  appSetupAfterRoutesAndMiddleware(app);
};

export default initializeServer;
