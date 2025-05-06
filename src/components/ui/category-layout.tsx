
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEOMeta from '@/components/ui/seo-meta';

export interface CalculatorItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  comingSoon?: boolean;
}

interface CategoryLayoutProps {
  title: string;
  description: string;
  intro: string;
  calculators: CalculatorItem[];
  canonicalUrl?: string;
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  title,
  description,
  intro,
  calculators,
  canonicalUrl
}) => {
  return (
    <Layout>
      <SEOMeta 
        title={`${title} | InsightCalc`}
        description={description}
        canonicalUrl={canonicalUrl}
      />
      
      <div className="bg-muted py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground">
              {intro}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator, index) => (
            <Card 
              key={index} 
              className={`border border-muted hover:shadow-md transition-shadow duration-300 h-full ${calculator.comingSoon ? 'opacity-70' : ''}`}
            >
              <CardHeader className="pb-2 flex flex-row items-start space-x-4">
                <div className="bg-muted rounded-md p-2 mt-1">
                  {calculator.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {calculator.title}
                    {calculator.comingSoon && (
                      <span className="text-xs ml-2 py-1 px-2 bg-muted rounded-full text-muted-foreground">Coming Soon</span>
                    )}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{calculator.description}</p>
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

export default CategoryLayout;
