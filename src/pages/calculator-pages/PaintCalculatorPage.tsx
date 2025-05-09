
import React from 'react';
import Layout from '@/components/layout/Layout';
import PaintCalculator from '@/components/calculators/construction/PaintCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const PaintCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Paint Calculator | InsightCalc" 
        description="Calculate how much paint you need based on wall dimensions and paint coverage."
      />
      <PaintCalculator />
    </Layout>
  );
};

export default PaintCalculatorPage;
