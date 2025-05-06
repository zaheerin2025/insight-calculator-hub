
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Heart } from 'lucide-react';
import SEOMeta from '@/components/ui/seo-meta';

const calculators = [
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) to assess if your weight is healthy for your height.',
    icon: <Heart className="h-8 w-8 text-primary" />,
    path: '/calculators/health/bmi-calculator'
  },
  // Placeholders for future calculators
  {
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using various methods based on your measurements.',
    icon: <Calculator className="h-8 w-8 text-primary" />,
    path: '/calculators/health/body-fat-calculator',
    comingSoon: true
  },
  {
    title: 'Calorie Needs Calculator',
    description: 'Calculate your daily calorie requirements based on your activity level, age, weight, height, and gender.',
    icon: <Calculator className="h-8 w-8 text-primary" />,
    path: '/calculators/health/calorie-needs-calculator',
    comingSoon: true
  },
];

const CalculatorsHealth: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Health Calculators | InsightCalc"
        description="Access our collection of free health calculators. Calculate BMI, body fat percentage, calorie needs, and more to monitor your health metrics."
        canonicalUrl="https://example.com/calculators/health"
      />
      
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Health Calculators</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Monitor your health metrics with our comprehensive suite of health calculators. 
            Track your BMI, body fat percentage, calorie needs, and more for a healthier lifestyle.
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

export default CalculatorsHealth;
