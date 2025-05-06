
import React from 'react';
import Layout from '@/components/layout/Layout';
import CompoundInterestCalculator from '@/components/calculators/finance/CompoundInterestCalculator';

const CompoundInterestCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CompoundInterestCalculator />
    </Layout>
  );
};

export default CompoundInterestCalculatorPage;
