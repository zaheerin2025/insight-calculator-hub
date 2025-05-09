
import React from 'react';
import Layout from '@/components/layout/Layout';
import FlooringCalculator from '@/components/calculators/construction/FlooringCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const FlooringCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Flooring Calculator | InsightCalc" 
        description="Calculate how much flooring material you need for your project based on room dimensions."
      />
      <FlooringCalculator />
    </Layout>
  );
};

export default FlooringCalculatorPage;
