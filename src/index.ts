import dotenv from 'dotenv';
import { Express } from 'express';
import fs from 'fs';
import path from 'path';
import setupMiddleware from './middleware';
import setupRoutes from './routes';

const loadEnvironmentVariables = () => {
  // Load environment variables based on the current stage
  const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
  // check if the file exists
  if (fs.existsSync(path.resolve(__dirname, `../env/${envFile}`))) {
    dotenv.config({ path: path.resolve(__dirname, `../env/${envFile}`) });
  } else {
    // look for .env file in the root directory
    dotenv.config();
  }
};

export const initializeServer = (app: Express) => {
  // load environment variables
  loadEnvironmentVariables();

  // setup middleware for the app
  setupMiddleware(app);

  // setup routes for the app
  setupRoutes(app);
};

export default initializeServer;
