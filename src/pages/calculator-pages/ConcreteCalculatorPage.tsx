
import React from 'react';
import Layout from '@/components/layout/Layout';
import ConcreteCalculator from '@/components/calculators/construction/ConcreteCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const ConcreteCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Concrete Calculator | InsightCalc" 
        description="Calculate the amount of concrete needed for your construction project based on dimensions."
      />
      <ConcreteCalculator />
    </Layout>
  );
};

export default ConcreteCalculatorPage;
