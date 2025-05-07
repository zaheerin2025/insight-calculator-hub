
import React from 'react';
import Layout from '@/components/layout/Layout';
import SimpleInterestCalculator from '@/components/calculators/finance/SimpleInterestCalculator';

const SimpleInterestCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SimpleInterestCalculator />
    </Layout>
  );
};

export default SimpleInterestCalculatorPage;
