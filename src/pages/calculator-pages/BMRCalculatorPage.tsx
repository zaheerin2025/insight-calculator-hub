
import React from 'react';
import Layout from '@/components/layout/Layout';
import BMRCalculator from '@/components/calculators/health/BMRCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const BMRCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="BMR Calculator | InsightCalc" 
        description="Calculate your Basal Metabolic Rate (BMR) to understand your daily calorie requirements at rest."
      />
      <BMRCalculator />
    </Layout>
  );
};

export default BMRCalculatorPage;
