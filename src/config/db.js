require('dotenv').config();
const { Pool } = require('pg');
const logger = require('./logger');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})

pool.on('connect', () => {
    logger.info('Connected to PostgreSQL database');
  });
  
  pool.on('error', (err) => {
    logger.error('Database connection error:', err.stack);
  });

  module.exports = pool;