
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Percent } from 'lucide-react';
import SEOMeta from '@/components/ui/seo-meta';

const calculators = [
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages easily. Find percentages of values, what percentage one value is of another, and more.',
    icon: <Percent className="h-8 w-8 text-primary" />,
    path: '/calculators/math/percentage-calculator'
  },
  // Placeholders for future calculators
  {
    title: 'Age Calculator',
    description: 'Calculate the exact age between two dates in years, months, weeks, and days.',
    icon: <Calculator className="h-8 w-8 text-primary" />,
    path: '/calculators/math/age-calculator',
    comingSoon: true
  },
  {
    title: 'Discount Calculator',
    description: 'Calculate the sale price after discount, the discount amount, and the percentage saved.',
    icon: <Calculator className="h-8 w-8 text-primary" />,
    path: '/calculators/math/discount-calculator',
    comingSoon: true
  },
  {
    title: 'Area Calculator',
    description: 'Calculate the area of various shapes including circles, triangles, squares, and more.',
    icon: <Calculator className="h-8 w-8 text-primary" />,
    path: '/calculators/math/area-calculator',
    comingSoon: true
  },
];

const CalculatorsMath: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Math Calculators | InsightCalc"
        description="Access our collection of free math calculators. Calculate percentages, ages, discounts, areas, and more with precision and ease."
        canonicalUrl="https://example.com/calculators/math"
      />
      
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Math Calculators</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Solve everyday math problems quickly and accurately with our comprehensive suite of math calculators. 
            From percentages to geometric calculations, we've got you covered.
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

export default CalculatorsMath;
