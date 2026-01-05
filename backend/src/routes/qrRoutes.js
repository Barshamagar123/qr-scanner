import express from "express";
import { generateQR, verifyQR } from "../controller/qrController.js";

const router = express.Router();

// POST /api/qr/generate
router.post("/generate", generateQR);
router.post("/verify", verifyQR);

export default router;
