
import React from 'react';
import Layout from '@/components/layout/Layout';
import RoofingCalculator from '@/components/calculators/construction/RoofingCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const RoofingCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Roofing Calculator | InsightCalc" 
        description="Calculate roofing materials needed based on roof dimensions and type."
      />
      <RoofingCalculator />
    </Layout>
  );
};

export default RoofingCalculatorPage;
