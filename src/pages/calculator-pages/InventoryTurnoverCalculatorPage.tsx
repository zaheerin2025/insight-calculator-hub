
import React from 'react';
import Layout from '@/components/layout/Layout';
import InventoryTurnoverCalculator from '@/components/calculators/business/InventoryTurnoverCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const InventoryTurnoverCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Inventory Turnover Calculator | InsightCalc" 
        description="Calculate how efficiently inventory is managed with our easy-to-use inventory turnover calculator."
      />
      <InventoryTurnoverCalculator />
    </Layout>
  );
};

export default InventoryTurnoverCalculatorPage;
