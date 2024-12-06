import React from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, CreditCard, MapPin, BarChart, Route, Leaf, Recycle } from 'lucide-react';
import Container from './ui/Container';

const Features: React.FC = () => {
  return (
    <div className="py-32 bg-background-dark" id="features">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Sustainable Solutions for a Cleaner Future
          </h2>
          <p className="text-xl text-gray-400">
            Join us in making waste management efficient and environmentally responsible
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Recycle />}
            title="Smart Recycling"
            description="Advanced sorting and recycling solutions for sustainable waste management"
          />
          <FeatureCard
            icon={<Calendar />}
            title="Scheduled Collections"
            description="Efficient pickup scheduling to reduce carbon footprint"
          />
          <FeatureCard
            icon={<Leaf />}
            title="Eco-tracking"
            description="Monitor your environmental impact and recycling achievements"
          />
          <FeatureCard
            icon={<MapPin />}
            title="Route Optimization"
            description="Smart routes that minimize emissions and maximize efficiency"
          />
          <FeatureCard
            icon={<BarChart />}
            title="Impact Analytics"
            description="Track your contribution to environmental sustainability"
          />
          <FeatureCard
            icon={<Route />}
            title="Green Network"
            description="Connect with eco-conscious waste management partners"
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