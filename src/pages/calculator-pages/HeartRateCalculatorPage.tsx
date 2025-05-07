
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeartRateCalculator from '@/components/calculators/health/HeartRateCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const HeartRateCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Heart Rate Calculator | InsightCalc" 
        description="Calculate your target heart rate zones for optimal exercise intensity based on your age and resting heart rate."
      />
      <HeartRateCalculator />
    </Layout>
  );
};

export default HeartRateCalculatorPage;
