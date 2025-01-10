import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Request } from 'express';

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';
const appName = process.env.APP_NAME || 'app';

const getNestedReq = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return null;
  if (obj.req) return obj.req;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const result = getNestedReq(obj[key]);
      if (result) return result;
    }
  }
  return null;
};


const log = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(
      (info: winston.Logform.TransformableInfo & { req?: Request }) => {
        const { timestamp, level, message, meta } = info;
        const req = getNestedReq(meta);
        const logId = req?.headers['logid'] || '';
        const spanId =req?.headers['spanid'] || '';
        return JSON.stringify({
          timestamp,
          level,
          appName,
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
