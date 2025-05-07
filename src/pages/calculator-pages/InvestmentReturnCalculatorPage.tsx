
import React from 'react';
import Layout from '@/components/layout/Layout';
import InvestmentReturnCalculator from '@/components/calculators/finance/InvestmentReturnCalculator';

const InvestmentReturnCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <InvestmentReturnCalculator />
    </Layout>
  );
};

export default InvestmentReturnCalculatorPage;
