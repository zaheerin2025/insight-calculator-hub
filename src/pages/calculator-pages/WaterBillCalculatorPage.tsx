
import React from 'react';
import Layout from '@/components/layout/Layout';
import WaterBillCalculator from '@/components/calculators/utility/WaterBillCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const WaterBillCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Water Bill Calculator | InsightCalc" 
        description="Calculate your water bill based on usage and local rates."
      />
      <WaterBillCalculator />
    </Layout>
  );
};

export default WaterBillCalculatorPage;
