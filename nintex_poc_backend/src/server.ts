import * as sql from 'mssql';
import express from 'express';
import 'dotenv/config'


require('dotenv').config()

const app = express();
const port = 3000;

const config: sql.config = {
  user: process.env.db_user,
  password: process.env.db_password,
  server: process.env.db_server,
  database: process.env.db_database,
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

async function queryDatabase() {
  const pool = await connectToDatabase();

  try {
    const result = await pool.request().query('SELECT * FROM caseDetails');
    console.log('Query result 1:', result);
  } catch (err) {
    console.error('Error querying database', err);
  } finally {
    pool.close();
  }
}

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

queryDatabase();