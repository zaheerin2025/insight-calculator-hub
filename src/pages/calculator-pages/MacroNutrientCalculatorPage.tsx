
import React from 'react';
import Layout from '@/components/layout/Layout';
import MacroNutrientCalculator from '@/components/calculators/health/MacroNutrientCalculator';
import SEOMeta from '@/components/ui/seo-meta';

const MacroNutrientCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Macro Nutrient Calculator | InsightCalc" 
        description="Calculate your ideal macronutrient distribution based on your goals and body type."
      />
      <MacroNutrientCalculator />
    </Layout>
  );
};

export default MacroNutrientCalculatorPage;
