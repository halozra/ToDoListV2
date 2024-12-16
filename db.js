import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',           // Username PostgreSQL kamu
  host: 'localhost',          // Host database
  database: 'nama_database',  // Nama database kamu
  password: '123456',       // Password PostgreSQL
  port: 5432,                 // Port default PostgreSQL
});
