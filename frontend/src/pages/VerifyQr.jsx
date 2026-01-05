import React, { useState, useRef } from "react";
import QrScanner from "react-qr-scanner";
import api from "../utils/api";
import ResultCard from "./ResultCard";

const VerifyQR = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const scannedRef = useRef(false); // prevents multiple scans

  const handleScan = async (scanResult) => {
    if (!scanResult || scannedRef.current) return;

    try {
      scannedRef.current = true; // lock scanning

      // 🔑 react-qr-scanner may return string or object
      const rawValue =
        typeof scanResult === "string"
          ? scanResult
          : scanResult?.text;

      if (!rawValue) {
        scannedRef.current = false;
        return;
      }

      const encrypted = decodeURIComponent(rawValue.trim());

      const res = await api.post("/qr/verify", { encrypted });
      setResult(res.data);
      setError("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("QR verification failed");
      scannedRef.current = false; // allow retry
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Camera access error");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>

      {!result && (
        <div className="w-full max-w-sm mx-auto">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {error && (
        <p className="text-red-600 mt-4 text-center">{error}</p>
      )}

      {result && (
        <div className="mt-6">
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
};

export default VerifyQR;
