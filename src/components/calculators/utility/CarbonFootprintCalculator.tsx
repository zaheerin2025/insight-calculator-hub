
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Activity, Calculator } from 'lucide-react';
import { toast } from 'sonner';

const CarbonFootprintCalculator: React.FC = () => {
  // Inputs
  const [electricityUsage, setElectricityUsage] = useState<number>(900);
  const [naturalGasUsage, setNaturalGasUsage] = useState<number>(50);
  const [fuelConsumption, setFuelConsumption] = useState<number>(500);
  const [flightMiles, setFlightMiles] = useState<number>(2000);
  const [dietType, setDietType] = useState<string>("mixed");
  const [householdSize, setHouseholdSize] = useState<number>(2);
  
  // Results
  const [results, setResults] = useState<{
    homeCO2: number;
    transportCO2: number;
    dietCO2: number;
    totalCO2: number;
    perPersonCO2: number;
    comparisonToAverage: number;
  } | null>(null);
  
  // Calculate carbon footprint
  const calculateCarbonFootprint = () => {
    try {
      if (
        isNaN(electricityUsage) || isNaN(naturalGasUsage) || isNaN(fuelConsumption) || 
        isNaN(flightMiles) || householdSize <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Constants for carbon emission factors
      const electricityFactor = 0.92; // lbs CO2 per kWh
      const naturalGasFactor = 11.7; // lbs CO2 per therm
      const gasolineFactor = 19.6; // lbs CO2 per gallon
      const flightFactor = 0.4; // lbs CO2 per mile
      
      // Diet type factors (lbs CO2 per person per year)
      const dietFactors: Record<string, number> = {
        vegan: 1500,
        vegetarian: 2500,
        mixed: 3500,
        meat_heavy: 5000
      };
      
      // Calculate CO2 emissions
      const electricityCO2 = electricityUsage * electricityFactor * 12; // annual
      const naturalGasCO2 = naturalGasUsage * naturalGasFactor * 12; // annual
      const gasolineCO2 = fuelConsumption * gasolineFactor; // annual
      const flightCO2 = flightMiles * flightFactor; // annual
      const dietCO2 = dietFactors[dietType] * householdSize;
      
      // Calculate totals
      const homeCO2 = electricityCO2 + naturalGasCO2;
      const transportCO2 = gasolineCO2 + flightCO2;
      const totalCO2 = homeCO2 + transportCO2 + dietCO2;
      const perPersonCO2 = totalCO2 / householdSize;
      
      // Average US carbon footprint per person is about 36,000 lbs (16.3 metric tons) per year
      const averageFootprint = 36000;
      const comparisonToAverage = (perPersonCO2 / averageFootprint) * 100;
      
      setResults({
        homeCO2,
        transportCO2,
        dietCO2,
        totalCO2,
        perPersonCO2,
        comparisonToAverage
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Carbon Footprint Calculator",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };
  
  // Related calculators
  const relatedCalculators = [
    { title: "Electricity Bill Calculator", path: "/calculators/utility/electricity-bill-calculator" },
    { title: "Gas Mileage Calculator", path: "/calculators/utility/gas-mileage-calculator" },
    { title: "Solar Panel Savings Calculator", path: "/calculators/utility/solar-panel-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Carbon Footprint Calculator"
      description="Estimate your personal or household carbon footprint based on lifestyle choices."
      intro="Our carbon footprint calculator helps you understand your environmental impact by estimating the greenhouse gas emissions resulting from your lifestyle choices."
      formula={
        <div>
          <p>The carbon footprint calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Home Energy Emissions:</strong></p>
            <code>Home CO₂ = (Electricity kWh × 0.92 + Natural Gas therms × 11.7) × 12 months</code>
            
            <p className="mt-3"><strong>Transportation Emissions:</strong></p>
            <code>Transport CO₂ = Gasoline gallons × 19.6 + Flight miles × 0.4</code>
            
            <p className="mt-3"><strong>Total CO₂:</strong></p>
            <code>Total CO₂ = Home CO₂ + Transport CO₂ + Diet CO₂</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What is a carbon footprint?",
          answer: "A carbon footprint is the total amount of greenhouse gases (primarily carbon dioxide) emitted directly or indirectly by an individual, organization, event, or product. It's typically measured in tons or pounds of CO₂ equivalent per year and includes emissions from activities such as home energy use, transportation, diet, and consumption of goods and services."
        },
        {
          question: "What actions have the biggest impact on reducing my carbon footprint?",
          answer: "The most impactful ways to reduce your carbon footprint include: 1) Reducing or eliminating air travel, 2) Driving less or switching to an electric vehicle, 3) Eating less meat, especially beef, 4) Improving home energy efficiency or switching to renewable energy, 5) Reducing consumption of new products, especially fast fashion and electronics, and 6) Supporting policy changes that address climate change at a systemic level."
        },
        {
          question: "How accurate are carbon footprint calculators?",
          answer: "Carbon footprint calculators provide estimates rather than precise measurements. Accuracy varies based on the methodology used and the level of detail in your inputs. This calculator uses average emission factors that may not perfectly match your specific circumstances. For a more detailed assessment, consider a comprehensive calculator that includes additional factors like specific consumer purchases, waste generation, and local emission factors."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/carbon-footprint-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="pb-2 mb-2 border-b">
            <h3 className="font-medium mb-3">Home Energy</h3>
            
            <CalculatorInput
              id="electricity"
              label="Monthly Electricity Usage"
              type="number"
              value={electricityUsage}
              onChange={(value) => setElectricityUsage(parseFloat(value) || 0)}
              min={0}
              step={10}
              suffix=" kWh"
              helperText="Average monthly electricity consumption"
            />
            
            <CalculatorInput
              id="natural-gas"
              label="Monthly Natural Gas Usage"
              type="number"
              value={naturalGasUsage}
              onChange={(value) => setNaturalGasUsage(parseFloat(value) || 0)}
              min={0}
              step={5}
              suffix=" therms"
              helperText="Average monthly natural gas consumption"
            />
          </div>
          
          <div className="pb-2 mb-2 border-b">
            <h3 className="font-medium mb-3">Transportation</h3>
            
            <CalculatorInput
              id="fuel"
              label="Annual Gasoline Consumption"
              type="number"
              value={fuelConsumption}
              onChange={(value) => setFuelConsumption(parseFloat(value) || 0)}
              min={0}
              step={10}
              suffix=" gallons"
              helperText="Estimated annual gasoline used for transportation"
            />
            
            <CalculatorInput
              id="flight"
              label="Annual Flight Distance"
              type="number"
              value={flightMiles}
              onChange={(value) => setFlightMiles(parseFloat(value) || 0)}
              min={0}
              step={100}
              suffix=" miles"
              helperText="Total annual air travel distance"
            />
          </div>
          
          <div className="pb-2 mb-2 border-b">
            <h3 className="font-medium mb-3">Lifestyle</h3>
            
            <div className="space-y-2 mb-4">
              <label htmlFor="diet-type" className="block text-sm font-medium">
                Diet Type
              </label>
              <select
                id="diet-type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
              >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="mixed">Mixed Diet (Moderate Meat)</option>
                <option value="meat_heavy">Meat Heavy Diet</option>
              </select>
              <p className="text-xs text-muted-foreground">Select your typical diet type</p>
            </div>
            
            <CalculatorInput
              id="household"
              label="Household Size"
              type="number"
              value={householdSize}
              onChange={(value) => setHouseholdSize(parseFloat(value) || 0)}
              min={1}
              step={1}
              suffix=" people"
              helperText="Number of people in your household"
            />
          </div>
          
          <Button 
            onClick={calculateCarbonFootprint}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Carbon Footprint
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Carbon Footprint Summary</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Home Energy Emissions"
                    value={`${(results.homeCO2 / 2000).toFixed(1)} tons CO₂/year`}
                    icon={<Activity className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Transportation Emissions"
                    value={`${(results.transportCO2 / 2000).toFixed(1)} tons CO₂/year`}
                    icon={<Activity className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Diet Emissions"
                    value={`${(results.dietCO2 / 2000).toFixed(1)} tons CO₂/year`}
                    icon={<Activity className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Total Household Emissions"
                    value={`${(results.totalCO2 / 2000).toFixed(1)} tons CO₂/year`}
                    icon={<Activity className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label="Per Person Emissions"
                    value={`${(results.perPersonCO2 / 2000).toFixed(1)} tons CO₂/year`}
                    icon={<Activity className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>Your annual household carbon footprint is approximately <strong>{(results.totalCO2 / 2000).toFixed(1)} tons</strong> of CO₂.</p>
                  <p className="mt-2">Per person, your footprint is <strong>{(results.perPersonCO2 / 2000).toFixed(1)} tons</strong>, which is <strong>{results.comparisonToAverage < 100 ? "below" : "above"}</strong> the U.S. average.</p>
                  
                  <div className="mt-4">
                    <p className="font-medium">Your carbon footprint compared to U.S. average:</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          results.comparisonToAverage <= 75 ? 'bg-green-500' : 
                          results.comparisonToAverage <= 100 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(results.comparisonToAverage, 200)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                      <span>150%</span>
                      <span>200%</span>
                    </div>
                  </div>
                  
                  {results.homeCO2 > results.transportCO2 && results.homeCO2 > results.dietCO2 ? (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                      <p className="font-medium">Reduction Tip:</p>
                      <p>Your home energy use contributes most to your carbon footprint. Consider energy-efficient appliances, better insulation, or switching to renewable energy sources.</p>
                    </div>
                  ) : results.transportCO2 > results.homeCO2 && results.transportCO2 > results.dietCO2 ? (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                      <p className="font-medium">Reduction Tip:</p>
                      <p>Transportation is your largest emission source. Consider carpooling, public transit, reducing flights, or switching to an electric or more fuel-efficient vehicle.</p>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                      <p className="font-medium">Reduction Tip:</p>
                      <p>Your diet contributes significantly to your carbon footprint. Consider reducing meat consumption, especially beef, and eating more plant-based meals.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default CarbonFootprintCalculator;
