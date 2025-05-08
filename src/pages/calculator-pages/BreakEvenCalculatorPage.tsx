
import React from 'react';
import Layout from '@/components/layout/Layout';
import BreakEvenCalculator from '@/components/calculators/business/BreakEvenCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const BreakEvenCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Break-Even Point Calculator | InsightCalc" 
        description="Calculate when your business will become profitable by determining the break-even point with our easy-to-use calculator."
      />
      <BreakEvenCalculator />
    </Layout>
  );
};

export default BreakEvenCalculatorPage;
