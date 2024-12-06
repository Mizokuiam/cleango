import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import { ROUTES } from '../lib/constants';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center bg-background-dark">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(46,125,50,0.15),transparent_50%)]" />
      </div>

      <Container className="relative pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-light px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <Leaf className="w-4 h-4 animate-float" />
              <span>Eco-Friendly Solutions</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Effortless Waste<br />Management
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Streamline garbage collection with our eco-friendly platform—simple plans, quick requests, and real-time tracking.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate(ROUTES.SIGNUP)}
                className="bg-primary hover:bg-primary-dark transition-all duration-300"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;