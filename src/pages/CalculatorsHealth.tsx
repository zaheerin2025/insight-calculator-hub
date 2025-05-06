import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { Heart, Calculator } from 'lucide-react';

const calculators = [
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) to assess if your weight is healthy for your height.',
    icon: <Heart className="h-6 w-6 text-primary" />,
    path: '/calculators/health/bmi-calculator'
  },
  // Placeholders for future calculators
  {
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using various methods based on your measurements.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/health/body-fat-calculator',
    comingSoon: true
  },
  {
    title: 'Calorie Needs Calculator',
    description: 'Calculate your daily calorie requirements based on your activity level, age, weight, height, and gender.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/health/calorie-needs-calculator',
    comingSoon: true
  },
];

const CalculatorsHealth: React.FC = () => {
  return (
    <CategoryLayout
      title="Health Calculators"
      description="Access our collection of free health calculators. Calculate BMI, body fat percentage, calorie needs, and more to monitor your health metrics."
      intro="Monitor your health metrics with our comprehensive suite of health calculators. Track your BMI, body fat percentage, calorie needs, and more for a healthier lifestyle."
      calculators={calculators}
      canonicalUrl="https://example.com/calculators/health"
    />
  );
};

export default CalculatorsHealth;
