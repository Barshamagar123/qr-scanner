import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import QRGenerator from '../components/QRGenerator';
import { ArrowLeft, UserPlus, QrCode, CheckCircle } from 'lucide-react';

const GenerateQR = () => {
  const [createdUserId, setCreatedUserId] = useState(null);
  const [step, setStep] = useState(1); // 1: Create User, 2: Generate QR

  const handleUserCreated = (userData) => {
    setCreatedUserId(userData.id);
    setStep(2);
  };

  const handleBack = () => {
    setCreatedUserId(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Create Medical QR
              </h1>
              <p className="text-gray-600 mt-2">
                Generate secure QR codes for patient emergency access
              </p>
            </div>
            
            {step === 2 && (
              <button
                onClick={handleBack}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back
              </button>
            )}
          </div>

          {/* Progress Steps - Improved Design */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 1 
                    ? 'bg-blue-50 border-2 border-blue-500 text-blue-600' 
                    : 'bg-gray-50 border-2 border-gray-300 text-gray-400'
                }`}>
                  {step > 1 ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <span className="font-medium">1</span>
                  )}
                  <div className={`absolute -bottom-6 whitespace-nowrap text-sm font-medium ${
                    step >= 1 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Patient Details
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              <div className={`flex-1 h-0.5 mx-4 ${
                step >= 2 ? 'bg-blue-500' : 'bg-gray-200'
              }`}></div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 2 
                    ? 'bg-blue-50 border-2 border-blue-500 text-blue-600' 
                    : 'bg-gray-50 border-2 border-gray-300 text-gray-400'
                }`}>
                  {step === 2 ? (
                    <QrCode size={18} />
                  ) : (
                    <span className="font-medium">2</span>
                  )}
                  <div className={`absolute -bottom-6 whitespace-nowrap text-sm font-medium ${
                    step >= 2 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Generate QR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Step Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center">
              {step === 1 ? (
                <>
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <UserPlus size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Enter Patient Information
                    </h2>
                    <p className="text-sm text-gray-600">
                      Fill in essential medical details for QR generation
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <QrCode size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Generate Medical QR Code
                    </h2>
                    <p className="text-sm text-gray-600">
                      Create and download QR code for patient
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {step === 1 ? (
              <UserForm onUserCreated={handleUserCreated} />
            ) : (
              <QRGenerator userId={createdUserId} />
            )}
          </div>

          {/* Step Guidance */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-start">
              <div className="shrink-0 mt-0.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">i</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">
                  {step === 1 
                    ? "Complete all required fields. Information will be encrypted in the QR code."
                    : "Download and print the QR code. Keep it accessible for emergency situations."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-1">Secure Data</h3>
            <p className="text-xs text-blue-800">
              Patient information is encrypted and HIPAA compliant
            </p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-900 mb-1">24-Hour Access</h3>
            <p className="text-xs text-green-800">
              QR codes are valid for 24 hours from generation
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-900 mb-1">Emergency Use</h3>
            <p className="text-xs text-purple-800">
              Critical information accessible to medical professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;