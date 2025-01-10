import mysql from 'mysql2/promise';
import log from './logger';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Executes a SQL query using a connection from the pool.
 *
 * @param {string} query - The SQL query to be executed.
 * @param {any[]} [params=[]] - An array of parameters to be passed to the query.
 * @returns {Promise<any>} - A promise that resolves to the results of the query.
 * @throws {Error} - Throws an error if the query execution fails.
 */
export const runQuery = async (query: string, params: any[] = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    log.error('Error running query:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
