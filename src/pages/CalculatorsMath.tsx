
import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { Percent, Calculator, Square } from 'lucide-react';

const calculators = [
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages easily. Find percentages of values, what percentage one value is of another, and more.',
    icon: <Percent className="h-6 w-6 text-primary" />,
    path: '/calculators/math/percentage-calculator'
  },
  {
    title: 'Age Calculator',
    description: 'Calculate the exact age between two dates in years, months, weeks, and days.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/age-calculator'
  },
  {
    title: 'Discount Calculator',
    description: 'Calculate the sale price after discount, the discount amount, and the percentage saved.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/discount-calculator'
  },
  {
    title: 'Area Calculator',
    description: 'Calculate the area of various shapes including circles, triangles, squares, and more.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/area-calculator'
  },
  {
    title: 'Volume Calculator',
    description: 'Calculate the volume of various 3D shapes including cubes, spheres, cylinders, and more.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/volume-calculator',
    comingSoon: true
  },
  {
    title: 'Pythagorean Theorem Calculator',
    description: 'Calculate the sides of a right triangle using the Pythagorean theorem.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/pythagorean-theorem-calculator'
  },
  {
    title: 'Square Root Calculator',
    description: 'Calculate the square root of any positive number with precision.',
    icon: <Square className="h-6 w-6 text-primary" />,
    path: '/calculators/math/square-root-calculator'
  },
  {
    title: 'Factorial Calculator',
    description: 'Calculate the factorial of any positive integer quickly and efficiently.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/factorial-calculator'
  },
  {
    title: 'Fractions Calculator',
    description: 'Add, subtract, multiply, and divide fractions with step-by-step solutions.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/fractions-calculator'
  },
  {
    title: 'Mean, Median, Mode Calculator',
    description: 'Calculate statistical measures including mean, median, and mode from a data set.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/math/mean-median-mode-calculator'
  },
];

const CalculatorsMath: React.FC = () => {
  return (
    <CategoryLayout
      title="Math Calculators"
      description="Access our collection of free math calculators. Calculate percentages, ages, discounts, areas, and more with precision and ease."
      intro="Solve everyday math problems quickly and accurately with our comprehensive suite of math calculators. From percentages to geometric calculations, we've got you covered."
      calculators={calculators}
      canonicalUrl="https://calculators-hub.com/calculators/math"
    />
  );
};

export default CalculatorsMath;
