
import React from 'react';
import Layout from '@/components/layout/Layout';
import DateCalculator from '@/components/calculators/utility/DateCalculator';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const DateCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Date Calculator"
        description="Calculate the difference between dates or add/subtract days, months, or years from a date with our free online date calculator."
        intro="Our date calculator helps you find the exact time between two dates, add or subtract time periods, and plan for future events with precision."
        canonicalUrl="https://calculators-hub.com/calculators/utility/date-calculator"
        faq={[
          {
            question: "How do I calculate days between two dates?",
            answer: "Enter your start and end dates in our calculator, and it will automatically show the difference in days, weeks, months, and years."
          },
          {
            question: "How can I find a date in the future or past?",
            answer: "Use the 'Add/Subtract Time' feature to add or subtract a specific number of days, weeks, months, or years from a given date."
          }
        ]}
        relatedCalculators={[
          {
            title: "Age Calculator",
            path: "/calculators/math/age-calculator",
            category: "Math"
          },
          {
            title: "Pregnancy Due Date Calculator",
            path: "/calculators/health/pregnancy-due-date-calculator",
            category: "Health"
          }
        ]}
      >
        <DateCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default DateCalculatorPage;
