
import React from 'react';
import Layout from '@/components/layout/Layout';
import PercentageCalculator from '@/components/calculators/math/PercentageCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const PercentageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Percentage Calculator | InsightCalc" 
        description="Quickly calculate percentages for discounts, tips, grades, and more with our easy-to-use percentage calculator."
      />
      <PercentageCalculator />
    </Layout>
  );
};

export default PercentageCalculatorPage;
