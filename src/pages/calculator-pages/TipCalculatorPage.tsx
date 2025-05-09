
import React from 'react';
import Layout from '@/components/layout/Layout';
import TipCalculator from '@/components/calculators/utility/TipCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const TipCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Tip Calculator | InsightCalc" 
        description="Calculate tips for restaurants, services, and more with options for splitting the bill."
      />
      <TipCalculator />
    </Layout>
  );
};

export default TipCalculatorPage;
