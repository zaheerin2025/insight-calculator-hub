
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { DollarSign, Percent, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfitMarginCalculator: React.FC = () => {
  // Tab 1: Calculate Profit Margin from Revenue and Cost
  const [revenue, setRevenue] = useState<number>(100000);
  const [cost, setCost] = useState<number>(60000);
  const [marginResults, setMarginResults] = useState<{
    grossProfit: number;
    grossMargin: number;
    markupPercentage: number;
  } | null>(null);
  
  // Tab 2: Calculate Revenue from Cost and Desired Margin
  const [targetCost, setTargetCost] = useState<number>(60000);
  const [targetMargin, setTargetMargin] = useState<number>(40);
  const [revenueResults, setRevenueResults] = useState<{
    requiredRevenue: number;
    grossProfit: number;
    markupPercentage: number;
  } | null>(null);
  
  // Tab 3: Calculate Cost from Revenue and Desired Margin
  const [targetRevenue, setTargetRevenue] = useState<number>(100000);
  const [desiredMargin, setDesiredMargin] = useState<number>(40);
  const [costResults, setCostResults] = useState<{
    maxAllowableCost: number;
    grossProfit: number;
    markupPercentage: number;
  } | null>(null);
  
  // Calculate profit margin from revenue and cost
  const calculateMargin = () => {
    try {
      if (isNaN(revenue) || isNaN(cost) || revenue < 0 || cost < 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      if (revenue < cost) {
        toast.error('Revenue must be greater than or equal to cost');
        return;
      }
      
      const grossProfit = revenue - cost;
      const grossMargin = (grossProfit / revenue) * 100;
      const markupPercentage = (grossProfit / cost) * 100;
      
      setMarginResults({
        grossProfit,
        grossMargin,
        markupPercentage
      });
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate revenue from cost and desired margin
  const calculateRevenue = () => {
    try {
      if (isNaN(targetCost) || isNaN(targetMargin) || targetCost < 0 || targetMargin < 0 || targetMargin >= 100) {
        toast.error('Please enter valid values (margin must be between 0-99.99%)');
        return;
      }
      
      const requiredRevenue = targetCost / (1 - (targetMargin / 100));
      const grossProfit = requiredRevenue - targetCost;
      const markupPercentage = (grossProfit / targetCost) * 100;
      
      setRevenueResults({
        requiredRevenue,
        grossProfit,
        markupPercentage
      });
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate cost from revenue and desired margin
  const calculateCost = () => {
    try {
      if (isNaN(targetRevenue) || isNaN(desiredMargin) || targetRevenue < 0 || desiredMargin < 0 || desiredMargin >= 100) {
        toast.error('Please enter valid values (margin must be between 0-99.99%)');
        return;
      }
      
      const maxAllowableCost = targetRevenue * (1 - (desiredMargin / 100));
      const grossProfit = targetRevenue - maxAllowableCost;
      const markupPercentage = (grossProfit / maxAllowableCost) * 100;
      
      setCostResults({
        maxAllowableCost,
        grossProfit,
        markupPercentage
      });
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Profit Margin Calculator",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };

  return (
    <CalculatorLayout
      title="Profit Margin Calculator"
      description="Calculate profit margins, required revenue, or maximum allowable costs for your business with our versatile profit margin calculator."
      intro="Our profit margin calculator helps business owners and financial analysts determine gross profit margins, markups, and other key metrics necessary for making informed pricing and cost decisions."
      formula={
        <div>
          <p>The profit margin calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Gross Profit:</strong></p>
            <code>Gross Profit = Revenue - Cost</code>
            
            <p className="mt-3"><strong>Gross Margin Percentage:</strong></p>
            <code>Gross Margin % = (Gross Profit / Revenue) × 100</code>
            
            <p className="mt-3"><strong>Markup Percentage:</strong></p>
            <code>Markup % = (Gross Profit / Cost) × 100</code>
            
            <p className="mt-3"><strong>Required Revenue for Target Margin:</strong></p>
            <code>Required Revenue = Cost / (1 - (Target Margin / 100))</code>
            
            <p className="mt-3"><strong>Maximum Allowable Cost for Target Margin:</strong></p>
            <code>Max Cost = Revenue × (1 - (Target Margin / 100))</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What's the difference between margin and markup?",
          answer: "Margin is the profit percentage of the selling price (profit/revenue), while markup is the percentage of the cost (profit/cost). For example, if an item costs $60 and sells for $100, the margin is 40% and the markup is 66.7%."
        },
        {
          question: "How can I improve my profit margins?",
          answer: "You can improve profit margins by increasing prices, reducing costs, focusing on higher-margin products or services, optimizing operations, or improving efficiency in your production or service delivery process."
        },
        {
          question: "What is a good profit margin?",
          answer: "Good profit margins vary widely by industry. Retail might have margins of 3-5%, while software companies might have 70-80% margins. Research industry benchmarks to understand what's typical in your sector."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/business/profit-margin-calculator"
    >
      <Tabs defaultValue="calculate-margin" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculate-margin">Calculate Margin</TabsTrigger>
          <TabsTrigger value="calculate-revenue">Calculate Revenue</TabsTrigger>
          <TabsTrigger value="calculate-cost">Calculate Maximum Cost</TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Calculate Margin */}
        <TabsContent value="calculate-margin" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="revenue"
                label="Revenue/Selling Price"
                type="number"
                value={revenue}
                onChange={(value) => setRevenue(parseFloat(value) || 0)}
                min={0}
                step={100}
                prefix="$"
                helperText="Total revenue or selling price"
              />
              
              <CalculatorInput
                id="cost"
                label="Cost/COGS"
                type="number"
                value={cost}
                onChange={(value) => setCost(parseFloat(value) || 0)}
                min={0}
                step={100}
                prefix="$"
                helperText="Total cost or cost of goods sold"
              />
              
              <Button 
                onClick={calculateMargin}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate
              </Button>
            </div>
            
            <div>
              {marginResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Gross Profit"
                        value={`$${marginResults.grossProfit.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Gross Margin"
                        value={`${marginResults.grossMargin.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Markup Percentage"
                        value={`${marginResults.markupPercentage.toFixed(2)}%`}
                        icon={<Calculator className="h-5 w-5" />}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 2: Calculate Revenue */}
        <TabsContent value="calculate-revenue" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="target-cost"
                label="Cost/COGS"
                type="number"
                value={targetCost}
                onChange={(value) => setTargetCost(parseFloat(value) || 0)}
                min={0}
                step={100}
                prefix="$"
                helperText="Total cost or cost of goods sold"
              />
              
              <CalculatorInput
                id="target-margin"
                label="Desired Margin"
                type="number"
                value={targetMargin}
                onChange={(value) => setTargetMargin(parseFloat(value) || 0)}
                min={0}
                max={99.99}
                step={0.1}
                suffix="%"
                helperText="Your target profit margin percentage"
              />
              
              <Button 
                onClick={calculateRevenue}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate
              </Button>
            </div>
            
            <div>
              {revenueResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Required Revenue"
                        value={`$${revenueResults.requiredRevenue.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Gross Profit"
                        value={`$${revenueResults.grossProfit.toFixed(2)}`}
                        icon={<Calculator className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Markup Percentage"
                        value={`${revenueResults.markupPercentage.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 3: Calculate Cost */}
        <TabsContent value="calculate-cost" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="target-revenue"
                label="Revenue/Selling Price"
                type="number"
                value={targetRevenue}
                onChange={(value) => setTargetRevenue(parseFloat(value) || 0)}
                min={0}
                step={100}
                prefix="$"
                helperText="Expected total revenue or selling price"
              />
              
              <CalculatorInput
                id="desired-margin"
                label="Desired Margin"
                type="number"
                value={desiredMargin}
                onChange={(value) => setDesiredMargin(parseFloat(value) || 0)}
                min={0}
                max={99.99}
                step={0.1}
                suffix="%"
                helperText="Your target profit margin percentage"
              />
              
              <Button 
                onClick={calculateCost}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate
              </Button>
            </div>
            
            <div>
              {costResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Maximum Allowable Cost"
                        value={`$${costResults.maxAllowableCost.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Gross Profit"
                        value={`$${costResults.grossProfit.toFixed(2)}`}
                        icon={<Calculator className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Markup Percentage"
                        value={`${costResults.markupPercentage.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
};

export default ProfitMarginCalculator;
