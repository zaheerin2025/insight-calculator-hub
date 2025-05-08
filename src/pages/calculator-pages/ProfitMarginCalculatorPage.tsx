
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProfitMarginCalculator from '@/components/calculators/business/ProfitMarginCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const ProfitMarginCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Profit Margin Calculator | InsightCalc" 
        description="Calculate profit margins, required revenue, or costs for your business with our comprehensive profit margin calculator."
      />
      <ProfitMarginCalculator />
    </Layout>
  );
};

export default ProfitMarginCalculatorPage;
