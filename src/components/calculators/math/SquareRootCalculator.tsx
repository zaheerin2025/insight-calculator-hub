
import React, { useState } from 'react';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import ResultDisplay from '@/components/calculators/ResultDisplay';
import { Square, SquareRoot } from 'lucide-react';

const SquareRootCalculator: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [squareRoot, setSquareRoot] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateSquareRoot = () => {
    if (number >= 0) {
      const result = Math.sqrt(number);
      setSquareRoot(result);
      setIsCalculated(true);
    } else {
      // For negative numbers, we don't calculate (could show an error message)
      setSquareRoot(null);
      setIsCalculated(false);
    }
  };

  return (
    <CalculatorLayout
      title="Square Root Calculator"
      description="Calculate the square root of any positive number with precision."
      intro="Our square root calculator lets you find the square root of any positive number with high precision. Simply enter a number and get its exact square root value."
      formula={
        <>
          <p>The square root of a number x is a value r such that r² = x, or in other words, r is the number that when multiplied by itself gives x.</p>
          <p className="mt-2">Mathematically, if r is the square root of x, then:</p>
          <p className="mt-2 p-2 bg-muted/50 font-mono text-center">r = √x, where r² = x</p>
          <p className="mt-2">For example, the square root of 25 is 5, because 5² = 5 × 5 = 25.</p>
        </>
      }
      faq={[
        {
          question: "What is a square root?",
          answer: "A square root of a number is a value that, when multiplied by itself, gives the original number. For example, the square root of 9 is 3, because 3² = 9."
        },
        {
          question: "Can I calculate the square root of a negative number?",
          answer: "In the realm of real numbers, negative numbers don't have square roots. However, in complex numbers, negative numbers do have square roots involving the imaginary unit i. This calculator only handles real square roots of positive numbers."
        },
        {
          question: "How accurate is this square root calculator?",
          answer: "This calculator uses JavaScript's built-in Math.sqrt() function, which provides high-precision square root calculations suitable for most purposes."
        }
      ]}
      relatedCalculators={[
        {
          title: "Pythagorean Theorem Calculator",
          path: "/calculators/math/pythagorean-theorem-calculator"
        },
        {
          title: "Area Calculator",
          path: "/calculators/math/area-calculator"
        }
      ]}
    >
      <div className="space-y-6">
        <CalculatorInput 
          id="number"
          label="Number"
          type="number"
          value={number}
          onChange={(value) => setNumber(parseFloat(value) || 0)}
          placeholder="Enter a positive number"
          min={0}
        />

        <Button 
          onClick={calculateSquareRoot} 
          className="w-full"
        >
          <SquareRoot className="mr-2" />
          Calculate Square Root
        </Button>

        {isCalculated && squareRoot !== null && (
          <div className="mt-6 space-y-4">
            <ResultDisplay
              label="Square Root"
              value={squareRoot.toFixed(6)}
              icon={<SquareRoot className="h-5 w-5 text-primary" />}
              isHighlighted
            />
            
            <ResultDisplay
              label="Original Number"
              value={number}
              icon={<Square className="h-5 w-5 text-primary" />}
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default SquareRootCalculator;
