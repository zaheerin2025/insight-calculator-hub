
import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { Home, Calculator, CreditCard, PiggyBank, BanknoteIcon, ChartLine, DollarSign } from 'lucide-react';

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
    icon: <ChartLine className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/compound-interest-calculator'
  },
  {
    title: 'Loan EMI Calculator',
    description: 'Calculate your Equated Monthly Installment (EMI) for any loan based on principal amount, interest rate, and loan tenure.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/loan-emi-calculator'
  },
  {
    title: 'Simple Interest Calculator',
    description: 'Calculate the interest earned on a principal amount at a fixed rate over a period of time.',
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/simple-interest-calculator'
  },
  {
    title: 'Retirement Savings Calculator',
    description: 'Plan for your retirement by calculating how much you need to save to reach your retirement goals.',
    icon: <PiggyBank className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/retirement-savings-calculator'
  },
  {
    title: 'Investment Return Calculator',
    description: 'Calculate the potential returns on your investments based on initial investment, additional contributions, and expected rate of return.',
    icon: <ChartLine className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/investment-return-calculator'
  },
  {
    title: 'Credit Card Payoff Calculator',
    description: 'Determine how long it will take to pay off your credit card debt and how much interest you\'ll pay.',
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/credit-card-payoff-calculator'
  },
  {
    title: 'Debt-to-Income Ratio Calculator',
    description: 'Calculate your debt-to-income ratio to see how lenders evaluate your financial health.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/debt-to-income-calculator'
  },
  {
    title: 'Home Affordability Calculator',
    description: 'Estimate how much home you can afford based on your income, expenses, and down payment.',
    icon: <Home className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/home-affordability-calculator'
  },
  {
    title: 'Auto Loan Calculator',
    description: 'Calculate your monthly car payment, total interest paid, and the true cost of your auto loan.',
    icon: <BanknoteIcon className="h-6 w-6 text-primary" />,
    path: '/calculators/finance/auto-loan-calculator'
  }
];

const CalculatorsFinance: React.FC = () => {
  return (
    <CategoryLayout
      title="Finance Calculators"
      description="Access our collection of free finance calculators. Calculate mortgages, compound interest, loans, and more with precision and ease."
      intro="Plan your financial future with our comprehensive suite of financial calculators. Make informed decisions about mortgages, investments, loans, and more."
      calculators={calculators}
      canonicalUrl="https://calculators-hub.com/calculators/finance"
    />
  );
};

export default CalculatorsFinance;
