
import React from 'react';
import Layout from '@/components/layout/Layout';
import PregnancyDueDateCalculator from '@/components/calculators/health/PregnancyDueDateCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const PregnancyDueDateCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Pregnancy Due Date Calculator | InsightCalc" 
        description="Calculate your estimated due date based on last menstrual period, conception date, or ultrasound measurements."
      />
      <PregnancyDueDateCalculator />
    </Layout>
  );
};

export default PregnancyDueDateCalculatorPage;
