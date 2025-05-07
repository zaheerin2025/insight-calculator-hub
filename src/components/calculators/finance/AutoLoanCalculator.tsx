
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ResultDisplay from '../ResultDisplay';
import { BanknoteIcon, Calculator, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const AutoLoanCalculator: React.FC = () => {
  const [carPrice, setCarPrice] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(5.9);
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly");
  const [salesTaxRate, setSalesTaxRate] = useState<number>(6);
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate auto loan details
  const results = useMemo(() => {
    // Calculate sales tax
    const salesTax = (carPrice - tradeInValue) * (salesTaxRate / 100);
    
    // Calculate total price with tax
    const totalPrice = carPrice + salesTax;
    
    // Calculate loan amount
    const loanAmount = totalPrice - downPayment - tradeInValue;
    
    // Calculate payment frequency multiplier
    let paymentsPerYear: number;
    let paymentFrequencyText: string;
    
    switch (paymentFrequency) {
      case "weekly":
        paymentsPerYear = 52;
        paymentFrequencyText = "weekly";
        break;
      case "biweekly":
        paymentsPerYear = 26;
        paymentFrequencyText = "biweekly";
        break;
      case "monthly":
        paymentsPerYear = 12;
        paymentFrequencyText = "monthly";
        break;
      default:
        paymentsPerYear = 12;
        paymentFrequencyText = "monthly";
    }
    
    // Calculate total number of payments
    const totalPayments = (loanTerm / 12) * paymentsPerYear;
    
    // Calculate interest rate per payment period
    const interestRatePerPayment = (interestRate / 100) / paymentsPerYear;
    
    // Calculate payment amount using amortization formula
    const paymentAmount = loanAmount * 
      (interestRatePerPayment * Math.pow(1 + interestRatePerPayment, totalPayments)) / 
      (Math.pow(1 + interestRatePerPayment, totalPayments) - 1);
    
    // Calculate total cost of loan
    const totalCost = paymentAmount * totalPayments;
    
    // Calculate total interest paid
    const totalInterest = totalCost - loanAmount;
    
    return {
      loanAmount: loanAmount.toFixed(2),
      paymentAmount: paymentAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalCost.toFixed(2),
      salesTax: salesTax.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      paymentFrequencyText,
      numberOfPayments: totalPayments
    };
  }, [carPrice, downPayment, tradeInValue, loanTerm, interestRate, paymentFrequency, salesTaxRate]);

  // Handle calculate button click
  const handleCalculate = () => {
    setCalculationDone(true);
    toast.success("Auto loan calculated successfully");
  };

  const relatedCalculators = [
    {
      title: "Loan EMI Calculator",
      path: "/calculators/finance/loan-emi-calculator",
      category: "Finance"
    },
    {
      title: "Debt-to-Income Ratio Calculator",
      path: "/calculators/finance/debt-to-income-calculator",
      category: "Finance"
    }
  ];

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate your monthly car payment, total interest paid, and the true cost of your auto loan."
      intro="Use our auto loan calculator to estimate your car payment and see the full cost of financing, including interest and taxes."
      canonicalUrl="https://calculators-hub.com/calculators/finance/auto-loan-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            The auto loan calculator uses this formula to determine your payment amount:
          </p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            Payment = P × (r × (1 + r)ⁿ) / ((1 + r)ⁿ - 1)
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>P = Principal loan amount</li>
            <li>r = Interest rate per payment period</li>
            <li>n = Total number of payments</li>
          </ul>
          
          <p className="mb-4">
            The calculator first determines your loan amount:
          </p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            Loan Amount = (Car Price + Sales Tax) - Down Payment - Trade-in Value
          </div>
          <p className="mb-2">With sales tax calculated as:</p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            Sales Tax = (Car Price - Trade-in Value) × Tax Rate
          </div>
        </div>
      }
      faq={[
        {
          question: "How does the down payment affect my auto loan?",
          answer: "A larger down payment reduces your loan amount, which lowers your monthly payment, reduces the total interest paid over the life of the loan, and may help you qualify for better interest rates. It can also help avoid being 'underwater' on your loan (owing more than the car is worth)."
        },
        {
          question: "Should I choose a longer or shorter loan term?",
          answer: "A longer term (60-72 months) means lower monthly payments but higher overall interest costs. A shorter term (36-48 months) means higher monthly payments but less total interest and you'll build equity faster. Choose based on what fits your budget and financial goals."
        },
        {
          question: "How does my credit score affect my auto loan?",
          answer: "Your credit score significantly impacts the interest rate you're offered. Borrowers with excellent credit (740+) often receive rates several percentage points lower than those with poor credit, potentially saving thousands over the life of the loan."
        },
        {
          question: "Is it better to finance through a dealer or a bank?",
          answer: "It's best to shop around. Dealerships offer convenience but may charge higher rates. Banks, credit unions, and online lenders often have competitive rates. Get pre-approved before shopping to strengthen your negotiating position and ensure you're getting the best rate."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Auto Loan Calculator",
        "description": "Calculate your monthly car payment, total interest paid, and the true cost of your auto loan.",
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
            <Label htmlFor="carPrice">Car Price ($)</Label>
            <Input
              id="carPrice"
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              min="1000"
              step="500"
            />
            <Slider
              value={[carPrice]}
              min={1000}
              max={100000}
              step={1000}
              className="mt-2"
              onValueChange={(value) => setCarPrice(value[0])}
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
              max={carPrice / 2}
              step={500}
              className="mt-2"
              onValueChange={(value) => setDownPayment(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradeInValue">Trade-in Value ($)</Label>
            <Input
              id="tradeInValue"
              type="number"
              value={tradeInValue}
              onChange={(e) => setTradeInValue(Number(e.target.value))}
              min="0"
              step="500"
            />
            <Slider
              value={[tradeInValue]}
              min={0}
              max={carPrice / 2}
              step={500}
              className="mt-2"
              onValueChange={(value) => setTradeInValue(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (months)</Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              min="12"
              max="84"
              step="12"
            />
            <Slider
              value={[loanTerm]}
              min={12}
              max={84}
              step={12}
              className="mt-2"
              onValueChange={(value) => setLoanTerm(value[0])}
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
              max="36"
              step="0.1"
            />
            <Slider
              value={[interestRate]}
              min={0}
              max={20}
              step={0.1}
              className="mt-2"
              onValueChange={(value) => setInterestRate(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentFrequency">Payment Frequency</Label>
            <RadioGroup 
              value={paymentFrequency}
              onValueChange={setPaymentFrequency}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biweekly" id="biweekly" />
                <Label htmlFor="biweekly">Biweekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salesTaxRate">Sales Tax Rate (%)</Label>
            <Input
              id="salesTaxRate"
              type="number"
              value={salesTaxRate}
              onChange={(e) => setSalesTaxRate(Number(e.target.value))}
              min="0"
              max="20"
              step="0.1"
            />
          </div>

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate Auto Loan
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <ResultDisplay
              label={`${results.paymentFrequencyText.charAt(0).toUpperCase() + results.paymentFrequencyText.slice(1)} Payment`}
              value={`$${parseFloat(results.paymentAmount).toLocaleString()}`}
              icon={<BanknoteIcon className="h-5 w-5" />}
              isHighlighted={true}
            />
            <ResultDisplay
              label="Loan Amount"
              value={`$${parseFloat(results.loanAmount).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Interest Paid"
              value={`$${parseFloat(results.totalInterest).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
          </div>

          {calculationDone && (
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium mb-4">Auto Loan Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Car Price</p>
                    <p className="text-lg font-medium">${carPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sales Tax</p>
                    <p className="text-lg font-medium">${parseFloat(results.salesTax).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Down Payment</p>
                    <p className="text-lg font-medium">${downPayment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Trade-in Value</p>
                    <p className="text-lg font-medium">${tradeInValue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                  <p className="text-lg font-medium">${parseFloat(results.loanAmount).toLocaleString()}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-lg font-medium">{interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Term</p>
                    <p className="text-lg font-medium">{loanTerm} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Frequency</p>
                    <p className="text-lg font-medium">{results.paymentFrequencyText.charAt(0).toUpperCase() + results.paymentFrequencyText.slice(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Payments</p>
                    <p className="text-lg font-medium">{results.numberOfPayments}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{`${results.paymentFrequencyText.charAt(0).toUpperCase() + results.paymentFrequencyText.slice(1)} Payment`}</p>
                    <p className="text-xl font-bold text-primary">${parseFloat(results.paymentAmount).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-xl font-bold">${parseFloat(results.totalCost).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                  <p className="text-lg font-medium">${parseFloat(results.totalInterest).toLocaleString()}</p>
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
