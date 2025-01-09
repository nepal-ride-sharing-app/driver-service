import bodyParser from 'body-parser';
import { Express } from 'express';
import globalErrorHandler from './middleware/globalErrorHandler';
import {
  expressWinstonMiddleware,
  logIdMiddleware,
  morganMiddleware,
} from './middleware/loggingMiddleware';

export const setupMiddleware = (app: Express) => {
    // Setup body-parser middleware
    app.use(bodyParser.json());
    
  // Setup logging middleware
  app.use(logIdMiddleware);
  app.use(morganMiddleware);
  app.use(expressWinstonMiddleware);

  // Add global error handler
  app.use(globalErrorHandler);
};

export default setupMiddleware;
