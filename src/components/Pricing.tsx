import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import Badge from './ui/Badge';

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
          <Badge className="mb-8">
            Choose Your Plan
          </Badge>
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
          className="relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(46,125,50,0.15),transparent_50%)]" />
          <div className="relative bg-background-light/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 shadow-xl">
            <stripe-pricing-table
              pricing-table-id="prctbl_1QSq9GBMzTOmxPV80ZZMOsMS"
              publishable-key="pk_test_51QQGDwBMzTOmxPV8Fw9DS00S6ySQ2qoHXIbN2ZWPfrUBmow4E0wxScPzy1I6zLikpEKt4T5AJgoRyyDcF2THGBKc00zFZUYw5l">
            </stripe-pricing-table>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Pricing;