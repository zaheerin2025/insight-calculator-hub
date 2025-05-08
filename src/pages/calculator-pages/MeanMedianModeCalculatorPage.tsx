
import React from 'react';
import Layout from '@/components/layout/Layout';
import MeanMedianModeCalculator from '@/components/calculators/math/MeanMedianModeCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const MeanMedianModeCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Mean, Median, Mode Calculator | InsightCalc" 
        description="Calculate statistical measures including mean, median, and mode from a data set with our easy-to-use statistics calculator."
      />
      <MeanMedianModeCalculator />
    </Layout>
  );
};

export default MeanMedianModeCalculatorPage;
