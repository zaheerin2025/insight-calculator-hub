
import React from 'react';
import Layout from '@/components/layout/Layout';
import DateCalculator from '@/components/calculators/utility/DateCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const DateCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Date Calculator | Calculators Hub" 
        description="Calculate the difference between dates or add/subtract days, months, or years from a date with our free online date calculator."
        canonicalUrl="https://calculators-hub.com/calculators/utility/date-calculator"
      />
      <DateCalculator />
    </Layout>
  );
};

export default DateCalculatorPage;
