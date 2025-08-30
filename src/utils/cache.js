const redis = require('../config/redis');

const cache = {
    async set(key, value, expiry) {
        await redis.connect();
        await redis.set(key, JSON.stringify(value), expiry ? { EX: expiry } : {});
        await redis.quit();
    },

    async get(key) {
        await redis.connect();
        const value = await redis.get(key);
        await redis.quit();
        return value ? JSON.parse(value) : null;
      },
      async del(key) {
        await redis.connect();
        await redis.del(key);
        await redis.quit();
      }
};

module.exports = cache;