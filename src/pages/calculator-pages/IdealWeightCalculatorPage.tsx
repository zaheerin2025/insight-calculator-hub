
import React from 'react';
import Layout from '@/components/layout/Layout';
import IdealWeightCalculator from '@/components/calculators/health/IdealWeightCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const IdealWeightCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Ideal Weight Calculator | InsightCalc" 
        description="Calculate your ideal weight based on height, gender, and body frame using multiple scientific formulas."
      />
      <IdealWeightCalculator />
    </Layout>
  );
};

export default IdealWeightCalculatorPage;
