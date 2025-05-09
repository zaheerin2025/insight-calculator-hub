
import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { DollarSign, Calculator } from 'lucide-react';

const calculators = [
  {
    title: 'Profit Margin Calculator',
    description: 'Calculate your profit margins to understand how much of your revenue becomes profit.',
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    path: '/calculators/business/profit-margin-calculator'
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate the return on investment to evaluate the efficiency or profitability of an investment.',
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    path: '/calculators/business/roi-calculator'
  },
  {
    title: 'Break-even Point Calculator',
    description: 'Calculate when your business will become profitable by determining the break-even point.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/business/breakeven-calculator'
  },
  {
    title: 'Markup Calculator',
    description: 'Calculate markup percentage on your products and services to ensure profitability.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/business/markup-calculator'
  },
  {
    title: 'Sales Tax Calculator',
    description: 'Calculate sales tax for different states and jurisdictions.',
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    path: '/calculators/business/sales-tax-calculator'
  },
  {
    title: 'Inventory Turnover Calculator',
    description: 'Calculate how efficiently inventory is managed by measuring how many times inventory is sold in a period.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/business/inventory-turnover-calculator'
  },
];

const CalculatorsBusiness: React.FC = () => {
  return (
    <CategoryLayout
      title="Business Calculators"
      description="Access our collection of free business calculators. Calculate profit margins, ROI, markup, sales tax and more for better business decisions."
      intro="Make better business decisions with our comprehensive suite of business calculators. Track profit margins, break-even points, ROI, and more for optimal business performance."
      calculators={calculators}
      canonicalUrl="https://calculators-hub.com/calculators/business"
    />
  );
};

export default CalculatorsBusiness;
