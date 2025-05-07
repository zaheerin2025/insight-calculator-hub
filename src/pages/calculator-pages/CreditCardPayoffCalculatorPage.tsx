
import React from 'react';
import Layout from '@/components/layout/Layout';
import CreditCardPayoffCalculator from '@/components/calculators/finance/CreditCardPayoffCalculator';

const CreditCardPayoffCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CreditCardPayoffCalculator />
    </Layout>
  );
};

export default CreditCardPayoffCalculatorPage;
