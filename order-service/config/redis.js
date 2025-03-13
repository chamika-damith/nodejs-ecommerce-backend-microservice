const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    url:process.env.REDIS_URL
});

redisClient.on('connect',()=> console.log('Connect Redis client'));
redisClient.on('error',()=> console.log('error Redis client'));

redisClient.connect();

module.exports = redisClient;