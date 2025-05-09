
import React from 'react';
import Layout from '@/components/layout/Layout';
import SalesTaxCalculator from '@/components/calculators/business/SalesTaxCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const SalesTaxCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Sales Tax Calculator | InsightCalc" 
        description="Calculate sales tax for different states and jurisdictions with our easy-to-use sales tax calculator."
      />
      <SalesTaxCalculator />
    </Layout>
  );
};

export default SalesTaxCalculatorPage;
