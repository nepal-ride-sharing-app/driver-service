import serverless from "serverless-http";
import express, { Request, Response, NextFunction } from "express";
import initializeServer from "src";

const app = express();

initializeServer(app);

export const handler = serverless(app);
