
import React from 'react';
import Layout from '@/components/layout/Layout';
import MortgageCalculator from '@/components/calculators/finance/MortgageCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const MortgageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Mortgage Calculator | InsightCalc" 
        description="Plan your home purchase with our mortgage calculator. Estimate monthly payments, interest costs, and more."
      />
      <MortgageCalculator />
    </Layout>
  );
};

export default MortgageCalculatorPage;
