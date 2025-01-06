import { Express } from 'express';
import {
  logIdMiddleware,
  morganMiddleware,
  expressWinstonMiddleware,
} from './middleware/loggingMiddleware';
import globalErrorHandler from './middleware/globalErrorHandler';

export const setupMiddleware = (app: Express) => {
  // Setup logging middleware
  app.use(logIdMiddleware);
  app.use(morganMiddleware);
  app.use(expressWinstonMiddleware);

  // Add global error handler
  app.use(globalErrorHandler);
};

export default setupMiddleware;
