
import React from 'react';
import Layout from '@/components/layout/Layout';
import LoanEMICalculator from '@/components/calculators/finance/LoanEMICalculator';

const LoanEMICalculatorPage: React.FC = () => {
  return (
    <Layout>
      <LoanEMICalculator />
    </Layout>
  );
};

export default LoanEMICalculatorPage;
