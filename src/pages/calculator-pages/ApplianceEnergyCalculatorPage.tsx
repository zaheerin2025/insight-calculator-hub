
import React from 'react';
import Layout from '@/components/layout/Layout';
import ApplianceEnergyCalculator from '@/components/calculators/utility/ApplianceEnergyCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const ApplianceEnergyCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Appliance Energy Use Calculator | InsightCalc" 
        description="Calculate the energy consumption and cost of various household appliances."
      />
      <ApplianceEnergyCalculator />
    </Layout>
  );
};

export default ApplianceEnergyCalculatorPage;
