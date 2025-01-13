import { Router, Request, Response, NextFunction } from 'express';
import { isProductionMode, isTestMode } from 'ride-sharing-app-common';
import { isDevelopmentMode } from 'ride-sharing-app-common/src/utils/helpers';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Test
 *     description: Test Routes
 */

/**
 * @swagger
 * /:
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
 * /hello:
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
 * /test-not-found:
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
