import prisma from "../config/prisma.js";
import { decryptData } from "../utils/decrypt.js";
import { encryptData } from "../utils/encrypt.js";
import { generateHash } from "../utils/hash.js";
import { v4 as uuidv4 } from "uuid";

export const generateQR = async (req, res) => {
  try {
    const { userId, expiresAt } = req.body;

    // Validate input
    if (!userId || !expiresAt) {
      return res.status(400).json({ message: "userId and expiresAt are required" });
    }

    // Validate expiresAt is in future
    if (new Date(expiresAt) <= new Date()) {
      return res.status(400).json({ message: "expiresAt must be in the future" });
    }

    // Validate user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Unique QR ID
    const qrCodeId = uuidv4();

    // Create payload with user data for QR (real information)
    const payload = {
      qrCodeId,
      expiresAt,
      user: {
        id: user.id,
        name: user.name,
        blood: user.blood,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
    };

    // Generate hash for integrity check
    const hash = generateHash(payload);

    // Add hash to payload for verification
    const payloadWithHash = { ...payload, hash };

    // Encrypt payload with user data and hash
    const encrypted = encryptData(payloadWithHash);

    // Save QR in database (upsert to allow regeneration)
    await prisma.qR.upsert({
      where: { userId },
      update: {
        qrCodeId,
        encrypted,
        hash,
        expiresAt: new Date(expiresAt),
      },
      create: {
        qrCodeId,
        encrypted,
        hash,
        expiresAt: new Date(expiresAt),
        userId,
      },
    });

    // Send QR data to frontend
    res.json({ qrCodeId, encrypted, expiresAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const verifyQR = async (req, res) => {
  try {
    const { encrypted } = req.body;

    if (!encrypted)
      return res.status(400).json({ message: "Encrypted QR is required" });

    // Decrypt the QR payload
    const data = decryptData(encrypted);
    const { qrCodeId, expiresAt, user, hash } = data;

    // Check if QR expired
    if (new Date(expiresAt) < new Date()) {
      return res.status(400).json({ message: "QR has expired" });
    }

    // Verify integrity by checking hash
    const computedHash = generateHash({ qrCodeId, expiresAt, user });
    if (computedHash !== hash) {
      return res.status(400).json({ message: "QR data integrity check failed" });
    }

    // Optional: Verify QR exists in database for uniqueness tracking
    const qr = await prisma.qR.findUnique({
      where: { qrCodeId },
    });

    if (!qr) {
      return res.status(404).json({ message: "QR not found or invalid" });
    }

    // Return user information directly from decrypted QR data
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
