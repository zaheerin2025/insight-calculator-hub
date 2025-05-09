
import React from 'react';
import Layout from '@/components/layout/Layout';
import WallFramingCalculator from '@/components/calculators/construction/WallFramingCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const WallFramingCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Wall Framing Calculator | InsightCalc" 
        description="Calculate lumber needed for wall framing based on wall dimensions and stud spacing."
      />
      <WallFramingCalculator />
    </Layout>
  );
};

export default WallFramingCalculatorPage;
