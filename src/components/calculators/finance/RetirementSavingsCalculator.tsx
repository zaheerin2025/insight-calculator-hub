
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ResultDisplay from '../ResultDisplay';
import { Calculator, PiggyBank, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const RetirementSavingsCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate retirement savings
  const results = useMemo(() => {
    // Years until retirement
    const yearsToRetirement = retirementAge - currentAge;
    
    // Adjust annual return for inflation to get real return
    const realReturnRate = (1 + annualReturn / 100) / (1 + inflationRate / 100) - 1;
    
    // Monthly real return rate
    const monthlyRealReturnRate = Math.pow(1 + realReturnRate, 1/12) - 1;
    
    // Total months until retirement
    const totalMonths = yearsToRetirement * 12;
    
    // Calculate future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow((1 + realReturnRate), yearsToRetirement);
    
    // Calculate future value of monthly contributions
    // Using the formula for future value of an annuity: PMT * ((1 + r)^n - 1) / r
    const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRealReturnRate, totalMonths) - 1) / monthlyRealReturnRate) * (1 + monthlyRealReturnRate);
    
    // Total retirement savings
    const totalRetirementSavings = futureValueCurrentSavings + futureValueContributions;
    
    // Monthly retirement income (assuming 4% annual withdrawal rate)
    const annualWithdrawalRate = 0.04;
    const monthlyRetirementIncome = totalRetirementSavings * annualWithdrawalRate / 12;
    
    return {
      totalRetirementSavings: totalRetirementSavings.toFixed(2),
      monthlyRetirementIncome: monthlyRetirementIncome.toFixed(2),
      yearsToRetirement,
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate]);

  const handleCalculate = () => {
    setCalculationDone(true);
    toast.success("Retirement savings calculated successfully");
  };

  const relatedCalculators = [
    {
      title: "Compound Interest Calculator",
      path: "/calculators/finance/compound-interest-calculator",
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
      title="Retirement Savings Calculator"
      description="Plan for your retirement by calculating how much you need to save to reach your retirement goals."
      intro="Use our retirement savings calculator to estimate how much you need to save for retirement and whether you're on track to meet your retirement goals."
      canonicalUrl="https://calculators-hub.com/calculators/finance/retirement-savings-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            Our retirement calculator uses the following formulas to estimate your retirement savings:
          </p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            FV = P(1 + r)ⁿ + PMT × ((1 + r)ⁿ - 1) / r × (1 + r)
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>FV = Future value (total retirement savings)</li>
            <li>P = Present value (current savings)</li>
            <li>r = Rate of return (adjusted for inflation)</li>
            <li>n = Number of periods</li>
            <li>PMT = Regular payment (monthly contribution)</li>
          </ul>
          <p className="mt-4">
            The calculator also estimates monthly retirement income using the 4% withdrawal rule:
          </p>
          <div className="bg-muted p-4 rounded-md my-4 font-mono text-sm overflow-auto">
            Monthly Income = Total Savings × 0.04 ÷ 12
          </div>
        </div>
      }
      faq={[
        {
          question: "How much should I save for retirement?",
          answer: "Financial experts often recommend saving 10-15% of your income for retirement. However, the ideal amount varies based on your age, desired retirement lifestyle, and when you start saving. This calculator can help you determine if you're on track."
        },
        {
          question: "When should I start saving for retirement?",
          answer: "The earlier, the better. Starting in your 20s gives your money decades to grow through compound interest. However, it's never too late to start - just adjust your savings rate accordingly."
        },
        {
          question: "What is a reasonable rate of return to assume?",
          answer: "Historically, a diversified portfolio of stocks and bonds has returned about 6-7% annually over the long term after adjusting for inflation. However, future returns are never guaranteed, and actual returns will vary."
        },
        {
          question: "How does inflation affect my retirement savings?",
          answer: "Inflation reduces your money's purchasing power over time. Our calculator accounts for inflation by calculating real returns (nominal returns minus inflation rate), giving you results in today's dollars."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Retirement Savings Calculator",
        "description": "Plan for your retirement by calculating how much you need to save to reach your retirement goals.",
        "url": "https://calculators-hub.com/calculators/finance/retirement-savings-calculator",
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
            <Label htmlFor="currentAge">Current Age</Label>
            <Input
              id="currentAge"
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              min="18"
              max="80"
            />
            <Slider
              value={[currentAge]}
              min={18}
              max={80}
              step={1}
              className="mt-2"
              onValueChange={(value) => setCurrentAge(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retirementAge">Retirement Age</Label>
            <Input
              id="retirementAge"
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              min="45"
              max="90"
            />
            <Slider
              value={[retirementAge]}
              min={45}
              max={90}
              step={1}
              className="mt-2"
              onValueChange={(value) => setRetirementAge(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentSavings">Current Retirement Savings ($)</Label>
            <Input
              id="currentSavings"
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              min="0"
              step="1000"
            />
            <Slider
              value={[currentSavings]}
              min={0}
              max={500000}
              step={5000}
              className="mt-2"
              onValueChange={(value) => setCurrentSavings(value[0])}
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
              min="1"
              max="20"
              step="0.5"
            />
            <Slider
              value={[annualReturn]}
              min={1}
              max={15}
              step={0.5}
              className="mt-2"
              onValueChange={(value) => setAnnualReturn(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
            <Input
              id="inflationRate"
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              min="0"
              max="10"
              step="0.1"
            />
            <Slider
              value={[inflationRate]}
              min={0}
              max={10}
              step={0.1}
              className="mt-2"
              onValueChange={(value) => setInflationRate(value[0])}
            />
          </div>

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate Retirement Savings
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <ResultDisplay
              label="Years Until Retirement"
              value={results.yearsToRetirement}
              icon={<Calendar className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Estimated Total Savings at Retirement"
              value={`$${parseFloat(results.totalRetirementSavings).toLocaleString()}`}
              icon={<PiggyBank className="h-5 w-5" />}
              isHighlighted={true}
            />
            <ResultDisplay
              label="Estimated Monthly Income in Retirement"
              value={`$${parseFloat(results.monthlyRetirementIncome).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
          </div>

          {calculationDone && (
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium mb-4">Retirement Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Age</p>
                  <p className="text-lg font-medium">{currentAge} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Retirement Age</p>
                  <p className="text-lg font-medium">{retirementAge} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Savings</p>
                  <p className="text-lg font-medium">${currentSavings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                  <p className="text-lg font-medium">${monthlyContribution.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Return (adjusted for inflation)</p>
                  <p className="text-lg font-medium">{(annualReturn - inflationRate).toFixed(1)}%</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">At retirement age {retirementAge}, you could have:</p>
                  <p className="text-xl font-bold text-primary">${parseFloat(results.totalRetirementSavings).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">Providing a monthly income of:</p>
                  <p className="text-xl font-bold">${parseFloat(results.monthlyRetirementIncome).toLocaleString()}/month</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default RetirementSavingsCalculator;
