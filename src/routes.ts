import { Express, NextFunction, Request, Response } from 'express';
import { isDevelopmentMode } from 'common';
import indexRoutes from './routes/index';

export const setupRoutes = (app: Express) => {
  app.use('/', indexRoutes);
};

export default setupRoutes;
