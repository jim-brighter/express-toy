import pg from 'pg'
import logger from '../log/logger'

const pool = new pg.Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number.parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'postgres'
})

export const query = async (query: string, params?: string[]) => {
  return await pool.query(query, params)
}

export const transaction = async (query: string, params?: string[]) => {
  let connection
  try {
    connection = await pool.connect()
    await connection.query('BEGIN')
    const result = await connection.query(query, params)
    await connection.query('COMMIT')
    return result
  } catch (e) {
    logger.error(e, `Error running transaction`)
    await connection?.query('ROLLBACK')
  } finally {
    connection?.release()
  }
}
