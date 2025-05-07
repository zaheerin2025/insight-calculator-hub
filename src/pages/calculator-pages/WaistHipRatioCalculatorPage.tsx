
import React from 'react';
import Layout from '@/components/layout/Layout';
import WaistHipRatioCalculator from '@/components/calculators/health/WaistHipRatioCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const WaistHipRatioCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Waist-to-Hip Ratio Calculator | InsightCalc" 
        description="Calculate your waist-to-hip ratio to assess health risks related to weight distribution."
      />
      <WaistHipRatioCalculator />
    </Layout>
  );
};

export default WaistHipRatioCalculatorPage;
