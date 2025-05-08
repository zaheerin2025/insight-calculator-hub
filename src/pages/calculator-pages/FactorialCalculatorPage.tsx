
import React from 'react';
import Layout from '@/components/layout/Layout';
import FactorialCalculator from '@/components/calculators/math/FactorialCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const FactorialCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Factorial Calculator | InsightCalc" 
        description="Calculate the factorial of any positive integer quickly and efficiently with our easy-to-use factorial calculator."
      />
      <FactorialCalculator />
    </Layout>
  );
};

export default FactorialCalculatorPage;
