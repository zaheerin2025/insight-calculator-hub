
import React from 'react';
import Layout from '@/components/layout/Layout';
import DiscountCalculator from '@/components/calculators/math/DiscountCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const DiscountCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Discount Calculator | InsightCalc" 
        description="Calculate discount amounts, final prices, and savings with our easy-to-use discount calculator. Perfect for sales and shopping."
      />
      <DiscountCalculator />
    </Layout>
  );
};

export default DiscountCalculatorPage;
