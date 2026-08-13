import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.get("/", (_req, res) => {
  res.json({
    status: "OK",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "UP",
  });
});

export default app;