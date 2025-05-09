
import React from 'react';
import Layout from '@/components/layout/Layout';
import LightbulbSavingsCalculator from '@/components/calculators/utility/LightbulbSavingsCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const LightbulbSavingsCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Light Bulb Energy Savings Calculator | InsightCalc" 
        description="Compare different light bulb types and calculate energy savings."
      />
      <LightbulbSavingsCalculator />
    </Layout>
  );
};

export default LightbulbSavingsCalculatorPage;
