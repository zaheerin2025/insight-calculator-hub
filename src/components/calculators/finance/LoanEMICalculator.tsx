
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ResultDisplay from '../ResultDisplay';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BanknoteIcon, Calculator, PiggyBank, Calendar } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { toast } from 'sonner';

const LoanEMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate EMI
  const results = useMemo(() => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numPayments)) / 
                (Math.pow(1 + ratePerMonth, numPayments) - 1);
    
    const totalPayment = emi * numPayments;
    const totalInterest = totalPayment - principal;
    
    return {
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal.toFixed(2),
    };
  }, [loanAmount, interestRate, loanTerm]);

  // Handle calculation
  const handleCalculate = () => {
    setCalculationDone(true);
    toast.success("EMI calculated successfully");
  };

  // Pie chart data
  const chartData = [
    { name: 'Principal', value: parseFloat(results.principal), fill: '#9333EA' },
    { name: 'Interest', value: parseFloat(results.totalInterest), fill: '#D8B4FE' },
  ];

  // Chart colors
  const COLORS = ['#9333EA', '#D8B4FE'];

  const relatedCalculators = [
    {
      title: "Mortgage Calculator",
      path: "/calculators/finance/mortgage-calculator",
      category: "Finance"
    },
    {
      title: "Compound Interest Calculator",
      path: "/calculators/finance/compound-interest-calculator",
      category: "Finance"
    },
    {
      title: "Simple Interest Calculator",
      path: "/calculators/finance/simple-interest-calculator",
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
      title="Loan EMI Calculator"
      description="Calculate your Equated Monthly Installment (EMI) for any loan based on principal amount, interest rate, and loan tenure."
      intro="An EMI (Equated Monthly Installment) calculator helps you determine the fixed monthly payment amount for repaying a loan over a specified period. Use this calculator to plan your loan repayment strategy."
      canonicalUrl="https://calculators-hub.com/calculators/finance/loan-emi-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            The EMI (Equated Monthly Installment) is calculated using the following formula:
          </p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>P = Principal loan amount</li>
            <li>r = Monthly interest rate (annual rate divided by 12 and then by 100)</li>
            <li>n = Number of monthly installments (loan term in years × 12)</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "What is an EMI?",
          answer: "An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender on a specified date each month. EMIs are applied to both interest and principal each month so that over a specified time period, the loan is fully paid off."
        },
        {
          question: "How can I reduce my EMI amount?",
          answer: "You can reduce your EMI by: 1) Making a larger down payment to reduce the principal amount, 2) Negotiating a lower interest rate, 3) Extending the loan tenure (though this will increase the total interest paid), or 4) Prepaying part of the loan when you have extra funds."
        },
        {
          question: "Does this calculator account for processing fees or other charges?",
          answer: "No, this calculator only computes the basic EMI based on principal, interest rate, and tenure. Additional charges like processing fees, insurance premiums, or other loan-related fees are not included in this calculation."
        },
        {
          question: "How accurate is this EMI calculator?",
          answer: "This calculator provides a close approximation of your EMI, based on the standard EMI formula used by most financial institutions. However, minor variations might occur due to rounding differences or specific bank policies."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Loan EMI Calculator",
        "description": "Calculate your Equated Monthly Installment (EMI) for any loan based on principal amount, interest rate, and loan tenure.",
        "url": "https://calculators-hub.com/calculators/finance/loan-emi-calculator",
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
            <Label htmlFor="loanAmount">Loan Amount ($)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              min="1000"
              step="1000"
            />
            <Slider
              value={[loanAmount]}
              min={10000}
              max={2000000}
              step={10000}
              className="mt-2"
              onValueChange={(value) => setLoanAmount(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min="0.1"
              step="0.1"
              max="30"
            />
            <Slider
              value={[interestRate]}
              min={1}
              max={20}
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
              max="30"
            />
            <Slider
              value={[loanTerm]}
              min={1}
              max={30}
              step={1}
              className="mt-2"
              onValueChange={(value) => setLoanTerm(value[0])}
            />
          </div>

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate EMI
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-1">
            <ResultDisplay
              label="Monthly EMI"
              value={`$${parseFloat(results.emi).toLocaleString()}`}
              icon={<BanknoteIcon className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Principal"
              value={`$${parseFloat(results.principal).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Interest"
              value={`$${parseFloat(results.totalInterest).toLocaleString()}`}
              icon={<Calendar className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Amount"
              value={`$${parseFloat(results.totalPayment).toLocaleString()}`}
              icon={<PiggyBank className="h-5 w-5" />}
            />
          </div>

          {calculationDone && (
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
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default LoanEMICalculator;
