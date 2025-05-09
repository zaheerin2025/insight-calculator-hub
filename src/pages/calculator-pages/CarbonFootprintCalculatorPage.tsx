
import React from 'react';
import Layout from '@/components/layout/Layout';
import CarbonFootprintCalculator from '@/components/calculators/utility/CarbonFootprintCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const CarbonFootprintCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Carbon Footprint Calculator | InsightCalc" 
        description="Estimate your personal or household carbon footprint based on lifestyle choices."
      />
      <CarbonFootprintCalculator />
    </Layout>
  );
};

export default CarbonFootprintCalculatorPage;
