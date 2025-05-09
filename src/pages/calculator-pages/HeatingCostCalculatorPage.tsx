
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeatingCostCalculator from '@/components/calculators/utility/HeatingCostCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const HeatingCostCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Heating Cost Calculator | InsightCalc" 
        description="Estimate heating costs based on your home size and energy source."
      />
      <HeatingCostCalculator />
    </Layout>
  );
};

export default HeatingCostCalculatorPage;
