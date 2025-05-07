
import React from 'react';
import Layout from '@/components/layout/Layout';
import AutoLoanCalculator from '@/components/calculators/finance/AutoLoanCalculator';

const AutoLoanCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <AutoLoanCalculator />
    </Layout>
  );
};

export default AutoLoanCalculatorPage;
