
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
  {
    title: 'Ideal Weight Calculator',
    description: 'Calculate your ideal weight based on height, age, gender, and body frame.',
    icon: <Heart className="h-6 w-6 text-primary" />,
    path: '/calculators/health/ideal-weight-calculator',
    comingSoon: true
  },
  {
    title: 'Heart Rate Calculator',
    description: 'Calculate your target heart rate zones for optimal exercise intensity.',
    icon: <Heart className="h-6 w-6 text-primary" />,
    path: '/calculators/health/heart-rate-calculator',
    comingSoon: true
  },
  {
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate (BMR) to understand your daily calorie requirements at rest.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/health/bmr-calculator',
    comingSoon: true
  },
  {
    title: 'Water Intake Calculator',
    description: 'Calculate your recommended daily water intake based on weight, activity level, and climate.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/health/water-intake-calculator',
    comingSoon: true
  },
  {
    title: 'Pregnancy Due Date Calculator',
    description: 'Calculate your pregnancy due date based on last menstrual period or conception date.',
    icon: <Heart className="h-6 w-6 text-primary" />,
    path: '/calculators/health/pregnancy-due-date-calculator',
    comingSoon: true
  },
  {
    title: 'Macro Nutrient Calculator',
    description: 'Calculate your ideal macronutrient distribution based on your goals and body type.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/health/macro-nutrient-calculator',
    comingSoon: true
  },
  {
    title: 'Waist-to-Hip Ratio Calculator',
    description: 'Calculate your waist-to-hip ratio to assess health risks related to weight distribution.',
    icon: <Heart className="h-6 w-6 text-primary" />,
    path: '/calculators/health/waist-hip-ratio-calculator',
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
      canonicalUrl="https://calculators-hub.com/calculators/health"
    />
  );
};

export default CalculatorsHealth;
