import dotenv from 'dotenv';
import { Express } from 'express';
import setupMiddleware from './middleware';
import setupRoutes from './routes';

dotenv.config();

export const initializeServer = (app: Express) => {
  // setup middleware for the app
  setupMiddleware(app);

  // setup routes for the app
  setupRoutes(app);
};

export default initializeServer;
