import { Express, NextFunction, Request, Response } from "express";

export const setupRoutes = (app: Express) => {
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: `Hello from root! ${process.env?.NODE_ENV}, APP_PORT: ${process.env?.APP_PORT}`,
    });
  });

  app.get('/hello', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: 'Hello from path!',
    });
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
      error: 'Not Found',
    });
  });
};

export default setupRoutes;
