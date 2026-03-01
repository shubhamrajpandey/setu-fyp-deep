import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./modules/auth/auth.routes.js";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

connectDb();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
