
import React from 'react';
import Layout from '@/components/layout/Layout';
import ElectricityBillCalculator from '@/components/calculators/utility/ElectricityBillCalculator';
import SEOMeta from '@/components/ui/seo-meta';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const ElectricityBillCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Electricity Bill Calculator"
        description="Calculate your estimated electricity costs based on usage, rates, and appliance power consumption with our free online calculator."
        intro="Our electricity bill calculator helps you estimate your monthly or annual electricity costs based on your usage patterns and local electricity rates. Use this tool to understand your energy consumption and find ways to reduce your electricity bills."
        canonicalUrl="https://calculators-hub.com/calculators/utility/electricity-bill-calculator"
        formula={
          <>
            <p>The electricity bill calculator uses the following formula to estimate your electricity costs:</p>
            <p><strong>Total Cost = Energy Consumption (kWh) × Rate per kWh + Fixed Charges</strong></p>
            <p>Where:</p>
            <ul>
              <li>Energy Consumption is measured in kilowatt-hours (kWh)</li>
              <li>Rate per kWh is the price you pay for each unit of electricity</li>
              <li>Fixed Charges include service fees, taxes, and other constant costs</li>
            </ul>
          </>
        }
        faq={[
          {
            question: "How can I reduce my electricity bill?",
            answer: "You can reduce your electricity bill by using energy-efficient appliances, unplugging devices when not in use, using LED light bulbs, improving home insulation, and being mindful of your usage patterns."
          },
          {
            question: "Why is my electricity bill so high?",
            answer: "High electricity bills can be caused by inefficient appliances, poor insulation, excessive usage of high-energy devices like air conditioners or heaters, or higher electricity rates in your area."
          },
          {
            question: "How accurate is this electricity bill calculator?",
            answer: "This calculator provides a good estimate based on the information you provide. For the most accurate calculations, use your actual electricity rate from your bill and accurate usage information for all appliances."
          },
          {
            question: "What is a kilowatt-hour (kWh)?",
            answer: "A kilowatt-hour is a unit of energy equal to 1,000 watts of power used for one hour. It's the standard unit used by utility companies to measure and bill electricity consumption."
          }
        ]}
        relatedCalculators={[
          {
            title: "Appliance Energy Use Calculator",
            path: "/calculators/utility/appliance-energy-calculator",
            category: "Utility"
          },
          {
            title: "Solar Panel Savings Calculator",
            path: "/calculators/utility/solar-panel-calculator",
            category: "Utility"
          },
          {
            title: "Heating Cost Calculator",
            path: "/calculators/utility/heating-cost-calculator",
            category: "Utility"
          },
          {
            title: "Cooling Cost Calculator",
            path: "/calculators/utility/cooling-cost-calculator",
            category: "Utility"
          }
        ]}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Electricity Bill Calculator",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Calculate your estimated electricity costs based on usage, rates, and appliance power consumption."
        }}
      >
        <ElectricityBillCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default ElectricityBillCalculatorPage;
