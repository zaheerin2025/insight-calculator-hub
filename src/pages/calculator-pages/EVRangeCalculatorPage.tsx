
import React from 'react';
import Layout from '@/components/layout/Layout';
import EVRangeCalculator from '@/components/calculators/utility/EVRangeCalculator';
import SEOMeta from '@/components/ui/seo-meta';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const EVRangeCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Electric Vehicle Range Calculator"
        description="Estimate how far your electric vehicle can travel on a single charge based on battery capacity, efficiency, and driving conditions."
        intro="Our EV range calculator helps you determine how far your electric vehicle can travel on a single charge under various conditions. Understanding your vehicle's real-world range can help you plan trips, charging stops, and better understand your EV's capabilities."
        canonicalUrl="https://calculators-hub.com/calculators/utility/ev-range-calculator"
        formula={
          <>
            <p>The EV range calculator uses the following formula to estimate range:</p>
            <p><strong>Estimated Range = Battery Capacity (kWh) × Efficiency (miles/kWh) × Adjustment Factors</strong></p>
            <p>Where adjustment factors account for:</p>
            <ul>
              <li>Weather conditions (cold weather reduces range)</li>
              <li>Driving speed (higher speeds decrease efficiency)</li>
              <li>Terrain (hills and mountains reduce range)</li>
              <li>HVAC usage (heating and cooling use battery power)</li>
              <li>Battery age and health (older batteries have reduced capacity)</li>
            </ul>
          </>
        }
        faq={[
          {
            question: "Why does my EV range differ from the manufacturer's estimate?",
            answer: "Manufacturer range estimates are typically based on ideal conditions. Real-world range varies due to temperature, driving habits, terrain, vehicle speed, use of climate control, and battery degradation over time."
          },
          {
            question: "How can I maximize my EV's range?",
            answer: "To maximize range: drive at moderate speeds (55-60 mph is typically optimal), use eco mode if available, minimize rapid acceleration and braking, precondition the battery while charging, use seat heaters instead of cabin heat when possible, and maintain proper tire pressure."
          },
          {
            question: "Does fast charging affect my EV's range?",
            answer: "Frequent DC fast charging can eventually lead to slightly faster battery degradation, which may reduce maximum range over time. For everyday use, standard Level 2 charging is generally better for battery longevity."
          },
          {
            question: "How accurate is this EV range calculator?",
            answer: "This calculator provides estimates based on the information you input. For the most accurate predictions, use data specific to your vehicle model, driving patterns, and local conditions. Real-world range may still vary based on factors not accounted for in the calculator."
          }
        ]}
        relatedCalculators={[
          {
            title: "Gas Mileage (MPG) Calculator",
            path: "/calculators/utility/gas-mileage-calculator",
            category: "Utility"
          },
          {
            title: "Fuel Cost Calculator",
            path: "/calculators/utility/fuel-cost-calculator",
            category: "Utility"
          },
          {
            title: "Electricity Bill Calculator",
            path: "/calculators/utility/electricity-bill-calculator",
            category: "Utility"
          },
          {
            title: "Carbon Footprint Calculator",
            path: "/calculators/utility/carbon-footprint-calculator",
            category: "Utility"
          }
        ]}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Electric Vehicle Range Calculator",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Estimate how far your electric vehicle can travel on a single charge based on battery capacity, efficiency, and driving conditions."
        }}
      >
        <EVRangeCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default EVRangeCalculatorPage;
