
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { DollarSign, Calculator } from 'lucide-react';

const BreakEvenCalculator: React.FC = () => {
  // Input values
  const [fixedCosts, setFixedCosts] = useState<number>(50000);
  const [pricePerUnit, setPricePerUnit] = useState<number>(100);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(60);
  
  // Results
  const [breakEvenResults, setBreakEvenResults] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
  } | null>(null);

  // Calculate break-even point
  const calculateBreakEven = () => {
    try {
      if (isNaN(fixedCosts) || isNaN(pricePerUnit) || isNaN(variableCostPerUnit)) {
        toast.error('Please enter valid numbers for all fields');
        return;
      }
      
      if (pricePerUnit <= variableCostPerUnit) {
        toast.error('Price per unit must be greater than variable cost per unit');
        return;
      }
      
      const contributionMargin = pricePerUnit - variableCostPerUnit;
      const contributionMarginRatio = contributionMargin / pricePerUnit;
      const breakEvenUnits = fixedCosts / contributionMargin;
      const breakEvenRevenue = breakEvenUnits * pricePerUnit;
      
      setBreakEvenResults({
        breakEvenUnits,
        breakEvenRevenue,
        contributionMargin,
        contributionMarginRatio
      });
      
      toast.success('Break-even point calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Break-Even Calculator",
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
      title="Break-Even Point Calculator"
      description="Calculate the break-even point for your business to determine when your product or service becomes profitable."
      intro="Our break-even calculator helps business owners and financial analysts determine the minimum number of units needed to be sold to cover all costs, providing crucial information for business planning and pricing strategies."
      formula={
        <div>
          <p>The break-even calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Contribution Margin:</strong></p>
            <code>Contribution Margin = Price Per Unit - Variable Cost Per Unit</code>
            
            <p className="mt-3"><strong>Break-even Point (Units):</strong></p>
            <code>Break-even Units = Fixed Costs ÷ Contribution Margin</code>
            
            <p className="mt-3"><strong>Break-even Point (Revenue):</strong></p>
            <code>Break-even Revenue = Break-even Units × Price Per Unit</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What is a break-even point?",
          answer: "The break-even point is the point at which total revenue equals total costs, resulting in neither profit nor loss. It represents the minimum number of units a business needs to sell to cover all costs."
        },
        {
          question: "Why is the break-even analysis important?",
          answer: "Break-even analysis helps businesses determine the minimum sales volume needed to avoid losses, evaluate the feasibility of a product or service, assist in pricing decisions, and provide a foundation for profit planning."
        },
        {
          question: "How can I lower my break-even point?",
          answer: "You can lower your break-even point by reducing fixed costs, increasing the selling price per unit, or decreasing the variable cost per unit. Each approach has different implications for your business strategy and customer base."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/business/breakeven-calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Enter Your Business Data</h3>
          
          <CalculatorInput
            id="fixed-costs"
            label="Fixed Costs"
            type="number"
            value={fixedCosts}
            onChange={(value) => setFixedCosts(parseFloat(value) || 0)}
            min={0}
            step={100}
            prefix="$"
            helperText="Total fixed costs (rent, salaries, etc.)"
          />
          
          <CalculatorInput
            id="price-per-unit"
            label="Price Per Unit"
            type="number"
            value={pricePerUnit}
            onChange={(value) => setPricePerUnit(parseFloat(value) || 0)}
            min={0.01}
            step={0.01}
            prefix="$"
            helperText="Selling price of each unit"
          />
          
          <CalculatorInput
            id="variable-cost-per-unit"
            label="Variable Cost Per Unit"
            type="number"
            value={variableCostPerUnit}
            onChange={(value) => setVariableCostPerUnit(parseFloat(value) || 0)}
            min={0}
            step={0.01}
            prefix="$"
            helperText="Cost that varies with each unit produced"
          />
          
          <Button 
            onClick={calculateBreakEven}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
          >
            Calculate Break-Even Point
          </Button>
        </div>
        
        <div>
          {breakEvenResults && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Break-Even Results</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Break-Even Point (Units)"
                    value={`${Math.ceil(breakEvenResults.breakEvenUnits).toLocaleString()} units`}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label="Break-Even Point (Revenue)"
                    value={`$${breakEvenResults.breakEvenRevenue.toFixed(2).toLocaleString()}`}
                    icon={<DollarSign className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Contribution Margin"
                    value={`$${breakEvenResults.contributionMargin.toFixed(2)} per unit`}
                    icon={<DollarSign className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Contribution Margin Ratio"
                    value={`${(breakEvenResults.contributionMarginRatio * 100).toFixed(2)}%`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>You need to sell at least {Math.ceil(breakEvenResults.breakEvenUnits).toLocaleString()} units to break even.</p>
                  <p className="mt-2">At this point, your total revenue will equal your total costs (${breakEvenResults.breakEvenRevenue.toFixed(2).toLocaleString()}).</p>
                  <p className="mt-2">Each additional unit sold beyond the break-even point will generate ${breakEvenResults.contributionMargin.toFixed(2)} in profit.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default BreakEvenCalculator;
