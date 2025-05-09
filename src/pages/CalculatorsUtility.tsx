
import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { Wrench, Calculator } from 'lucide-react';

const calculators = [
  {
    title: 'Tip Calculator',
    description: 'Calculate tips for restaurants, services, and more with options for splitting the bill.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/tip-calculator'
  },
  {
    title: 'Unit Converter',
    description: 'Convert between various measurement units including length, weight, volume, and more.',
    icon: <Wrench className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/unit-converter'
  },
  {
    title: 'Date Calculator',
    description: 'Calculate the difference between dates or add/subtract days, months, or years from a date.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/date-calculator'
  },
  {
    title: 'Password Generator',
    description: 'Create strong, secure passwords with customizable options for length and character types.',
    icon: <Wrench className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/password-generator'
  },
  {
    title: 'GPA Calculator',
    description: 'Calculate your Grade Point Average (GPA) based on grades and credit hours.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/gpa-calculator'
  },
  {
    title: 'Fuel Cost Calculator',
    description: 'Estimate fuel costs for trips based on distance, fuel efficiency, and current fuel prices.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/fuel-cost-calculator'
  },
];

const CalculatorsUtility: React.FC = () => {
  return (
    <CategoryLayout
      title="Utility Calculators"
      description="Access our collection of free utility calculators. Calculate tips, convert units, estimate fuel costs, and more for everyday tasks."
      intro="Make everyday calculations easier with our suite of utility calculators. From calculating tips to generating secure passwords, these tools simplify common tasks."
      calculators={calculators}
      canonicalUrl="https://calculators-hub.com/calculators/utility"
    />
  );
};

export default CalculatorsUtility;
