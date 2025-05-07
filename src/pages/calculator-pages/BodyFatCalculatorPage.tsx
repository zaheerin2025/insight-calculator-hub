
import React from 'react';
import Layout from '@/components/layout/Layout';
import BodyFatCalculator from '@/components/calculators/health/BodyFatCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const BodyFatCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Body Fat Calculator | InsightCalc" 
        description="Estimate your body fat percentage using various methods including Navy method and skinfold measurements."
      />
      <BodyFatCalculator />
    </Layout>
  );
};

export default BodyFatCalculatorPage;
