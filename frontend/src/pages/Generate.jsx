import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GenerateQR from "../components/GenerateQR";
import QRDisplay from "../components/QRDisplay";

export default function Generate() {
  const location = useLocation();
  const user = location.state?.user;
  const [qrValue, setQrValue] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Generate QR Code</h1>
      {!qrValue ? (
        <GenerateQR user={user} setQR={setQrValue} />
      ) : (
        <QRDisplay value={qrValue} />
      )}
    </div>
  );
}
