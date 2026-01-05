import React, { useState } from 'react';
import { 
  User, 
  Droplets, 
  Phone, 
  AlertCircle,
  Shield,
  FileText,
  Heart,
  Calendar,
  Users,
  ChevronRight,
  Loader2,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { userAPI } from '../utils/api';

const UserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    blood: '',
    phone: '',
    role: 'EMERGENCY',
    dateOfBirth: '',
    emergencyContact: '',
    allergies: '',
    medications: '',
    address: '',
    medicalConditions: []
  });
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Medical Details

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const medicalConditions = [
    'Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 
    'Epilepsy', 'Allergies', 'None'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.blood || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await userAPI.createUser(formData);
      toast.success('Patient created successfully!');
      
      if (onUserCreated) {
        onUserCreated(response.data);
      }
      
      // Reset form
      setFormData({
        name: '',
        blood: '',
        phone: '',
        role: 'EMERGENCY',
        dateOfBirth: '',
        emergencyContact: '',
        allergies: '',
        medications: '',
        address: '',
        medicalConditions: []
      });
      setStep(1);
      
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create patient');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        medicalConditions: checked 
          ? [...prev.medicalConditions, value]
          : prev.medicalConditions.filter(cond => cond !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    if (!formData.name || !formData.phone || !formData.blood) {
      toast.error('Please fill all required fields');
      return;
    }
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Form Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl mb-4 shadow-sm">
          <User className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Medical Profile</h1>
        <p className="text-gray-600">Generate secure QR code for emergency medical access</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8 max-w-md mx-auto">
        <div className="flex items-center w-full">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step >= 1 
                ? 'bg-blue-50 border-2 border-blue-500' 
                : 'bg-gray-100 border-2 border-gray-300'
            }`}>
              <span className="font-medium">1</span>
            </div>
            <span className="text-sm">Basic Info</span>
          </div>
          
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step >= 2 
                ? 'bg-blue-50 border-2 border-blue-500' 
                : 'bg-gray-100 border-2 border-gray-300'
            }`}>
              <span className="font-medium">2</span>
            </div>
            <span className="text-sm">Medical Details</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          /* Step 1: Basic Information */
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <User className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Basic Information</h3>
                  <p className="text-sm text-gray-600">Patient identification and contact details</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter patient's full name"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="98XXXXXXXX"
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                      </div>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Droplets className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                      </div>
                      <select
                        name="blood"
                        value={formData.blood}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400 appearance-none"
                      >
                        <option value="">Select Blood Type</option>
                        {bloodTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400" size={18} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                      </div>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="Name & phone number"
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Information Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.role === 'EMERGENCY' 
                        ? 'border-blue-500 bg-blue-50' 
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
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.role === 'EMERGENCY' 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-400'
                        }`}>
                          {formData.role === 'EMERGENCY' && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
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
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.role === 'FULL' 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-400'
                        }`}>
                          {formData.role === 'FULL' && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Full Information</span>
                          <p className="text-sm text-gray-600">Complete medical history</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm flex items-center justify-center"
              >
                Continue to Medical Details
                <ChevronRight className="ml-2" size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Medical Details */
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                    <Heart className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Medical Details</h3>
                    <p className="text-sm text-gray-600">Additional health information (Optional)</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Known Allergies
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AlertCircle className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                      </div>
                      <input
                        type="text"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="List any allergies"
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Current residential address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Medications
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Current medications and dosages..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400 resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Medical Conditions
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {medicalConditions.map(condition => (
                      <label key={condition} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="medicalConditions"
                          value={condition}
                          checked={formData.medicalConditions.includes(condition)}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Creating Patient...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2" size={18} />
                      Create Patient & Generate QR
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mt-6">
          <div className="flex items-center">
            <Shield className="text-blue-600 mr-3" size={20} />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Secure & Encrypted</h4>
              <p className="text-sm text-blue-800">
                All patient information is encrypted and stored securely. QR codes provide controlled access to authorized medical personnel only.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;