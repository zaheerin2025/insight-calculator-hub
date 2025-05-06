
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Home, Plus } from 'lucide-react';
import SEOMeta from '@/components/ui/seo-meta';

const calculators = [
  {
    title: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payment, total payment, and total interest paid based on loan amount, interest rate, and loan term.',
    icon: <Home className="h-8 w-8 text-primary" />,
    path: '/calculators/finance/mortgage-calculator'
  },
  {
    title: 'Compound Interest Calculator',
    description: 'Calculate how your investments will grow over time with compound interest, including regular contributions.',
    icon: <Plus className="h-8 w-8 text-primary" />,
    path: '/calculators/finance/compound-interest-calculator'
  },
  // Placeholders for future calculators
  {
    title: 'Loan EMI Calculator',
    description: 'Calculate your Equated Monthly Installment (EMI) for any loan based on principal amount, interest rate, and loan tenure.',
    icon: <Calculator className="h-8 w-8 text-primary" />,
    path: '/calculators/finance/loan-emi-calculator',
    comingSoon: true
  },
];

const CalculatorsFinance: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Finance Calculators | InsightCalc"
        description="Access our collection of free finance calculators. Calculate mortgages, compound interest, loans, and more with precision and ease."
        canonicalUrl="https://example.com/calculators/finance"
      />
      
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Finance Calculators</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Plan your financial future with our comprehensive suite of financial calculators. 
            Make informed decisions about mortgages, investments, loans, and more.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator, index) => (
            <Card 
              key={index} 
              className={`border border-muted hover:shadow-md transition-shadow duration-300 ${calculator.comingSoon ? 'opacity-60' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="mb-2">{calculator.icon}</div>
                <CardTitle className="text-xl">
                  {calculator.title}
                  {calculator.comingSoon && <span className="text-sm ml-2 text-muted-foreground">(Coming Soon)</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{calculator.description}</p>
                {!calculator.comingSoon && (
                  <Link 
                    to={calculator.path}
                    className="text-primary hover:text-primary-hover hover:underline transition-colors inline-flex items-center"
                  >
                    Use Calculator
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CalculatorsFinance;
