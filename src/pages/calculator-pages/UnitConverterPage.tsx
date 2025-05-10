
import React from 'react';
import Layout from '@/components/layout/Layout';
import UnitConverter from '@/components/calculators/utility/UnitConverter';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const UnitConverterPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Unit Converter"
        description="Convert between various measurement units including length, weight, volume, temperature, area, and time with our free online calculator."
        intro="Our unit converter makes it easy to convert between various units of measurement. Whether you need to convert lengths, weights, volumes, temperatures, or time units, this tool provides accurate conversions for everyday use and technical applications."
        canonicalUrl="https://calculators-hub.com/calculators/utility/unit-converter"
        formula={
          <>
            <p>Unit conversions use these basic principles:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>For most units: Result = Value × (From Unit Factor ÷ To Unit Factor)</li>
              <li>For temperatures, special formulas apply (e.g., °F = °C × 9/5 + 32)</li>
            </ul>
            <p className="mt-3">Our calculator handles all the math automatically, ensuring accurate conversions every time.</p>
          </>
        }
        faq={[
          {
            question: "Why do we need unit conversions?",
            answer: "Unit conversions are essential in many fields including science, engineering, cooking, construction, and international trade. Different countries and industries often use different measurement systems (metric vs. imperial), making conversion tools necessary for accurate communication and calculations."
          },
          {
            question: "How accurate are the conversions provided by this calculator?",
            answer: "Our unit converter uses precise conversion factors stored to multiple decimal places, making the results accurate for most practical purposes. For scientific or engineering applications requiring extreme precision, specialized tools may be needed."
          },
          {
            question: "Can I convert between multiple unit systems?",
            answer: "Yes, our converter supports conversions between different unit systems. For example, you can convert between metric units (meters, kilograms) and imperial units (feet, pounds), or between different time units (seconds to years)."
          },
          {
            question: "Why are there specialized formulas for temperature conversions?",
            answer: "Unlike other unit types, temperature scales don't all start at zero or use proportional scales. Celsius and Fahrenheit have different zero points and different scale factors, requiring specific formulas for accurate conversions."
          }
        ]}
        relatedCalculators={[
          {
            title: "Area Calculator",
            path: "/calculators/math/area-calculator",
            category: "Math"
          },
          {
            title: "Fuel Cost Calculator",
            path: "/calculators/utility/fuel-cost-calculator",
            category: "Utility"
          },
          {
            title: "Gas Mileage Calculator",
            path: "/calculators/utility/gas-mileage-calculator",
            category: "Utility"
          },
          {
            title: "Date Calculator",
            path: "/calculators/utility/date-calculator",
            category: "Utility"
          }
        ]}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Unit Converter Calculator",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Convert between various measurement units including length, weight, volume, temperature, area, and time with our free online calculator."
        }}
      >
        <UnitConverter />
      </CalculatorLayout>
    </Layout>
  );
};

export default UnitConverterPage;
