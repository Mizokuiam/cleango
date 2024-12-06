import React from 'react';
import { Leaf } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full z-50 nav-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">CleanGo</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#resources" className="text-gray-300 hover:text-white transition-colors">Resources</a>
            <a href="#support" className="text-gray-300 hover:text-white transition-colors">Support</a>
            <a href="#updates" className="text-gray-300 hover:text-white transition-colors">Updates</a>
            <a href="#enterprise" className="text-gray-300 hover:text-white transition-colors">Enterprise</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Sales</a>
            <a href="/login" className="text-gray-300 hover:text-white transition-colors">Login</a>
            <a href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Start for free
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;