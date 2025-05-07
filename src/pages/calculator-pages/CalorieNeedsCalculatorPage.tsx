
import React from 'react';
import Layout from '@/components/layout/Layout';
import CalorieNeedsCalculator from '@/components/calculators/health/CalorieNeedsCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const CalorieNeedsCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Calorie Needs Calculator | InsightCalc" 
        description="Calculate your daily calorie requirements based on your activity level, age, weight, height, and gender."
      />
      <CalorieNeedsCalculator />
    </Layout>
  );
};

export default CalorieNeedsCalculatorPage;
