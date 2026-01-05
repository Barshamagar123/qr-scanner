import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  User, 
  Phone, 
  Droplets, 
  Clock, 
  Shield, 
  QrCode,
  Copy,
  History,
  ChevronRight,
  CheckCircle,
  XCircle,
  Calendar,
  Loader2,
  Camera
} from 'lucide-react';
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
      
      toast.success('Patient information retrieved successfully');
      setQrCodeId('');
      
    } catch (error) {
      setScanResult(null);
      toast.error(error.response?.data?.error || 'Scan failed - Invalid QR Code');
      
      // Add failed scan to history
      setScanHistory(prev => [
        {
          id: Date.now(),
          qrCodeId,
          timestamp: new Date().toISOString(),
          success: false,
          error: error.response?.data?.error || 'Invalid QR Code'
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

  const copyPatientInfo = () => {
    if (scanResult) {
      navigator.clipboard.writeText(JSON.stringify(scanResult.user, null, 2));
      toast.success('Patient information copied to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-brrom-green-500 to-emerald-600 rounded-xl mb-4 shadow-sm">
            <QrCode className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical QR Scanner</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access encrypted patient information instantly through QR codes
          </p>
        </div>

        {/* Scanner Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Search className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Scan QR Code</h3>
                <p className="text-sm text-gray-600">Enter QR ID or use camera scanner</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Scanner Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Code Identifier
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <QrCode className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={qrCodeId}
                      onChange={(e) => setQrCodeId(e.target.value)}
                      placeholder="Enter QR code ID (e.g., MED-123-ABC)"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                    />
                  </div>
                  
                  <button
                    onClick={handleScan}
                    disabled={loading}
                    className="px-8 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={18} />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Search size={18} className="mr-2" />
                        Scan QR Code
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Or use your device camera to scan the QR code directly
                </p>
              </div>

              {/* Camera Option */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Camera className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Use Camera Scanner</h4>
                      <p className="text-sm text-blue-800">For faster access via mobile camera</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-blue-300 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center">
                    Open Camera
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scan Results */}
        {scanResult && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden mb-8 animate-fadeIn">
            <div className="border-b border-gray-100 bg-linear-to-r from-green-50 to-emerald-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Patient Information Retrieved</h3>
                    <p className="text-sm text-gray-600">Secure medical data accessed successfully</p>
                  </div>
                </div>
                <button
                  onClick={clearScan}
                  className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
                >
                  Clear
                  <XCircle size={16} className="ml-1" />
                </button>
              </div>
            </div>

            {/* Emergency Alert */}
            {scanResult.user.role === 'EMERGENCY' && (
              <div className="border-b border-red-200 bg-linear-to-r from-red-50 to-orange-50 px-6 py-4">
                <div className="flex items-center">
                  <AlertTriangle className="text-red-500 mr-3 shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-red-900">EMERGENCY CONTACT</h4>
                    <p className="text-sm text-red-800">Priority medical attention required</p>
                  </div>
                </div>
              </div>
            )}

            {/* Patient Information Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Patient Details */}
                <div className="space-y-6">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg">Patient Details</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Full Name</span>
                        <span className="text-lg font-semibold text-gray-900">{scanResult.user.name}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Droplets className="text-red-500 mr-2" size={16} />
                          <span className="text-sm font-medium text-gray-700">Blood Type</span>
                        </div>
                        <div className="text-center">
                          <span className="text-2xl font-bold text-red-600">{scanResult.user.blood}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Phone className="text-green-500 mr-2" size={16} />
                          <span className="text-sm font-medium text-gray-700">Contact</span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">{scanResult.user.phone}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Access Level</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          scanResult.user.role === 'EMERGENCY' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {scanResult.user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Information */}
                <div className="space-y-6">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <Shield className="text-purple-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg">QR Information</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">QR Code ID</span>
                        <span className="font-mono text-sm font-medium text-purple-600">{scanResult.qrInfo.qrCodeId}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Clock className="text-blue-500 mr-2" size={16} />
                          <span className="text-sm font-medium text-gray-700">Scan Time</span>
                        </div>
                        <p className="font-medium text-gray-900">{formatTime(scanResult.scannedAt)}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="text-emerald-500 mr-2" size={16} />
                          <span className="text-sm font-medium text-gray-700">Generated On</span>
                        </div>
                        <p className="font-medium text-gray-900">
                          {new Date(scanResult.qrInfo.generated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center mb-1">
                            <AlertTriangle className="text-amber-500 mr-2" size={16} />
                            <span className="text-sm font-medium text-amber-900">Expires On</span>
                          </div>
                          <p className="font-medium text-amber-900">
                            {new Date(scanResult.qrInfo.expires).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.location.href = `tel:${scanResult.user.phone}`}
                    className="flex-1 py-3 px-4 bg-linear-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm flex items-center justify-center"
                  >
                    <Phone size={18} className="mr-2" />
                    Call Patient
                  </button>
                  
                  <button
                    onClick={copyPatientInfo}
                    className="flex-1 py-3 px-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm flex items-center justify-center"
                  >
                    <Copy size={18} className="mr-2" />
                    Copy Patient Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <History className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Recent Scans</h3>
                  <p className="text-sm text-gray-600">Last 5 scan attempts</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {scanHistory.map((scan) => (
                  <div
                    key={scan.id}
                    className={`p-4 rounded-lg border transition-all ${
                      scan.success 
                        ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                        : 'border-red-200 bg-red-50 hover:bg-red-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${
                          scan.success ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {scan.success ? (
                            <CheckCircle className="text-green-600" size={18} />
                          ) : (
                            <XCircle className="text-red-600" size={18} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {scan.success ? scan.patientName : 'Scan Failed'}
                          </p>
                          <p className="text-sm text-gray-600 font-mono">{scan.qrCodeId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatTime(scan.timestamp)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          scan.success 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {scan.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                    </div>
                    {!scan.success && scan.error && (
                      <p className="text-sm text-red-600 mt-2 ml-11">{scan.error}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!scanResult && !loading && (
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="text-blue-600" size={20} />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-blue-900 mb-2">Secure QR Scanning Guidelines</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Scan QR codes located on patient identification cards</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>QR codes provide encrypted access to medical information</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Emergency QR codes provide immediate critical information</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>All access is logged for security and compliance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QRScanner;