import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { Home, Plus, Calculator } from 'lucide-react';

const calculators = [
  {
    title: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payment, total payment, and total interest paid based on loan amount, interest rate, and loan term.',
    icon: <Home className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/mortgage-calculator'
  },
  {
    title: 'Compound Interest Calculator',
    description: 'Calculate how your investments will grow over time with compound interest, including regular contributions.',
    icon: <Plus className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/compound-interest-calculator'
  },
  // Placeholders for future calculators
  {
    title: 'Loan EMI Calculator',
    description: 'Calculate your Equated Monthly Installment (EMI) for any loan based on principal amount, interest rate, and loan tenure.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/loan-emi-calculator',
    comingSoon: true
  },
];

const CalculatorsFinance: React.FC = () => {
  return (
    <CategoryLayout
      title="Finance Calculators"
      description="Access our collection of free finance calculators. Calculate mortgages, compound interest, loans, and more with precision and ease."
      intro="Plan your financial future with our comprehensive suite of financial calculators. Make informed decisions about mortgages, investments, loans, and more."
      calculators={calculators}
      canonicalUrl="https://example.com/calculators/finance"
    />
  );
};

export default CalculatorsFinance;
