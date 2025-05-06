
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ResultDisplay from '../ResultDisplay';
import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BanknoteIcon, Calculator, Home, PiggyBank } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [downPayment, setDownPayment] = useState<number>(60000);

  // Calculate results
  const results = useMemo(() => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Monthly payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal.toFixed(2),
    };
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  // Pie chart data
  const chartData = [
    { name: 'Principal', value: parseFloat(results.principal), fill: '#9333EA' },
    { name: 'Interest', value: parseFloat(results.totalInterest), fill: '#D8B4FE' },
  ];

  // Chart colors
  const COLORS = ['#9333EA', '#D8B4FE'];

  const relatedCalculators = [
    {
      title: "Home Affordability Calculator",
      path: "/calculators/finance/home-affordability-calculator",
      category: "Finance"
    },
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
      title: "Auto Loan Calculator",
      path: "/calculators/finance/auto-loan-calculator",
      category: "Finance"
    }
  ];

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment, total interest, and more with our free mortgage calculator. Make informed home buying decisions."
      intro="Use our mortgage calculator to estimate your monthly mortgage payment, including principal, interest, and the total cost over the life of the loan."
      canonicalUrl="https://calculators-hub.com/calculators/finance/mortgage-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            The monthly mortgage payment is calculated using the following formula:
          </p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1]
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>M = Monthly payment</li>
            <li>P = Principal loan amount</li>
            <li>r = Monthly interest rate (annual rate divided by 12)</li>
            <li>n = Number of payments (loan term in years × 12)</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "How is a mortgage payment calculated?",
          answer: "A mortgage payment is calculated using a formula that takes into account the loan principal, interest rate, and term of the loan. The formula calculates the monthly payment needed to pay off the loan in full by the end of the term, including both principal and interest."
        },
        {
          question: "Should I include property taxes and insurance in my mortgage calculation?",
          answer: "Our calculator provides the base mortgage payment (principal and interest). You should add property taxes, homeowner's insurance, and possibly mortgage insurance (PMI) if your down payment is less than 20% to get your total monthly payment, often referred to as PITI (Principal, Interest, Taxes, Insurance)."
        },
        {
          question: "How does the down payment affect my mortgage?",
          answer: "A larger down payment reduces the loan amount, which lowers your monthly payment and the total interest paid over the life of the loan. It may also help you avoid paying for private mortgage insurance (PMI) if your down payment is at least 20% of the home's value."
        },
        {
          question: "How does the loan term affect my mortgage?",
          answer: "A longer loan term (like 30 years) will result in lower monthly payments but higher total interest paid over time. A shorter term (like 15 years) means higher monthly payments but significant savings on interest and a faster path to full ownership."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Mortgage Calculator",
        "description": "Calculate your monthly mortgage payment, total interest, and more with our free mortgage calculator.",
        "url": "https://calculators-hub.com/calculators/finance/mortgage-calculator",
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
            <Label htmlFor="homePrice">Home Price ($)</Label>
            <Input
              id="homePrice"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              min="0"
              step="1000"
            />
            <Slider
              value={[loanAmount]}
              min={50000}
              max={1000000}
              step={10000}
              className="mt-2"
              onValueChange={(value) => setLoanAmount(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment">Down Payment ($)</Label>
            <Input
              id="downPayment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              min="0"
              step="1000"
            />
            <Slider
              value={[downPayment]}
              min={0}
              max={loanAmount * 0.5}
              step={5000}
              className="mt-2"
              onValueChange={(value) => setDownPayment(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min="0"
              max="20"
              step="0.1"
            />
            <Slider
              value={[interestRate]}
              min={0}
              max={10}
              step={0.1}
              className="mt-2"
              onValueChange={(value) => setInterestRate(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              min="1"
              max="40"
            />
            <Slider
              value={[loanTerm]}
              min={5}
              max={40}
              step={5}
              className="mt-2"
              onValueChange={(value) => setLoanTerm(value[0])}
            />
          </div>

          <Button className="w-full" size="lg">
            Calculate
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-1">
            <ResultDisplay
              label="Monthly Payment"
              value={`$${parseFloat(results.monthlyPayment).toLocaleString()}`}
              icon={<BanknoteIcon className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Principal"
              value={`$${parseFloat(results.principal).toLocaleString()}`}
              icon={<Home className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Interest"
              value={`$${parseFloat(results.totalInterest).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Cost"
              value={`$${parseFloat(results.totalPayment).toLocaleString()}`}
              icon={<PiggyBank className="h-5 w-5" />}
            />
          </div>

          <div className="h-[280px] mt-6">
            <h3 className="text-center font-medium mb-4">Payment Breakdown</h3>
            <ChartContainer config={{}} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default MortgageCalculator;
