import express from 'express';
import serverless from 'serverless-http';
import initializeServer from './src';

const app = express();

initializeServer(app);

export const handler = serverless(app);
