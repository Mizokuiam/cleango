import React from 'react';

interface FeatureSectionProps {
  title: string;
  children: React.ReactNode;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, children }) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl">
      <h3 className="text-2xl font-semibold mb-8">{title}</h3>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

export default FeatureSection;