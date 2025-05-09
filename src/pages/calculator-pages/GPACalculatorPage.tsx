
import React from 'react';
import Layout from '@/components/layout/Layout';
import GPACalculator from '@/components/calculators/utility/GPACalculator';
import SEOMeta from '@/components/ui/seo-meta';

const GPACalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="GPA Calculator | Calculators Hub" 
        description="Calculate your Grade Point Average (GPA) based on grades and credit hours with our free online GPA calculator."
        canonicalUrl="https://calculators-hub.com/calculators/utility/gpa-calculator"
      />
      <GPACalculator />
    </Layout>
  );
};

export default GPACalculatorPage;
