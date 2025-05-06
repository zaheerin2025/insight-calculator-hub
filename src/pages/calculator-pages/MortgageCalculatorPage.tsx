
import React from 'react';
import Layout from '@/components/layout/Layout';
import MortgageCalculator from '@/components/calculators/finance/MortgageCalculator';

const MortgageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <MortgageCalculator />
    </Layout>
  );
};

export default MortgageCalculatorPage;
