
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Award, Home, Heart, Percent, Shield, Construction, DollarSign, Wrench } from 'lucide-react';

// Import calculator categories
import { calculatorCategories, Calculator as CalculatorType } from '@/data/calculator-categories';

const AllCalculators: React.FC = () => {
  return (
    <Layout>
      <SEOMeta
        title="All Calculators | Calculators-Hub"
        description="Browse our complete collection of free online calculators for finance, health, math, business, construction, and utility needs."
        canonicalUrl="https://calculators-hub.com/all-calculators"
      />

      <div className="bg-muted py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All Calculators</h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive collection of calculators across all categories. Find the perfect tool for your specific needs.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {calculatorCategories.map((category, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-full ${category.background} flex items-center justify-center`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.calculators.map((calculator: CalculatorType, calcIndex: number) => (
                <Card key={calcIndex} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calculator className="h-4 w-4 mr-2 text-primary" />
                      {calculator.comingSoon ? (
                        <div className="flex justify-between w-full items-center">
                          <span>{calculator.name}</span>
                          <span className="text-xs py-1 px-2 bg-muted rounded-full text-muted-foreground">Coming Soon</span>
                        </div>
                      ) : (
                        <Link to={calculator.path} className="hover:text-primary transition-colors">
                          {calculator.name}
                        </Link>
                      )}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AllCalculators;
