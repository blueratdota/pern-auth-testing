import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER, // AWS MASTER USERNAME
  password: process.env.DB_PASSWORD, // AWM MASTER PASSWORD
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
