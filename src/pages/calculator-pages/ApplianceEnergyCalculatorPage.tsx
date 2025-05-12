
import React from 'react';
import Layout from '@/components/layout/Layout';
import ApplianceEnergyCalculator from '@/components/calculators/utility/ApplianceEnergyCalculator';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const ApplianceEnergyCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Appliance Energy Use Calculator"
        description="Calculate the energy consumption and cost of various household appliances."
        intro="Our appliance energy calculator helps you understand how much electricity your appliances use and how they contribute to your energy bills."
        canonicalUrl="https://calculators-hub.com/calculators/utility/appliance-energy-calculator"
        faq={[
          {
            question: "Which household appliances use the most energy?",
            answer: "Typically, heating and cooling systems, water heaters, refrigerators, clothes dryers, and ovens are the biggest energy consumers in most homes."
          },
          {
            question: "How can I reduce my appliance energy consumption?",
            answer: "Replace old appliances with energy-efficient models, unplug devices when not in use, use smart power strips, wash clothes in cold water, and use appliances during off-peak hours."
          }
        ]}
        relatedCalculators={[
          {
            title: "Electricity Bill Calculator",
            path: "/calculators/utility/electricity-bill-calculator",
            category: "Utility"
          },
          {
            title: "Light Bulb Energy Savings Calculator",
            path: "/calculators/utility/lightbulb-savings-calculator",
            category: "Utility"
          }
        ]}
      >
        <ApplianceEnergyCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default ApplianceEnergyCalculatorPage;
