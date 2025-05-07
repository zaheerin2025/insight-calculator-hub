
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ResultDisplay from '../ResultDisplay';
import { Home, DollarSign, Calculator } from 'lucide-react';
import { toast } from 'sonner';

const HomeAffordabilityCalculator: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(80000);
  const [monthlyDebt, setMonthlyDebt] = useState<number>(500);
  const [downPayment, setDownPayment] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [insuranceRate, setInsuranceRate] = useState<number>(0.5);
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate home affordability
  const results = useMemo(() => {
    // Convert annual income to monthly income
    const monthlyIncome = annualIncome / 12;
    
    // Calculate maximum monthly payment with 28% front-end ratio
    // (housing expenses should be no more than 28% of monthly income)
    const maxMonthlyPayment28 = monthlyIncome * 0.28;
    
    // Calculate maximum monthly payment with 36% back-end ratio
    // (total debt including housing should be no more than 36% of monthly income)
    const maxMonthlyPayment36 = (monthlyIncome * 0.36) - monthlyDebt;
    
    // Use the lower of the two maximum payments
    const maxMonthlyPayment = Math.min(maxMonthlyPayment28, maxMonthlyPayment36);
    
    // Calculate maximum loan amount (excluding taxes and insurance)
    // Using formula: P = PMT * ((1 - (1 + r)^-n) / r)
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Portion of max payment available for principal and interest
    // (assuming property tax and insurance take up part of the payment)
    const availableForPrincipalAndInterest = maxMonthlyPayment * 0.7; // rough estimate
    
    // Calculate maximum loan amount based on available payment for P&I
    const maxLoanAmount = availableForPrincipalAndInterest * 
      ((1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)) / monthlyInterestRate);
    
    // Calculate maximum home price (loan amount + down payment)
    const maxHomePrice = maxLoanAmount + downPayment;
    
    // Calculate monthly principal and interest payment for max home price
    const loanAmount = maxHomePrice - downPayment;
    const monthlyPI = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    // Calculate monthly property tax
    const monthlyPropertyTax = (maxHomePrice * (propertyTaxRate / 100)) / 12;
    
    // Calculate monthly insurance
    const monthlyInsurance = (maxHomePrice * (insuranceRate / 100)) / 12;
    
    // Calculate total PITI payment (Principal, Interest, Taxes, Insurance)
    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance;
    
    return {
      maxHomePrice: maxHomePrice.toFixed(0),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
      monthlyPrincipalAndInterest: monthlyPI.toFixed(2),
      monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2),
      loanAmount: loanAmount.toFixed(0),
      downPaymentPercentage: ((downPayment / maxHomePrice) * 100).toFixed(1)
    };
  }, [annualIncome, monthlyDebt, downPayment, interestRate, loanTerm, propertyTaxRate, insuranceRate]);

  // Handle calculate button click
  const handleCalculate = () => {
    setCalculationDone(true);
    toast.success("Home affordability calculated successfully");
  };

  const relatedCalculators = [
    {
      title: "Mortgage Calculator",
      path: "/calculators/finance/mortgage-calculator",
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
      title="Home Affordability Calculator"
      description="Estimate how much home you can afford based on your income, expenses, and down payment."
      intro="Use our home affordability calculator to get an estimate of how much house you can afford based on your income, debt, and down payment."
      canonicalUrl="https://calculators-hub.com/calculators/finance/home-affordability-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            Our home affordability calculator uses these key principles:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Front-end ratio:</strong> Housing expenses should not exceed 28% of your gross monthly income</li>
            <li><strong>Back-end ratio:</strong> Total debt payments (including housing) should not exceed 36% of your gross monthly income</li>
          </ul>
          
          <p className="mb-2">The maximum mortgage amount is calculated using:</p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            P = PMT × ((1 - (1 + r)^-n) / r)
          </div>
          <p className="mb-2">Where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>P = Maximum loan amount</li>
            <li>PMT = Maximum affordable monthly payment</li>
            <li>r = Monthly interest rate (annual rate ÷ 12)</li>
            <li>n = Total number of payments (years × 12)</li>
          </ul>
          
          <p className="mt-4">
            The calculator also factors in property taxes and insurance costs to give a complete picture of homeownership expenses.
          </p>
        </div>
      }
      faq={[
        {
          question: "How much house can I afford with my salary?",
          answer: "A common rule of thumb is that you can afford a house that costs 2.5 to 3 times your annual income. However, this varies based on your debt, credit score, down payment, and current interest rates. Our calculator provides a more accurate estimate based on these factors."
        },
        {
          question: "What is the 28/36 rule for home affordability?",
          answer: "The 28/36 rule suggests that you should spend no more than 28% of your gross monthly income on housing expenses and no more than 36% on total debt (including housing). Lenders often use these ratios to determine how much they're willing to lend."
        },
        {
          question: "How does my down payment affect home affordability?",
          answer: "A larger down payment increases the price of home you can afford, reduces your loan amount, may help you qualify for better interest rates, and can eliminate the need for private mortgage insurance (PMI) if it's 20% or more of the purchase price."
        },
        {
          question: "What other costs should I consider beyond the mortgage payment?",
          answer: "Beyond your mortgage principal and interest, you should budget for property taxes, homeowners insurance, possibly PMI, HOA fees (if applicable), utilities, maintenance (about 1% of home value annually), and repairs. These expenses can significantly impact your overall housing budget."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Home Affordability Calculator",
        "description": "Estimate how much home you can afford based on your income, expenses, and down payment.",
        "url": "https://calculators-hub.com/calculators/finance/home-affordability-calculator",
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
            <Label htmlFor="annualIncome">Annual Income ($)</Label>
            <Input
              id="annualIncome"
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              min="20000"
              step="1000"
            />
            <Slider
              value={[annualIncome]}
              min={20000}
              max={500000}
              step={5000}
              className="mt-2"
              onValueChange={(value) => setAnnualIncome(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyDebt">Monthly Debt Payments ($)</Label>
            <Input
              id="monthlyDebt"
              type="number"
              value={monthlyDebt}
              onChange={(e) => setMonthlyDebt(Number(e.target.value))}
              min="0"
              step="50"
            />
            <Slider
              value={[monthlyDebt]}
              min={0}
              max={10000}
              step={100}
              className="mt-2"
              onValueChange={(value) => setMonthlyDebt(value[0])}
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
              max={200000}
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
              min="0.1"
              max="15"
              step="0.1"
            />
            <Slider
              value={[interestRate]}
              min={1}
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
              min="10"
              max="30"
              step="5"
            />
            <Slider
              value={[loanTerm]}
              min={10}
              max={30}
              step={5}
              className="mt-2"
              onValueChange={(value) => setLoanTerm(value[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyTaxRate">Property Tax Rate (% of home value/year)</Label>
              <Input
                id="propertyTaxRate"
                type="number"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceRate">Insurance Rate (% of home value/year)</Label>
              <Input
                id="insuranceRate"
                type="number"
                value={insuranceRate}
                onChange={(e) => setInsuranceRate(Number(e.target.value))}
                min="0"
                max="2"
                step="0.1"
              />
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate Home Affordability
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <ResultDisplay
              label="Maximum Home Price"
              value={`$${parseFloat(results.maxHomePrice).toLocaleString()}`}
              icon={<Home className="h-5 w-5" />}
              isHighlighted={true}
            />
            <ResultDisplay
              label="Monthly Payment (PITI)"
              value={`$${parseFloat(results.totalMonthlyPayment).toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Required Loan Amount"
              value={`$${parseFloat(results.loanAmount).toLocaleString()}`}
              icon={<Calculator className="h-5 w-5" />}
            />
          </div>

          {calculationDone && (
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium mb-4">Affordability Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Maximum Home Price</p>
                  <p className="text-xl font-bold text-primary">${parseFloat(results.maxHomePrice).toLocaleString()}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Down Payment</p>
                    <p className="text-lg font-medium">${downPayment.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">({results.downPaymentPercentage}%)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="text-lg font-medium">${parseFloat(results.loanAmount).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Monthly Payment Breakdown:</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Principal & Interest</p>
                      <p className="text-md">${parseFloat(results.monthlyPrincipalAndInterest).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Property Tax</p>
                      <p className="text-md">${parseFloat(results.monthlyPropertyTax).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Insurance</p>
                      <p className="text-md">${parseFloat(results.monthlyInsurance).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Monthly</p>
                      <p className="text-md font-medium">${parseFloat(results.totalMonthlyPayment).toLocaleString()}</p>
                    </div>
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

export default HomeAffordabilityCalculator;
