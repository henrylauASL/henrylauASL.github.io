import * as sql from 'mssql';
import {env} from './src/env';

const config: sql.config = {
  user: env.db_user,
  password: env.db_password,
  server: env.db_server,
  database: env.db_database,
  options: {
    encrypt: false // for Azure users
  }
};

async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to MSSQL server');
    return pool;
  } catch (err) {
    console.error('Error connecting to MSSQL server', err);
  }
}

export async function queryDatabase() {
  const pool = await connectToDatabase();

  try {
    const result = await pool.request().query('SELECT 1 AS number');
    console.log('Query result:', result.recordset[0].number);
  } catch (err) {
    console.error('Error querying database', err);
  } finally {
    pool.close();
  }
}

