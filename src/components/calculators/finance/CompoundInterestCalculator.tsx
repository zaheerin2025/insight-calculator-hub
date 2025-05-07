
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import ResultDisplay from '../ResultDisplay';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7);
  const [time, setTime] = useState<number>(5);
  const [compoundFrequency, setCompoundFrequency] = useState<string>("annually");
  const [additionalContribution, setAdditionalContribution] = useState<number>(100);
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const getCompoundFrequencyValue = (frequency: string): number => {
    switch (frequency) {
      case "daily": return 365;
      case "weekly": return 52;
      case "monthly": return 12;
      case "quarterly": return 4;
      case "semi-annually": return 2;
      case "annually": return 1;
      default: return 1;
    }
  };

  const getContributionFrequencyValue = (frequency: string): number => {
    switch (frequency) {
      case "weekly": return 52;
      case "monthly": return 12;
      case "quarterly": return 4;
      case "annually": return 1;
      default: return 12;
    }
  };

  const calculateCompoundInterest = () => {
    try {
      if (principal < 0 || rate < 0 || time < 0 || additionalContribution < 0) {
        toast.error('Please enter valid positive values');
        return;
      }

      const n = getCompoundFrequencyValue(compoundFrequency);
      const contributionN = getContributionFrequencyValue(contributionFrequency);
      const r = rate / 100;
      
      // For principal only
      const principalOnly = principal * Math.pow(1 + r / n, n * time);
      
      // For additional contributions (PMT formula)
      let futureValue = principal;
      
      if (additionalContribution > 0) {
        const contributionRate = r / contributionN;
        
        // Calculate each period separately to account for contributions
        for (let i = 0; i < time * contributionN; i++) {
          // Add contribution at start of period
          futureValue += additionalContribution;
          
          // Apply interest for one period
          futureValue *= (1 + r / n) ** (n / contributionN);
        }
      } else {
        futureValue = principalOnly;
      }
      
      const totalContributionAmount = additionalContribution * contributionN * time;
      
      setFinalAmount(futureValue);
      setTotalContributions(principal + totalContributionAmount);
      setTotalInterest(futureValue - (principal + totalContributionAmount));
      setIsCalculated(true);
      toast.success('Compound interest calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compound Interest Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate how your investments will grow over time with compound interest, including regular contributions."
      intro="Our compound interest calculator helps you see how your money can grow over time. Enter your initial investment, interest rate, time period, and any additional regular contributions to see the potential growth of your investment."
      formula={
        <div>
          <p>The compound interest calculator uses the following formula:</p>
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <code>A = P(1 + r/n)^(nt) + PMT × (((1 + r/n)^(nt) - 1) / (r/n))</code>
          </div>
          <p>Where:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>A</strong> = Final amount</li>
            <li><strong>P</strong> = Principal (initial investment)</li>
            <li><strong>r</strong> = Annual interest rate (decimal)</li>
            <li><strong>n</strong> = Number of times interest is compounded per year</li>
            <li><strong>t</strong> = Time in years</li>
            <li><strong>PMT</strong> = Regular payment/contribution amount</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "What is compound interest?",
          answer: "Compound interest is when you earn interest not only on your principal but also on accumulated interest from previous periods. This makes your investment grow at an accelerating rate over time."
        },
        {
          question: "How does the compounding frequency affect my returns?",
          answer: "The more frequently interest is compounded (e.g., daily vs. annually), the higher your final return will be. However, the difference is usually relatively small compared to the impact of the interest rate or investment duration."
        },
        {
          question: "Why should I make regular contributions to my investments?",
          answer: "Regular contributions to your investments can significantly increase your final amount due to the power of compound interest over time. Even small regular additions can make a big difference in the long run."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://example.com/calculators/finance/compound-interest-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalculatorInput
            id="principal"
            label="Initial Investment"
            type="number"
            value={principal}
            onChange={(value) => {
              setPrincipal(parseFloat(value) || 0);
              setIsCalculated(false);
            }}
            prefix="$"
            min={0}
            step={100}
            helperText="Starting amount"
          />
          
          <CalculatorInput
            id="interest-rate"
            label="Annual Interest Rate"
            type="number"
            value={rate}
            onChange={(value) => {
              setRate(parseFloat(value) || 0);
              setIsCalculated(false);
            }}
            suffix="%"
            min={0}
            max={100}
            step={0.1}
            helperText="Expected annual return"
          />
          
          <CalculatorInput
            id="time-period"
            label="Time Period"
            type="number"
            value={time}
            onChange={(value) => {
              setTime(parseFloat(value) || 0);
              setIsCalculated(false);
            }}
            suffix="years"
            min={1}
            max={100}
            step={1}
            helperText="Investment duration"
          />
          
          <div className="space-y-2">
            <Label htmlFor="compound-frequency">Compound Frequency</Label>
            <Select
              value={compoundFrequency}
              onValueChange={(value) => {
                setCompoundFrequency(value);
                setIsCalculated(false);
              }}
            >
              <SelectTrigger id="compound-frequency" className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">How often interest is compounded</p>
          </div>
          
          <CalculatorInput
            id="additional-contribution"
            label="Regular Contribution"
            type="number"
            value={additionalContribution}
            onChange={(value) => {
              setAdditionalContribution(parseFloat(value) || 0);
              setIsCalculated(false);
            }}
            prefix="$"
            min={0}
            step={50}
            helperText="Additional regular investments"
          />
          
          <div className="space-y-2">
            <Label htmlFor="contribution-frequency">Contribution Frequency</Label>
            <Select
              value={contributionFrequency}
              onValueChange={(value) => {
                setContributionFrequency(value);
                setIsCalculated(false);
              }}
            >
              <SelectTrigger id="contribution-frequency" className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">How often you make contributions</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateCompoundInterest}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate Growth
          </Button>
        </div>
        
        {isCalculated && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultDisplay
                label="Final Amount"
                value={formatCurrency(finalAmount)}
                isHighlighted={true}
                description={`After ${time} years`}
              />
              <ResultDisplay
                label="Total Contributions"
                value={formatCurrency(totalContributions)}
                description="Principal plus all deposits"
              />
              <ResultDisplay
                label="Total Interest Earned"
                value={formatCurrency(totalInterest)}
                description="Growth from compound interest"
              />
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;
