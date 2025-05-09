
import React from 'react';
import Layout from '@/components/layout/Layout';
import ElectricityBillCalculator from '@/components/calculators/utility/ElectricityBillCalculator';

const ElectricityBillCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <ElectricityBillCalculator />
    </Layout>
  );
};

export default ElectricityBillCalculatorPage;
