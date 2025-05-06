
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Calculator as CalculatorIcon, Heart, Percent } from 'lucide-react';

const calculatorCategories = [
  {
    title: 'Finance Calculators',
    description: 'Plan your financial future with precision and confidence.',
    icon: <Calculator className="h-10 w-10 text-primary-light" />,
    path: '/calculators/finance',
    calculators: [
      { name: 'Mortgage Calculator', path: '/calculators/finance/mortgage-calculator' },
      { name: 'Compound Interest Calculator', path: '/calculators/finance/compound-interest-calculator' },
    ]
  },
  {
    title: 'Health Calculators',
    description: 'Monitor your health metrics for a better quality of life.',
    icon: <Heart className="h-10 w-10 text-primary-light" />,
    path: '/calculators/health',
    calculators: [
      { name: 'BMI Calculator', path: '/calculators/health/bmi-calculator' },
    ]
  },
  {
    title: 'Math Calculators',
    description: 'Solve everyday math problems quickly and accurately.',
    icon: <Percent className="h-10 w-10 text-primary-light" />,
    path: '/calculators/math',
    calculators: [
      { name: 'Percentage Calculator', path: '/calculators/math/percentage-calculator' },
    ]
  }
];

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            InsightCalc
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Simple, accurate calculators for all your financial, health, and mathematical needs.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" variant="secondary" className="font-medium">
              <Link to="/calculators/finance">Explore Calculators</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container py-12 md:py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Calculator Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculatorCategories.map((category, index) => (
            <Card key={index} className="border border-muted hover:shadow-md transition-shadow duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="pb-2">
                <div className="mb-4">{category.icon}</div>
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {category.calculators.map((calculator, i) => (
                    <li key={i}>
                      <Link to={calculator.path} className="text-primary hover:text-primary-hover hover:underline transition-colors flex items-center">
                        <CalculatorIcon className="h-4 w-4 mr-2" />
                        {calculator.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to={category.path}>View All</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose InsightCalc?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                <CalculatorIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precision</h3>
              <p className="text-muted-foreground">Fast, accurate calculations every time you need them.</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Speed</h3>
              <p className="text-muted-foreground">Lightning fast results with no delays or waiting.</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy</h3>
              <p className="text-muted-foreground">All calculations happen in your browser. No data stored.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our calculators are designed to make complex calculations simple. Try our most popular calculators now!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link to="/calculators/finance/mortgage-calculator">
                Mortgage Calculator
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link to="/calculators/health/bmi-calculator">
                BMI Calculator
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link to="/calculators/math/percentage-calculator">
                Percentage Calculator
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
