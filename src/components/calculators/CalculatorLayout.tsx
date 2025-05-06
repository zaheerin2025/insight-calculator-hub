
import React from 'react';
import { Link } from 'react-router-dom';
import SEOMeta from '../ui/seo-meta';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Calculator } from 'lucide-react';

export interface RelatedCalculator {
  title: string;
  path: string;
  category?: string;
}

interface CalculatorLayoutProps {
  title: string;
  description: string;
  intro: string;
  children: React.ReactNode;
  formula?: React.ReactNode;
  faq?: Array<{ question: string; answer: string }>;
  canonicalUrl?: string;
  schemaMarkup?: Record<string, any>;
  relatedCalculators?: RelatedCalculator[];
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
  relatedCalculators,
}) => {
  return (
    <>
      <SEOMeta
        title={`${title} | Calculators-Hub`}
        description={description}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <div className="container py-8 md:py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{title}</h1>
          
          <div className="prose max-w-none mb-8 text-muted-foreground">
            <p className="text-lg">{intro}</p>
          </div>
          
          <Card className="mb-10 shadow-md border border-muted overflow-hidden">
            <div className="bg-muted px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Calculator</h2>
            </div>
            <CardContent className="pt-6">
              {children}
            </CardContent>
          </Card>
          
          {formula && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <Card className="border border-muted p-6 bg-muted/30">
                <div className="prose max-w-none">
                  {formula}
                </div>
              </Card>
            </div>
          )}
          
          {relatedCalculators && relatedCalculators.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCalculators.map((calc, index) => (
                  <Link 
                    key={index} 
                    to={calc.path} 
                    className="flex items-center p-4 border rounded-md hover:bg-muted/50 transition-colors group"
                  >
                    <div className="bg-primary/10 p-2 rounded-md mr-3 group-hover:bg-primary/20 transition-colors">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{calc.title}</h3>
                      {calc.category && (
                        <p className="text-sm text-muted-foreground">{calc.category}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {faq && faq.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground py-2">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalculatorLayout;
