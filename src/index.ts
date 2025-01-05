import { Request, Response, NextFunction, Express } from 'express';
import morgan from 'morgan';
import expressWinston from 'express-winston';
import { v4 as uuidv4 } from 'uuid';
import logger from './utils/logger';

export const initializeServer = (app: Express) => {
  // Custom middleware to handle logId and spanId
  app.use((req: Request, res: Response, next: NextFunction) => {
    const logId = req.headers['logid'] || '';
    const spanId = uuidv4();
    req.headers['logid'] = logId;
    req.headers['spanid'] = spanId;
    next();
  });

  // Use morgan middleware to log requests and responses in JSON format
  app.use(
    morgan((tokens, req, res) => {
      return JSON.stringify({
        logId: req.headers['logid'],
        spanId: req.headers['spanid'],
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTime: tokens['response-time'](req, res) + ' ms',
        userAgent: tokens['user-agent'](req, res),
      });
    }),
  );

  // Use express-winston for structured logging
  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      meta: true,
      msg: 'HTTP {{req.method}} {{req.url}}',
      expressFormat: true,
      colorize: false,
      ignoreRoute: function (req, res) {
        return false;
      },
      level: function (req, res) {
        return res.statusCode >= 500 ? 'warn' : 'info';
      },
      dynamicMeta: (req: Request, res: Response) => {
        return {
          logId: req.headers['logid'],
          spanId: req.headers['spanid'],
        };
      },
    }),
  );

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

export default initializeServer;
