import { Router, Request, Response, NextFunction } from 'express';
import {
  isDevelopmentMode,
  isProductionMode,
  isTestMode,
} from '../utils/helpers';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Test
 *     description: Routes using for testing purposes
 */

/**
 * @swagger
 * /testing-purpose/:
 *   get:
 *     summary: Root endpoint
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Returns a greeting message from the root endpoint.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 locallibtesting:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    isDevelopmentMode: isDevelopmentMode(),
    isTestMode: isTestMode(),
    isProductionMode: isProductionMode(),
    message: `Hello from root! ${process.env?.NODE_ENV}, APP_PORT: ${process.env?.APP_PORT}`,
  });
});

/**
 * @swagger
 * /testing-purpose/hello:
 *   get:
 *     summary: Hello endpoint
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Returns a greeting message from the hello endpoint.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/hello', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'Hello from path!',
  });
});

/**
 * @swagger
 * /testing-purpose/env:
 *   get:
 *     summary: Get environment variable values
 *     tags: [Env]
 *     parameters:
 *       - in: query
 *         name: variables
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Single environment variable or an array of environment variables
 *     responses:
 *       200:
 *         description: Returns the values of the requested environment variables and the path of the loaded env file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 envFilePath:
 *                   type: string
 *                 values:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/env', (req: Request, res: Response) => {
  const variables = req.query.variables as string | string[];
  const envVariables = Array.isArray(variables)
    ? variables
    : [variables].filter(Boolean);
  const values = envVariables.map((variable) =>
    process.env[variable as string] !== undefined
      ? process.env[variable as string]
      : undefined,
  );

  res.status(200).json({
    values,
  });
});

/**
 * @swagger
 * /testing-purpose/test-not-found:
 *   get:
 *     summary: Test Not Found endpoint
 *     tags: [Test]
 *     responses:
 *       404:
 *         description: Returns a not found message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/test-not-found',
  (req: Request, res: Response, next: NextFunction) => {
    next(); // Intentionally trigger the "not found" middleware
  },
);

export default router;
