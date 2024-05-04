import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRouter from "./routes/taskRoutes.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
// app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/task", taskRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to ${process.env.MONGODB_URI}`);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
