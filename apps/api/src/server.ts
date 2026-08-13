import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { redisClient } from "./config/redis";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await redisClient.connect();

    console.log("Redis connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();