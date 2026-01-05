import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import qrRoutes from "./src/routes/qrRoutes.js";

dotenv.config();

const app = express();

/* ---------- Middleware ---------- */

// Enable CORS for frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

/* ---------- Routes ---------- */
app.use("/api/users", userRoutes);
app.use("/api/qr", qrRoutes);

/* ---------- Server ---------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
