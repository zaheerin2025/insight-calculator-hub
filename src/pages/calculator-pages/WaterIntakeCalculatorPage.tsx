
import React from 'react';
import Layout from '@/components/layout/Layout';
import WaterIntakeCalculator from '@/components/calculators/health/WaterIntakeCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const WaterIntakeCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Water Intake Calculator | InsightCalc" 
        description="Calculate your recommended daily water intake based on weight, activity level, and climate."
      />
      <WaterIntakeCalculator />
    </Layout>
  );
};

export default WaterIntakeCalculatorPage;
