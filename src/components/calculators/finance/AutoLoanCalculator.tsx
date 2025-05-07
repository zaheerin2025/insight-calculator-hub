
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ResultDisplay from '../ResultDisplay';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BanknoteIcon, Calculator, Car, PiggyBank } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { toast } from 'sonner';

const AutoLoanCalculator: React.FC = () => {
  const [vehiclePrice, setVehiclePrice] = useState<number>(25000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(6);
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate auto loan
  const results = useMemo(() => {
    // Calculate tax amount
    const taxAmount = vehiclePrice * (salesTaxRate / 100);
    
    // Calculate total vehicle cost including tax
    const totalVehicleCost = vehiclePrice + taxAmount;
    
    // Calculate loan amount (total cost minus down payment)
    const principal = totalVehicleCost - downPayment;
    
    // Calculate monthly payment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Calculate total cost and interest
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    const totalCost = totalVehicleCost + totalInterest;
    
    return {
      loanAmount: principal.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalCost.toFixed(2),
      salesTax: taxAmount.toFixed(2)
    };
  }, [vehiclePrice, downPayment, interestRate, loanTerm, salesTaxRate]);

  // Handle calculation
  const handleCalculate = () => {
    setCalculationDone(true);
    toast.success("Auto loan calculated successfully");
  };

  // Pie chart data
  const chartData = [
    { name: 'Vehicle Price', value: vehiclePrice, fill: '#9333EA' },
    { name: 'Sales Tax', value: parseFloat(results.salesTax), fill: '#A855F7' },
    { name: 'Interest', value: parseFloat(results.totalInterest), fill: '#D8B4FE' },
  ];

  // Chart colors
  const COLORS = ['#9333EA', '#A855F7', '#D8B4FE'];

  const relatedCalculators = [
    {
      title: "Loan EMI Calculator",
      path: "/calculators/finance/loan-emi-calculator",
      category: "Finance"
    },
    {
      title: "Mortgage Calculator",
      path: "/calculators/finance/mortgage-calculator",
      category: "Finance"
    },
    {
      title: "Debt-to-Income Calculator",
      path: "/calculators/finance/debt-to-income-calculator",
      category: "Finance"
    }
  ];

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate your monthly car loan payment, total interest, and total cost with our free auto loan calculator."
      intro="Use our auto loan calculator to estimate your monthly car payment, including principal, interest, taxes, and see the total cost of your vehicle purchase."
      canonicalUrl="https://calculators-hub.com/calculators/finance/auto-loan-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            The auto loan calculator uses the following formulas:
          </p>
          <div className="space-y-4">
            <div>
              <p className="mb-2">To calculate the loan amount:</p>
              <div className="bg-muted p-4 rounded-md mb-2 font-mono text-sm overflow-auto">
                Loan Amount = (Vehicle Price + Sales Tax) - Down Payment
              </div>
              <p className="mb-2">Where Sales Tax = Vehicle Price × Tax Rate</p>
            </div>
            
            <div>
              <p className="mb-2">To calculate the monthly payment:</p>
              <div className="bg-muted p-4 rounded-md mb-2 font-mono text-sm overflow-auto">
                Monthly Payment = P × r × (1 + r)^n / [(1 + r)^n - 1]
              </div>
              <p className="mb-2">Where:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>P = Principal (loan amount)</li>
                <li>r = Monthly interest rate (annual rate ÷ 12 ÷ 100)</li>
                <li>n = Total number of payments (years × 12)</li>
              </ul>
            </div>
            
            <div>
              <p className="mb-2">To calculate the total interest paid:</p>
              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-auto">
                Total Interest = (Monthly Payment × Number of Payments) - Principal
              </div>
            </div>
          </div>
        </div>
      }
      faq={[
        {
          question: "How much car can I afford?",
          answer: "Financial experts recommend spending no more than 10-15% of your monthly take-home pay on car payments. Additionally, your total car expenses (including insurance, fuel, maintenance) should not exceed 20% of your monthly income."
        },
        {
          question: "Should I make a larger down payment?",
          answer: "A larger down payment reduces your loan amount, which lowers your monthly payment and total interest paid. It also reduces the risk of becoming 'upside down' on your loan (owing more than the car is worth). Aim for at least 20% down if possible."
        },
        {
          question: "How does the loan term affect my auto loan?",
          answer: "Longer loan terms (e.g., 6 or 7 years) mean lower monthly payments but significantly more interest paid over time. Shorter loan terms (3-4 years) have higher monthly payments but less total interest and you'll build equity faster."
        },
        {
          question: "Is it better to finance through a dealer or get a pre-approved loan?",
          answer: "Getting pre-approved for an auto loan from your bank or credit union before shopping gives you leverage when negotiating and helps you focus on the vehicle price rather than the monthly payment. However, sometimes dealers offer special financing rates that may be better than what you can get elsewhere."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Auto Loan Calculator",
        "description": "Calculate your monthly car loan payment, total interest, and total cost.",
        "url": "https://calculators-hub.com/calculators/finance/auto-loan-calculator",
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
            <Label htmlFor="vehiclePrice">Vehicle Price ($)</Label>
            <Input
              id="vehiclePrice"
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              min="1000"
              step="500"
            />
            <Slider
              value={[vehiclePrice]}
              min={5000}
              max={100000}
              step={1000}
              className="mt-2"
              onValueChange={(value) => setVehiclePrice(value[0])}
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
              step="500"
            />
            <Slider
              value={[downPayment]}
              min={0}
              max={vehiclePrice / 2}
              step={500}
              className="mt-2"
              onValueChange={(value) => setDownPayment(value[0])}
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
              max="25"
            />
            <Slider
              value={[interestRate]}
              min={0.5}
              max={15}
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
              max="10"
            />
            <Slider
              value={[loanTerm]}
              min={1}
              max={8}
              step={1}
              className="mt-2"
              onValueChange={(value) => setLoanTerm(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salesTaxRate">Sales Tax Rate (%)</Label>
            <Input
              id="salesTaxRate"
              type="number"
              value={salesTaxRate}
              onChange={(e) => setSalesTaxRate(Number(e.target.value))}
              min="0"
              max="15"
              step="0.1"
            />
            <Slider
              value={[salesTaxRate]}
              min={0}
              max={10}
              step={0.1}
              className="mt-2"
              onValueChange={(value) => setSalesTaxRate(value[0])}
            />
          </div>

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate Auto Loan
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-1">
            <ResultDisplay
              label="Monthly Payment"
              value={`$${parseFloat(results.monthlyPayment).toLocaleString()}`}
              icon={<BanknoteIcon className="h-5 w-5" />}
              isHighlighted={true}
            />
            <ResultDisplay
              label="Loan Amount"
              value={`$${parseFloat(results.loanAmount).toLocaleString()}`}
              icon={<Car className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Interest"
              value={`$${parseFloat(results.totalInterest).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Cost"
              value={`$${parseFloat(results.totalCost).toLocaleString()}`}
              icon={<PiggyBank className="h-5 w-5" />}
              description="Vehicle + tax + interest"
            />
          </div>

          {calculationDone && (
            <div className="h-[280px] mt-6">
              <h3 className="text-center font-medium mb-4">Cost Breakdown</h3>
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
          
          {calculationDone && (
            <div className="p-6 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium mb-3">Loan Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vehicle Price:</span>
                  <span className="font-medium">${vehiclePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax ({salesTaxRate}%):</span>
                  <span className="font-medium">${parseFloat(results.salesTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment:</span>
                  <span className="font-medium">${downPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-medium">${parseFloat(results.loanAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="font-medium">{interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Term:</span>
                  <span className="font-medium">{loanTerm} years ({loanTerm * 12} months)</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-bold text-primary">${parseFloat(results.monthlyPayment).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default AutoLoanCalculator;
