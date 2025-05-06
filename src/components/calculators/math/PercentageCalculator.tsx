
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const PercentageCalculator: React.FC = () => {
  // Tab 1: Find the percentage of a value
  const [percentageValue, setPercentageValue] = useState<number>(15);
  const [baseValue, setBaseValue] = useState<number>(200);
  const [percentageResult, setPercentageResult] = useState<number | null>(null);
  
  // Tab 2: Find what percentage one value is of another
  const [partValue, setPartValue] = useState<number>(25);
  const [wholeValue, setWholeValue] = useState<number>(100);
  const [percentageOfResult, setPercentageOfResult] = useState<number | null>(null);
  
  // Tab 3: Find the value after percentage increase/decrease
  const [startValue, setStartValue] = useState<number>(100);
  const [changePercentage, setChangePercentage] = useState<number>(20);
  const [isIncrease, setIsIncrease] = useState<boolean>(true);
  const [changeResult, setChangeResult] = useState<number | null>(null);
  
  // Calculate percentage of value
  const calculatePercentageOf = () => {
    try {
      if (isNaN(percentageValue) || isNaN(baseValue)) {
        toast.error('Please enter valid numbers');
        return;
      }
      
      const result = (percentageValue / 100) * baseValue;
      setPercentageResult(result);
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate what percentage one value is of another
  const calculatePercentage = () => {
    try {
      if (isNaN(partValue) || isNaN(wholeValue) || wholeValue === 0) {
        toast.error('Please enter valid numbers (whole value cannot be zero)');
        return;
      }
      
      const result = (partValue / wholeValue) * 100;
      setPercentageOfResult(result);
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate value after percentage increase/decrease
  const calculateChange = () => {
    try {
      if (isNaN(startValue) || isNaN(changePercentage)) {
        toast.error('Please enter valid numbers');
        return;
      }
      
      const multiplier = isIncrease ? 1 + (changePercentage / 100) : 1 - (changePercentage / 100);
      const result = startValue * multiplier;
      setChangeResult(result);
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Percentage Calculator",
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
      title="Percentage Calculator"
      description="Calculate percentages easily with our percentage calculator. Find percentages of values, what percentage one value is of another, and calculate percentage increases or decreases."
      intro="Our percentage calculator simplifies percentage calculations for you. Whether you need to find what percentage one number is of another, calculate a percentage of a value, or determine the result after a percentage increase or decrease, this calculator has you covered."
      formula={
        <div>
          <p>Percentage calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Finding the percentage of a value:</strong></p>
            <code>Result = (Percentage / 100) × Value</code>
            
            <p className="mt-3"><strong>Finding what percentage one value is of another:</strong></p>
            <code>Percentage = (Part / Whole) × 100</code>
            
            <p className="mt-3"><strong>Calculating percentage increase/decrease:</strong></p>
            <code>Result = Original Value × (1 + (Percentage / 100))</code> <span>for increase</span>
            <br />
            <code>Result = Original Value × (1 - (Percentage / 100))</code> <span>for decrease</span>
          </div>
        </div>
      }
      faq={[
        {
          question: "How do I calculate a percentage of a number?",
          answer: "To find a percentage of a number, divide the percentage by 100, then multiply by the number. For example, to find 15% of 200: (15 ÷ 100) × 200 = 30."
        },
        {
          question: "How do I find what percentage one number is of another?",
          answer: "To find what percentage one number is of another, divide the first number by the second, then multiply by 100. For example, to find what percentage 25 is of 100: (25 ÷ 100) × 100 = 25%."
        },
        {
          question: "How do I calculate a discounted price?",
          answer: "To calculate a discounted price, multiply the original price by (1 - discount percentage/100). For example, for a 20% discount on a $100 item: $100 × (1 - 20/100) = $100 × 0.8 = $80."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://example.com/calculators/math/percentage-calculator"
    >
      <div className="space-y-6">
        <Tabs defaultValue="percentageOf" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="percentageOf">Find % of Value</TabsTrigger>
            <TabsTrigger value="whatPercentage">Find What % One Value is of Another</TabsTrigger>
            <TabsTrigger value="changePercentage">% Increase/Decrease</TabsTrigger>
          </TabsList>
          
          {/* Tab 1: Find the percentage of a value */}
          <TabsContent value="percentageOf" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalculatorInput
                id="percentage-value"
                label="Percentage"
                type="number"
                value={percentageValue}
                onChange={(value) => setPercentageValue(parseFloat(value) || 0)}
                suffix="%"
                min={0}
                step={0.1}
                helperText="What percentage would you like to find"
              />
              
              <CalculatorInput
                id="base-value"
                label="Value"
                type="number"
                value={baseValue}
                onChange={(value) => setBaseValue(parseFloat(value) || 0)}
                min={0}
                step={0.01}
                helperText="The value to find a percentage of"
              />
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={calculatePercentageOf}
                className="bg-primary hover:bg-primary-hover text-white"
              >
                Calculate
              </Button>
            </div>
            
            {percentageResult !== null && (
              <Card className="mt-4 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <p className="text-lg mb-2">Result:</p>
                  <p className="text-2xl font-bold text-primary">{percentageResult.toFixed(2)}</p>
                  <p className="mt-2 text-muted-foreground">
                    {percentageValue}% of {baseValue} is {percentageResult.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Tab 2: Find what percentage one value is of another */}
          <TabsContent value="whatPercentage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalculatorInput
                id="part-value"
                label="Part Value"
                type="number"
                value={partValue}
                onChange={(value) => setPartValue(parseFloat(value) || 0)}
                min={0}
                step={0.01}
                helperText="The value you want to find the percentage of"
              />
              
              <CalculatorInput
                id="whole-value"
                label="Whole Value"
                type="number"
                value={wholeValue}
                onChange={(value) => setWholeValue(parseFloat(value) || 0)}
                min={0.01}
                step={0.01}
                helperText="The total or whole value (cannot be zero)"
              />
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={calculatePercentage}
                className="bg-primary hover:bg-primary-hover text-white"
              >
                Calculate
              </Button>
            </div>
            
            {percentageOfResult !== null && (
              <Card className="mt-4 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <p className="text-lg mb-2">Result:</p>
                  <p className="text-2xl font-bold text-primary">{percentageOfResult.toFixed(2)}%</p>
                  <p className="mt-2 text-muted-foreground">
                    {partValue} is {percentageOfResult.toFixed(2)}% of {wholeValue}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Tab 3: Find the value after percentage increase/decrease */}
          <TabsContent value="changePercentage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CalculatorInput
                id="start-value"
                label="Starting Value"
                type="number"
                value={startValue}
                onChange={(value) => setStartValue(parseFloat(value) || 0)}
                min={0}
                step={0.01}
                helperText="The original value before change"
              />
              
              <CalculatorInput
                id="change-percentage"
                label="Percentage Change"
                type="number"
                value={changePercentage}
                onChange={(value) => setChangePercentage(parseFloat(value) || 0)}
                suffix="%"
                min={0}
                step={0.1}
                helperText="The percentage to increase/decrease by"
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Change Type</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={isIncrease ? "default" : "outline"}
                    onClick={() => setIsIncrease(true)}
                    className={isIncrease ? "bg-primary text-white" : ""}
                  >
                    Increase
                  </Button>
                  <Button
                    type="button"
                    variant={!isIncrease ? "default" : "outline"}
                    onClick={() => setIsIncrease(false)}
                    className={!isIncrease ? "bg-primary text-white" : ""}
                  >
                    Decrease
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Select increase or decrease</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={calculateChange}
                className="bg-primary hover:bg-primary-hover text-white"
              >
                Calculate
              </Button>
            </div>
            
            {changeResult !== null && (
              <Card className="mt-4 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <p className="text-lg mb-2">Result:</p>
                  <p className="text-2xl font-bold text-primary">{changeResult.toFixed(2)}</p>
                  <p className="mt-2 text-muted-foreground">
                    A {changePercentage}% {isIncrease ? 'increase' : 'decrease'} from {startValue} is {changeResult.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </CalculatorLayout>
  );
};

export default PercentageCalculator;
