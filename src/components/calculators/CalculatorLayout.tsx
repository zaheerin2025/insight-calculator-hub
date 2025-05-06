
import React from 'react';
import SEOMeta from '../ui/seo-meta';
import { Card, CardContent } from '@/components/ui/card';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  intro: string;
  children: React.ReactNode;
  formula?: React.ReactNode;
  faq?: Array<{ question: string; answer: string }>;
  canonicalUrl?: string;
  schemaMarkup?: Record<string, any>;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  title,
  description,
  intro,
  children,
  formula,
  faq,
  canonicalUrl,
  schemaMarkup,
}) => {
  return (
    <>
      <SEOMeta
        title={`${title} | InsightCalc`}
        description={description}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <div className="container py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
        
        <div className="prose max-w-none mb-8">
          <p>{intro}</p>
        </div>
        
        <Card className="mb-12 shadow-sm border border-muted">
          <CardContent className="pt-6">
            {children}
          </CardContent>
        </Card>
        
        {formula && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="prose max-w-none">
              {formula}
            </div>
          </div>
        )}
        
        {faq && faq.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faq.map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl font-medium mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CalculatorLayout;
