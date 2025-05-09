
import React from 'react';
import Layout from '@/components/layout/Layout';
import FuelCostCalculator from '@/components/calculators/utility/FuelCostCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const FuelCostCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Fuel Cost Calculator | Calculators Hub" 
        description="Estimate fuel costs for trips based on distance, fuel efficiency, and current fuel prices with our free online fuel cost calculator."
        canonicalUrl="https://calculators-hub.com/calculators/utility/fuel-cost-calculator"
      />
      <FuelCostCalculator />
    </Layout>
  );
};

export default FuelCostCalculatorPage;
