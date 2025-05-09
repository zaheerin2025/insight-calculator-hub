
import React from 'react';
import Layout from '@/components/layout/Layout';
import TileCalculator from '@/components/calculators/construction/TileCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const TileCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Tile Calculator | InsightCalc" 
        description="Calculate how many tiles you need for your project based on dimensions and tile size."
      />
      <TileCalculator />
    </Layout>
  );
};

export default TileCalculatorPage;
