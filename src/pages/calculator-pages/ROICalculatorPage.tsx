
import React from 'react';
import Layout from '@/components/layout/Layout';
import ROICalculator from '@/components/calculators/business/ROICalculator';
import SEOMeta from '@/components/ui/seo-meta';

const ROICalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="ROI Calculator | InsightCalc" 
        description="Calculate return on investment (ROI) for your business decisions and investments with our easy-to-use ROI calculator."
      />
      <ROICalculator />
    </Layout>
  );
};

export default ROICalculatorPage;
