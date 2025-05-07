
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ResultDisplay from '../ResultDisplay';
import { Calculator, PiggyBank, ChartLine } from 'lucide-react';
import { toast } from 'sonner';

const InvestmentReturnCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(8);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("monthly");
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate investment return
  const results = useMemo(() => {
    // Determine number of compounds per year
    let compoundsPerYear: number;
    switch (compoundingFrequency) {
      case 'daily':
        compoundsPerYear = 365;
        break;
      case 'weekly':
        compoundsPerYear = 52;
        break;
      case 'monthly':
        compoundsPerYear = 12;
        break;
      case 'quarterly':
        compoundsPerYear = 4;
        break;
      case 'annually':
        compoundsPerYear = 1;
        break;
      default:
        compoundsPerYear = 12; // monthly as default
    }

    // Calculate total periods
    const totalPeriods = investmentPeriod * compoundsPerYear;
    
    // Rate per period
    const ratePerPeriod = annualReturn / 100 / compoundsPerYear;
    
    // Calculate future value of initial investment
    const futureValueInitial = initialInvestment * Math.pow(1 + ratePerPeriod, totalPeriods);
    
    // Calculate contribution per period
    const contributionPerPeriod = monthlyContribution * 12 / compoundsPerYear;
    
    // Calculate future value of periodic contributions
    const futureValueContributions = contributionPerPeriod * (Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod;
    
    // Total future value
    const futureValue = futureValueInitial + futureValueContributions;
    
    // Total contributions
    const totalContributions = initialInvestment + (monthlyContribution * 12 * investmentPeriod);
    
    // Total interest earned
    const interestEarned = futureValue - totalContributions;
    
    return {
      futureValue: futureValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
    };
  }, [initialInvestment, monthlyContribution, annualReturn, investmentPeriod, compoundingFrequency]);

  // Handle calculate button click
  const handleCalculate = () => {
    setCalculationDone(true);
    toast.success("Investment returns calculated successfully");
  };

  const relatedCalculators = [
    {
      title: "Compound Interest Calculator",
      path: "/calculators/finance/compound-interest-calculator",
      category: "Finance"
    },
    {
      title: "Retirement Savings Calculator",
      path: "/calculators/finance/retirement-savings-calculator",
      category: "Finance"
    }
  ];

  return (
    <CalculatorLayout
      title="Investment Return Calculator"
      description="Calculate the potential returns on your investments based on initial investment, additional contributions, and expected rate of return."
      intro="Use our investment return calculator to see how your investments could grow over time with different contribution amounts and rates of return."
      canonicalUrl="https://calculators-hub.com/calculators/finance/investment-return-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            The investment return calculator uses the following formulas:
          </p>
          <p className="mb-2">The future value of a lump sum investment:</p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            FV = P(1 + r)ⁿ
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>FV = Future value</li>
            <li>P = Principal (initial investment)</li>
            <li>r = Interest rate per period</li>
            <li>n = Number of periods</li>
          </ul>
          
          <p className="mb-2">The future value of regular contributions:</p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            FV = PMT × ((1 + r)ⁿ - 1) / r
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>FV = Future value</li>
            <li>PMT = Regular payment amount</li>
            <li>r = Interest rate per period</li>
            <li>n = Number of periods</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "How does compounding frequency affect investment returns?",
          answer: "More frequent compounding (daily, weekly, monthly) generally results in higher returns compared to less frequent compounding (quarterly, annually). However, the difference becomes most noticeable over longer time periods and with higher interest rates."
        },
        {
          question: "What is a reasonable rate of return to expect?",
          answer: "Historical average annual returns have been around 7-10% for stock market investments before inflation, 3-5% for bond investments, and less than 1% for savings accounts. However, past performance doesn't guarantee future results."
        },
        {
          question: "Why is regular investing important?",
          answer: "Regular investing (monthly contributions) allows you to take advantage of dollar-cost averaging, potentially lowering your average purchase price over time. It also builds the habit of saving and increases your potential returns through compounding."
        },
        {
          question: "How does inflation affect investment returns?",
          answer: "Inflation reduces the purchasing power of money over time. To calculate real returns, subtract the inflation rate from your nominal returns. For long-term planning, it's important to consider returns after inflation."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Investment Return Calculator",
        "description": "Calculate the potential returns on your investments based on initial investment, additional contributions, and expected rate of return.",
        "url": "https://calculators-hub.com/calculators/finance/investment-return-calculator",
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
            <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
            <Input
              id="initialInvestment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              min="0"
              step="100"
            />
            <Slider
              value={[initialInvestment]}
              min={0}
              max={100000}
              step={1000}
              className="mt-2"
              onValueChange={(value) => setInitialInvestment(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              min="0"
              step="50"
            />
            <Slider
              value={[monthlyContribution]}
              min={0}
              max={5000}
              step={50}
              className="mt-2"
              onValueChange={(value) => setMonthlyContribution(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
            <Input
              id="annualReturn"
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              min="0"
              max="30"
              step="0.1"
            />
            <Slider
              value={[annualReturn]}
              min={0}
              max={20}
              step={0.5}
              className="mt-2"
              onValueChange={(value) => setAnnualReturn(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentPeriod">Investment Period (years)</Label>
            <Input
              id="investmentPeriod"
              type="number"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              min="1"
              max="50"
              step="1"
            />
            <Slider
              value={[investmentPeriod]}
              min={1}
              max={40}
              step={1}
              className="mt-2"
              onValueChange={(value) => setInvestmentPeriod(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
            <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select compounding frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate Investment Returns
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <ResultDisplay
              label="Future Value"
              value={`$${parseFloat(results.futureValue).toLocaleString()}`}
              icon={<PiggyBank className="h-5 w-5" />}
              isHighlighted={true}
            />
            <ResultDisplay
              label="Total Contributions"
              value={`$${parseFloat(results.totalContributions).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Interest Earned"
              value={`$${parseFloat(results.interestEarned).toLocaleString()}`}
              icon={<ChartLine className="h-5 w-5" />}
            />
          </div>

          {calculationDone && (
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium mb-4">Investment Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Initial Investment</p>
                  <p className="text-lg font-medium">${initialInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                  <p className="text-lg font-medium">${monthlyContribution.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Return</p>
                  <p className="text-lg font-medium">{annualReturn}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compounding Frequency</p>
                  <p className="text-lg font-medium">{compoundingFrequency.charAt(0).toUpperCase() + compoundingFrequency.slice(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Investment Period</p>
                  <p className="text-lg font-medium">{investmentPeriod} years</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">After {investmentPeriod} years, your investment could be worth:</p>
                  <p className="text-xl font-bold text-primary">${parseFloat(results.futureValue).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">Total interest earned:</p>
                  <p className="text-xl font-bold">${parseFloat(results.interestEarned).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default InvestmentReturnCalculator;
