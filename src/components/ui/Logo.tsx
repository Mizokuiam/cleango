import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Recycle } from 'lucide-react';
import { ROUTES } from '../../lib/constants';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to={ROUTES.HOME} className={`flex items-center gap-2 group ${className}`}>
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="relative w-8 h-8"
      >
        <Recycle className="w-8 h-8 text-primary absolute inset-0 opacity-70" />
        <Leaf className="w-6 h-6 text-primary-light absolute inset-1 group-hover:scale-110 transition-transform" />
      </motion.div>
      <span className="text-xl font-bold text-white">CleanGo</span>
    </Link>
  );
};

export default Logo;