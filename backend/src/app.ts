import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middlewares/error.middleware";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// enable CORS so Next frontend (localhost:3000) can hit this API
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

export default app;
