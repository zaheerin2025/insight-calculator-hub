
import React from 'react';
import Layout from '@/components/layout/Layout';
import FractionsCalculator from '@/components/calculators/math/FractionsCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const FractionsCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Fractions Calculator | InsightCalc" 
        description="Add, subtract, multiply, and divide fractions with step-by-step solutions using our easy-to-use fractions calculator."
      />
      <FractionsCalculator />
    </Layout>
  );
};

export default FractionsCalculatorPage;
