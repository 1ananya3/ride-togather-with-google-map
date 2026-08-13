import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(
  cors({
    origin: "https://supreme-sniffle-pqv5vvjw9wv267r4-5173.app.github.dev",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.options("*", cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
  });
});
app.use((req, res, next) => {
  console.log(
    "REQUEST:",
    req.method,
    req.path,
    req.headers.origin
  );

  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;