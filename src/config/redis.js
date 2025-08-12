require('dotenv').config();
const Redis = require('redis');
const logger = require('./logger');

const client =  Redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on('connect', () => {
    logger.info('Connected to Redis');
  });

  client.on('error', (err) => {
    logger.error('Redis connection error:', err);
  });

  module.exports = client;