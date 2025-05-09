
import React from 'react';
import Layout from '@/components/layout/Layout';
import CoolingCostCalculator from '@/components/calculators/utility/CoolingCostCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const CoolingCostCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Cooling Cost Calculator | InsightCalc" 
        description="Calculate air conditioning and cooling costs during warm months."
      />
      <CoolingCostCalculator />
    </Layout>
  );
};

export default CoolingCostCalculatorPage;
