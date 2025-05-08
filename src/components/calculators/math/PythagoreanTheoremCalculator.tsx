
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator } from 'lucide-react';

const PythagoreanTheoremCalculator: React.FC = () => {
  // Tab 1: Find Hypotenuse (c)
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);
  const [hypotenuse, setHypotenuse] = useState<number | null>(null);
  
  // Tab 2: Find Side A
  const [hypotenuseC, setHypotenuseC] = useState<number>(5);
  const [sideB2, setSideB2] = useState<number>(4);
  const [sideAResult, setSideAResult] = useState<number | null>(null);
  
  // Tab 3: Find Side B
  const [hypotenuseC2, setHypotenuseC2] = useState<number>(5);
  const [sideA2, setSideA2] = useState<number>(3);
  const [sideBResult, setSideBResult] = useState<number | null>(null);
  
  // Calculate hypotenuse
  const calculateHypotenuse = () => {
    try {
      if (isNaN(sideA) || isNaN(sideB) || sideA <= 0 || sideB <= 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const result = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
      setHypotenuse(result);
      toast.success('Hypotenuse calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate side A
  const calculateSideA = () => {
    try {
      if (isNaN(hypotenuseC) || isNaN(sideB2) || hypotenuseC <= 0 || sideB2 <= 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      if (hypotenuseC <= sideB2) {
        toast.error('Hypotenuse must be greater than side B');
        return;
      }
      
      const result = Math.sqrt(Math.pow(hypotenuseC, 2) - Math.pow(sideB2, 2));
      setSideAResult(result);
      toast.success('Side A calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate side B
  const calculateSideB = () => {
    try {
      if (isNaN(hypotenuseC2) || isNaN(sideA2) || hypotenuseC2 <= 0 || sideA2 <= 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      if (hypotenuseC2 <= sideA2) {
        toast.error('Hypotenuse must be greater than side A');
        return;
      }
      
      const result = Math.sqrt(Math.pow(hypotenuseC2, 2) - Math.pow(sideA2, 2));
      setSideBResult(result);
      toast.success('Side B calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pythagorean Theorem Calculator",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };

  return (
    <CalculatorLayout
      title="Pythagorean Theorem Calculator"
      description="Calculate the sides of a right triangle using the Pythagorean theorem: a² + b² = c²"
      intro="Our Pythagorean theorem calculator helps you find the length of any side of a right triangle. Perfect for students, engineers, and anyone working with right triangles."
      formula={
        <div>
          <p>The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <code>a² + b² = c²</code>
            <p className="mt-3">Where:</p>
            <p>a and b are the lengths of the two legs (the sides that form the right angle)</p>
            <p>c is the length of the hypotenuse (the side opposite to the right angle)</p>
            <p className="mt-3">From this formula, we can derive:</p>
            <p>c = √(a² + b²)</p>
            <p>a = √(c² - b²)</p>
            <p>b = √(c² - a²)</p>
          </div>
        </div>
      }
      faq={[
        {
          question: "What is the Pythagorean theorem?",
          answer: "The Pythagorean theorem is a fundamental relation in Euclidean geometry that states that in a right triangle, the square of the length of the hypotenuse (the side opposite the right angle) equals the sum of squares of the other two sides."
        },
        {
          question: "How accurate is this calculator?",
          answer: "This calculator provides results with high precision. However, due to the nature of floating-point calculations in computers, there might be tiny rounding errors in some cases."
        },
        {
          question: "Can this theorem work for non-right triangles?",
          answer: "No, the Pythagorean theorem only applies to right triangles (triangles that have one angle of exactly 90 degrees)."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/math/pythagorean-theorem-calculator"
    >
      <Tabs defaultValue="hypotenuse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hypotenuse">Find Hypotenuse (c)</TabsTrigger>
          <TabsTrigger value="side-a">Find Side a</TabsTrigger>
          <TabsTrigger value="side-b">Find Side b</TabsTrigger>
        </TabsList>
        
        {/* Find Hypotenuse Tab */}
        <TabsContent value="hypotenuse" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="side-a"
                label="Side a"
                type="number"
                value={sideA}
                onChange={(value) => setSideA(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the length of side a"
              />
              
              <CalculatorInput
                id="side-b"
                label="Side b"
                type="number"
                value={sideB}
                onChange={(value) => setSideB(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the length of side b"
              />
              
              <Button 
                onClick={calculateHypotenuse}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate Hypotenuse
              </Button>
            </div>
            
            <div>
              {hypotenuse !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Result</h3>
                    
                    <ResultDisplay
                      label="Hypotenuse (c)"
                      value={`${hypotenuse.toFixed(4)}`}
                      icon={<Calculator className="h-5 w-5" />}
                      isHighlighted={true}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Using the formula: c = √(a² + b²)</p>
                      <p className="mt-2">c = √({sideA}² + {sideB}²) = √({(Math.pow(sideA, 2) + Math.pow(sideB, 2)).toFixed(2)}) = {hypotenuse.toFixed(4)}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Find Side A Tab */}
        <TabsContent value="side-a" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="hypotenuse-c"
                label="Hypotenuse (c)"
                type="number"
                value={hypotenuseC}
                onChange={(value) => setHypotenuseC(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the length of the hypotenuse"
              />
              
              <CalculatorInput
                id="side-b2"
                label="Side b"
                type="number"
                value={sideB2}
                onChange={(value) => setSideB2(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the length of side b"
              />
              
              <Button 
                onClick={calculateSideA}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate Side a
              </Button>
            </div>
            
            <div>
              {sideAResult !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Result</h3>
                    
                    <ResultDisplay
                      label="Side a"
                      value={`${sideAResult.toFixed(4)}`}
                      icon={<Calculator className="h-5 w-5" />}
                      isHighlighted={true}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Using the formula: a = √(c² - b²)</p>
                      <p className="mt-2">a = √({hypotenuseC}² - {sideB2}²) = √({(Math.pow(hypotenuseC, 2) - Math.pow(sideB2, 2)).toFixed(2)}) = {sideAResult.toFixed(4)}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Find Side B Tab */}
        <TabsContent value="side-b" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="hypotenuse-c2"
                label="Hypotenuse (c)"
                type="number"
                value={hypotenuseC2}
                onChange={(value) => setHypotenuseC2(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the length of the hypotenuse"
              />
              
              <CalculatorInput
                id="side-a2"
                label="Side a"
                type="number"
                value={sideA2}
                onChange={(value) => setSideA2(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the length of side a"
              />
              
              <Button 
                onClick={calculateSideB}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate Side b
              </Button>
            </div>
            
            <div>
              {sideBResult !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Result</h3>
                    
                    <ResultDisplay
                      label="Side b"
                      value={`${sideBResult.toFixed(4)}`}
                      icon={<Calculator className="h-5 w-5" />}
                      isHighlighted={true}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Using the formula: b = √(c² - a²)</p>
                      <p className="mt-2">b = √({hypotenuseC2}² - {sideA2}²) = √({(Math.pow(hypotenuseC2, 2) - Math.pow(sideA2, 2)).toFixed(2)}) = {sideBResult.toFixed(4)}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
};

export default PythagoreanTheoremCalculator;
