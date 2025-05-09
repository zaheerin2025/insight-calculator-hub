
import React from 'react';
import Layout from '@/components/layout/Layout';
import EVRangeCalculator from '@/components/calculators/utility/EVRangeCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const EVRangeCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Electric Vehicle Range Calculator | InsightCalc" 
        description="Estimate how far your electric vehicle can travel on a single charge."
      />
      <EVRangeCalculator />
    </Layout>
  );
};

export default EVRangeCalculatorPage;
