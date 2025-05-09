
import React from 'react';
import Layout from '@/components/layout/Layout';
import UnitConverter from '@/components/calculators/utility/UnitConverter';
import SEOMeta from '@/components/ui/seo-meta';

const UnitConverterPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Unit Converter | InsightCalc" 
        description="Convert between various measurement units including length, weight, volume, temperature, and more."
      />
      <UnitConverter />
    </Layout>
  );
};

export default UnitConverterPage;
