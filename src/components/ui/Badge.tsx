import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  className = '',
  variant = 'primary' 
}) => {
  const variants = {
    primary: 'bg-primary/10 text-primary-light',
    secondary: 'bg-gray-500/10 text-gray-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      <span className="inline-block w-2 h-2 bg-current rounded-full animate-pulse-slow"></span>
      {children}
    </motion.div>
  );
};

export default Badge;