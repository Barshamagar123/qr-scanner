import React from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Scan, 
  UserPlus, 
  Shield, 
  Clock,
  AlertCircle,
  Users,
  ChevronRight
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <QrCode size={20} />,
      title: "QR Generation",
      description: "Create unique medical QR codes in seconds",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Scan size={20} />,
      title: "Quick Scanning",
      description: "Access patient data instantly with any smartphone",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Shield size={20} />,
      title: "Secure & Private",
      description: "Encrypted data with role-based access control",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <Clock size={20} />,
      title: "Time-Sensitive",
      description: "24-hour validity for emergency access",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Register Patient",
      description: "Enter essential medical information"
    },
    {
      step: "02",
      title: "Generate QR",
      description: "System creates encrypted QR code"
    },
    {
      step: "03",
      title: "Distribute QR",
      description: "Patient carries QR on card or phone"
    },
    {
      step: "04",
      title: "Emergency Access",
      description: "Medical staff scan to view critical data"
    }
  ];

  const quickActions = [
    {
      title: "Generate New QR",
      description: "Create QR for a new patient",
      icon: <UserPlus size={18} />,
      link: "/generate",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Scan QR Code",
      description: "Access patient information",
      icon: <Scan size={18} />,
      link: "/scan",
      color: "bg-emerald-500 hover:bg-emerald-600"
    },
    {
      title: "View Patients",
      description: "Manage patient records",
      icon: <Users size={18} />,
      link: "/patients",
      color: "bg-slate-700 hover:bg-slate-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-white to-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl mb-6 shadow-lg">
              <QrCode className="text-white" size={28} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Medi<span className="text-blue-600">QR</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-light">
              Secure medical information access through encrypted QR codes. 
              Designed for healthcare professionals and emergency response.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/generate"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <UserPlus size={18} className="mr-2" />
                Create Patient QR
              </Link>
              
              <Link
                to="/scan"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Scan size={18} className="mr-2" />
                Scan QR Code
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Designed with security, speed, and simplicity in mind
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow">
              <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white border-y">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple four-step process from registration to emergency access
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 right-0 w-full h-0.5 bg-gray-200 transform translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Alert */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="shrink-0">
              <AlertCircle className="text-red-500" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-red-900 mb-1">
                Emergency Use Protocol
              </h3>
              <p className="text-red-800">
                Scan patient's QR code to instantly access critical medical information 
                including allergies, medications, blood type, and emergency contacts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} text-white rounded-xl p-6 hover:shadow-md transition-all duration-200 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  {action.icon}
                </div>
                <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
              <p className="text-white/90 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg mb-4">Ready to improve emergency medical response?</p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Free
              <ChevronRight size={18} className="ml-2" />
            </Link>
            <p className="text-sm text-gray-400 mt-4">No credit card required • HIPAA compliant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;