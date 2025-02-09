import { Express, NextFunction, Request, Response } from 'express';
import { isDevelopmentMode } from '@nrsa/common/shared-common/utils/helpers';
import indexRoutes from './routes/index';

export const setupRoutes = (app: Express) => {
  app.use('/', indexRoutes);
};

export default setupRoutes;
