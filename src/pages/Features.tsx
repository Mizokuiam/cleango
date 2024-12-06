import React from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, CreditCard, MapPin, BarChart, Route, Leaf, Recycle } from 'lucide-react';
import Container from '../components/ui/Container';

const Features: React.FC = () => {
  return (
    <div className="py-32 bg-background-dark" id="why-us">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Why Choose CleanGo?
          </h2>
          <p className="text-xl text-gray-400">
            Experience the future of waste management with our innovative solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Recycle />}
            title="Smart Collection"
            description="AI-powered scheduling and route optimization for efficient pickups"
          />
          <FeatureCard
            icon={<Calendar />}
            title="Flexible Scheduling"
            description="Book collections at your convenience with real-time availability"
          />
          <FeatureCard
            icon={<Leaf />}
            title="Eco-Tracking"
            description="Monitor your environmental impact and recycling achievements"
          />
          <FeatureCard
            icon={<MapPin />}
            title="Live Tracking"
            description="Real-time updates on collection status and vehicle location"
          />
          <FeatureCard
            icon={<BarChart />}
            title="Analytics Dashboard"
            description="Comprehensive insights into your waste management patterns"
          />
          <FeatureCard
            icon={<Route />}
            title="Smart Routing"
            description="Optimized collection routes for reduced emissions"
          />
        </div>
      </Container>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-background-light p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary-light mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default Features;