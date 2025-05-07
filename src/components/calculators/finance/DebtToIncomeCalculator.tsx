
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ResultDisplay from '../ResultDisplay';
import { Calculator, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const DebtToIncomeCalculator: React.FC = () => {
  // Income inputs
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);
  
  // Debt inputs
  const [mortgagePayment, setMortgagePayment] = useState<number>(1200);
  const [carPayment, setCarPayment] = useState<number>(300);
  const [creditCardPayment, setCreditCardPayment] = useState<number>(200);
  const [studentLoanPayment, setStudentLoanPayment] = useState<number>(250);
  const [otherDebtPayment, setOtherDebtPayment] = useState<number>(100);
  
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Calculate debt-to-income ratio
  const results = useMemo(() => {
    // Sum of all monthly debt payments
    const totalMonthlyDebt = mortgagePayment + carPayment + creditCardPayment + studentLoanPayment + otherDebtPayment;
    
    // Calculate debt-to-income ratio
    const dtiRatio = (totalMonthlyDebt / monthlyIncome) * 100;
    
    // Determine DTI status
    let dtiStatus: string;
    if (dtiRatio < 36) {
      dtiStatus = "Healthy (below 36%)";
    } else if (dtiRatio < 43) {
      dtiStatus = "Manageable (36-43%)";
    } else if (dtiRatio < 50) {
      dtiStatus = "Concerning (43-50%)";
    } else {
      dtiStatus = "Critical (above 50%)";
    }
    
    return {
      totalMonthlyDebt: totalMonthlyDebt.toFixed(2),
      dtiRatio: dtiRatio.toFixed(1),
      dtiStatus
    };
  }, [monthlyIncome, mortgagePayment, carPayment, creditCardPayment, studentLoanPayment, otherDebtPayment]);

  // Handle calculate button click
  const handleCalculate = () => {
    setCalculationDone(true);
    toast.success("Debt-to-Income ratio calculated successfully");
  };

  const relatedCalculators = [
    {
      title: "Credit Card Payoff Calculator",
      path: "/calculators/finance/credit-card-payoff-calculator",
      category: "Finance"
    },
    {
      title: "Mortgage Calculator",
      path: "/calculators/finance/mortgage-calculator",
      category: "Finance"
    },
    {
      title: "Home Affordability Calculator",
      path: "/calculators/finance/home-affordability-calculator",
      category: "Finance"
    }
  ];

  return (
    <CalculatorLayout
      title="Debt-to-Income Ratio Calculator"
      description="Calculate your debt-to-income ratio to see how lenders evaluate your financial health."
      intro="Your debt-to-income (DTI) ratio compares how much you owe each month to how much you earn. Lenders use this ratio to evaluate your borrowing risk and financial health."
      canonicalUrl="https://calculators-hub.com/calculators/finance/debt-to-income-calculator"
      relatedCalculators={relatedCalculators}
      formula={
        <div>
          <p className="mb-4">
            The debt-to-income ratio is calculated using this formula:
          </p>
          <div className="bg-muted p-4 rounded-md mb-4 font-mono text-sm overflow-auto">
            DTI Ratio (%) = (Total Monthly Debt Payments ÷ Gross Monthly Income) × 100
          </div>
          <p className="mt-4 mb-2">DTI ratio categories:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Less than 36%:</strong> Healthy - Most lenders consider this a good DTI ratio.</li>
            <li><strong>36% to 43%:</strong> Manageable - Still acceptable to many lenders, but you may want to reduce debt.</li>
            <li><strong>43% to 50%:</strong> Concerning - May be difficult to get new loans; focus on reducing debt.</li>
            <li><strong>Above 50%:</strong> Critical - Serious financial risk; immediate action recommended to reduce debt.</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "What is a good debt-to-income ratio?",
          answer: "Most financial experts and lenders consider a DTI ratio of less than 36% to be good. Mortgage lenders typically prefer a housing expense ratio (front-end DTI) of 28% or less and a total DTI (back-end DTI) of 36% or less. However, some loan programs allow higher ratios."
        },
        {
          question: "Why is my debt-to-income ratio important?",
          answer: "Your DTI ratio is a key indicator of your financial health. Lenders use it to assess your ability to manage monthly payments and repay debts. A high DTI ratio suggests you might have too much debt for your income level, which could make it difficult to get approved for loans or credit cards."
        },
        {
          question: "How can I lower my debt-to-income ratio?",
          answer: "There are two ways to lower your DTI ratio: reduce your debt or increase your income. You can reduce debt by paying off loans, refinancing to lower payments, or avoiding taking on new debt. To increase income, consider asking for a raise, getting a second job, or finding additional income sources."
        },
        {
          question: "Which debts are included in the debt-to-income ratio?",
          answer: "DTI calculations typically include mortgage or rent payments, car loans, student loans, credit card minimum payments, personal loans, child support, alimony, and other recurring debt obligations. Expenses like utilities, food, healthcare, and insurance are generally not included in the calculation."
        }
      ]}
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Debt-to-Income Ratio Calculator",
        "description": "Calculate your debt-to-income ratio to see how lenders evaluate your financial health.",
        "url": "https://calculators-hub.com/calculators/finance/debt-to-income-calculator",
        "provider": {
          "@type": "Organization",
          "name": "Calculators-Hub",
          "url": "https://calculators-hub.com"
        }
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Monthly Income</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Gross Monthly Income ($)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  min="0"
                  step="100"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Monthly Debt Payments</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mortgagePayment">Mortgage or Rent ($)</Label>
                <Input
                  id="mortgagePayment"
                  type="number"
                  value={mortgagePayment}
                  onChange={(e) => setMortgagePayment(Number(e.target.value))}
                  min="0"
                  step="50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carPayment">Auto Loan(s) ($)</Label>
                <Input
                  id="carPayment"
                  type="number"
                  value={carPayment}
                  onChange={(e) => setCarPayment(Number(e.target.value))}
                  min="0"
                  step="50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="creditCardPayment">Credit Card Minimum Payments ($)</Label>
                <Input
                  id="creditCardPayment"
                  type="number"
                  value={creditCardPayment}
                  onChange={(e) => setCreditCardPayment(Number(e.target.value))}
                  min="0"
                  step="50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studentLoanPayment">Student Loan Payments ($)</Label>
                <Input
                  id="studentLoanPayment"
                  type="number"
                  value={studentLoanPayment}
                  onChange={(e) => setStudentLoanPayment(Number(e.target.value))}
                  min="0"
                  step="50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otherDebtPayment">Other Debt Payments ($)</Label>
                <Input
                  id="otherDebtPayment"
                  type="number"
                  value={otherDebtPayment}
                  onChange={(e) => setOtherDebtPayment(Number(e.target.value))}
                  min="0"
                  step="50"
                />
              </div>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleCalculate}>
            Calculate DTI Ratio
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <ResultDisplay
              label="Debt-to-Income Ratio"
              value={`${results.dtiRatio}%`}
              icon={<Calculator className="h-5 w-5" />}
              isHighlighted={true}
            />
            <ResultDisplay
              label="DTI Status"
              value={results.dtiStatus}
              icon={<Calculator className="h-5 w-5" />}
            />
            <ResultDisplay
              label="Total Monthly Debt"
              value={`$${parseFloat(results.totalMonthlyDebt).toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5" />}
            />
          </div>

          {calculationDone && (
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium mb-4">DTI Analysis</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <p className="text-lg font-medium">${monthlyIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Monthly Debt</p>
                  <p className="text-lg font-medium">${parseFloat(results.totalMonthlyDebt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Debt-to-Income Ratio</p>
                  <p className="text-xl font-bold text-primary">{results.dtiRatio}%</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-medium">{results.dtiStatus}</p>
                  
                  {parseFloat(results.dtiRatio) < 36 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Your DTI ratio is in good shape! You should have no problems getting approved for most loans.
                    </p>
                  )}
                  
                  {parseFloat(results.dtiRatio) >= 36 && parseFloat(results.dtiRatio) < 43 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Your DTI ratio is manageable but could be improved. Consider reducing debt before taking on new loans.
                    </p>
                  )}
                  
                  {parseFloat(results.dtiRatio) >= 43 && parseFloat(results.dtiRatio) < 50 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Your DTI ratio is concerning. You may have difficulty getting approved for new loans. Focus on reducing debt.
                    </p>
                  )}
                  
                  {parseFloat(results.dtiRatio) >= 50 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Your DTI ratio is critical. You should take immediate action to reduce debt and avoid taking on any new loans.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default DebtToIncomeCalculator;
