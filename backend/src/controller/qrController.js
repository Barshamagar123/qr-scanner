import prisma from "../config/prisma.js";
import QRCode from 'qrcode';
import crypto from 'crypto';

// 1. GENERATE QR CODE
export const generateQR = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create unique QR ID
    const qrCodeId = `QR-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    
    // Set expiry (24 hours)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // User data
    const userData = {
      id: user.id,
      name: user.name,
      blood: user.blood,
      phone: user.phone,
      role: user.role
    };

    // QR content URL (what mobile will open)
    const qrContent = `http://localhost:3000/api/qr/scan/${qrCodeId}`;
    
    // Generate QR image
    const qrImage = await QRCode.toDataURL(qrContent);

    // Save to database
    const qr = await prisma.qR.upsert({
      where: { userId: parseInt(userId) },
      update: {
        qrCodeId,
        data: JSON.stringify(userData),
        encrypted: JSON.stringify({ qrCodeId, expiresAt }),
        hash: crypto.createHash('sha256').update(qrCodeId).digest('hex'),
        expiresAt,
        isActive: true,
        scanned: false
      },
      create: {
        qrCodeId,
        data: JSON.stringify(userData),
        encrypted: JSON.stringify({ qrCodeId, expiresAt }),
        hash: crypto.createHash('sha256').update(qrCodeId).digest('hex'),
        expiresAt,
        userId: parseInt(userId),
        isActive: true,
        scanned: false
      }
    });

    // Return response
    res.json({
      success: true,
      qrCodeId,
      qrImage, // QR image for frontend
      qrContent, // URL for mobile scanning
      user: userData,
      expiresAt: qr.expiresAt
    });

  } catch (error) {
    console.error("QR Generation Error:", error);
    res.status(500).json({ error: "Failed to generate QR" });
  }
};

// 2. SCAN QR (MOBILE PHONE CALLS THIS)
export const scanQR = async (req, res) => {
  try {
    const { qrCodeId } = req.params;

    // Find QR
    const qr = await prisma.qR.findUnique({
      where: { qrCodeId },
      include: { user: true }
    });

    if (!qr) {
      return res.status(404).json({ error: "QR not found" });
    }

    // Check if expired
    if (new Date(qr.expiresAt) < new Date()) {
      return res.status(400).json({ error: "QR has expired" });
    }

    // Check if already scanned
    if (qr.scanned) {
      return res.status(400).json({ error: "QR already scanned" });
    }

    // Mark as scanned
    await prisma.qR.update({
      where: { id: qr.id },
      data: { scanned: true }
    });

    // ⭐⭐⭐ RETURN REAL-TIME DATA TO MOBILE ⭐⭐⭐
    res.json({
      success: true,
      scannedAt: new Date().toISOString(),
      
      // THIS IS WHAT MOBILE SEES
      user: {
        name: qr.user.name,
        blood: qr.user.blood,
        phone: qr.user.phone,
        role: qr.user.role,
        // If you add more fields later, they appear here
      },
      
      qrInfo: {
        qrCodeId,
        generated: qr.createdAt,
        expires: qr.expiresAt,
        isActive: qr.isActive
      }
    });

  } catch (error) {
    console.error("Scan Error:", error);
    res.status(500).json({ error: "Scan failed" });
  }
};

// 3. GET QR DETAILS (OPTIONAL)
export const getQRDetails = async (req, res) => {
  try {
    const { qrCodeId } = req.params;

    const qr = await prisma.qR.findUnique({
      where: { qrCodeId },
      include: { user: true }
    });

    if (!qr) {
      return res.status(404).json({ error: "QR not found" });
    }

    res.json({
      success: true,
      qr: {
        id: qr.id,
        qrCodeId: qr.qrCodeId,
        isActive: qr.isActive,
        scanned: qr.scanned,
        createdAt: qr.createdAt,
        expiresAt: qr.expiresAt
      },
      user: {
        id: qr.user.id,
        name: qr.user.name,
        blood: qr.user.blood,
        phone: qr.user.phone
      }
    });

  } catch (error) {
    console.error("Get QR Error:", error);
    res.status(500).json({ error: "Failed to get QR details" });
  }
};

// 4. DOWNLOAD QR AS PNG (OPTIONAL)
export const downloadQR = async (req, res) => {
  try {
    const { qrCodeId } = req.params;

    const qr = await prisma.qR.findUnique({
      where: { qrCodeId }
    });

    if (!qr) {
      return res.status(404).json({ error: "QR not found" });
    }

    const qrContent = `http://localhost:3000/api/qr/scan/${qrCodeId}`;
    const pngBuffer = await QRCode.toBuffer(qrContent, {
      width: 500,
      type: 'png'
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="qr-${qrCodeId}.png"`);
    res.send(pngBuffer);

  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ error: "Failed to download QR" });
  }
};