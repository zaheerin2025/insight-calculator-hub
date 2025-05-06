
import React from 'react';
import Layout from '@/components/layout/Layout';
import BMICalculator from '@/components/calculators/health/BMICalculator';

const BMICalculatorPage: React.FC = () => {
  return (
    <Layout>
      <BMICalculator />
    </Layout>
  );
};

export default BMICalculatorPage;
