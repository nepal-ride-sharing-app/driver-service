import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Request } from 'express';

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

const log = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(
      (info: winston.Logform.TransformableInfo & { req?: Request }) => {
        const { timestamp, level, message, ...meta } = info;
        const logId = meta.req?.headers['logid'] || '';
        const spanId = meta.req?.headers['spanid'] || '';
        return JSON.stringify({
          timestamp,
          level,
          logId,
          spanId,
          message,
          meta,
        });
      },
    ),
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
    }),
  ],
});

export default log;
