
import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { DollarSign, Calculator, Users } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const TipCalculator: React.FC = () => {
  // Inputs
  const [billAmount, setBillAmount] = useState<number>(50);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [splitCount, setSplitCount] = useState<number>(1);
  
  // Results
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [perPersonAmount, setPerPersonAmount] = useState<number>(0);
  
  // Calculate tip and totals
  useEffect(() => {
    const calculateTip = () => {
      const tip = billAmount * (tipPercent / 100);
      const total = billAmount + tip;
      const perPerson = splitCount > 0 ? total / splitCount : total;
      
      setTipAmount(tip);
      setTotalAmount(total);
      setPerPersonAmount(perPerson);
    };
    
    calculateTip();
  }, [billAmount, tipPercent, splitCount]);
  
  // Handle tip preset selection
  const handleTipPreset = (percent: number) => {
    setTipPercent(percent);
  };
  
  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tip Calculator",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };

  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate tips for restaurants, services, and more with options for splitting the bill."
      intro="Our tip calculator helps you quickly determine how much to tip based on your bill amount, desired tip percentage, and number of people splitting the bill."
      formula={
        <div>
          <p>The tip calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Tip Amount:</strong></p>
            <code>Tip Amount = Bill Amount × (Tip Percentage ÷ 100)</code>
            
            <p className="mt-3"><strong>Total Amount:</strong></p>
            <code>Total Amount = Bill Amount + Tip Amount</code>
            
            <p className="mt-3"><strong>Per Person Amount:</strong></p>
            <code>Per Person Amount = Total Amount ÷ Number of People</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "How much should I tip?",
          answer: "Tipping practices vary by country and service type. In the US, 15-20% is standard for restaurant servers, 10-15% for food delivery, 15-20% for taxi/rideshare drivers, 15-20% for hairstylists, and $1-2 per bag for hotel bellhops. For exceptional service, consider tipping more."
        },
        {
          question: "Should I tip on the pre-tax or post-tax amount?",
          answer: "While there's no strict rule, tipping on the pre-tax amount is technically correct since tax is paid to the government, not for service. However, many people find it simpler to tip on the post-tax total, which is slightly more generous to service workers."
        },
        {
          question: "Is it acceptable to not tip?",
          answer: "In countries like the US where tipping is customary and service workers rely on tips as a significant portion of their income, not tipping for satisfactory service is generally considered inappropriate. If you experienced truly poor service, consider speaking with a manager rather than withholding the tip entirely."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/tip-calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <CalculatorInput
            id="bill-amount"
            label="Bill Amount"
            type="number"
            value={billAmount}
            onChange={(value) => setBillAmount(parseFloat(value) || 0)}
            min={0}
            step={0.01}
            prefix="$"
            helperText="Enter the total bill amount before tip"
          />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="tip-percent" className="block text-sm font-medium">
                Tip Percentage: {tipPercent}%
              </label>
            </div>
            <Slider
              id="tip-percent"
              min={0}
              max={40}
              step={1}
              value={[tipPercent]}
              onValueChange={(value) => setTipPercent(value[0])}
              className="my-4"
              aria-label="Tip Percentage"
            />
            <p className="text-xs text-muted-foreground">Adjust the slider to change tip percentage</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleTipPreset(15)}
              className={tipPercent === 15 ? 'bg-primary text-white' : ''}
            >
              15%
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleTipPreset(18)}
              className={tipPercent === 18 ? 'bg-primary text-white' : ''}
            >
              18%
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleTipPreset(20)}
              className={tipPercent === 20 ? 'bg-primary text-white' : ''}
            >
              20%
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleTipPreset(25)}
              className={tipPercent === 25 ? 'bg-primary text-white' : ''}
            >
              25%
            </Button>
          </div>
          
          <CalculatorInput
            id="split-count"
            label="Split Between"
            type="number"
            value={splitCount}
            onChange={(value) => setSplitCount(parseInt(value) || 1)}
            min={1}
            step={1}
            suffix=" people"
            helperText="Enter the number of people sharing the bill"
          />
        </div>
        
        <Card className="h-full">
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <h3 className="text-lg font-medium mb-4">Tip Summary</h3>
            
            <div className="space-y-3">
              <ResultDisplay
                label="Tip Amount"
                value={`$${tipAmount.toFixed(2)}`}
                icon={<DollarSign className="h-5 w-5" />}
              />
              
              <ResultDisplay
                label="Total Bill with Tip"
                value={`$${totalAmount.toFixed(2)}`}
                icon={<Calculator className="h-5 w-5" />}
                isHighlighted={true}
              />
              
              {splitCount > 1 && (
                <ResultDisplay
                  label={`Amount Per Person (${splitCount})`}
                  value={`$${perPersonAmount.toFixed(2)}`}
                  icon={<Users className="h-5 w-5" />}
                  isHighlighted={true}
                />
              )}
            </div>
            
            <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
              <p>A {tipPercent}% tip on ${billAmount.toFixed(2)} is ${tipAmount.toFixed(2)}.</p>
              <p className="mt-2">The total bill including tip is ${totalAmount.toFixed(2)}.</p>
              {splitCount > 1 && (
                <p className="mt-2">Split between {splitCount} people, each person pays ${perPersonAmount.toFixed(2)}.</p>
              )}
              <p className="mt-4 text-xs">Tip amounts are rounded to the nearest cent for convenience.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default TipCalculator;
