import { NODE_ENV } from '@nrsa/common/shared/constants/systemConstants';

const { DEVELOPMENT, TEST, PRODUCTION } = NODE_ENV;
/**
 * Checks if the application is running in development mode.
 *
 * @returns {boolean} True if the application is in development mode, otherwise false.
 */
export const isDevelopmentMode = () => process.env.NODE_ENV === DEVELOPMENT;

/**
 * Checks if the application is running in test mode.
 *
 * @returns {boolean} True if the application is in test mode, otherwise false.
 */
export const isTestMode = () => process.env.NODE_ENV === TEST;

/**
 * Checks if the application is running in production mode.
 *
 * @returns {boolean} True if the application is in production mode, otherwise false.
 */
export const isProductionMode = () => process.env.NODE_ENV === PRODUCTION;
