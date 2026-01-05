import express from "express";
import { 
  generateQR, 
  scanQR, 
  getQRDetails, 
  downloadQR 
} from "../controller/qrController.js";

const router = express.Router();

// POST: Generate QR
router.post("/generate", generateQR);

// GET: Scan QR (Mobile calls this)
router.get("/scan/:qrCodeId", scanQR);

// GET: Get QR details
router.get("/:qrCodeId", getQRDetails);

// GET: Download QR as PNG
router.get("/download/:qrCodeId", downloadQR);

export default router;