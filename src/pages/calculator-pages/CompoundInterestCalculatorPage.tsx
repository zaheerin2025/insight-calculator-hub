
import React from 'react';
import Layout from '@/components/layout/Layout';
import CompoundInterestCalculator from '@/components/calculators/finance/CompoundInterestCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const CompoundInterestCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Compound Interest Calculator | InsightCalc" 
        description="See how your investments can grow over time with our compound interest calculator. Plan your financial future with precision."
      />
      <CompoundInterestCalculator />
    </Layout>
  );
};

export default CompoundInterestCalculatorPage;
