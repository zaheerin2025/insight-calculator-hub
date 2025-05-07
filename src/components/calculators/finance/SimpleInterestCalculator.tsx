
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ResultDisplay from '../ResultDisplay';
import { Calculator, PiggyBank, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(3);
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate simple interest
  const results = useMemo(() => {
    // Simple interest formula: P × r × t
    const interest = (principal * rate * time) / 100;
    const finalAmount = principal + interest;
    
    return {
      interest: interest.toFixed(2),
      totalAmount: finalAmount.toFixed(2),
      principal: principal.toFixed(2),
    };
  }, [principal, rate, time]);

  // Handle calculation
  const handleCalculate = () => {
    setCalculationDone(true);
    toast.success("Simple interest calculated successfully");
  };

  const relatedCalculators = [
    {
      title: "Compound Interest Calculator",
      path: "/calculators/finance/compound-interest-calculator",
      category: "Finance"
    },
    {
      title: "Loan EMI Calculator",
      path: "/calculators/finance/loan-emi-calculator",
      category: "Finance"
    },
    {
      title: "Investment Return Calculator",
      path: "/calculators/finance/investment-return-calculator",
      category: "Finance"
    }
  ];

  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate simple interest based on principal amount, interest rate, and time period. Plan your investments and loans better."
      intro="Simple interest is calculated as a percentage of the principal for a given period of time. Unlike compound interest, it does not take into account accumulated interest from previous periods."
      canonicalUrl="https://calculators-hub.com/calculators/finance/simple-interest-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            Simple interest is calculated using the following formula:
          </p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            I = P × r × t
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>I = Interest amount</li>
            <li>P = Principal (initial investment)</li>
            <li>r = Interest rate (as a decimal or percentage)</li>
            <li>t = Time period in years</li>
          </ul>
          <p className="mt-4">
            The total amount after the time period is:
          </p>
          <div className="bg-muted p-4 rounded-md my-4 font-mono text-sm overflow-auto">
            A = P + I = P × (1 + r × t)
          </div>
          <p>Where A is the final amount, including both principal and interest.</p>
        </div>
      }
      faq={[
        {
          question: "What is simple interest?",
          answer: "Simple interest is a method of calculating interest where interest is only calculated on the initial principal. It doesn't account for interest earned on accumulated interest over time, making it different from compound interest."
        },
        {
          question: "What are common applications of simple interest?",
          answer: "Simple interest is commonly used for short-term loans, car loans, consumer loans, and sometimes in fixed deposits or savings accounts. It's also used in many lending agreements between individuals."
        },
        {
          question: "Why is simple interest typically less beneficial for investments?",
          answer: "For long-term investments, simple interest is generally less beneficial than compound interest because it doesn't allow your earnings to generate additional earnings over time. With simple interest, you only earn interest on the principal amount, not on the interest that accumulates."
        },
        {
          question: "How does simple interest differ from compound interest?",
          answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest. Over time, compound interest will result in higher returns for the same principal, interest rate, and time period."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Simple Interest Calculator",
        "description": "Calculate simple interest based on principal amount, interest rate, and time period.",
        "url": "https://calculators-hub.com/calculators/finance/simple-interest-calculator",
        "provider": {
          "@type": "Organization",
          "name": "Calculators-Hub",
          "url": "https://calculators-hub.com"
        }
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="principal">Principal Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              min="100"
              step="100"
            />
            <Slider
              value={[principal]}
              min={1000}
              max={100000}
              step={1000}
              className="mt-2"
              onValueChange={(value) => setPrincipal(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate (% per annum)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              min="0.1"
              max="20"
              step="0.1"
            />
            <Slider
              value={[rate]}
              min={1}
              max={15}
              step={0.1}
              className="mt-2"
              onValueChange={(value) => setRate(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time Period (years)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              min="1"
              max="30"
              step="1"
            />
            <Slider
              value={[time]}
              min={1}
              max={20}
              step={1}
              className="mt-2"
              onValueChange={(value) => setTime(value[0])}
            />
          </div>

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate Interest
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-1">
            <ResultDisplay
              label="Principal Amount"
              value={`$${parseFloat(results.principal).toLocaleString()}`}
              icon={<PiggyBank className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Interest Amount"
              value={`$${parseFloat(results.interest).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Amount After Interest"
              value={`$${parseFloat(results.totalAmount).toLocaleString()}`}
              icon={<Calendar className="h-5 w-5" />}
            />
          </div>

          {calculationDone && (
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="text-center font-medium mb-4">Interest Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Principal Amount</p>
                  <p className="text-lg font-medium">${parseFloat(results.principal).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="text-lg font-medium">{rate}% per year</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Period</p>
                  <p className="text-lg font-medium">{time} {time === 1 ? 'year' : 'years'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Earned</p>
                  <p className="text-lg font-medium text-primary">${parseFloat(results.interest).toLocaleString()}</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Final Amount</p>
                  <p className="text-xl font-bold">${parseFloat(results.totalAmount).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default SimpleInterestCalculator;
