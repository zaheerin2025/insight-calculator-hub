
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { DollarSign, Percent, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MarkupCalculator: React.FC = () => {
  // Tab 1: Calculate Markup from Cost and Selling Price
  const [cost, setCost] = useState<number>(100);
  const [sellingPrice, setSellingPrice] = useState<number>(150);
  const [markupResults, setMarkupResults] = useState<{
    markup: number;
    marginPercent: number;
    profit: number;
  } | null>(null);
  
  // Tab 2: Calculate Selling Price from Cost and Markup
  const [baseCost, setBaseCost] = useState<number>(100);
  const [markupPercent, setMarkupPercent] = useState<number>(50);
  const [priceResults, setPriceResults] = useState<{
    sellingPrice: number;
    marginPercent: number;
    profit: number;
  } | null>(null);
  
  // Calculate markup from cost and selling price
  const calculateMarkup = () => {
    try {
      if (isNaN(cost) || isNaN(sellingPrice) || cost <= 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const profit = sellingPrice - cost;
      const markup = (profit / cost) * 100;
      const marginPercent = (profit / sellingPrice) * 100;
      
      setMarkupResults({
        markup,
        marginPercent,
        profit
      });
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate selling price from cost and markup
  const calculateSellingPrice = () => {
    try {
      if (isNaN(baseCost) || isNaN(markupPercent) || baseCost <= 0 || markupPercent < 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const markup = markupPercent / 100;
      const sellingPrice = baseCost * (1 + markup);
      const profit = sellingPrice - baseCost;
      const marginPercent = (profit / sellingPrice) * 100;
      
      setPriceResults({
        sellingPrice,
        marginPercent,
        profit
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
    "name": "Markup Calculator",
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
      title="Markup Calculator"
      description="Calculate markup percentage on your products and services to ensure profitability."
      intro="Our markup calculator helps business owners and pricing specialists determine appropriate markup percentages, selling prices, and profit margins for their products or services."
      formula={
        <div>
          <p>The markup calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Markup Percentage:</strong></p>
            <code>Markup % = ((Selling Price - Cost) / Cost) × 100</code>
            
            <p className="mt-3"><strong>Selling Price from Markup:</strong></p>
            <code>Selling Price = Cost × (1 + (Markup % / 100))</code>
            
            <p className="mt-3"><strong>Profit:</strong></p>
            <code>Profit = Selling Price - Cost</code>
            
            <p className="mt-3"><strong>Margin Percentage:</strong></p>
            <code>Margin % = ((Selling Price - Cost) / Selling Price) × 100</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What's the difference between markup and margin?",
          answer: "Markup is calculated as a percentage of the cost (profit/cost), while margin is calculated as a percentage of the selling price (profit/selling price). For example, if an item costs $100 and sells for $150, the markup is 50% and the margin is 33.3%."
        },
        {
          question: "How do I determine the right markup for my products?",
          answer: "The right markup depends on your industry, competition, perceived value, and business strategy. Most retail businesses use markups between 50% and 100%, while some luxury goods or high-value services can have markups of 200-500% or more."
        },
        {
          question: "Can markup be negative?",
          answer: "Technically, markup can be negative if you're selling a product for less than its cost, but this means you're taking a loss on each sale, which isn't sustainable for most businesses unless it's a strategic decision (like a loss leader)."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/business/markup-calculator"
    >
      <Tabs defaultValue="calculate-markup" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculate-markup">Calculate Markup</TabsTrigger>
          <TabsTrigger value="calculate-price">Calculate Selling Price</TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Calculate Markup */}
        <TabsContent value="calculate-markup" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="cost"
                label="Cost"
                type="number"
                value={cost}
                onChange={(value) => setCost(parseFloat(value) || 0)}
                min={0.01}
                step={0.01}
                prefix="$"
                helperText="Cost of goods or services"
              />
              
              <CalculatorInput
                id="selling-price"
                label="Selling Price"
                type="number"
                value={sellingPrice}
                onChange={(value) => setSellingPrice(parseFloat(value) || 0)}
                min={0.01}
                step={0.01}
                prefix="$"
                helperText="Final selling price"
              />
              
              <Button 
                onClick={calculateMarkup}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </div>
            
            <div>
              {markupResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Markup Percentage"
                        value={`${markupResults.markup.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Profit Margin Percentage"
                        value={`${markupResults.marginPercent.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Profit"
                        value={`$${markupResults.profit.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>Your markup is {markupResults.markup.toFixed(2)}%, which means you're adding ${markupResults.profit.toFixed(2)} to your cost of ${cost.toFixed(2)}.</p>
                      <p className="mt-2">This gives you a profit margin of {markupResults.marginPercent.toFixed(2)}%.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 2: Calculate Selling Price */}
        <TabsContent value="calculate-price" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="base-cost"
                label="Cost"
                type="number"
                value={baseCost}
                onChange={(value) => setBaseCost(parseFloat(value) || 0)}
                min={0.01}
                step={0.01}
                prefix="$"
                helperText="Cost of goods or services"
              />
              
              <CalculatorInput
                id="markup-percent"
                label="Desired Markup"
                type="number"
                value={markupPercent}
                onChange={(value) => setMarkupPercent(parseFloat(value) || 0)}
                min={0}
                step={0.1}
                suffix="%"
                helperText="Desired markup percentage"
              />
              
              <Button 
                onClick={calculateSellingPrice}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </div>
            
            <div>
              {priceResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Recommended Selling Price"
                        value={`$${priceResults.sellingPrice.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Profit Margin Percentage"
                        value={`${priceResults.marginPercent.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Profit"
                        value={`$${priceResults.profit.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>With a {markupPercent}% markup on your cost of ${baseCost.toFixed(2)}, your recommended selling price is ${priceResults.sellingPrice.toFixed(2)}.</p>
                      <p className="mt-2">This gives you a profit margin of {priceResults.marginPercent.toFixed(2)}% and a profit of ${priceResults.profit.toFixed(2)}.</p>
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

export default MarkupCalculator;
