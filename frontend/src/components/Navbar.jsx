import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, QrCode, Scan, Users } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/generate', label: 'Generate QR', icon: <QrCode size={20} /> },
    { path: '/scan', label: 'Scan QR', icon: <Scan size={20} /> },
    { path: '/users', label: 'Users', icon: <Users size={20} /> },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emergency-red rounded-lg flex items-center justify-center">
                <QrCode className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Medi<span className="text-emergency-red">QR</span></h1>
                <p className="text-xs text-gray-500">Emergency Medical QR System</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;