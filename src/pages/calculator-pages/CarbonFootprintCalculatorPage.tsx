
import React from 'react';
import Layout from '@/components/layout/Layout';
import CarbonFootprintCalculator from '@/components/calculators/utility/CarbonFootprintCalculator';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const CarbonFootprintCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Carbon Footprint Calculator"
        description="Estimate your personal or household carbon footprint based on lifestyle choices."
        intro="Our carbon footprint calculator helps you understand the environmental impact of your lifestyle choices and identify areas where you can reduce your carbon emissions."
        canonicalUrl="https://calculators-hub.com/calculators/utility/carbon-footprint-calculator"
        faq={[
          {
            question: "What is a carbon footprint?",
            answer: "A carbon footprint is the total amount of greenhouse gases (primarily carbon dioxide) emitted directly or indirectly by human activities, usually expressed in equivalent tons of carbon dioxide (CO2)."
          },
          {
            question: "How can I reduce my carbon footprint?",
            answer: "You can reduce your carbon footprint by using energy-efficient appliances, reducing meat consumption, driving less, avoiding air travel, reducing waste, and using renewable energy sources."
          }
        ]}
        relatedCalculators={[
          {
            title: "Electricity Bill Calculator",
            path: "/calculators/utility/electricity-bill-calculator",
            category: "Utility"
          },
          {
            title: "Heating Cost Calculator",
            path: "/calculators/utility/heating-cost-calculator",
            category: "Utility"
          }
        ]}
      >
        <CarbonFootprintCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default CarbonFootprintCalculatorPage;
