import React from 'react';
import { motion } from 'framer-motion';
import {
  UserCircle,
  Building,
  Calendar,
  CreditCard,
  Bell,
  Leaf,
  BarChart,
  Route,
  Filter,
  DollarSign,
  LineChart,
  MessageCircle
} from 'lucide-react';
import Container from './ui/Container';

const Features: React.FC = () => {
  return (
    <div className="py-32 bg-background-dark" id="features">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Smart Solutions for Everyone
          </h2>
          <p className="text-xl text-gray-400">
            Comprehensive waste management features designed for both residents and service providers
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16">
          {/* Residents Features */}
          <div className="space-y-8">
            <div className="bg-primary/5 backdrop-blur-sm p-6 rounded-2xl border border-primary/20">
              <h3 className="text-2xl font-semibold mb-8 text-white flex items-center gap-3">
                <UserCircle className="w-8 h-8 text-primary-light" />
                For Residents
              </h3>
              <div className="grid gap-6">
                <FeatureCard
                  icon={<Building />}
                  title="Easy Registration"
                  description="Sign up quickly and securely using Supabase authentication"
                />
                <FeatureCard
                  icon={<Calendar />}
                  title="Request Pickups"
                  description="Post garbage collection requests by specifying waste type and urgency"
                />
                <FeatureCard
                  icon={<CreditCard />}
                  title="Flexible Payment Plans"
                  description="Choose from single pickups, monthly, or annual plans with secure Stripe payments"
                />
                <FeatureCard
                  icon={<Bell />}
                  title="Real-Time Tracking"
                  description="Monitor request status and receive instant notifications"
                />
                <FeatureCard
                  icon={<Leaf />}
                  title="Eco-Friendly Tips"
                  description="Access recycling guides to manage waste responsibly"
                />
              </div>
            </div>
          </div>

          {/* Service Providers Features */}
          <div className="space-y-8">
            <div className="bg-primary/5 backdrop-blur-sm p-6 rounded-2xl border border-primary/20">
              <h3 className="text-2xl font-semibold mb-8 text-white flex items-center gap-3">
                <Building className="w-8 h-8 text-primary-light" />
                For Service Providers
              </h3>
              <div className="grid gap-6">
                <FeatureCard
                  icon={<BarChart />}
                  title="Smart Dashboard"
                  description="View and manage all collection requests in one centralized place"
                />
                <FeatureCard
                  icon={<Route />}
                  title="Route Optimization"
                  description="AI-powered route planning for maximum efficiency and fuel savings"
                />
                <FeatureCard
                  icon={<Filter />}
                  title="Request Filters"
                  description="Sort and manage requests by urgency, location, or waste type"
                />
                <FeatureCard
                  icon={<DollarSign />}
                  title="Payment Management"
                  description="Track and manage incoming payments from residents seamlessly"
                />
                <FeatureCard
                  icon={<LineChart />}
                  title="Performance Analytics"
                  description="Access detailed reports on collection patterns and metrics"
                />
                <FeatureCard
                  icon={<MessageCircle />}
                  title="Resident Communication"
                  description="Direct messaging for updates and clarifications"
                />
              </div>
            </div>
          </div>
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
    whileHover={{ x: 8 }}
    className="flex gap-4 items-start group"
  >
    <div className="p-2 bg-primary/10 rounded-xl text-primary-light">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1 text-white">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

export default Features;