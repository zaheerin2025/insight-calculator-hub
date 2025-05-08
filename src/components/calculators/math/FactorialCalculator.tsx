
import React, { useState } from 'react';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import ResultDisplay from '@/components/calculators/ResultDisplay';
import { Calculator } from 'lucide-react';

const FactorialCalculator: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [factorialResult, setFactorialResult] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateFactorial = () => {
    if (number < 0) {
      setFactorialResult(null);
      setIsCalculated(false);
      return;
    }

    if (number > 170) {
      setFactorialResult("Result too large to display");
      setIsCalculated(true);
      return;
    }

    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }

    setFactorialResult(result.toString());
    setIsCalculated(true);
  };

  return (
    <CalculatorLayout
      title="Factorial Calculator"
      description="Calculate the factorial of any positive integer quickly and efficiently."
      intro="Our factorial calculator lets you compute n! (n factorial) for any non-negative integer. Simply enter a number and get its factorial value instantly."
      formula={
        <>
          <p>The factorial of a non-negative integer n, denoted as n!, is the product of all positive integers less than or equal to n.</p>
          <p className="mt-2">Mathematically, for a non-negative integer n:</p>
          <p className="mt-2 p-2 bg-muted/50 font-mono text-center">n! = n × (n-1) × (n-2) × ... × 3 × 2 × 1</p>
          <p className="mt-2">For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.</p>
          <p className="mt-2">By definition, 0! = 1.</p>
        </>
      }
      faq={[
        {
          question: "What is a factorial?",
          answer: "A factorial is the product of all positive integers less than or equal to a given positive integer. It's denoted by the integer followed by an exclamation mark (!)."
        },
        {
          question: "What is 0 factorial?",
          answer: "By definition, 0! = 1. This may seem counterintuitive, but it's a mathematical convention that makes many formulas work correctly."
        },
        {
          question: "Why do factorials grow so quickly?",
          answer: "Factorials involve multiplying a series of increasing numbers together, which causes their values to grow extremely rapidly. For example, 10! is already over 3.6 million, and 20! contains 19 digits."
        },
        {
          question: "What are factorials used for?",
          answer: "Factorials are commonly used in combinatorics (to calculate permutations and combinations), probability theory, and various areas of mathematics and computer science."
        }
      ]}
      relatedCalculators={[
        {
          title: "Percentage Calculator",
          path: "/calculators/math/percentage-calculator"
        },
        {
          title: "Square Root Calculator",
          path: "/calculators/math/square-root-calculator"
        }
      ]}
    >
      <div className="space-y-6">
        <CalculatorInput 
          id="number"
          label="Number (n)"
          type="number"
          value={number}
          onChange={(value) => setNumber(parseInt(value) || 0)}
          placeholder="Enter a non-negative integer"
          min={0}
          max={170}
          helperText="Enter an integer between 0 and 170"
          step={1}
        />

        <Button 
          onClick={calculateFactorial} 
          className="w-full"
        >
          Calculate Factorial
        </Button>

        {isCalculated && factorialResult !== null && (
          <div className="mt-6">
            <ResultDisplay
              label={`Factorial of ${number} (${number}!)`}
              value={factorialResult}
              icon={<Calculator className="h-5 w-5 text-primary" />}
              isHighlighted
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default FactorialCalculator;
