
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ResultDisplay from '../ResultDisplay';
import { CreditCard, Calculator, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const CreditCardPayoffCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(18);
  const [paymentType, setPaymentType] = useState<string>("fixed");
  const [monthlyPayment, setMonthlyPayment] = useState<number>(200);
  const [desiredMonths, setDesiredMonths] = useState<number>(24);
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate credit card payoff information
  const results = useMemo(() => {
    const monthlyInterestRate = interestRate / 100 / 12;
    
    if (paymentType === "fixed") {
      // Calculate time to pay off with fixed payment
      // Using the formula: n = -log(1 - r * B/P) / log(1 + r)
      const numerator = -Math.log(1 - monthlyInterestRate * balance / monthlyPayment);
      const denominator = Math.log(1 + monthlyInterestRate);
      
      // Check if payment is enough to cover interest
      const minimumPayment = balance * monthlyInterestRate;
      if (monthlyPayment <= minimumPayment) {
        return {
          timeToPayOff: "Never (payment too low)",
          totalInterest: "N/A",
          totalPayment: "N/A",
          requiredPayment: "N/A",
          valid: false
        };
      }
      
      const months = Math.ceil(numerator / denominator);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - balance;
      
      return {
        timeToPayOff: months,
        totalInterest: totalInterest.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        requiredPayment: monthlyPayment.toFixed(2),
        valid: true
      };
    } else {
      // Calculate payment required to pay off in desired time
      // Using the formula: P = r * B / (1 - (1 + r)^-n)
      const numerator = monthlyInterestRate * balance;
      const denominator = 1 - Math.pow(1 + monthlyInterestRate, -desiredMonths);
      const requiredPayment = numerator / denominator;
      
      const totalPayment = requiredPayment * desiredMonths;
      const totalInterest = totalPayment - balance;
      
      return {
        timeToPayOff: desiredMonths,
        totalInterest: totalInterest.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        requiredPayment: requiredPayment.toFixed(2),
        valid: true
      };
    }
  }, [balance, interestRate, paymentType, monthlyPayment, desiredMonths]);

  // Handle calculate button click
  const handleCalculate = () => {
    if (results.valid) {
      setCalculationDone(true);
      toast.success("Credit card payoff plan calculated");
    } else {
      toast.error("Monthly payment is too low to pay off the balance");
    }
  };

  const relatedCalculators = [
    {
      title: "Debt-to-Income Ratio Calculator",
      path: "/calculators/finance/debt-to-income-calculator",
      category: "Finance"
    },
    {
      title: "Loan EMI Calculator",
      path: "/calculators/finance/loan-emi-calculator",
      category: "Finance"
    }
  ];

  return (
    <CalculatorLayout
      title="Credit Card Payoff Calculator"
      description="Determine how long it will take to pay off your credit card debt and how much interest you'll pay."
      intro="Use our credit card payoff calculator to see how quickly you can get out of debt and how much interest you'll save by increasing your monthly payments."
      canonicalUrl="https://calculators-hub.com/calculators/finance/credit-card-payoff-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            The credit card payoff calculator uses these formulas:
          </p>
          <p className="mb-2">To calculate time to payoff with fixed payment:</p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            n = -log(1 - r * B/P) / log(1 + r)
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>n = Number of months to pay off</li>
            <li>r = Monthly interest rate (annual rate ÷ 12)</li>
            <li>B = Credit card balance</li>
            <li>P = Monthly payment</li>
          </ul>
          
          <p className="mb-2">To calculate payment required for desired payoff time:</p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            P = r * B / (1 - (1 + r)^-n)
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>P = Required monthly payment</li>
            <li>r = Monthly interest rate (annual rate ÷ 12)</li>
            <li>B = Credit card balance</li>
            <li>n = Desired number of months to pay off</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "How can I pay off my credit card debt faster?",
          answer: "To pay off credit card debt faster, increase your monthly payment amount, avoid adding new charges to the card, consider balance transfer options with lower interest rates, and prioritize paying off the highest interest rate cards first (debt avalanche method)."
        },
        {
          question: "What is the minimum payment on a credit card?",
          answer: "The minimum payment is typically 1-3% of your balance or a fixed amount (often $25-$35), whichever is greater. Paying only the minimum will extend your payoff time significantly and result in much higher interest costs."
        },
        {
          question: "How does credit card interest work?",
          answer: "Credit card interest is typically calculated daily based on your average daily balance. The interest rate (APR) is divided by 365 to get a daily rate, which is multiplied by your balance each day. These daily interest charges are then added up for your monthly statement."
        },
        {
          question: "Is it better to make multiple smaller payments or one larger payment?",
          answer: "Making multiple smaller payments throughout the month can actually save you money because credit card interest is typically calculated based on your average daily balance. However, the total amount paid each month is still the most important factor in reducing debt."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Credit Card Payoff Calculator",
        "description": "Determine how long it will take to pay off your credit card debt and how much interest you'll pay.",
        "url": "https://calculators-hub.com/calculators/finance/credit-card-payoff-calculator",
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
            <Label htmlFor="balance">Credit Card Balance ($)</Label>
            <Input
              id="balance"
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              min="100"
              step="100"
            />
            <Slider
              value={[balance]}
              min={100}
              max={50000}
              step={100}
              className="mt-2"
              onValueChange={(value) => setBalance(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
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
              max={30}
              step={0.5}
              className="mt-2"
              onValueChange={(value) => setInterestRate(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentType">I want to</Label>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Set a monthly payment amount</SelectItem>
                <SelectItem value="time">Pay off in a specific time period</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentType === "fixed" ? (
            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
              <Input
                id="monthlyPayment"
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                min="1"
                step="10"
              />
              <Slider
                value={[monthlyPayment]}
                min={10}
                max={balance}
                step={10}
                className="mt-2"
                onValueChange={(value) => setMonthlyPayment(value[0])}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="desiredMonths">Months to Pay Off</Label>
              <Input
                id="desiredMonths"
                type="number"
                value={desiredMonths}
                onChange={(e) => setDesiredMonths(Number(e.target.value))}
                min="1"
                max="120"
                step="1"
              />
              <Slider
                value={[desiredMonths]}
                min={1}
                max={60}
                step={1}
                className="mt-2"
                onValueChange={(value) => setDesiredMonths(value[0])}
              />
            </div>
          )}

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate Payoff Plan
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            {paymentType === "fixed" ? (
              <ResultDisplay
                label="Time to Pay Off"
                value={typeof results.timeToPayOff === "number" ? 
                  `${results.timeToPayOff} ${results.timeToPayOff === 1 ? 'month' : 'months'}` : 
                  results.timeToPayOff}
                icon={<Calendar className="h-5 w-5" />}
                isHighlighted={true}
              />
            ) : (
              <ResultDisplay
                label="Required Monthly Payment"
                value={`$${parseFloat(results.requiredPayment).toLocaleString()}`}
                icon={<CreditCard className="h-5 w-5" />}
                isHighlighted={true}
              />
            )}
            <ResultDisplay
              label="Total Interest"
              value={results.valid ? `$${parseFloat(results.totalInterest).toLocaleString()}` : "N/A"}
              icon={<Calculator className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Payment"
              value={results.valid ? `$${parseFloat(results.totalPayment).toLocaleString()}` : "N/A"}
              icon={<Calculator className="h-5 w-5" />}
            />
          </div>

          {calculationDone && (
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium mb-4">Payoff Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Credit Card Balance</p>
                  <p className="text-lg font-medium">${balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Interest Rate</p>
                  <p className="text-lg font-medium">{interestRate}%</p>
                </div>
                {paymentType === "fixed" ? (
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="text-lg font-medium">${monthlyPayment.toLocaleString()}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">Time to Pay Off</p>
                    <p className="text-lg font-medium">{desiredMonths} months</p>
                  </div>
                )}
                <div className="pt-4 border-t">
                  {paymentType === "fixed" ? (
                    <>
                      <p className="text-sm text-muted-foreground">With ${monthlyPayment}/month, you'll pay off this debt in:</p>
                      <p className="text-xl font-bold text-primary">{results.timeToPayOff} months</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">To pay off in {desiredMonths} months, you need to pay:</p>
                      <p className="text-xl font-bold text-primary">${parseFloat(results.requiredPayment).toLocaleString()}/month</p>
                    </>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">Total interest paid:</p>
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

export default CreditCardPayoffCalculator;
