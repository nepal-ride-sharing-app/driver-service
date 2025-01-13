import { Express, NextFunction, Request, Response } from 'express';
import { isDevelopmentMode } from 'ride-sharing-app-common';

export const setupRoutes = (app: Express) => {
  // Add routes here
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      locallibtesting: isDevelopmentMode(),
      message: `Hello from root! ${process.env?.NODE_ENV}, APP_PORT: ${process.env?.APP_PORT}`,
    });
  });

  app.get('/hello', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: 'Hello from path!',
    });
  });
};

export default setupRoutes;
