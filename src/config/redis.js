const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

try {
  redisClient.connect();
  redisClient.on("connect", () => {
    console.log("Redis client connected");
  });
} catch (error) {
  console.error("Redis connection error:", err);
}

module.exports = redisClient;
