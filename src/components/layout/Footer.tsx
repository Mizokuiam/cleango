import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import { ROUTES } from '../../lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark border-t border-primary/10">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Logo className="mb-6" />
            <p className="text-gray-400">
              Revolutionizing waste management with smart, sustainable solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to={ROUTES.FEATURES} className="text-gray-400 hover:text-primary-light transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRICING} className="text-gray-400 hover:text-primary-light transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <a 
                href="mailto:contact@cleango.com" 
                className="flex items-center gap-2 text-gray-400 hover:text-primary-light transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@cleango.com
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 text-gray-400 hover:text-primary-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                (123) 456-7890
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Connect</h4>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-light transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-light transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/10 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CleanGo. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;