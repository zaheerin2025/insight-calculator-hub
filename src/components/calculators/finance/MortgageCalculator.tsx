
import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateMortgage = () => {
    try {
      if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
        toast.error('Please enter valid values for all fields');
        return;
      }

      // Convert annual interest rate to monthly and decimal
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;

      // Calculate monthly payment using the formula:
      // P = L[c(1 + c)^n]/[(1 + c)^n - 1]
      // where P = payment, L = loan amount, c = monthly interest rate, n = number of payments
      const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const monthly = (loanAmount * monthlyInterestRate * x) / (x - 1);

      if (isNaN(monthly) || !isFinite(monthly)) {
        toast.error('Calculation failed. Please check your inputs.');
        return;
      }

      setMonthlyPayment(monthly);
      setTotalPayment(monthly * numberOfPayments);
      setTotalInterest(monthly * numberOfPayments - loanAmount);
      setIsCalculated(true);
      toast.success('Mortgage calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  const handleLoanAmountChange = (value: string) => {
    const amount = parseFloat(value.replace(/,/g, ''));
    setLoanAmount(isNaN(amount) ? 0 : amount);
    setIsCalculated(false);
  };

  const handleInterestRateChange = (value: string) => {
    const rate = parseFloat(value);
    setInterestRate(isNaN(rate) ? 0 : rate);
    setIsCalculated(false);
  };

  const handleLoanTermChange = (value: string) => {
    const term = parseInt(value);
    setLoanTerm(isNaN(term) ? 0 : term);
    setIsCalculated(false);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Mortgage Calculator",
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
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment, total payment, and total interest paid based on loan amount, interest rate, and loan term."
      intro="Our mortgage calculator helps you estimate your monthly mortgage payment and understand the total cost of your loan over time. Enter your loan details below to see your potential mortgage payments."
      formula={
        <div>
          <p>The mortgage calculator uses the following formula to calculate your monthly payment:</p>
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <code>Monthly Payment = P × [r(1 + r)^n] ÷ [(1 + r)^n - 1]</code>
          </div>
          <p>Where:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>P</strong> = Principal loan amount</li>
            <li><strong>r</strong> = Monthly interest rate (annual rate divided by 12 and then by 100)</li>
            <li><strong>n</strong> = Total number of payments (loan term in years multiplied by 12)</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "How accurate is this mortgage calculator?",
          answer: "This calculator provides an estimate of your monthly mortgage payment based on the information you provide. The actual payment may vary slightly due to factors such as rounding, additional fees, or specific lender requirements."
        },
        {
          question: "Does this calculator include property taxes and insurance?",
          answer: "No, this calculator only estimates your principal and interest payment. To get your total monthly payment, you should add property taxes, homeowner's insurance, and mortgage insurance (if applicable)."
        },
        {
          question: "How does the loan term affect my mortgage?",
          answer: "A longer loan term (such as 30 years) results in lower monthly payments but higher total interest paid over the life of the loan. A shorter term (such as 15 years) means higher monthly payments but significant savings on total interest."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://example.com/calculators/finance/mortgage-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalculatorInput
            id="loan-amount"
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            prefix="$"
            min={1000}
            step={1000}
            helperText="Enter the total loan amount"
          />
          
          <CalculatorInput
            id="interest-rate"
            label="Interest Rate"
            type="number"
            value={interestRate}
            onChange={handleInterestRateChange}
            suffix="%"
            min={0.1}
            max={20}
            step={0.125}
            helperText="Annual interest rate"
          />
          
          <CalculatorInput
            id="loan-term"
            label="Loan Term"
            type="number"
            value={loanTerm}
            onChange={handleLoanTermChange}
            suffix="years"
            min={1}
            max={50}
            step={1}
            helperText="Length of your mortgage"
          />
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateMortgage}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate Mortgage
          </Button>
        </div>
        
        {isCalculated && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultDisplay
                title="Monthly Payment"
                value={formatCurrency(monthlyPayment)}
                highlight={true}
              />
              <ResultDisplay
                title="Total Payment"
                value={formatCurrency(totalPayment)}
                description={`Over ${loanTerm} years`}
              />
              <ResultDisplay
                title="Total Interest"
                value={formatCurrency(totalInterest)}
                description="Interest paid over loan term"
              />
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default MortgageCalculator;
