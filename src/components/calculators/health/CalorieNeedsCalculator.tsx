
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorInput from '@/components/ui/calculator-input';
import ResultDisplay from '../ResultDisplay';
import { Calculator, Pizza } from 'lucide-react';
import { toast } from 'sonner';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
type Goal = 'maintain' | 'lose' | 'gain';

const CalorieNeedsCalculator: React.FC = () => {
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
  
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');
  
  // Results
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);
  const [targetCalories, setTargetCalories] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateCalories = () => {
    try {
      // Convert imperial to metric if needed
      let weight = weightKg;
      let height = heightCm;
      
      if (units === 'imperial') {
        weight = weightLbs * 0.453592; // lbs to kg
        height = ((heightFeet * 12) + heightInches) * 2.54; // inches to cm
      }
      
      // Calculate BMR using Mifflin-St Jeor Equation
      let calculatedBmr = 0;
      
      if (gender === 'male') {
        calculatedBmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        calculatedBmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      
      // Calculate TDEE (Total Daily Energy Expenditure)
      let activityMultiplier = 1.2; // Default: sedentary
      
      switch (activityLevel) {
        case 'sedentary':
          activityMultiplier = 1.2;
          break;
        case 'light':
          activityMultiplier = 1.375;
          break;
        case 'moderate':
          activityMultiplier = 1.55;
          break;
        case 'active':
          activityMultiplier = 1.725;
          break;
        case 'very-active':
          activityMultiplier = 1.9;
          break;
      }
      
      const calculatedTdee = calculatedBmr * activityMultiplier;
      
      // Adjust for goal
      let calculatedTarget = calculatedTdee;
      
      switch (goal) {
        case 'lose':
          calculatedTarget = calculatedTdee - 500; // 500 calorie deficit for weight loss (approximately 1lb/week)
          break;
        case 'gain':
          calculatedTarget = calculatedTdee + 500; // 500 calorie surplus for weight gain
          break;
        default:
          calculatedTarget = calculatedTdee;
      }
      
      setBmr(calculatedBmr);
      setTdee(calculatedTdee);
      setTargetCalories(calculatedTarget);
      setIsCalculated(true);
      toast.success('Calorie needs calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  const getActivityLevelDescription = (level: ActivityLevel): string => {
    switch (level) {
      case 'sedentary':
        return "Little to no exercise, desk job";
      case 'light':
        return "Light exercise 1-3 days/week";
      case 'moderate':
        return "Moderate exercise 3-5 days/week";
      case 'active':
        return "Hard exercise 6-7 days/week";
      case 'very-active':
        return "Very hard exercise & physical job or training twice a day";
      default:
        return "";
    }
  };

  const getMacroBreakdown = (calories: number, goal: Goal) => {
    let protein = 0;
    let carbs = 0;
    let fats = 0;
    
    switch (goal) {
      case 'lose':
        protein = (calories * 0.4) / 4; // 40% protein (4 calories per gram)
        carbs = (calories * 0.3) / 4; // 30% carbs (4 calories per gram)
        fats = (calories * 0.3) / 9; // 30% fats (9 calories per gram)
        break;
      case 'maintain':
        protein = (calories * 0.3) / 4; // 30% protein
        carbs = (calories * 0.45) / 4; // 45% carbs
        fats = (calories * 0.25) / 9; // 25% fats
        break;
      case 'gain':
        protein = (calories * 0.25) / 4; // 25% protein
        carbs = (calories * 0.5) / 4; // 50% carbs
        fats = (calories * 0.25) / 9; // 25% fats
        break;
    }
    
    return {
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats)
    };
  };

  return (
    <CalculatorLayout
      title="Calorie Needs Calculator"
      description="Calculate your daily calorie requirements based on your activity level, age, weight, height, and gender."
      intro="This calculator estimates your Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and the calories you need based on your fitness goals."
      formula={
        <div>
          <p className="mb-4">This calculator uses the Mifflin-St Jeor Equation to estimate your Basal Metabolic Rate (BMR):</p>
          
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <p><strong>For Men:</strong> <code>BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5</code></p>
            <p className="mt-2"><strong>For Women:</strong> <code>BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161</code></p>
          </div>
          
          <p className="mt-4 mb-2">Then, your Total Daily Energy Expenditure (TDEE) is calculated by multiplying your BMR by an activity factor:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Sedentary (little or no exercise): BMR × 1.2</li>
            <li>Lightly active (light exercise 1-3 days/week): BMR × 1.375</li>
            <li>Moderately active (moderate exercise 3-5 days/week): BMR × 1.55</li>
            <li>Active (hard exercise 6-7 days/week): BMR × 1.725</li>
            <li>Very active (very hard exercise, physical job, or training twice a day): BMR × 1.9</li>
          </ul>
          
          <p className="mt-4">For weight loss, we typically subtract 500 calories from your TDEE (roughly 1 pound per week). For weight gain, we add 500 calories.</p>
        </div>
      }
      faq={[
        {
          question: "How accurate is this calorie calculator?",
          answer: "This calculator provides an estimate based on established formulas. Individual metabolic rates can vary by up to 10-15%. Use it as a starting point, then adjust based on your actual results over several weeks."
        },
        {
          question: "How many calories should I eat to lose weight?",
          answer: "For safe and sustainable weight loss, most experts recommend a calorie deficit of 500-1000 calories per day, which leads to a 1-2 pound weight loss per week. This calculator defaults to a 500-calorie deficit for the weight loss goal."
        },
        {
          question: "Do I need to count calories to be healthy?",
          answer: "Not necessarily. Calorie counting is one approach to managing weight, but focusing on whole foods, portion control, and listening to your hunger signals can also be effective. Calorie counting can be helpful for awareness and education."
        },
        {
          question: "Why aren't my calories matching my results?",
          answer: "Several factors affect weight beyond calories, including hormones, sleep quality, stress, medications, medical conditions, and body composition changes. If your results don't match expectations, consider consulting a healthcare provider or registered dietitian."
        }
      ]}
      canonicalUrl="https://calculators-hub.com/calculators/health/calorie-needs-calculator"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label>Activity Level</Label>
            <Select value={activityLevel} onValueChange={(value) => setActivityLevel(value as ActivityLevel)}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly Active</SelectItem>
                <SelectItem value="moderate">Moderately Active</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="very-active">Very Active</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{getActivityLevelDescription(activityLevel)}</p>
          </div>
          
          <div className="space-y-4">
            <Label>Your Goal</Label>
            <Select value={goal} onValueChange={(value) => setGoal(value as Goal)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateCalories}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate Calories
          </Button>
        </div>
        
        {isCalculated && targetCalories !== null && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultDisplay
                label="Daily Calories Needed"
                value={`${Math.round(targetCalories)} cal`}
                description={`Based on your ${goal} goal`}
                icon={<Pizza className="h-5 w-5" />}
                isHighlighted={true}
              />
              
              <ResultDisplay
                label="Basal Metabolic Rate"
                value={`${Math.round(bmr || 0)} cal`}
                description="Calories burned at rest"
                icon={<Calculator className="h-5 w-5" />}
              />
              
              <ResultDisplay
                label="Total Daily Energy"
                value={`${Math.round(tdee || 0)} cal`}
                description="Calories needed to maintain"
                icon={<Calculator className="h-5 w-5" />}
              />
            </div>
            
            {targetCalories && (
              <div className="mt-6 p-6 border rounded-md bg-muted/20">
                <h3 className="font-semibold mb-4">Recommended Macronutrient Breakdown</h3>
                
                {(() => {
                  const macros = getMacroBreakdown(targetCalories, goal);
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Protein</p>
                        <p className="text-2xl font-medium">{macros.protein}g</p>
                        <p className="text-sm text-muted-foreground">{Math.round((macros.protein * 4 / targetCalories) * 100)}% of calories</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Carbohydrates</p>
                        <p className="text-2xl font-medium">{macros.carbs}g</p>
                        <p className="text-sm text-muted-foreground">{Math.round((macros.carbs * 4 / targetCalories) * 100)}% of calories</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Fats</p>
                        <p className="text-2xl font-medium">{macros.fats}g</p>
                        <p className="text-sm text-muted-foreground">{Math.round((macros.fats * 9 / targetCalories) * 100)}% of calories</p>
                      </div>
                    </div>
                  );
                })()}
                
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-2">Notes on Your Caloric Needs</h4>
                  <p className="text-sm text-muted-foreground">
                    {goal === 'lose' && "This calculator provides a 500 calorie deficit for sustainable weight loss of about 1 pound per week. If weight loss stalls, you may need to adjust your activity level or decrease calories further."}
                    {goal === 'maintain' && "These calories will help maintain your current weight. Use this as a baseline and adjust as needed based on how your body responds over time."}
                    {goal === 'gain' && "This calculator provides a 500 calorie surplus to support muscle growth and weight gain of about 1 pound per week. Combine with a strength training program for optimal results."}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CalorieNeedsCalculator;
