
import React from 'react';
import Layout from '@/components/layout/Layout';
import MortgageCalculator from '@/components/calculators/finance/MortgageCalculator';
import SEOMeta from '@/components/ui/seo-meta';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';

const MortgageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Mortgage Calculator"
        description="Plan your home purchase with our mortgage calculator. Estimate monthly payments, total interest costs, amortization schedule, and more."
        intro="Our mortgage calculator helps you understand the financial implications of your home loan. Estimate your monthly payments, see how much interest you'll pay over time, and visualize your loan amortization to make informed decisions about your home purchase."
        canonicalUrl="https://calculators-hub.com/calculators/finance/mortgage-calculator"
        formula={
          <>
            <p>The mortgage calculator uses the following formula to calculate your monthly payment:</p>
            <p><strong>M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]</strong></p>
            <p>Where:</p>
            <ul>
              <li>M = Monthly payment</li>
              <li>P = Principal loan amount (the amount borrowed)</li>
              <li>r = Monthly interest rate (annual rate divided by 12)</li>
              <li>n = Total number of payments (loan term in years × 12)</li>
            </ul>
            <p>The calculator also computes:</p>
            <ul>
              <li>Total amount paid over the life of the loan</li>
              <li>Total interest paid</li>
              <li>Amortization schedule showing principal and interest breakdown for each payment</li>
            </ul>
          </>
        }
        faq={[
          {
            question: "How much house can I afford?",
            answer: "Financial experts recommend that your monthly mortgage payment (including principal, interest, taxes, and insurance) should not exceed 28% of your gross monthly income. Your total debt payments should not exceed 36% of your income."
          },
          {
            question: "Should I choose a 15-year or 30-year mortgage?",
            answer: "A 15-year mortgage typically has lower interest rates and builds equity faster, but has higher monthly payments. A 30-year mortgage offers lower monthly payments but costs more in total interest over the life of the loan. Choose based on your financial situation and goals."
          },
          {
            question: "How does my down payment affect my mortgage?",
            answer: "A larger down payment reduces your loan amount, monthly payment, and total interest paid. Down payments of less than 20% typically require private mortgage insurance (PMI), which adds to your monthly costs. Some loan programs offer lower down payment options."
          },
          {
            question: "What's included in a mortgage payment?",
            answer: "A typical mortgage payment includes principal (paying down the loan balance), interest (cost of borrowing), property taxes, and homeowners insurance. These are often referred to as PITI (Principal, Interest, Taxes, Insurance)."
          },
          {
            question: "How can I reduce my mortgage costs?",
            answer: "You can reduce mortgage costs by making a larger down payment, shopping around for the best interest rates, improving your credit score before applying, choosing a shorter loan term, making extra payments toward principal, or refinancing when rates drop significantly."
          }
        ]}
        relatedCalculators={[
          {
            title: "Home Affordability Calculator",
            path: "/calculators/finance/home-affordability-calculator",
            category: "Finance"
          },
          {
            title: "Loan EMI Calculator",
            path: "/calculators/finance/loan-emi-calculator",
            category: "Finance"
          },
          {
            title: "Compound Interest Calculator",
            path: "/calculators/finance/compound-interest-calculator",
            category: "Finance"
          },
          {
            title: "Debt-to-Income Calculator",
            path: "/calculators/finance/debt-to-income-calculator",
            category: "Finance"
          }
        ]}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Mortgage Calculator",
          "applicationCategory": "FinanceApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Plan your home purchase with our mortgage calculator. Estimate monthly payments, total interest costs, and more."
        }}
      >
        <MortgageCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default MortgageCalculatorPage;
