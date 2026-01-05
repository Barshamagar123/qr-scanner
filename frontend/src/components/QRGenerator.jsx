import React, { useState, useEffect } from 'react';
import { Download, Copy, RefreshCw, Check } from 'lucide-react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { qrAPI, userAPI } from '../utils/api';
import toast from 'react-hot-toast';

const QRGenerator = ({ userId }) => {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await userAPI.getUser(userId);
      setUser(response.data);
    } catch (error) {
      toast.error('Failed to fetch user details');
    }
  };

  const generateQR = async () => {
    setLoading(true);
    try {
      const response = await qrAPI.generateQR(userId);
      setQrData(response.data);
      toast.success('QR code generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to generate QR');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = async () => {
    if (!qrData?.qrCodeId) return;
    
    try {
      const response = await qrAPI.downloadQR(qrData.qrCodeId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `qr-${qrData.qrCodeId}.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('QR downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download QR');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!userId) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-400 mb-4">
          <RefreshCw size={48} className="mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Patient Selected</h3>
        <p className="text-gray-500">Create a patient first to generate QR code</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">QR Code Generator</h2>
          <p className="text-gray-600">Generate and manage patient QR codes</p>
        </div>
        {!qrData && (
          <button
            onClick={generateQR}
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                <span>Generate QR</span>
              </>
            )}
          </button>
        )}
      </div>

      {user && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Patient Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Blood Type</p>
              <p className="font-medium">{user.blood}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <span className={`badge-${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {qrData ? (
        <div className="space-y-6">
          {/* QR Code Display */}
          <div className="flex flex-col items-center">
            <div className="p-6 bg-white border-2 border-gray-200 rounded-2xl mb-4">
              <QRCode 
                value={qrData.qrContent} 
                size={280}
                fgColor="#1f2937"
                bgColor="#ffffff"
                level="H"
                includeMargin={true}
              />
            </div>
            
            {/* QR Information */}
            <div className="w-full max-w-md space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-700">QR Code ID</span>
                  <button
                    onClick={() => copyToClipboard(qrData.qrCodeId)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="font-mono text-sm bg-white p-2 rounded border border-blue-200">
                  {qrData.qrCodeId}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-green-600">Active</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Expires</p>
                  <p className="font-medium">
                    {new Date(qrData.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadQR}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <Download size={18} />
              <span>Download QR</span>
            </button>
            
            <button
              onClick={() => generateQR()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RefreshCw size={18} />
              <span>Regenerate QR</span>
            </button>
            
            <button
              onClick={() => window.open(qrData.qrContent, '_blank')}
              className="flex-1 bg-emergency-red hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Test Scan</span>
            </button>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">📱 How to Use</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
              <li>Print or display this QR code</li>
              <li>Scan with mobile camera in emergencies</li>
              <li>Medical personnel will see patient information</li>
              <li>QR expires in 24 hours for security</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-300 mb-4">
            <QRCode 
              value="https://example.com" 
              size={120}
              fgColor="#e5e7eb"
              bgColor="#ffffff"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No QR Code Generated</h3>
          <p className="text-gray-500 mb-6">Click the button above to generate a QR code for this patient</p>
          <button
            onClick={generateQR}
            disabled={loading}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating QR...</span>
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                <span>Generate QR Code</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
