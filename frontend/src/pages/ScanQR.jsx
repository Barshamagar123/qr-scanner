import React from 'react';
import QRScanner from '../components/QRScanner';

const ScanQR = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scan QR Code</h1>
        <p className="text-gray-600">
          Scan patient QR codes to access real-time medical information
        </p>
      </div>
      
      <QRScanner />
    </div>
  );
};

export default ScanQR;