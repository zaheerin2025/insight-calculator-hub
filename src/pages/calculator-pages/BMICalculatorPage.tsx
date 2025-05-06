
import React from 'react';
import Layout from '@/components/layout/Layout';
import BMICalculator from '@/components/calculators/health/BMICalculator';
import SEOMeta from '@/components/ui/seo-meta';

const BMICalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="BMI Calculator | InsightCalc" 
        description="Calculate your Body Mass Index (BMI) with our easy-to-use calculator. Understand what your BMI means for your health."
      />
      <BMICalculator />
    </Layout>
  );
};

export default BMICalculatorPage;
