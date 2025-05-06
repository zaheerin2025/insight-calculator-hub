
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Award, Home, Heart, Percent, Shield, Zap, BarChart } from 'lucide-react';

const calculatorCategories = [
  {
    title: 'Finance Calculators',
    description: 'Plan your financial future with precision and confidence.',
    icon: <Home className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-primary to-primary-light',
    path: '/calculators/finance',
    calculators: [
      { name: 'Mortgage Calculator', path: '/calculators/finance/mortgage-calculator' },
      { name: 'Compound Interest Calculator', path: '/calculators/finance/compound-interest-calculator' },
    ]
  },
  {
    title: 'Health Calculators',
    description: 'Monitor your health metrics for a better quality of life.',
    icon: <Heart className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-pink-500 to-rose-400',
    path: '/calculators/health',
    calculators: [
      { name: 'BMI Calculator', path: '/calculators/health/bmi-calculator' },
    ]
  },
  {
    title: 'Math Calculators',
    description: 'Solve everyday math problems quickly and accurately.',
    icon: <Percent className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    path: '/calculators/math',
    calculators: [
      { name: 'Percentage Calculator', path: '/calculators/math/percentage-calculator' },
    ]
  }
];

const features = [
  {
    title: 'Precision',
    description: 'Fast, accurate calculations every time you need them.',
    icon: <Calculator className="h-6 w-6 text-white" />,
    color: 'from-primary to-primary-light'
  },
  {
    title: 'Speed',
    description: 'Lightning fast results with no delays or waiting.',
    icon: <Zap className="h-6 w-6 text-white" />,
    color: 'from-amber-500 to-yellow-400'
  },
  {
    title: 'Privacy',
    description: 'All calculations happen in your browser. No data stored.',
    icon: <Shield className="h-6 w-6 text-white" />,
    color: 'from-green-500 to-emerald-400'
  },
  {
    title: 'Analytics',
    description: 'Visual breakdowns and analysis of your results.',
    icon: <BarChart className="h-6 w-6 text-white" />,
    color: 'from-blue-500 to-indigo-400'
  }
];

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-br from-primary to-primary-light text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.15] bg-[length:16px_16px]"></div>
        <div className="absolute h-full w-full inset-0">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-white/10 filter blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-60 h-60 rounded-full bg-white/10 filter blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              InsightCalc
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm inline-flex items-center mb-6 border border-white/20">
              <Award className="h-4 w-4 mr-2" />
              <span>Trusted by thousands of users daily</span>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in text-white/90" style={{ animationDelay: '0.1s' }}>
              Simple, accurate calculators for all your financial, health, and mathematical needs.
            </p>
            <div className="animate-fade-in flex flex-wrap justify-center gap-4" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" variant="secondary" className="font-medium">
                <Link to="/calculators/finance">Explore Calculators</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-2">Our Calculator Categories</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore our comprehensive suite of calculators designed to help you make informed decisions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculatorCategories.map((category, index) => (
            <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="h-full border border-muted hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                <div className={`${category.background} p-6 flex items-center justify-center`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent)]"></div>
                  <div className="backdrop-blur-sm bg-black/10 rounded-full p-4 relative">
                    {category.icon}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {category.calculators.map((calculator, i) => (
                      <li key={i}>
                        <Link to={calculator.path} className="text-primary hover:text-primary-hover hover:underline transition-colors flex items-center">
                          <Calculator className="h-4 w-4 mr-2" />
                          {calculator.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-auto">
                    <Link to={category.path}>View All</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-2">Why Choose InsightCalc?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our calculators are designed to give you the most accurate information with the best user experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-muted py-16">
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
