
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorInput from '@/components/ui/calculator-input';
import ResultDisplay from '../ResultDisplay';
import { Calculator, Flame } from 'lucide-react';
import { toast } from 'sonner';

const BMRCalculator: React.FC = () => {
  const [gender, setGender] = useState<string>("male");
  const [age, setAge] = useState<number>(30);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  
  // Metric measurements
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  
  // Imperial measurements
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  
  const [formula, setFormula] = useState<string>("mifflin");
  
  // Results
  const [bmrResults, setBmrResults] = useState<{[key: string]: number} | null>(null);
  const [selectedBMR, setSelectedBMR] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateBMR = () => {
    try {
      // Convert imperial to metric if needed
      let weight = weightKg;
      let height = heightCm;
      
      if (units === 'imperial') {
        weight = weightLbs * 0.453592; // lbs to kg
        height = ((heightFeet * 12) + heightInches) * 2.54; // inches to cm
      }
      
      // Calculate BMR using different formulas
      let bmrMifflin = 0;
      let bmrHarrisBenedict = 0;
      let bmrKatch = 0;
      
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmrMifflin = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmrMifflin = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      
      // Harris-Benedict Equation (Revised)
      if (gender === 'male') {
        bmrHarrisBenedict = (13.397 * weight) + (4.799 * height) - (5.677 * age) + 88.362;
      } else {
        bmrHarrisBenedict = (9.247 * weight) + (3.098 * height) - (4.330 * age) + 447.593;
      }
      
      // Katch-McArdle Formula (requires body fat %, using estimate)
      // Estimating body fat based on BMI (very rough estimate)
      const bmi = weight / Math.pow(height/100, 2);
      let estimatedBodyFat = 0;
      
      if (gender === 'male') {
        estimatedBodyFat = 1.20 * bmi + 0.23 * age - 16.2;
      } else {
        estimatedBodyFat = 1.20 * bmi + 0.23 * age - 5.4;
      }
      
      // Cap estimated body fat within reasonable range
      estimatedBodyFat = Math.max(5, Math.min(estimatedBodyFat, 45));
      
      // Calculate lean body mass
      const leanBodyMass = weight * (1 - (estimatedBodyFat/100));
      
      // Katch-McArdle formula
      bmrKatch = 370 + (21.6 * leanBodyMass);
      
      // Round results
      const results = {
        mifflin: Math.round(bmrMifflin),
        harrisBenedict: Math.round(bmrHarrisBenedict),
        katch: Math.round(bmrKatch)
      };
      
      // Select the BMR based on the chosen formula
      const selected = results[formula as keyof typeof results];
      
      setBmrResults(results);
      setSelectedBMR(selected);
      setIsCalculated(true);
      toast.success('BMR calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) to understand your daily calorie requirements at rest."
      intro="This calculator estimates your Basal Metabolic Rate (BMR), which is the number of calories your body requires to maintain basic physiological functions while at rest."
      formula={
        <div>
          <p className="mb-4">This calculator uses three different formulas to estimate your BMR:</p>
          
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <p className="font-medium">1. Mifflin-St Jeor Equation:</p>
            <p className="mt-1"><strong>For Men:</strong> <code>BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</code></p>
            <p className="mt-1"><strong>For Women:</strong> <code>BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</code></p>
            
            <p className="font-medium mt-4">2. Harris-Benedict Equation (Revised):</p>
            <p className="mt-1"><strong>For Men:</strong> <code>BMR = (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years) + 88.362</code></p>
            <p className="mt-1"><strong>For Women:</strong> <code>BMR = (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years) + 447.593</code></p>
            
            <p className="font-medium mt-4">3. Katch-McArdle Formula:</p>
            <p className="mt-1"><code>BMR = 370 + (21.6 × lean body mass in kg)</code></p>
            <p className="text-sm text-muted-foreground mt-1">Note: For the Katch-McArdle calculation, body fat percentage is estimated based on BMI and age.</p>
          </div>
        </div>
      }
      faq={[
        {
          question: "What is BMR?",
          answer: "Basal Metabolic Rate (BMR) is the amount of energy your body needs while at complete rest to maintain vital functions like breathing, circulation, and cell production. It represents the minimum amount of energy (calories) needed to keep your body functioning at rest."
        },
        {
          question: "How is BMR different from TDEE?",
          answer: "BMR is the calories burned at complete rest, while Total Daily Energy Expenditure (TDEE) includes BMR plus additional calories burned through physical activity, digestion (thermic effect of food), and non-exercise activity thermogenesis (NEAT). TDEE represents your total daily calorie needs."
        },
        {
          question: "Which BMR formula is the most accurate?",
          answer: "The Mifflin-St Jeor equation is generally considered the most accurate for most people. The Harris-Benedict equation tends to overestimate slightly. The Katch-McArdle formula is most accurate when you know your body fat percentage, but our calculator estimates this value."
        },
        {
          question: "How can I use my BMR result?",
          answer: "Your BMR helps you understand your minimum calorie needs. To find your total daily calorie needs, multiply your BMR by an activity factor: 1.2 for sedentary, 1.375 for light activity, 1.55 for moderate activity, 1.725 for very active, and 1.9 for extremely active lifestyles."
        }
      ]}
    >
      <div className="space-y-6">
        <Tabs value={units} onValueChange={(value) => setUnits(value as 'metric' | 'imperial')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metric">Metric (cm, kg)</TabsTrigger>
            <TabsTrigger value="imperial">Imperial (ft/in, lbs)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metric" className="space-y-6">
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
              
              <CalculatorInput
                id="age-metric"
                label="Age"
                type="number"
                value={age}
                onChange={(value) => setAge(parseInt(value) || 0)}
                suffix="years"
                min={15}
                max={100}
                helperText="Your age in years"
              />
              
              <CalculatorInput
                id="height-metric"
                label="Height"
                type="number"
                value={heightCm}
                onChange={(value) => setHeightCm(parseFloat(value) || 0)}
                suffix="cm"
                min={100}
                max={250}
                helperText="Your height in centimeters"
              />
              
              <CalculatorInput
                id="weight-metric"
                label="Weight"
                type="number"
                value={weightKg}
                onChange={(value) => setWeightKg(parseFloat(value) || 0)}
                suffix="kg"
                min={30}
                max={300}
                helperText="Your weight in kilograms"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="imperial" className="space-y-6">
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
              
              <CalculatorInput
                id="age-imperial"
                label="Age"
                type="number"
                value={age}
                onChange={(value) => setAge(parseInt(value) || 0)}
                suffix="years"
                min={15}
                max={100}
                helperText="Your age in years"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <CalculatorInput
                  id="height-feet"
                  label="Height (feet)"
                  type="number"
                  value={heightFeet}
                  onChange={(value) => setHeightFeet(parseInt(value) || 0)}
                  suffix="ft"
                  min={3}
                  max={8}
                  helperText="Feet"
                />
                
                <CalculatorInput
                  id="height-inches"
                  label="Height (inches)"
                  type="number"
                  value={heightInches}
                  onChange={(value) => setHeightInches(parseInt(value) || 0)}
                  suffix="in"
                  min={0}
                  max={11}
                  helperText="Inches"
                />
              </div>
              
              <CalculatorInput
                id="weight-imperial"
                label="Weight"
                type="number"
                value={weightLbs}
                onChange={(value) => setWeightLbs(parseFloat(value) || 0)}
                suffix="lbs"
                min={60}
                max={660}
                helperText="Your weight in pounds"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-4">
          <Label>Calculation Formula</Label>
          <Select value={formula} onValueChange={setFormula}>
            <SelectTrigger>
              <SelectValue placeholder="Select formula" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mifflin">Mifflin-St Jeor (Recommended)</SelectItem>
              <SelectItem value="harrisBenedict">Harris-Benedict</SelectItem>
              <SelectItem value="katch">Katch-McArdle</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {formula === "mifflin" && "Most accurate for most people. Modern standard."}
            {formula === "harrisBenedict" && "Traditional formula, slightly overestimates for most people."}
            {formula === "katch" && "Takes lean body mass into account. We estimate body fat % from your BMI."}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateBMR}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate BMR
          </Button>
        </div>
        
        {isCalculated && selectedBMR !== null && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <ResultDisplay
                label="Basal Metabolic Rate (BMR)"
                value={`${selectedBMR} calories/day`}
                description={`Based on the ${formula === "mifflin" ? "Mifflin-St Jeor" : formula === "harrisBenedict" ? "Harris-Benedict" : "Katch-McArdle"} formula`}
                icon={<Flame className="h-5 w-5 text-orange-500" />}
                isHighlighted={true}
              />
              
              {bmrResults && (
                <div className="mt-4 p-6 border rounded-md bg-muted/20">
                  <h3 className="font-semibold mb-4">Comparison of BMR Formulas</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Mifflin-St Jeor</div>
                      <div className="text-xl font-semibold">{bmrResults.mifflin} cal</div>
                      <div className="text-xs text-muted-foreground mt-1">Modern standard formula</div>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Harris-Benedict</div>
                      <div className="text-xl font-semibold">{bmrResults.harrisBenedict} cal</div>
                      <div className="text-xs text-muted-foreground mt-1">Traditional formula</div>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Katch-McArdle</div>
                      <div className="text-xl font-semibold">{bmrResults.katch} cal</div>
                      <div className="text-xs text-muted-foreground mt-1">Based on lean body mass</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium mb-2">Total Daily Energy Expenditure (TDEE)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Multiply your BMR by an activity factor to estimate your total daily calorie needs:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Sedentary (little/no exercise)</span>
                        <span className="font-medium">{Math.round(selectedBMR * 1.2)} cal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Light activity (1-3 days/week)</span>
                        <span className="font-medium">{Math.round(selectedBMR * 1.375)} cal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Moderate activity (3-5 days/week)</span>
                        <span className="font-medium">{Math.round(selectedBMR * 1.55)} cal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Very active (6-7 days/week)</span>
                        <span className="font-medium">{Math.round(selectedBMR * 1.725)} cal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extremely active (physical job/training)</span>
                        <span className="font-medium">{Math.round(selectedBMR * 1.9)} cal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BMRCalculator;
