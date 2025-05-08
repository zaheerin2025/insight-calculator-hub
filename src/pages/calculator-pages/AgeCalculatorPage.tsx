
import React from 'react';
import Layout from '@/components/layout/Layout';
import AgeCalculator from '@/components/calculators/math/AgeCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const AgeCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Age Calculator | InsightCalc" 
        description="Calculate the exact age between two dates in years, months, and days with our precise age calculator."
      />
      <AgeCalculator />
    </Layout>
  );
};

export default AgeCalculatorPage;
