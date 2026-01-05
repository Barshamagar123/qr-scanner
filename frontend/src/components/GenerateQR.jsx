import React, { useState } from "react";
import api from "../utils/api";

export default function GenerateQR({ user, setQR }) {
  const [expiresAt, setExpiresAt] = useState("2026-01-10T18:00:00.000Z");

  if (!user) {
    return <p className="text-red-600">User not found. Please go back to create a user.</p>;
  }

  const generate = async () => {
    try {
      const res = await api.post("/qr/generate", {
        userId: user.id,
        expiresAt,
      });
      setQR(res.data.encrypted);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("QR generation failed");
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">Expiration Date</label>
      <input
        type="datetime-local"
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
        className="border p-2 mt-1 w-full"
      />
      <button
        onClick={generate}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded w-full"
      >
        Generate QR
      </button>
    </div>
  );
}
