import React from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Scan, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <QrCode className="text-blue-600" size={24} />,
      title: "Instant QR Generation",
      description: "Generate unique QR codes for patients in seconds"
    },
    {
      icon: <Scan className="text-green-600" size={24} />,
      title: "Real-time Scanning",
      description: "Access up-to-date patient information instantly"
    },
    {
      icon: <Shield className="text-red-600" size={24} />,
      title: "Emergency Ready",
      description: "Critical medical data accessible in emergencies"
    },
    {
      icon: <Clock className="text-purple-600" size={24} />,
      title: "24-hour Validity",
      description: "QR codes expire automatically for security"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Create Patient Profile",
      description: "Fill in patient details including blood type and emergency contacts"
    },
    {
      number: "2",
      title: "Generate QR Code",
      description: "Create a unique QR code linked to the patient's medical information"
    },
    {
      number: "3",
      title: "Print or Display",
      description: "Print the QR code or display it digitally for emergency access"
    },
    {
      number: "4",
      title: "Instant Access",
      description: "Medical personnel scan QR to access real-time patient data"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-emergency-red rounded-2xl mb-6">
          <QrCode className="text-white" size={36} />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Medi<span className="text-emergency-red">QR</span> - Emergency Medical QR System
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Instant access to critical patient information through QR codes. 
          Designed for medical emergencies and patient identification.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/generate"
            className="btn-primary inline-flex items-center justify-center space-x-2 px-8 py-3 text-lg"
          >
            <QrCode size={20} />
            <span>Generate QR Code</span>
          </Link>
          
          <Link
            to="/scan"
            className="bg-emergency-red hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-flex items-center justify-center space-x-2 text-lg"
          >
            <Scan size={20} />
            <span>Scan QR Code</span>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="p-3 bg-gray-50 rounded-lg w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Alert */}
      <div className="card border-2 border-red-300 bg-red-50">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle className="text-red-600" size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900 mb-2">
              For Medical Emergencies
            </h3>
            <p className="text-red-800">
              This system provides instant access to critical patient information. 
              In emergencies, scan the QR code to get blood type, allergies, 
              emergency contacts, and medical history.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/generate"
          className="card hover:shadow-lg transition-all duration-200 hover:border-blue-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <QrCode className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Generate QR</h3>
              <p className="text-gray-600 text-sm">Create new QR codes</p>
            </div>
          </div>
        </Link>

        <Link
          to="/scan"
          className="card hover:shadow-lg transition-all duration-200 hover:border-green-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Scan className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Scan QR</h3>
              <p className="text-gray-600 text-sm">Access patient information</p>
            </div>
          </div>
        </Link>

        <Link
          to="/users"
          className="card hover:shadow-lg transition-all duration-200 hover:border-purple-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">View Patients</h3>
              <p className="text-gray-600 text-sm">Manage patient records</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;