
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { User, UserRound, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CalculatorLayout from '../CalculatorLayout';
import ResultDisplay from '../ResultDisplay';

const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(170);
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [gender, setGender] = useState<string>("male");
  const [frameSize, setFrameSize] = useState<string>("medium");
  const [idealWeight, setIdealWeight] = useState<number | null>(null);
  const [formula, setFormula] = useState<string>("hamwi");
  const [results, setResults] = useState<{[key: string]: number | null}>({});
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  
  // Convert height to cm for calculations
  const getHeightInCm = () => {
    if (heightUnit === "cm") return height;
    return height * 2.54; // Convert inches to cm
  };
  
  // Convert height to inches for formulas
  const getHeightInInches = () => {
    if (heightUnit === "in") return height;
    return height / 2.54; // Convert cm to inches
  };
  
  // Convert weight from kg to lbs or vice versa
  const convertWeight = (weight: number, to: string) => {
    if (to === "kg") return weight / 2.205;
    return weight * 2.205; // kg to lbs
  };

  // Format weight based on selected unit
  const formatWeight = (weight: number | null) => {
    if (weight === null) return "—";
    const formattedWeight = weightUnit === "kg" ? 
      Math.round(weight * 10) / 10 : 
      Math.round(convertWeight(weight, "lbs") * 10) / 10;
    return `${formattedWeight} ${weightUnit}`;
  };

  const calculateIdealWeight = () => {
    const heightInInches = getHeightInInches();
    const heightInCm = getHeightInCm();
    let idealWeightResults: {[key: string]: number} = {};
    
    // Calculate using all formulas
    
    // Hamwi Formula
    if (gender === "male") {
      idealWeightResults.hamwi = 48.0 + 2.7 * (heightInInches - 60);
    } else {
      idealWeightResults.hamwi = 45.5 + 2.2 * (heightInInches - 60);
    }
    
    // Devine Formula
    if (gender === "male") {
      idealWeightResults.devine = 50.0 + 2.3 * (heightInInches - 60);
    } else {
      idealWeightResults.devine = 45.5 + 2.3 * (heightInInches - 60);
    }
    
    // Robinson Formula
    if (gender === "male") {
      idealWeightResults.robinson = 52.0 + 1.9 * (heightInInches - 60);
    } else {
      idealWeightResults.robinson = 49.0 + 1.7 * (heightInInches - 60);
    }
    
    // Miller Formula
    if (gender === "male") {
      idealWeightResults.miller = 56.2 + 1.41 * (heightInInches - 60);
    } else {
      idealWeightResults.miller = 53.1 + 1.36 * (heightInInches - 60);
    }
    
    // BMI based ideal weight (BMI of 22 as midpoint of normal range)
    const bmiIdealWeight = 22 * (heightInCm/100) * (heightInCm/100);
    idealWeightResults.bmi = bmiIdealWeight;
    
    // Adjust for frame size
    let selectedWeight = idealWeightResults[formula];
    if (frameSize === "small") {
      selectedWeight = selectedWeight * 0.9;
    } else if (frameSize === "large") {
      selectedWeight = selectedWeight * 1.1;
    }
    
    // Convert to kg if needed
    if (formula !== "bmi") { // BMI formula already gives result in kg
      selectedWeight = convertWeight(selectedWeight, "kg");
    }
    
    setIdealWeight(selectedWeight);
    setResults(idealWeightResults);
  };
  
  // Calculate min/max for weight range (±10%)
  const getWeightRange = () => {
    if (idealWeight === null) return null;
    const min = Math.round(idealWeight * 0.9 * 10) / 10;
    const max = Math.round(idealWeight * 1.1 * 10) / 10;
    return { min, max };
  };
  
  const weightRange = getWeightRange();
  
  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal weight based on height, gender, frame size, and various medical formulas."
      intro="Find your ideal weight range based on your height, gender, and body frame using multiple medical formulas. This calculator helps you understand what a healthy weight might be for your specific body characteristics."
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Ideal Weight Calculator</CardTitle>
          <CardDescription>
            Calculate your ideal weight based on different methods and your body frame.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-6">
                    {/* Gender Selection */}
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={gender === "male" ? "default" : "outline"}
                          className="flex items-center justify-center gap-2 h-12"
                          onClick={() => setGender("male")}
                        >
                          <User size={18} />
                          <span>Male</span>
                        </Button>
                        <Button
                          type="button"
                          variant={gender === "female" ? "default" : "outline"}
                          className="flex items-center justify-center gap-2 h-12"
                          onClick={() => setGender("female")}
                        >
                          <UserRound size={18} />
                          <span>Female</span>
                        </Button>
                      </div>
                    </div>

                    {/* Height Input */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="height">Height</Label>
                        <span className="text-sm text-muted-foreground">
                          {height} {heightUnit}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-3">
                          <Slider 
                            id="height"
                            min={heightUnit === "cm" ? 140 : 55}
                            max={heightUnit === "cm" ? 220 : 86}
                            step={heightUnit === "cm" ? 1 : 0.5}
                            value={[height]}
                            onValueChange={(value) => setHeight(value[0])}
                          />
                        </div>
                        <Select value={heightUnit} onValueChange={setHeightUnit}>
                          <SelectTrigger>
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="in">in</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Body Frame Size */}
                    <div className="space-y-2">
                      <Label htmlFor="frame">Body Frame Size</Label>
                      <Select value={frameSize} onValueChange={setFrameSize}>
                        <SelectTrigger id="frame">
                          <SelectValue placeholder="Select frame size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Body frame size affects your ideal weight calculation. 
                        <span className="block mt-1">
                          <Info size={14} className="inline mr-1" />
                          <span>Measure your wrist circumference to determine your frame size.</span>
                        </span>
                      </p>
                    </div>
                    
                    {/* Formula Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="formula">Formula</Label>
                      <Select value={formula} onValueChange={setFormula}>
                        <SelectTrigger id="formula">
                          <SelectValue placeholder="Select formula" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hamwi">Hamwi Formula</SelectItem>
                          <SelectItem value="devine">Devine Formula</SelectItem>
                          <SelectItem value="robinson">Robinson Formula</SelectItem>
                          <SelectItem value="miller">Miller Formula</SelectItem>
                          <SelectItem value="bmi">BMI-based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Weight Unit Preference */}
                    <div className="space-y-2">
                      <Label>Weight Unit</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={weightUnit === "kg" ? "default" : "outline"}
                          onClick={() => setWeightUnit("kg")}
                        >
                          Kilograms (kg)
                        </Button>
                        <Button
                          type="button"
                          variant={weightUnit === "lbs" ? "default" : "outline"}
                          onClick={() => setWeightUnit("lbs")}
                        >
                          Pounds (lbs)
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={calculateIdealWeight}>
                      Calculate Ideal Weight
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Results Display */}
                  {idealWeight && (
                    <div className="space-y-6">
                      <ResultDisplay
                        label="Ideal Weight"
                        value={formatWeight(idealWeight)}
                        description={`Based on the ${formula.charAt(0).toUpperCase() + formula.slice(1)} formula`}
                        icon={<span className="text-2xl">⚖️</span>}
                      />
                      
                      {weightRange && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Healthy Weight Range</h4>
                          <p className="text-muted-foreground">
                            Your ideal weight range is between <strong>{formatWeight(weightRange.min)}</strong> and <strong>{formatWeight(weightRange.max)}</strong>.
                          </p>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-3">Results from all formulas:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="bg-muted p-3 rounded-lg grid grid-cols-2">
                            <span>Hamwi Formula:</span>
                            <span className="font-medium text-right">{formatWeight(results.hamwi)}</span>
                          </div>
                          <div className="bg-muted p-3 rounded-lg grid grid-cols-2">
                            <span>Devine Formula:</span>
                            <span className="font-medium text-right">{formatWeight(results.devine)}</span>
                          </div>
                          <div className="bg-muted p-3 rounded-lg grid grid-cols-2">
                            <span>Robinson Formula:</span>
                            <span className="font-medium text-right">{formatWeight(results.robinson)}</span>
                          </div>
                          <div className="bg-muted p-3 rounded-lg grid grid-cols-2">
                            <span>Miller Formula:</span>
                            <span className="font-medium text-right">{formatWeight(results.miller)}</span>
                          </div>
                          <div className="bg-muted p-3 rounded-lg grid grid-cols-2">
                            <span>BMI-based:</span>
                            <span className="font-medium text-right">{formatWeight(results.bmi)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!idealWeight && (
                    <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Enter your details</h3>
                        <p className="text-muted-foreground">
                          Fill in your information and click "Calculate" to see your ideal weight.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">About Ideal Weight</h3>
                  <p className="text-muted-foreground">
                    Ideal weight calculations are estimates of a healthy weight based on your height and frame size. 
                    These formulas were developed by medical researchers to provide guidelines for healthy weight ranges.
                  </p>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="formulas">
                    <AccordionTrigger className="text-base font-medium">
                      Formulas Explained
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-3">
                      <p className="font-medium">This calculator uses several established medical formulas:</p>
                      
                      <div>
                        <p className="font-medium">Hamwi Formula (1964)</p>
                        <ul className="list-disc list-inside pl-4 space-y-1 mt-1">
                          <li>Men: 48 kg + 2.7 kg for each inch over 5 feet</li>
                          <li>Women: 45.5 kg + 2.2 kg for each inch over 5 feet</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium">Devine Formula (1974)</p>
                        <ul className="list-disc list-inside pl-4 space-y-1 mt-1">
                          <li>Men: 50 kg + 2.3 kg for each inch over 5 feet</li>
                          <li>Women: 45.5 kg + 2.3 kg for each inch over 5 feet</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium">Robinson Formula (1983)</p>
                        <ul className="list-disc list-inside pl-4 space-y-1 mt-1">
                          <li>Men: 52 kg + 1.9 kg for each inch over 5 feet</li>
                          <li>Women: 49 kg + 1.7 kg for each inch over 5 feet</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium">Miller Formula (1983)</p>
                        <ul className="list-disc list-inside pl-4 space-y-1 mt-1">
                          <li>Men: 56.2 kg + 1.41 kg for each inch over 5 feet</li>
                          <li>Women: 53.1 kg + 1.36 kg for each inch over 5 feet</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium">BMI-based Formula</p>
                        <p className="pl-4 mt-1">
                          Based on BMI of 22 (midpoint of normal BMI range): weight = 22 × (height in meters)²
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="frame">
                    <AccordionTrigger className="text-base font-medium">
                      Body Frame Size
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>Body frame size refers to the bone structure and can be small, medium, or large. Frame size affects ideal weight:</p>
                      
                      <div className="mt-3">
                        <p className="font-medium">How to determine your frame size:</p>
                        <p className="mt-1">Measure your wrist circumference at its narrowest point:</p>
                        
                        <div className="bg-muted p-4 rounded-lg mt-2 space-y-3">
                          <p className="font-medium">For women:</p>
                          <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>Small: Wrist size less than 5.5 inches</li>
                            <li>Medium: Wrist size 5.5 to 5.75 inches</li>
                            <li>Large: Wrist size over 5.75 inches</li>
                          </ul>
                          
                          <p className="font-medium">For men:</p>
                          <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>Small: Wrist size 5.5 to 6.5 inches</li>
                            <li>Medium: Wrist size 6.5 to 7.5 inches</li>
                            <li>Large: Wrist size over 7.5 inches</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="limitations">
                    <AccordionTrigger className="text-base font-medium">
                      Limitations
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>Ideal weight calculations have limitations:</p>
                      <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                        <li>They don't account for muscle mass, body composition, or age</li>
                        <li>Athletes may have higher weights due to muscle mass</li>
                        <li>These formulas are general guidelines, not definitive measures of health</li>
                        <li>Individual health factors should be considered alongside these calculations</li>
                      </ul>
                      <p className="mt-3">Consult with a healthcare provider for personalized weight assessment.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default IdealWeightCalculator;
