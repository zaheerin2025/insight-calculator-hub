
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ResultDisplay from '../ResultDisplay';
import { Calculator, User } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const WaistHipRatioCalculator: React.FC = () => {
  const [gender, setGender] = useState<string>("female");
  const [units, setUnits] = useState<'cm' | 'inches'>('cm');
  const [waistSize, setWaistSize] = useState<number>(80);
  const [hipSize, setHipSize] = useState<number>(100);
  
  const [whr, setWhr] = useState<number | null>(null);
  const [riskCategory, setRiskCategory] = useState<string>("");
  const [bodyShape, setBodyShape] = useState<string>("");
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateWHR = () => {
    try {
      if (waistSize <= 0 || hipSize <= 0) {
        toast.error("Measurements must be greater than zero");
        return;
      }
      
      const ratio = waistSize / hipSize;
      setWhr(parseFloat(ratio.toFixed(2)));
      
      // Determine health risk category based on WHO guidelines
      if (gender === "female") {
        if (ratio < 0.76) {
          setRiskCategory("Low Risk");
        } else if (ratio >= 0.76 && ratio < 0.85) {
          setRiskCategory("Moderate Risk");
        } else {
          setRiskCategory("High Risk");
        }
        
        // Determine body shape
        if (ratio <= 0.8) {
          setBodyShape("Pear/Gynoid");
        } else {
          setBodyShape("Apple/Android");
        }
      } else {
        if (ratio < 0.91) {
          setRiskCategory("Low Risk");
        } else if (ratio >= 0.91 && ratio < 1.0) {
          setRiskCategory("Moderate Risk");
        } else {
          setRiskCategory("High Risk");
        }
        
        // Determine body shape
        if (ratio < 0.9) {
          setBodyShape("Pear/Gynoid");
        } else {
          setBodyShape("Apple/Android");
        }
      }
      
      setIsCalculated(true);
      toast.success('Waist-to-hip ratio calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const getRiskDescription = (risk: string): string => {
    switch (risk) {
      case "Low Risk":
        return "Lower risk of cardiovascular and metabolic diseases";
      case "Moderate Risk":
        return "Moderate risk of health complications";
      case "High Risk":
        return "Higher risk of cardiovascular disease and type 2 diabetes";
      default:
        return "";
    }
  };
  
  const getBodyShapeDescription = (shape: string): string => {
    if (shape === "Pear/Gynoid") {
      return "Fat distribution primarily in hips and thighs";
    } else {
      return "Fat distribution primarily around the waist/abdomen";
    }
  };
  
  const getHealthRecommendations = (): string[] => {
    const recommendations = [
      "Maintain a balanced diet rich in whole foods",
      "Engage in regular physical activity (150+ minutes/week)"
    ];
    
    if (riskCategory === "Moderate Risk" || riskCategory === "High Risk") {
      recommendations.push(
        "Consider increasing cardiovascular exercise",
        "Focus on reducing refined carbohydrates and sugars",
        "Consider consulting a healthcare provider"
      );
    }
    
    if (riskCategory === "High Risk") {
      recommendations.push(
        "Monitor blood pressure, blood glucose, and lipid profiles regularly",
        "Consider working with a dietitian or nutritionist"
      );
    }
    
    return recommendations;
  };

  return (
    <CalculatorLayout
      title="Waist-to-Hip Ratio Calculator"
      description="Calculate your waist-to-hip ratio to assess health risks related to weight distribution."
      intro="The waist-to-hip ratio (WHR) is a simple measurement that helps assess how body fat is distributed and the associated health risks. Fat distribution patterns can be more important than overall weight in predicting certain health issues."
      formula={
        <div>
          <p className="mb-4">The waist-to-hip ratio is calculated using the following simple formula:</p>
          
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <p><code>WHR = Waist Circumference ÷ Hip Circumference</code></p>
          </div>
          
          <p className="mt-4 mb-2">Based on World Health Organization (WHO) guidelines, health risk categories are:</p>
          
          <div className="bg-muted p-4 rounded-md my-4">
            <p className="font-medium">For Women:</p>
            <ul className="list-disc ml-6 space-y-1 mt-1">
              <li>Low Risk: Less than 0.76</li>
              <li>Moderate Risk: 0.76 - 0.85</li>
              <li>High Risk: Greater than 0.85</li>
            </ul>
            
            <p className="font-medium mt-4">For Men:</p>
            <ul className="list-disc ml-6 space-y-1 mt-1">
              <li>Low Risk: Less than 0.91</li>
              <li>Moderate Risk: 0.91 - 1.0</li>
              <li>High Risk: Greater than 1.0</li>
            </ul>
          </div>
          
          <p className="mt-4">Body shapes are typically categorized as:</p>
          <ul className="list-disc ml-6 space-y-1 mt-1">
            <li><strong>Pear/Gynoid:</strong> WHR ≤ 0.8 for women, &lt; 0.9 for men</li>
            <li><strong>Apple/Android:</strong> WHR > 0.8 for women, ≥ 0.9 for men</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "How do I measure my waist and hip correctly?",
          answer: "For your waist: Measure at the narrowest part of your torso, usually just above the belly button. Stand relaxed and breathe normally. For your hips: Measure at the widest part of your buttocks or hips, whichever is wider. Keep the measuring tape parallel to the floor for both measurements."
        },
        {
          question: "Why is waist-to-hip ratio important for health?",
          answer: "WHR indicates how fat is distributed in your body. 'Apple' fat distribution (more fat around the waist) is associated with higher risk of heart disease, type 2 diabetes, and other metabolic conditions compared to 'pear' fat distribution (more fat around hips and thighs)."
        },
        {
          question: "Is WHR better than BMI for health assessment?",
          answer: "They provide different information. BMI measures overall body mass relative to height but doesn't distinguish between muscle and fat or indicate fat distribution. WHR specifically measures fat distribution patterns, which can be more predictive for certain health risks. Using both metrics together provides a more complete assessment."
        },
        {
          question: "How can I improve my waist-to-hip ratio?",
          answer: "To reduce WHR: 1) Focus on overall fat loss through caloric deficit and exercise, 2) Incorporate regular cardiovascular exercise to reduce visceral fat, 3) Add strength training to build muscle, 4) Reduce stress and improve sleep quality, 5) Limit alcohol consumption and processed foods, 6) Increase fiber and protein intake."
        }
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="units">Measurement Units</Label>
              <Tabs value={units} onValueChange={(value) => setUnits(value as 'cm' | 'inches')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cm">Centimeters (cm)</TabsTrigger>
                  <TabsTrigger value="inches">Inches (in)</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="waist">Waist Circumference</Label>
              <div className="flex">
                <Input
                  id="waist"
                  type="number"
                  value={waistSize}
                  onChange={(e) => setWaistSize(parseFloat(e.target.value) || 0)}
                  min={1}
                  step={0.1}
                  className="flex-grow"
                />
                <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted">
                  {units}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Measure at the narrowest part of your torso (natural waist)</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hip">Hip Circumference</Label>
              <div className="flex">
                <Input
                  id="hip"
                  type="number"
                  value={hipSize}
                  onChange={(e) => setHipSize(parseFloat(e.target.value) || 0)}
                  min={1}
                  step={0.1}
                  className="flex-grow"
                />
                <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted">
                  {units}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Measure at the widest part of your buttocks/hips</p>
            </div>
            
            <Button onClick={calculateWHR} className="w-full">Calculate Waist-to-Hip Ratio</Button>
          </div>
          
          <div>
            {isCalculated && whr !== null ? (
              <div className="space-y-6">
                <ResultDisplay
                  label="Waist-to-Hip Ratio"
                  value={whr.toString()}
                  description={bodyShape + " body shape"}
                  icon={<User className="h-5 w-5" />}
                  isHighlighted={true}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResultDisplay
                    label="Health Risk Category"
                    value={riskCategory}
                    description={getRiskDescription(riskCategory)}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={riskCategory === "High Risk"}
                  />
                  
                  <ResultDisplay
                    label="Body Shape"
                    value={bodyShape}
                    description={getBodyShapeDescription(bodyShape)}
                    icon={<User className="h-5 w-5" />}
                  />
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">What Your WHR Means</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {bodyShape === "Apple/Android" 
                        ? "Your fat distribution is primarily around the waist/abdomen (apple shape). This pattern is associated with higher health risks compared to pear-shaped distribution."
                        : "Your fat distribution is primarily in the hips and thighs (pear shape). This pattern generally carries lower health risks than apple-shaped distribution."
                      }
                    </p>
                    
                    <h4 className="font-medium mb-2">Health Recommendations</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {getHealthRecommendations().map((recommendation, index) => (
                        <li key={index}>• {recommendation}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
                  <p>
                    <strong>Note:</strong> This calculator provides general guidance only. For a complete health assessment, 
                    consult with a healthcare provider who can consider your full medical history and other health factors.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <div className="text-center">
                  <User className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">Waist-to-Hip Ratio Result</h3>
                  <p className="text-muted-foreground">
                    Enter your measurements and click calculate to see your waist-to-hip ratio and what it means for your health.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default WaistHipRatioCalculator;
