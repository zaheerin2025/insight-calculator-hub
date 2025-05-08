
import React from 'react';
import Layout from '@/components/layout/Layout';
import AreaCalculator from '@/components/calculators/math/AreaCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const AreaCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Area Calculator | InsightCalc" 
        description="Calculate the area of various shapes including circles, triangles, squares, and more with our easy-to-use area calculator."
      />
      <AreaCalculator />
    </Layout>
  );
};

export default AreaCalculatorPage;
