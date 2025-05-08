
import React, { useState } from 'react';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import ResultDisplay from '@/components/calculators/ResultDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Divide, Equal, Minus, Plus } from 'lucide-react';

const FractionsCalculator: React.FC = () => {
  const [numerator1, setNumerator1] = useState<number>(0);
  const [denominator1, setDenominator1] = useState<number>(1);
  const [numerator2, setNumerator2] = useState<number>(0);
  const [denominator2, setDenominator2] = useState<number>(1);
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [result, setResult] = useState<{ numerator: number; denominator: number; decimal: number } | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Function to find greatest common divisor (GCD) using Euclidean algorithm
  const findGCD = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Function to reduce a fraction to its simplest form
  const reduceFraction = (numerator: number, denominator: number) => {
    if (numerator === 0) return { numerator: 0, denominator: 1 };
    
    const gcd = findGCD(numerator, denominator);
    let simplifiedNumerator = numerator / gcd;
    let simplifiedDenominator = denominator / gcd;
    
    // If denominator is negative, shift the negative sign to numerator
    if (simplifiedDenominator < 0) {
      simplifiedNumerator = -simplifiedNumerator;
      simplifiedDenominator = -simplifiedDenominator;
    }
    
    return {
      numerator: simplifiedNumerator,
      denominator: simplifiedDenominator
    };
  };

  const calculateFractions = () => {
    if (denominator1 === 0 || denominator2 === 0) {
      setResult(null);
      setIsCalculated(false);
      return;
    }

    let resultNumerator = 0;
    let resultDenominator = 1;

    switch (operation) {
      case 'add':
        resultNumerator = numerator1 * denominator2 + numerator2 * denominator1;
        resultDenominator = denominator1 * denominator2;
        break;
      case 'subtract':
        resultNumerator = numerator1 * denominator2 - numerator2 * denominator1;
        resultDenominator = denominator1 * denominator2;
        break;
      case 'multiply':
        resultNumerator = numerator1 * numerator2;
        resultDenominator = denominator1 * denominator2;
        break;
      case 'divide':
        if (numerator2 === 0) {
          setResult(null);
          setIsCalculated(false);
          return;
        }
        resultNumerator = numerator1 * denominator2;
        resultDenominator = denominator1 * numerator2;
        break;
    }

    const simplified = reduceFraction(resultNumerator, resultDenominator);

    setResult({
      numerator: simplified.numerator,
      denominator: simplified.denominator,
      decimal: simplified.numerator / simplified.denominator
    });
    setIsCalculated(true);
  };

  const getOperationIcon = () => {
    switch (operation) {
      case 'add': return <Plus className="h-5 w-5" />;
      case 'subtract': return <Minus className="h-5 w-5" />;
      case 'multiply': return <Calculator className="h-5 w-5" />;
      case 'divide': return <Divide className="h-5 w-5" />;
    }
  };

  const getOperationText = () => {
    switch (operation) {
      case 'add': return 'Addition';
      case 'subtract': return 'Subtraction';
      case 'multiply': return 'Multiplication';
      case 'divide': return 'Division';
    }
  };

  return (
    <CalculatorLayout
      title="Fractions Calculator"
      description="Add, subtract, multiply, and divide fractions with step-by-step solutions."
      intro="Use our fractions calculator to perform addition, subtraction, multiplication, and division operations with fractions. Get both fractional and decimal results with simplified answers."
      formula={
        <>
          <p>Operations with fractions follow specific rules depending on the operation:</p>
          
          <h3 className="font-semibold mt-4">Addition (a/b + c/d)</h3>
          <p className="mt-1 p-2 bg-muted/50 font-mono text-center">
            a/b + c/d = (a×d + c×b)/(b×d)
          </p>
          
          <h3 className="font-semibold mt-4">Subtraction (a/b - c/d)</h3>
          <p className="mt-1 p-2 bg-muted/50 font-mono text-center">
            a/b - c/d = (a×d - c×b)/(b×d)
          </p>
          
          <h3 className="font-semibold mt-4">Multiplication (a/b × c/d)</h3>
          <p className="mt-1 p-2 bg-muted/50 font-mono text-center">
            a/b × c/d = (a×c)/(b×d)
          </p>
          
          <h3 className="font-semibold mt-4">Division (a/b ÷ c/d)</h3>
          <p className="mt-1 p-2 bg-muted/50 font-mono text-center">
            a/b ÷ c/d = (a×d)/(b×c)
          </p>
        </>
      }
      faq={[
        {
          question: "How do you add fractions?",
          answer: "To add fractions with different denominators, you need to find a common denominator first. Then convert each fraction to an equivalent fraction with the common denominator, add the numerators, and simplify the result if possible."
        },
        {
          question: "Why do you multiply the denominators when adding fractions?",
          answer: "When adding fractions with different denominators, multiplying the denominators is one way to find a common denominator. Though not always the most efficient method, it guarantees a common denominator that works. After finding the common denominator, you adjust each fraction's numerator accordingly."
        },
        {
          question: "How do you simplify fractions?",
          answer: "To simplify a fraction, find the greatest common divisor (GCD) of the numerator and denominator, then divide both by the GCD. For example, to simplify 8/12, the GCD is 4, so dividing both by 4 gives 2/3."
        },
        {
          question: "Can I divide by a fraction?",
          answer: "Yes. To divide by a fraction, you multiply by its reciprocal (the fraction flipped upside down). For example, dividing by 3/4 is the same as multiplying by 4/3."
        }
      ]}
      relatedCalculators={[
        {
          title: "Percentage Calculator",
          path: "/calculators/math/percentage-calculator"
        },
        {
          title: "Discount Calculator",
          path: "/calculators/math/discount-calculator"
        }
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">First Fraction</h3>
              <div className="space-y-4">
                <CalculatorInput 
                  id="numerator1"
                  label="Numerator"
                  type="number"
                  value={numerator1}
                  onChange={(value) => setNumerator1(parseInt(value) || 0)}
                />
                
                <div className="border-t border-muted my-2"></div>
                
                <CalculatorInput 
                  id="denominator1"
                  label="Denominator"
                  type="number"
                  value={denominator1}
                  onChange={(value) => {
                    const val = parseInt(value);
                    setDenominator1(val || 1);
                  }}
                  helperText="Cannot be zero"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Second Fraction</h3>
              <div className="space-y-4">
                <CalculatorInput 
                  id="numerator2"
                  label="Numerator"
                  type="number"
                  value={numerator2}
                  onChange={(value) => setNumerator2(parseInt(value) || 0)}
                />
                
                <div className="border-t border-muted my-2"></div>
                
                <CalculatorInput 
                  id="denominator2"
                  label="Denominator"
                  type="number"
                  value={denominator2}
                  onChange={(value) => {
                    const val = parseInt(value);
                    setDenominator2(val || 1);
                  }}
                  helperText="Cannot be zero"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button 
            variant={operation === 'add' ? 'default' : 'outline'} 
            onClick={() => setOperation('add')}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
          <Button 
            variant={operation === 'subtract' ? 'default' : 'outline'} 
            onClick={() => setOperation('subtract')}
            className="w-full"
          >
            <Minus className="mr-2 h-4 w-4" /> Subtract
          </Button>
          <Button 
            variant={operation === 'multiply' ? 'default' : 'outline'} 
            onClick={() => setOperation('multiply')}
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" /> Multiply
          </Button>
          <Button 
            variant={operation === 'divide' ? 'default' : 'outline'} 
            onClick={() => setOperation('divide')}
            className="w-full"
          >
            <Divide className="mr-2 h-4 w-4" /> Divide
          </Button>
        </div>
        
        <Button 
          onClick={calculateFractions} 
          className="w-full"
        >
          <Equal className="mr-2" />
          Calculate Result
        </Button>

        {isCalculated && result !== null && (
          <div className="mt-6 space-y-4">
            <ResultDisplay
              label={`Fraction Result (${getOperationText()})`}
              value={result.denominator === 1 ? `${result.numerator}` : `${result.numerator}/${result.denominator}`}
              icon={getOperationIcon()}
              isHighlighted
            />
            
            <ResultDisplay
              label="Decimal Value"
              value={result.decimal.toFixed(6)}
              icon={<Calculator className="h-5 w-5 text-primary" />}
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default FractionsCalculator;
