
import React from 'react';
import Layout from '@/components/layout/Layout';
import MarkupCalculator from '@/components/calculators/business/MarkupCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const MarkupCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Markup Calculator | InsightCalc" 
        description="Calculate markup percentage on your products and services with our easy-to-use markup calculator."
      />
      <MarkupCalculator />
    </Layout>
  );
};

export default MarkupCalculatorPage;
