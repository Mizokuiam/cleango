import React from 'react';
import { Building } from 'lucide-react';
import Container from './ui/Container';

const PARTNERS = [
  'Waste Management Inc.',
  'Republic Services',
  'Veolia North America',
  'SUEZ Recycling & Recovery',
  'Biffa',
  'Clean Harbors',
  'Waste Connections',
  'Advanced Disposal',
  'Stericycle',
  'Covanta'
];

const Partners: React.FC = () => {
  return (
    <div className="py-20 bg-background-dark overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400">
            Partnering with the world's leading waste management companies
          </p>
        </div>
      </Container>

      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(46,125,50,0.15),transparent_50%)]" />
        
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap py-8">
            {PARTNERS.map((partner) => (
              <div
                key={partner}
                className="inline-flex items-center justify-center mx-8 bg-background-light px-8 py-4 rounded-xl border border-primary/20"
              >
                <Building className="w-6 h-6 text-primary-light mr-3" />
                <span className="text-white font-medium">{partner}</span>
              </div>
            ))}
          </div>

          <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-8">
            {PARTNERS.map((partner) => (
              <div
                key={partner}
                className="inline-flex items-center justify-center mx-8 bg-background-light px-8 py-4 rounded-xl border border-primary/20"
              >
                <Building className="w-6 h-6 text-primary-light mr-3" />
                <span className="text-white font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;