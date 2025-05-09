
import React from 'react';
import Layout from '@/components/layout/Layout';
import GasMileageCalculator from '@/components/calculators/utility/GasMileageCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const GasMileageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Gas Mileage (MPG) Calculator | InsightCalc" 
        description="Calculate your vehicle's fuel economy and estimate fuel costs for trips."
      />
      <GasMileageCalculator />
    </Layout>
  );
};

export default GasMileageCalculatorPage;
