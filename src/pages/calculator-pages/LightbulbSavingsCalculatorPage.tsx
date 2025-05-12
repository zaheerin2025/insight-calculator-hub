
import React from 'react';
import Layout from '@/components/layout/Layout';
import LightbulbSavingsCalculator from '@/components/calculators/utility/LightbulbSavingsCalculator';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const LightbulbSavingsCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Light Bulb Energy Savings Calculator"
        description="Compare different light bulb types and calculate energy savings."
        intro="Our light bulb calculator helps you determine how much you can save by switching to energy-efficient lighting options in your home or business."
        canonicalUrl="https://calculators-hub.com/calculators/utility/lightbulb-savings-calculator"
        faq={[
          {
            question: "What are the most energy-efficient light bulbs?",
            answer: "LED bulbs are currently the most energy-efficient option, using up to 90% less energy than traditional incandescent bulbs and lasting up to 25 times longer."
          },
          {
            question: "Are LED bulbs worth the higher upfront cost?",
            answer: "Yes, despite the higher initial cost, LED bulbs typically pay for themselves within 1-2 years through energy savings and reduced replacement costs due to their long lifespan."
          }
        ]}
        relatedCalculators={[
          {
            title: "Electricity Bill Calculator",
            path: "/calculators/utility/electricity-bill-calculator",
            category: "Utility"
          },
          {
            title: "Appliance Energy Use Calculator",
            path: "/calculators/utility/appliance-energy-calculator",
            category: "Utility"
          }
        ]}
      >
        <LightbulbSavingsCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default LightbulbSavingsCalculatorPage;
