
import React from 'react';
import Layout from '@/components/layout/Layout';
import PythagoreanTheoremCalculator from '@/components/calculators/math/PythagoreanTheoremCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const PythagoreanTheoremCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Pythagorean Theorem Calculator | InsightCalc" 
        description="Calculate the sides of a right triangle using the Pythagorean theorem with our easy-to-use calculator."
      />
      <PythagoreanTheoremCalculator />
    </Layout>
  );
};

export default PythagoreanTheoremCalculatorPage;
