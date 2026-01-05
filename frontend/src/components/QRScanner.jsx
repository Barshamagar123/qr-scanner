import React, { useState } from 'react';
import { Search, AlertTriangle, User, Phone, Droplets, Clock, Shield } from 'lucide-react';
import { qrAPI } from '../utils/api';
import toast from 'react-hot-toast';

const QRScanner = () => {
  const [qrCodeId, setQrCodeId] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);

  const handleScan = async () => {
    if (!qrCodeId.trim()) {
      toast.error('Please enter a QR Code ID');
      return;
    }

    setLoading(true);
    try {
      const response = await qrAPI.scanQR(qrCodeId);
      setScanResult(response.data);
      
      // Add to scan history
      setScanHistory(prev => [
        {
          id: Date.now(),
          qrCodeId,
          timestamp: new Date().toISOString(),
          success: true,
          patientName: response.data.user.name
        },
        ...prev.slice(0, 4) // Keep only last 5 scans
      ]);
      
      toast.success('QR scanned successfully!');
      setQrCodeId('');
      
    } catch (error) {
      setScanResult(null);
      toast.error(error.response?.data?.error || 'Scan failed');
      
      // Add failed scan to history
      setScanHistory(prev => [
        {
          id: Date.now(),
          qrCodeId,
          timestamp: new Date().toISOString(),
          success: false,
          error: error.response?.data?.error
        },
        ...prev.slice(0, 4)
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearScan = () => {
    setScanResult(null);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Scanner Input */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Search className="text-green-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">QR Code Scanner</h2>
            <p className="text-gray-600">Scan QR codes to access patient information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter QR Code ID
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={qrCodeId}
                onChange={(e) => setQrCodeId(e.target.value)}
                placeholder="Enter QR-123456..."
                className="input-field flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              />
              <button
                onClick={handleScan}
                disabled={loading}
                className="btn-primary px-6 whitespace-nowrap"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Scanning...</span>
                  </div>
                ) : (
                  <>
                    <Search size={18} className="mr-2" />
                    Scan QR
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Tip: Enter the QR Code ID or use camera to scan the QR code
            </p>
          </div>
        </div>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <div className="card border-2 border-green-200 bg-green-50">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="text-green-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  ✅ Patient Information Retrieved
                </h2>
                <p className="text-gray-600">Real-time data from medical database</p>
              </div>
            </div>
            <button
              onClick={clearScan}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>

          {/* Emergency Alert */}
          {scanResult.user.role === 'EMERGENCY' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle size={20} />
                <span className="font-semibold">EMERGENCY CONTACT - PRIORITY ATTENTION REQUIRED</span>
              </div>
            </div>
          )}

          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <User size={20} />
                <span>Patient Details</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-600">Full Name</span>
                  <span className="font-semibold">{scanResult.user.name}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-600 flex items-center space-x-2">
                    <Droplets size={16} />
                    <span>Blood Type</span>
                  </span>
                  <span className="font-semibold">{scanResult.user.blood}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-600 flex items-center space-x-2">
                    <Phone size={16} />
                    <span>Contact Number</span>
                  </span>
                  <span className="font-semibold">{scanResult.user.phone}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-600">Patient Type</span>
                  <span className={`badge-${scanResult.user.role.toLowerCase()}`}>
                    {scanResult.user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Clock size={20} />
                <span>Scan Information</span>
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-sm text-gray-500 mb-1">QR Code ID</p>
                  <p className="font-mono text-sm">{scanResult.qrInfo.qrCodeId}</p>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-600">Scan Time</span>
                  <span className="font-medium">{formatTime(scanResult.scannedAt)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-600">QR Generated</span>
                  <span className="font-medium">
                    {new Date(scanResult.qrInfo.generated).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-600">QR Expires</span>
                  <span className="font-medium">
                    {new Date(scanResult.qrInfo.expires).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.href = `tel:${scanResult.user.phone}`}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Phone size={18} />
              <span>Call Patient</span>
            </button>
            
            <button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(scanResult.user))}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
            >
              Copy Patient Info
            </button>
          </div>
        </div>
      )}

      {/* Scan History */}
      {scanHistory.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Scans</h3>
          <div className="space-y-3">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                className={`p-3 rounded-lg border ${
                  scan.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {scan.success ? `Patient: ${scan.patientName}` : 'Scan Failed'}
                    </p>
                    <p className="text-sm text-gray-600">{scan.qrCodeId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{formatTime(scan.timestamp)}</p>
                    <span className={`text-xs font-medium ${
                      scan.success ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {scan.success ? '✅ Success' : '❌ Failed'}
                    </span>
                  </div>
                </div>
                {!scan.success && scan.error && (
                  <p className="text-sm text-red-600 mt-2">{scan.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {!scanResult && !loading && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📱 How to Scan QR Codes</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Use mobile camera app to scan QR code</li>
            <li>Enter the QR Code ID manually above</li>
            <li>View real-time patient information instantly</li>
            <li>For emergencies, contact patient immediately</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
