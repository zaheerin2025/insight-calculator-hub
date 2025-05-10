
import React from 'react';
import Layout from '@/components/layout/Layout';
import GasMileageCalculator from '@/components/calculators/utility/GasMileageCalculator';
import SEOMeta from '@/components/ui/seo-meta';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const GasMileageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Gas Mileage (MPG) Calculator"
        description="Calculate your vehicle's fuel efficiency in miles per gallon (MPG) and estimate fuel costs for trips with our free online calculator."
        intro="Our gas mileage calculator helps you determine your vehicle's fuel efficiency and estimate fuel costs for trips. Track your MPG over time to monitor your vehicle's performance and make informed decisions about maintenance and driving habits."
        canonicalUrl="https://calculators-hub.com/calculators/utility/gas-mileage-calculator"
        formula={
          <>
            <p>The gas mileage calculator uses these formulas:</p>
            <p><strong>MPG (Miles Per Gallon) = Distance Traveled ÷ Fuel Used</strong></p>
            <p><strong>Fuel Cost = Fuel Used × Price Per Gallon</strong></p>
            <p><strong>Estimated Fuel Needed for Trip = Distance ÷ MPG</strong></p>
            <p><strong>Estimated Trip Cost = Estimated Fuel Needed × Price Per Gallon</strong></p>
          </>
        }
        faq={[
          {
            question: "How can I improve my vehicle's gas mileage?",
            answer: "You can improve gas mileage by maintaining proper tire pressure, keeping up with regular maintenance, removing excess weight from your vehicle, driving at moderate speeds, avoiding rapid acceleration and braking, and using cruise control on highways."
          },
          {
            question: "Why does my MPG vary between fill-ups?",
            answer: "MPG can vary due to driving conditions (city vs. highway), weather (cold weather decreases efficiency), terrain (hills use more fuel), driving habits, air conditioning use, and even fuel quality."
          },
          {
            question: "What is considered good gas mileage?",
            answer: "Good gas mileage varies by vehicle type. For modern cars, 30-40 MPG is considered good for sedans, 25-35 MPG for small SUVs, and 20-25 MPG for larger SUVs and trucks. Hybrid vehicles typically achieve 40-60 MPG."
          },
          {
            question: "How often should I calculate my MPG?",
            answer: "For best results, calculate your MPG every time you fill up your tank completely. This provides consistent data to track changes in your vehicle's fuel efficiency over time."
          }
        ]}
        relatedCalculators={[
          {
            title: "Fuel Cost Calculator",
            path: "/calculators/utility/fuel-cost-calculator",
            category: "Utility"
          },
          {
            title: "Electric Vehicle Range Calculator",
            path: "/calculators/utility/ev-range-calculator",
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
          "name": "Gas Mileage (MPG) Calculator",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Calculate your vehicle's fuel efficiency in miles per gallon (MPG) and estimate fuel costs for trips."
        }}
      >
        <GasMileageCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default GasMileageCalculatorPage;
