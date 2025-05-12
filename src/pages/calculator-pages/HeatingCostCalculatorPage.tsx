
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeatingCostCalculator from '@/components/calculators/utility/HeatingCostCalculator';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const HeatingCostCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Heating Cost Calculator"
        description="Estimate your home heating costs based on energy source, usage patterns, and local rates with our free online calculator."
        intro="Our heating cost calculator helps you estimate how much you'll spend on heating your home during cold months. By understanding these costs, you can make informed decisions about energy usage and potential efficiency upgrades."
        canonicalUrl="https://calculators-hub.com/calculators/utility/heating-cost-calculator"
        formula={
          <>
            <p>The heating cost calculator uses the following formula:</p>
            <p><strong>Total Heating Cost = Energy Consumption × Rate per Unit + Fixed Charges</strong></p>
            <p>Where:</p>
            <ul>
              <li>Energy Consumption depends on your heating system (measured in kWh for electricity, therms for natural gas, gallons for oil, etc.)</li>
              <li>Rate per Unit is the price you pay for each unit of energy</li>
              <li>Fixed Charges include service fees, delivery charges, and taxes</li>
            </ul>
          </>
        }
        faq={[
          {
            question: "Which heating system is most cost-efficient?",
            answer: "The most cost-efficient heating system depends on your local energy prices, climate, and home insulation. Heat pumps are generally energy-efficient for moderate climates, while natural gas furnaces may be more economical in very cold regions with affordable gas prices."
          },
          {
            question: "How can I reduce my heating costs?",
            answer: "You can reduce heating costs by improving insulation, sealing air leaks, using a programmable thermostat, maintaining your heating system regularly, and lowering your thermostat setting by a few degrees."
          },
          {
            question: "Why do heating costs vary so much between months?",
            answer: "Heating costs vary primarily due to outdoor temperature fluctuations, which affect how hard your heating system needs to work. Colder months require more energy to maintain comfortable indoor temperatures."
          },
          {
            question: "How accurately can this calculator predict my heating costs?",
            answer: "This calculator provides a good estimate based on the information you provide. For most accurate results, input your actual energy rates from recent bills and consider factors like your home's insulation quality and local climate patterns."
          }
        ]}
        relatedCalculators={[
          {
            title: "Electricity Bill Calculator",
            path: "/calculators/utility/electricity-bill-calculator",
            category: "Utility"
          },
          {
            title: "Cooling Cost Calculator",
            path: "/calculators/utility/cooling-cost-calculator",
            category: "Utility"
          },
          {
            title: "Appliance Energy Use Calculator",
            path: "/calculators/utility/appliance-energy-calculator",
            category: "Utility"
          },
          {
            title: "Solar Panel Savings Calculator",
            path: "/calculators/utility/solar-panel-calculator",
            category: "Utility"
          }
        ]}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Heating Cost Calculator",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Estimate your home heating costs based on energy source, usage patterns, and local rates."
        }}
      >
        <HeatingCostCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default HeatingCostCalculatorPage;
