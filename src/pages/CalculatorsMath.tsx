import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { Percent, Calculator } from 'lucide-react';

const calculators = [
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages easily. Find percentages of values, what percentage one value is of another, and more.',
    icon: <Percent className="h-6 w-6 text-primary" />,
    path: '/calculators/math/percentage-calculator'
  },
  // Placeholders for future calculators
  {
    title: 'Age Calculator',
    description: 'Calculate the exact age between two dates in years, months, weeks, and days.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/age-calculator',
    comingSoon: true
  },
  {
    title: 'Discount Calculator',
    description: 'Calculate the sale price after discount, the discount amount, and the percentage saved.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/discount-calculator',
    comingSoon: true
  },
  {
    title: 'Area Calculator',
    description: 'Calculate the area of various shapes including circles, triangles, squares, and more.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/area-calculator',
    comingSoon: true
  },
];

const CalculatorsMath: React.FC = () => {
  return (
    <CategoryLayout
      title="Math Calculators"
      description="Access our collection of free math calculators. Calculate percentages, ages, discounts, areas, and more with precision and ease."
      intro="Solve everyday math problems quickly and accurately with our comprehensive suite of math calculators. From percentages to geometric calculations, we've got you covered."
      calculators={calculators}
      canonicalUrl="https://example.com/calculators/math"
    />
  );
};

export default CalculatorsMath;
