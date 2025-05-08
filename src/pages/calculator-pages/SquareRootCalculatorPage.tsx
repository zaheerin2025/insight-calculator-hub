
import React from 'react';
import Layout from '@/components/layout/Layout';
import SquareRootCalculator from '@/components/calculators/math/SquareRootCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const SquareRootCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Square Root Calculator | InsightCalc" 
        description="Calculate the square root of any positive number with precision using our easy-to-use square root calculator."
      />
      <SquareRootCalculator />
    </Layout>
  );
};

export default SquareRootCalculatorPage;
