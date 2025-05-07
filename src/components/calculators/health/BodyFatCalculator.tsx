
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorInput from '@/components/ui/calculator-input';
import ResultDisplay from '../ResultDisplay';
import { Calculator, Heart } from 'lucide-react';
import { toast } from 'sonner';

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<string>("male");
  const [method, setMethod] = useState<string>("navy");
  
  // Navy Method measurements
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [waist, setWaist] = useState<number>(85);
  const [neck, setNeck] = useState<number>(38);
  const [hip, setHip] = useState<number>(90); // For women only
  
  // Skinfold Method measurements
  const [chest, setChest] = useState<number>(10);
  const [abdomen, setAbdomen] = useState<number>(15);
  const [thigh, setThigh] = useState<number>(10);
  const [triceps, setTriceps] = useState<number>(12);
  const [subscapular, setSubscapular] = useState<number>(12);
  const [suprailiac, setSuprailiac] = useState<number>(14);
  const [midaxillary, setMidaxillary] = useState<number>(10);
  
  // Results
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);
  const [fatMass, setFatMass] = useState<number | null>(null);
  const [leanMass, setLeanMass] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateBodyFat = () => {
    try {
      let bodyFat = 0;
      
      if (method === "navy") {
        // Navy Method Formula
        if (gender === "male") {
          // Men: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
          bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
        } else {
          // Women: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
          bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
        }
      } else if (method === "skinfold") {
        // Jackson-Pollock 3-site Formula
        let sumOfFolds = 0;
        
        if (gender === "male") {
          sumOfFolds = chest + abdomen + thigh;
          const bodyDensity = 1.10938 - (0.0008267 * sumOfFolds) + (0.0000016 * sumOfFolds * sumOfFolds) - (0.0002574 * 30); // assuming age 30
          bodyFat = (495 / bodyDensity) - 450;
        } else {
          sumOfFolds = triceps + suprailiac + thigh;
          const bodyDensity = 1.099421 - (0.0009929 * sumOfFolds) + (0.0000023 * sumOfFolds * sumOfFolds) - (0.0001392 * 30); // assuming age 30
          bodyFat = (495 / bodyDensity) - 450;
        }
      } else if (method === "7site") {
        // Jackson-Pollock 7-site Formula
        const sumOfFolds = chest + abdomen + thigh + triceps + subscapular + suprailiac + midaxillary;
        
        let bodyDensity;
        if (gender === "male") {
          bodyDensity = 1.112 - (0.00043499 * sumOfFolds) + (0.00000055 * sumOfFolds * sumOfFolds) - (0.00028826 * 30); // assuming age 30
        } else {
          bodyDensity = 1.097 - (0.00046971 * sumOfFolds) + (0.00000056 * sumOfFolds * sumOfFolds) - (0.00012828 * 30); // assuming age 30
        }
        
        bodyFat = (495 / bodyDensity) - 450;
      }
      
      // Ensure body fat percentage is within realistic range
      bodyFat = Math.max(3, Math.min(bodyFat, 50));
      
      // Calculate fat mass and lean mass
      const fatMassValue = (bodyFat / 100) * weight;
      const leanMassValue = weight - fatMassValue;
      
      setBodyFatPercentage(bodyFat);
      setFatMass(fatMassValue);
      setLeanMass(leanMassValue);
      setIsCalculated(true);
      toast.success('Body fat percentage calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  const getBodyFatCategory = (bf: number, gender: string): string => {
    if (gender === "male") {
      if (bf < 6) return "Essential Fat";
      if (bf < 14) return "Athletic";
      if (bf < 18) return "Fitness";
      if (bf < 25) return "Average";
      return "Obese";
    } else {
      if (bf < 14) return "Essential Fat";
      if (bf < 21) return "Athletic";
      if (bf < 25) return "Fitness";
      if (bf < 32) return "Average";
      return "Obese";
    }
  };

  const getBodyFatColor = (category: string): string => {
    switch (category) {
      case "Essential Fat": return "text-blue-600";
      case "Athletic": return "text-green-600";
      case "Fitness": return "text-teal-600";
      case "Average": return "text-yellow-600";
      case "Obese": return "text-red-600";
      default: return "";
    }
  };

  return (
    <CalculatorLayout
      title="Body Fat Calculator"
      description="Estimate your body fat percentage using various methods based on your measurements."
      intro="Body fat percentage is an important indicator of fitness and health. This calculator offers multiple methods to estimate your body fat percentage based on different measurements."
      formula={
        <div>
          <p className="mb-4">This calculator uses several methods to estimate body fat percentage:</p>
          
          <h3 className="font-semibold mt-4">Navy Method</h3>
          <div className="bg-muted p-4 rounded-md my-2 overflow-x-auto">
            <p><strong>For Men:</strong> <code>BF% = 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76</code></p>
            <p className="mt-2"><strong>For Women:</strong> <code>BF% = 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387</code></p>
          </div>
          
          <h3 className="font-semibold mt-4">Jackson-Pollock 3-Site Method</h3>
          <div className="bg-muted p-4 rounded-md my-2 overflow-x-auto">
            <p>First calculates body density, then converts to body fat percentage using the Siri equation:</p>
            <p><code>BF% = (495 / body density) - 450</code></p>
          </div>
          
          <h3 className="font-semibold mt-4">Body Fat Categories</h3>
          <div className="mt-2">
            <p className="font-semibold">For Men:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><span className="text-blue-600">Essential Fat:</span> 2-5%</li>
              <li><span className="text-green-600">Athletic:</span> 6-13%</li>
              <li><span className="text-teal-600">Fitness:</span> 14-17%</li>
              <li><span className="text-yellow-600">Average:</span> 18-24%</li>
              <li><span className="text-red-600">Obese:</span> 25%+</li>
            </ul>
          </div>
          <div className="mt-2">
            <p className="font-semibold">For Women:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><span className="text-blue-600">Essential Fat:</span> 10-13%</li>
              <li><span className="text-green-600">Athletic:</span> 14-20%</li>
              <li><span className="text-teal-600">Fitness:</span> 21-24%</li>
              <li><span className="text-yellow-600">Average:</span> 25-31%</li>
              <li><span className="text-red-600">Obese:</span> 32%+</li>
            </ul>
          </div>
        </div>
      }
      faq={[
        {
          question: "How accurate are body fat calculators?",
          answer: "Body fat calculators provide estimates, not exact measurements. The Navy method can be accurate within 3-4% of professional methods when measurements are taken correctly. For more precise results, methods like DEXA scans or hydrostatic weighing are recommended."
        },
        {
          question: "What's a healthy body fat percentage?",
          answer: "For men, 10-20% is generally considered healthy, with 14-17% being the 'fitness' range. For women, 18-28% is healthy, with 21-24% being the 'fitness' range. Athletes often have lower percentages, but very low body fat can pose health risks."
        },
        {
          question: "How should I measure myself for accurate results?",
          answer: "For waist measurement, measure at the narrowest point or at the navel while relaxed. For neck, measure just below the larynx. For skinfold measurements, use calipers and measure on the right side of the body. Take all measurements in the morning before eating."
        },
        {
          question: "Why are there different body fat standards for men and women?",
          answer: "Women naturally have higher essential fat (needed for hormonal functions and reproductive health) than men. Women's essential fat is about 10-13% compared to men's 2-5%. This biological difference accounts for different healthy ranges between genders."
        }
      ]}
      canonicalUrl="https://calculators-hub.com/calculators/health/body-fat-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <Label>Calculation Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="navy">Navy Method</SelectItem>
                <SelectItem value="skinfold">3-Site Skinfold</SelectItem>
                <SelectItem value="7site">7-Site Skinfold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="border-t pt-6">
          {method === "navy" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Navy Method Measurements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalculatorInput
                  id="height"
                  label="Height"
                  type="number"
                  value={height}
                  onChange={(value) => setHeight(parseFloat(value) || 0)}
                  suffix="cm"
                  min={100}
                  max={250}
                  helperText="Your height in centimeters"
                />
                
                <CalculatorInput
                  id="weight"
                  label="Weight"
                  type="number"
                  value={weight}
                  onChange={(value) => setWeight(parseFloat(value) || 0)}
                  suffix="kg"
                  min={20}
                  max={300}
                  helperText="Your weight in kilograms"
                />
                
                <CalculatorInput
                  id="waist"
                  label="Waist Circumference"
                  type="number"
                  value={waist}
                  onChange={(value) => setWaist(parseFloat(value) || 0)}
                  suffix="cm"
                  min={40}
                  max={200}
                  helperText="Measure at navel level"
                />
                
                <CalculatorInput
                  id="neck"
                  label="Neck Circumference"
                  type="number"
                  value={neck}
                  onChange={(value) => setNeck(parseFloat(value) || 0)}
                  suffix="cm"
                  min={20}
                  max={80}
                  helperText="Measure just below Adam's apple"
                />
                
                {gender === "female" && (
                  <CalculatorInput
                    id="hip"
                    label="Hip Circumference"
                    type="number"
                    value={hip}
                    onChange={(value) => setHip(parseFloat(value) || 0)}
                    suffix="cm"
                    min={50}
                    max={200}
                    helperText="Measure at widest point"
                  />
                )}
              </div>
            </div>
          )}
          
          {method === "skinfold" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">3-Site Skinfold Measurements</h3>
              <p className="text-sm text-muted-foreground mb-4">Enter skinfold measurements in millimeters using calipers</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalculatorInput
                  id="weight-skinfold"
                  label="Weight"
                  type="number"
                  value={weight}
                  onChange={(value) => setWeight(parseFloat(value) || 0)}
                  suffix="kg"
                  min={20}
                  max={300}
                  helperText="Your weight in kilograms"
                />
                
                {gender === "male" ? (
                  <>
                    <CalculatorInput
                      id="chest"
                      label="Chest Skinfold"
                      type="number"
                      value={chest}
                      onChange={(value) => setChest(parseFloat(value) || 0)}
                      suffix="mm"
                      min={1}
                      max={100}
                    />
                    
                    <CalculatorInput
                      id="abdomen"
                      label="Abdominal Skinfold"
                      type="number"
                      value={abdomen}
                      onChange={(value) => setAbdomen(parseFloat(value) || 0)}
                      suffix="mm"
                      min={1}
                      max={100}
                    />
                    
                    <CalculatorInput
                      id="thigh"
                      label="Thigh Skinfold"
                      type="number"
                      value={thigh}
                      onChange={(value) => setThigh(parseFloat(value) || 0)}
                      suffix="mm"
                      min={1}
                      max={100}
                    />
                  </>
                ) : (
                  <>
                    <CalculatorInput
                      id="triceps"
                      label="Triceps Skinfold"
                      type="number"
                      value={triceps}
                      onChange={(value) => setTriceps(parseFloat(value) || 0)}
                      suffix="mm"
                      min={1}
                      max={100}
                    />
                    
                    <CalculatorInput
                      id="suprailiac"
                      label="Suprailiac Skinfold"
                      type="number"
                      value={suprailiac}
                      onChange={(value) => setSuprailiac(parseFloat(value) || 0)}
                      suffix="mm"
                      min={1}
                      max={100}
                    />
                    
                    <CalculatorInput
                      id="thigh-female"
                      label="Thigh Skinfold"
                      type="number"
                      value={thigh}
                      onChange={(value) => setThigh(parseFloat(value) || 0)}
                      suffix="mm"
                      min={1}
                      max={100}
                    />
                  </>
                )}
              </div>
            </div>
          )}
          
          {method === "7site" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">7-Site Skinfold Measurements</h3>
              <p className="text-sm text-muted-foreground mb-4">Enter skinfold measurements in millimeters using calipers</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalculatorInput
                  id="weight-7site"
                  label="Weight"
                  type="number"
                  value={weight}
                  onChange={(value) => setWeight(parseFloat(value) || 0)}
                  suffix="kg"
                  min={20}
                  max={300}
                  helperText="Your weight in kilograms"
                />
                
                <CalculatorInput
                  id="chest-7site"
                  label="Chest Skinfold"
                  type="number"
                  value={chest}
                  onChange={(value) => setChest(parseFloat(value) || 0)}
                  suffix="mm"
                  min={1}
                  max={100}
                />
                
                <CalculatorInput
                  id="abdomen-7site"
                  label="Abdominal Skinfold"
                  type="number"
                  value={abdomen}
                  onChange={(value) => setAbdomen(parseFloat(value) || 0)}
                  suffix="mm"
                  min={1}
                  max={100}
                />
                
                <CalculatorInput
                  id="thigh-7site"
                  label="Thigh Skinfold"
                  type="number"
                  value={thigh}
                  onChange={(value) => setThigh(parseFloat(value) || 0)}
                  suffix="mm"
                  min={1}
                  max={100}
                />
                
                <CalculatorInput
                  id="triceps-7site"
                  label="Triceps Skinfold"
                  type="number"
                  value={triceps}
                  onChange={(value) => setTriceps(parseFloat(value) || 0)}
                  suffix="mm"
                  min={1}
                  max={100}
                />
                
                <CalculatorInput
                  id="subscapular-7site"
                  label="Subscapular Skinfold"
                  type="number"
                  value={subscapular}
                  onChange={(value) => setSubscapular(parseFloat(value) || 0)}
                  suffix="mm"
                  min={1}
                  max={100}
                />
                
                <CalculatorInput
                  id="suprailiac-7site"
                  label="Suprailiac Skinfold"
                  type="number"
                  value={suprailiac}
                  onChange={(value) => setSuprailiac(parseFloat(value) || 0)}
                  suffix="mm"
                  min={1}
                  max={100}
                />
                
                <CalculatorInput
                  id="midaxillary-7site"
                  label="Midaxillary Skinfold"
                  type="number"
                  value={midaxillary}
                  onChange={(value) => setMidaxillary(parseFloat(value) || 0)}
                  suffix="mm"
                  min={1}
                  max={100}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateBodyFat}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate Body Fat
          </Button>
        </div>
        
        {isCalculated && bodyFatPercentage !== null && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultDisplay
                label="Body Fat Percentage"
                value={`${bodyFatPercentage.toFixed(1)}%`}
                description={getBodyFatCategory(bodyFatPercentage, gender)}
                icon={<Heart className="h-5 w-5" />}
                isHighlighted={true}
              />
              
              <ResultDisplay
                label="Fat Mass"
                value={`${fatMass?.toFixed(1) || 0} kg`}
                description="Weight from body fat"
                icon={<Calculator className="h-5 w-5" />}
              />
              
              <ResultDisplay
                label="Lean Mass"
                value={`${leanMass?.toFixed(1) || 0} kg`}
                description="Weight from muscle, bone, etc."
                icon={<Calculator className="h-5 w-5" />}
              />
            </div>
            
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="font-semibold mb-2">Your Body Fat Category:</h3>
              <p className={`text-lg font-medium ${getBodyFatColor(getBodyFatCategory(bodyFatPercentage, gender))}`}>
                {getBodyFatCategory(bodyFatPercentage, gender)}
              </p>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {getBodyFatCategory(bodyFatPercentage, gender) === "Essential Fat" && 
                    "Essential fat is necessary for basic bodily functions. Staying at this level for extended periods is not recommended for most people."}
                  {getBodyFatCategory(bodyFatPercentage, gender) === "Athletic" && 
                    "Athletic level body fat is typical for athletes and fitness enthusiasts. This level requires significant dedication to exercise and nutrition."}
                  {getBodyFatCategory(bodyFatPercentage, gender) === "Fitness" && 
                    "Fitness level body fat indicates a fit and healthy body composition that is sustainable and provides good athletic performance."}
                  {getBodyFatCategory(bodyFatPercentage, gender) === "Average" && 
                    "Average body fat is typical for many adults. While not optimal for athletic performance, it's generally not associated with health risks."}
                  {getBodyFatCategory(bodyFatPercentage, gender) === "Obese" && 
                    "This body fat level is associated with increased health risks. Consider consulting with healthcare professionals about weight management strategies."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;
