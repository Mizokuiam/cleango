import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { ROUTES } from '../../lib/constants';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'nav-blur' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to={ROUTES.FEATURES}
              className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                isActive(ROUTES.FEATURES) ? 'text-primary-light' : ''
              }`}
            >
              Why Us
            </Link>
            <Link 
              to={ROUTES.PRICING}
              className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                isActive(ROUTES.PRICING) ? 'text-primary-light' : ''
              }`}
            >
              Pricing
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link 
                  to={ROUTES.DASHBOARD}
                  className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                    isActive(ROUTES.DASHBOARD) ? 'text-primary-light' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to={ROUTES.LOGIN}
                  className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                    isActive(ROUTES.LOGIN) ? 'text-primary-light' : ''
                  }`}
                >
                  Login
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <div className="flex flex-col space-y-4">
              <Link 
                to={ROUTES.FEATURES}
                className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                  isActive(ROUTES.FEATURES) ? 'text-primary-light' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why Us
              </Link>
              <Link 
                to={ROUTES.PRICING}
                className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                  isActive(ROUTES.PRICING) ? 'text-primary-light' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {user ? (
                <>
                  <Link 
                    to={ROUTES.DASHBOARD}
                    className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                      isActive(ROUTES.DASHBOARD) ? 'text-primary-light' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to={ROUTES.LOGIN}
                    className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                      isActive(ROUTES.LOGIN) ? 'text-primary-light' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to={ROUTES.SIGNUP} 
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="primary" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;