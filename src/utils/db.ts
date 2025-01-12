import mysql, { Connection } from 'mysql2/promise';
import log from './logger';

// MySQL configuration
const mysqlConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'ride-sharing-app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let connection: Connection | null = null;

/**
 * Initializes the MySQL connection if it hasn't been initialized yet.
 *
 * @returns {Promise<Connection>} - A promise that resolves to the MySQL connection.
 */
const initializeConnection = async (): Promise<Connection> => {
  if (!connection) {
    try {
      connection = await mysql.createConnection(mysqlConfig);
    } catch (error) {
      log.error('Error creating MySQL connection: ' + JSON.stringify(error));
      throw error;
    }
  }
  return connection;
};

/**
 * Executes a SQL query using the MySQL connection.
 *
 * @param {string} query - The SQL query to be executed.
 * @param {any[]} [params=[]] - An array of parameters to be passed to the query.
 * @returns {Promise<any>} - A promise that resolves to the results of the query.
 * @throws {Error} - Throws an error if the query execution fails.
 */
export const runQuery = async (query: string, params: any[] = []) => {
  try {
    const conn = await initializeConnection();
    const [results] = await conn.execute(query, params);
    return results;
  } catch (error) {
    log.error('Error running query:' + JSON.stringify(error));
    throw error;
  }
};
