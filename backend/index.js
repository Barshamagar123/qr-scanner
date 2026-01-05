import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import qrRoutes from "./src/routes/qrRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/qr", qrRoutes); // Use qrRoutes

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    service: "QR System API",
    time: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
