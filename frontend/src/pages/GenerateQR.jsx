import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import QRGenerator from '../components/QRGenerator';
import { ArrowLeft } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Generate QR Code</h1>
          <p className="text-gray-600">
            {step === 1 
              ? "Create patient profile and generate QR code" 
              : "Generate QR code for patient"}
          </p>
        </div>
        
        {step === 2 && (
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            <span>Back to Create Patient</span>
          </button>
        )}
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center max-w-2xl mx-auto">
        <div className="flex items-center w-full">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border-2 border-gray-300'
            }`}>
              <span className="font-semibold">1</span>
            </div>
            <span className="mt-2 text-sm font-medium">Create Patient</span>
          </div>
          
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border-2 border-gray-300'
            }`}>
              <span className="font-semibold">2</span>
            </div>
            <span className="mt-2 text-sm font-medium">Generate QR</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {step === 1 ? (
          <UserForm onUserCreated={handleUserCreated} />
        ) : (
          <QRGenerator userId={createdUserId} />
        )}
      </div>
    </div>
  );
};

export default GenerateQR;