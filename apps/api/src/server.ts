import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

// your routes here
// app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});