
import React from 'react';
import Layout from '@/components/layout/Layout';
import SimpleInterestCalculator from '@/components/calculators/finance/SimpleInterestCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const SimpleInterestCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Simple Interest Calculator | InsightCalc" 
        description="Calculate simple interest on loans and investments with our easy-to-use calculator. Get accurate results for any principal, rate, and time period."
      />
      <SimpleInterestCalculator />
    </Layout>
  );
};

export default SimpleInterestCalculatorPage;
