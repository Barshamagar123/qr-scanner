import React, { useState } from 'react';
import { User, Droplets, Phone, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { userAPI } from '../utils/api';

const UserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    blood: '',
    phone: '',
    role: 'EMERGENCY',
  });
  
  const [loading, setLoading] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await userAPI.createUser(formData);
      toast.success('User created successfully!');
      
      if (onUserCreated) {
        onUserCreated(response.data);
      }
      
      // Reset form
      setFormData({
        name: '',
        blood: '',
        phone: '',
        role: 'EMERGENCY',
      });
      
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="text-blue-600" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Patient</h2>
          <p className="text-gray-600">Fill in patient details to generate QR code</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline mr-2" size={16} />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter patient's full name"
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blood Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplets className="inline mr-2" size={16} />
              Blood Type
            </label>
            <select
              name="blood"
              value={formData.blood}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Blood Type</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline mr-2" size={16} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 9876543210"
              className="input-field"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <AlertCircle className="inline mr-2" size={16} />
            Patient Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.role === 'EMERGENCY' 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}>
              <input
                type="radio"
                name="role"
                value="EMERGENCY"
                checked={formData.role === 'EMERGENCY'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  formData.role === 'EMERGENCY' 
                    ? 'border-red-500 bg-red-500' 
                    : 'border-gray-400'
                }`}></div>
                <div>
                  <span className="font-semibold text-gray-900">Emergency Contact</span>
                  <p className="text-sm text-gray-600">Critical medical information only</p>
                </div>
              </div>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.role === 'FULL' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}>
              <input
                type="radio"
                name="role"
                value="FULL"
                checked={formData.role === 'FULL'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  formData.role === 'FULL' 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-400'
                }`}></div>
                <div>
                  <span className="font-semibold text-gray-900">Full Information</span>
                  <p className="text-sm text-gray-600">Complete medical history</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
            formData.role === 'EMERGENCY'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Patient...</span>
            </div>
          ) : (
            'Create Patient & Generate QR'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
