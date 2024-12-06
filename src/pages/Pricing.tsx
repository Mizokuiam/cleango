import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
      };
    }
  }
}

const Pricing: React.FC = () => {
  return (
    <div className="py-32 bg-background-dark" id="pricing">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-light px-4 py-1 rounded-full text-sm font-medium mb-8">
            <span className="inline-block w-2 h-2 bg-primary-light rounded-full animate-pulse"></span>
            Flexible Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Choose the plan that works best for you
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-background-light/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 shadow-xl"
        >
          <stripe-pricing-table
            pricing-table-id="prctbl_1QSq9GBMzTOmxPV80ZZMOsMS"
            publishable-key="pk_test_51QQGDwBMzTOmxPV8Fw9DS00S6ySQ2qoHXIbN2ZWPfrUBmow4E0wxScPzy1I6zLikpEKt4T5AJgoRyyDcF2THGBKc00zFZUYw5l">
          </stripe-pricing-table>
        </motion.div>
      </Container>
    </div>
  );
};

export default Pricing;