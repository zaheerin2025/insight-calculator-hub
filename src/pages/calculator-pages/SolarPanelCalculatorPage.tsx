
import React from 'react';
import Layout from '@/components/layout/Layout';
import SolarPanelCalculator from '@/components/calculators/utility/SolarPanelCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const SolarPanelCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Solar Panel Savings Calculator | InsightCalc" 
        description="Estimate potential savings from installing solar panels based on your energy usage and location."
      />
      <SolarPanelCalculator />
    </Layout>
  );
};

export default SolarPanelCalculatorPage;
