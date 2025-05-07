
import React from 'react';
import Layout from '@/components/layout/Layout';
import DebtToIncomeCalculator from '@/components/calculators/finance/DebtToIncomeCalculator';

const DebtToIncomeCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <DebtToIncomeCalculator />
    </Layout>
  );
};

export default DebtToIncomeCalculatorPage;
