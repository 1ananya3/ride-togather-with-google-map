import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "ride_user",
  password: process.env.DB_PASSWORD || "ride_password",
  database: process.env.DB_NAME || "ride_together",
  connectionLimit: 5,
});

export const prisma = new PrismaClient({
  adapter,
});