
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorInput from '@/components/ui/calculator-input';
import ResultDisplay from '../ResultDisplay';
import { Calculator } from 'lucide-react';
import { toast } from 'sonner';

const MacroNutrientCalculator: React.FC = () => {
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
  
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [goal, setGoal] = useState<string>("maintain");
  const [macroRatio, setMacroRatio] = useState<string>("balanced");
  
  // Custom macro ratios
  const [customProteinPercentage, setCustomProteinPercentage] = useState<number>(30);
  const [customCarbPercentage, setCustomCarbPercentage] = useState<number>(40);
  const [customFatPercentage, setCustomFatPercentage] = useState<number>(30);
  
  // Results
  const [calories, setCalories] = useState<number | null>(null);
  const [protein, setProtein] = useState<number | null>(null);
  const [carbs, setCarbs] = useState<number | null>(null);
  const [fat, setFat] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateMacros = () => {
    try {
      // Convert imperial to metric if needed
      let weight = weightKg;
      let height = heightCm;
      
      if (units === 'imperial') {
        weight = weightLbs * 0.453592; // lbs to kg
        height = ((heightFeet * 12) + heightInches) * 2.54; // inches to cm
      }
      
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr = 0;
      
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      
      // Calculate TDEE (Total Daily Energy Expenditure)
      const activityMultipliers: {[key: string]: number} = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      };
      
      const tdee = bmr * activityMultipliers[activityLevel];
      
      // Adjust calories based on goal
      let targetCalories = tdee;
      
      switch (goal) {
        case "lose":
          targetCalories = tdee * 0.8; // 20% deficit for weight loss
          break;
        case "maintain":
          targetCalories = tdee;
          break;
        case "gain":
          targetCalories = tdee * 1.1; // 10% surplus for muscle gain
          break;
        case "gainfast":
          targetCalories = tdee * 1.2; // 20% surplus for fast gain
          break;
      }
      
      // Determine macronutrient ratios
      let proteinPercentage = 0;
      let carbPercentage = 0;
      let fatPercentage = 0;
      
      switch (macroRatio) {
        case "balanced":
          proteinPercentage = 30;
          carbPercentage = 40;
          fatPercentage = 30;
          break;
        case "lowCarb":
          proteinPercentage = 40;
          carbPercentage = 20;
          fatPercentage = 40;
          break;
        case "keto":
          proteinPercentage = 30;
          carbPercentage = 5;
          fatPercentage = 65;
          break;
        case "highProtein":
          proteinPercentage = 40;
          carbPercentage = 30;
          fatPercentage = 30;
          break;
        case "custom":
          // Validate that custom percentages sum to 100
          const sum = customProteinPercentage + customCarbPercentage + customFatPercentage;
          if (sum !== 100) {
            toast.error("Custom macro percentages must add up to 100%");
            return;
          }
          proteinPercentage = customProteinPercentage;
          carbPercentage = customCarbPercentage;
          fatPercentage = customFatPercentage;
          break;
      }
      
      // Calculate macros in grams
      const proteinCalories = targetCalories * (proteinPercentage / 100);
      const carbCalories = targetCalories * (carbPercentage / 100);
      const fatCalories = targetCalories * (fatPercentage / 100);
      
      const proteinGrams = proteinCalories / 4; // 4 calories per gram of protein
      const carbGrams = carbCalories / 4; // 4 calories per gram of carbs
      const fatGrams = fatCalories / 9; // 9 calories per gram of fat
      
      setCalories(Math.round(targetCalories));
      setProtein(Math.round(proteinGrams));
      setCarbs(Math.round(carbGrams));
      setFat(Math.round(fatGrams));
      setIsCalculated(true);
      toast.success('Macronutrients calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  const getActivityLevelDescription = (level: string): string => {
    switch (level) {
      case 'sedentary':
        return "Little to no exercise, desk job";
      case 'light':
        return "Light exercise 1-3 days/week";
      case 'moderate':
        return "Moderate exercise 3-5 days/week";
      case 'active':
        return "Hard exercise 6-7 days/week";
      case 'veryActive':
        return "Very hard exercise, physical job, or training twice a day";
      default:
        return "";
    }
  };

  return (
    <CalculatorLayout
      title="Macro Nutrient Calculator"
      description="Calculate your ideal macronutrient distribution based on your goals and body type."
      intro="This calculator helps you determine the optimal balance of proteins, carbohydrates, and fats based on your body measurements, activity level, and fitness goals."
      formula={
        <div>
          <p className="mb-4">This calculator uses a multi-step process to determine your optimal macronutrient intake:</p>
          
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <p className="font-medium mb-2">Step 1: Calculate BMR (Basal Metabolic Rate)</p>
            <p><strong>For Men:</strong> <code>BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5</code></p>
            <p><strong>For Women:</strong> <code>BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161</code></p>
            
            <p className="font-medium mt-4 mb-2">Step 2: Calculate TDEE (Total Daily Energy Expenditure)</p>
            <p><code>TDEE = BMR × Activity Multiplier</code></p>
            <ul className="list-disc ml-6 space-y-1 mt-1">
              <li>Sedentary: 1.2</li>
              <li>Light activity: 1.375</li>
              <li>Moderate activity: 1.55</li>
              <li>Active: 1.725</li>
              <li>Very active: 1.9</li>
            </ul>
            
            <p className="font-medium mt-4 mb-2">Step 3: Adjust for Goals</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Weight Loss: TDEE × 0.8 (20% deficit)</li>
              <li>Maintenance: TDEE</li>
              <li>Moderate Gain: TDEE × 1.1 (10% surplus)</li>
              <li>Fast Gain: TDEE × 1.2 (20% surplus)</li>
            </ul>
            
            <p className="font-medium mt-4 mb-2">Step 4: Calculate Macros</p>
            <p><code>Protein (g) = (Target Calories × Protein%) ÷ 4</code></p>
            <p><code>Carbs (g) = (Target Calories × Carb%) ÷ 4</code></p>
            <p><code>Fat (g) = (Target Calories × Fat%) ÷ 9</code></p>
          </div>
          
          <p className="mt-4 mb-2">Preset Macro Ratios:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Balanced:</strong> 30% protein, 40% carbs, 30% fat</li>
            <li><strong>Low Carb:</strong> 40% protein, 20% carbs, 40% fat</li>
            <li><strong>Keto:</strong> 30% protein, 5% carbs, 65% fat</li>
            <li><strong>High Protein:</strong> 40% protein, 30% carbs, 30% fat</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "What are macronutrients?",
          answer: "Macronutrients (or 'macros') are the three primary nutrients that provide energy to your body: proteins, carbohydrates, and fats. Each plays essential roles in body function, energy provision, hormone regulation, and cell structure."
        },
        {
          question: "Which macronutrient ratio is best for weight loss?",
          answer: "There's no single 'best' ratio for everyone. Weight loss ultimately depends on caloric deficit, not specific macro ratios. However, higher protein intake (around 30-35% of calories) often helps with satiety and muscle preservation during weight loss. Both low-carb and moderate-carb approaches can work, depending on individual preferences and responses."
        },
        {
          question: "Do I need to hit my macro targets exactly?",
          answer: "Aim to get within 5-10g of your protein goal and within 10g of your carb and fat goals. Consistency over time matters more than perfect daily adherence. Your calorie target is most important for weight management, while macro distribution helps optimize body composition and performance."
        },
        {
          question: "How often should I recalculate my macros?",
          answer: "Recalculate when your weight changes by 5-10 pounds, when your activity level significantly changes, or if you're not seeing results after 3-4 weeks. Also recalculate when your goals change, such as shifting from weight loss to maintenance."
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label>Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly Active</SelectItem>
                <SelectItem value="moderate">Moderately Active</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="veryActive">Very Active</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{getActivityLevelDescription(activityLevel)}</p>
          </div>
          
          <div className="space-y-4">
            <Label>Your Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Weight Loss</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Moderate Gain</SelectItem>
                <SelectItem value="gainfast">Fast Gain</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {goal === 'lose' && "20% calorie deficit for fat loss"}
              {goal === 'maintain' && "Maintenance calories to sustain current weight"}
              {goal === 'gain' && "10% calorie surplus for lean muscle gain"}
              {goal === 'gainfast' && "20% calorie surplus for faster weight gain"}
            </p>
          </div>
          
          <div className="space-y-4 md:col-span-2">
            <Label>Macro Ratio</Label>
            <Select value={macroRatio} onValueChange={setMacroRatio}>
              <SelectTrigger>
                <SelectValue placeholder="Select macro distribution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Balanced (30/40/30)</SelectItem>
                <SelectItem value="lowCarb">Low Carb (40/20/40)</SelectItem>
                <SelectItem value="keto">Ketogenic (30/5/65)</SelectItem>
                <SelectItem value="highProtein">High Protein (40/30/30)</SelectItem>
                <SelectItem value="custom">Custom Ratio</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {macroRatio === 'balanced' && "A balanced approach suitable for most people (Protein/Carbs/Fat)"}
              {macroRatio === 'lowCarb' && "Reduced carbohydrate approach for better insulin control"}
              {macroRatio === 'keto' && "Very low carb, high fat approach for ketosis"}
              {macroRatio === 'highProtein' && "Higher protein for muscle building and recovery"}
              {macroRatio === 'custom' && "Set your own custom macronutrient ratio"}
            </p>
          </div>
          
          {macroRatio === 'custom' && (
            <div className="space-y-4 md:col-span-2">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-3">Custom Macro Ratio (Must equal 100%)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="protein-percent">Protein %</Label>
                    <Input
                      id="protein-percent"
                      type="number"
                      value={customProteinPercentage}
                      onChange={(e) => setCustomProteinPercentage(parseInt(e.target.value) || 0)}
                      min={10}
                      max={70}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="carb-percent">Carbs %</Label>
                    <Input
                      id="carb-percent"
                      type="number"
                      value={customCarbPercentage}
                      onChange={(e) => setCustomCarbPercentage(parseInt(e.target.value) || 0)}
                      min={5}
                      max={70}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fat-percent">Fat %</Label>
                    <Input
                      id="fat-percent"
                      type="number"
                      value={customFatPercentage}
                      onChange={(e) => setCustomFatPercentage(parseInt(e.target.value) || 0)}
                      min={10}
                      max={70}
                    />
                  </div>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm">Total:</span>
                  <span className={`font-medium ${customProteinPercentage + customCarbPercentage + customFatPercentage !== 100 ? 'text-red-500' : 'text-green-500'}`}>
                    {customProteinPercentage + customCarbPercentage + customFatPercentage}%
                  </span>
                </div>
                
                {customProteinPercentage + customCarbPercentage + customFatPercentage !== 100 && (
                  <p className="text-xs text-red-500 mt-2">
                    Percentages must add up to exactly 100%
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateMacros}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate Macros
          </Button>
        </div>
        
        {isCalculated && calories !== null && protein !== null && carbs !== null && fat !== null && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Your Daily Macro Targets</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ResultDisplay
                label="Daily Calories"
                value={`${calories} kcal`}
                description="Total energy intake"
                icon={<Calculator className="h-5 w-5" />}
                isHighlighted={true}
              />
              
              <ResultDisplay
                label="Protein"
                value={`${protein}g`}
                description={`${Math.round((protein * 4 / calories) * 100)}% of calories`}
                icon={<Calculator className="h-5 w-5" />}
              />
              
              <ResultDisplay
                label="Carbohydrates"
                value={`${carbs}g`}
                description={`${Math.round((carbs * 4 / calories) * 100)}% of calories`}
                icon={<Calculator className="h-5 w-5" />}
              />
              
              <ResultDisplay
                label="Fat"
                value={`${fat}g`}
                description={`${Math.round((fat * 9 / calories) * 100)}% of calories`}
                icon={<Calculator className="h-5 w-5" />}
              />
            </div>
            
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="font-semibold mb-4">Macro Distribution Visualization</h3>
              
              <div className="flex h-6 rounded-full overflow-hidden mb-4">
                <div 
                  className="bg-blue-500"
                  style={{ width: `${Math.round((protein * 4 / calories) * 100)}%` }}
                ></div>
                <div 
                  className="bg-green-500"
                  style={{ width: `${Math.round((carbs * 4 / calories) * 100)}%` }}
                ></div>
                <div 
                  className="bg-orange-500"
                  style={{ width: `${Math.round((fat * 9 / calories) * 100)}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full inline-block mr-1"></div>
                  <span>Protein</span>
                </div>
                <div>
                  <div className="w-3 h-3 bg-green-500 rounded-full inline-block mr-1"></div>
                  <span>Carbs</span>
                </div>
                <div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full inline-block mr-1"></div>
                  <span>Fat</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Tips for Meeting Your Macros</h4>
                
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Protein (4 calories/g):</strong> Lean meats, fish, eggs, dairy, legumes, and protein supplements.</li>
                  <li><strong>Carbohydrates (4 calories/g):</strong> Whole grains, fruits, vegetables, legumes, and tubers.</li>
                  <li><strong>Fats (9 calories/g):</strong> Oils, butter, avocados, nuts, seeds, and fatty fish.</li>
                </ul>
                
                <p className="mt-3 text-sm text-muted-foreground">
                  <strong>Note:</strong> These recommendations are estimates. Adjust based on your progress, energy levels, and how you feel.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default MacroNutrientCalculator;
