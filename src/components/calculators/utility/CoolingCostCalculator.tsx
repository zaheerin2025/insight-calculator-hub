
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Thermometer, Calculator } from 'lucide-react';
import { toast } from 'sonner';

const CoolingCostCalculator: React.FC = () => {
  // Inputs
  const [homeSize, setHomeSize] = useState<number>(1500);
  const [electricityRate, setElectricityRate] = useState<number>(0.15);
  const [seerRating, setSeerRating] = useState<number>(14);
  const [coolingMonths, setCoolingMonths] = useState<number>(4);
  const [averageTemp, setAverageTemp] = useState<number>(85);
  
  // Results
  const [results, setResults] = useState<{
    monthlyKwh: number;
    monthlyCost: number;
    seasonalCost: number;
    costPerSquareFoot: number;
  } | null>(null);
  
  // Calculate cooling costs
  const calculateCoolingCost = () => {
    try {
      if (
        isNaN(homeSize) || isNaN(electricityRate) || isNaN(seerRating) || 
        isNaN(coolingMonths) || isNaN(averageTemp) ||
        homeSize <= 0 || electricityRate <= 0 || seerRating <= 0 || 
        coolingMonths <= 0 || averageTemp <= 50
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate BTU capacity needed (rough estimate)
      const btuCapacity = homeSize * 30;
      
      // Estimate monthly run hours based on temperature
      // Basic estimation: 100 hours for mild climate, up to 300 hours for hot climate
      const baseRunHours = 100;
      const tempFactor = Math.max(0, (averageTemp - 65) / 10); // Increase hours based on avg temp above 65°F
      const monthlyRunHours = baseRunHours + (tempFactor * 40);
      
      // Calculate monthly energy usage (kWh)
      // kWh = (BTU/h) × run hours ÷ (SEER × 1000)
      const monthlyKwh = (btuCapacity * monthlyRunHours) / (seerRating * 1000);
      
      // Calculate costs
      const monthlyCost = monthlyKwh * electricityRate;
      const seasonalCost = monthlyCost * coolingMonths;
      const costPerSquareFoot = seasonalCost / homeSize;
      
      setResults({
        monthlyKwh,
        monthlyCost,
        seasonalCost,
        costPerSquareFoot
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
    "name": "Cooling Cost Calculator",
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
    { title: "Heating Cost Calculator", path: "/calculators/utility/heating-cost-calculator" },
    { title: "Solar Panel Savings Calculator", path: "/calculators/utility/solar-panel-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Cooling Cost Calculator"
      description="Calculate air conditioning and cooling costs during warm months."
      intro="Our cooling cost calculator helps you estimate your air conditioning expenses based on your home size, AC efficiency, and local electricity rates."
      formula={
        <div>
          <p>The cooling cost calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>BTU Capacity:</strong></p>
            <code>BTU Capacity = Home Size (sq ft) × 30 BTU/sq ft</code>
            
            <p className="mt-3"><strong>Monthly Energy Usage:</strong></p>
            <code>Monthly kWh = (BTU Capacity × Monthly Run Hours) ÷ (SEER Rating × 1000)</code>
            
            <p className="mt-3"><strong>Monthly Cost:</strong></p>
            <code>Monthly Cost = Monthly kWh × Electricity Rate</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What SEER rating should I look for in an air conditioner?",
          answer: "When buying a new air conditioner, look for a SEER (Seasonal Energy Efficiency Ratio) of at least 16 for good efficiency. The minimum legal SEER rating in the US is 13 or 14 depending on your region. Higher SEER ratings (18-26) indicate more energy-efficient units that cost more upfront but save significantly on operating costs over time. The optimal choice depends on your climate, cooling needs, and budget."
        },
        {
          question: "How can I reduce my air conditioning costs?",
          answer: "To reduce AC costs: 1) Set your thermostat to 78°F (26°C) when home and higher when away, 2) Use ceiling fans to circulate air, 3) Keep blinds and curtains closed during the day, 4) Ensure proper insulation and seal air leaks, 5) Use a programmable or smart thermostat, 6) Clean or replace air filters monthly, 7) Schedule annual AC maintenance, 8) Consider installing window films or awnings, and 9) Upgrade to a higher SEER-rated unit when replacing your system."
        },
        {
          question: "Is a higher SEER rating worth the extra cost?",
          answer: "Whether a higher SEER rating justifies the extra cost depends on your climate and usage patterns. In hot climates where air conditioning runs frequently, upgrading from a SEER 14 to SEER 16 unit can typically provide payback in 3-5 years through energy savings. For cooler climates with shorter cooling seasons, the payback period may be longer. Calculate your expected energy savings based on your usage and electricity rates to determine if the premium price is worth it for your situation."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/cooling-cost-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="home-size"
            label="Home Size"
            type="number"
            value={homeSize}
            onChange={(value) => setHomeSize(parseFloat(value) || 0)}
            min={100}
            step={100}
            suffix=" sq ft"
            helperText="Enter your home's cooled area in square feet"
          />
          
          <CalculatorInput
            id="electricity-rate"
            label="Electricity Rate"
            type="number"
            value={electricityRate}
            onChange={(value) => setElectricityRate(parseFloat(value) || 0)}
            min={0.01}
            step={0.01}
            prefix="$"
            suffix=" / kWh"
            helperText="Enter your electricity cost per kilowatt-hour"
          />
          
          <CalculatorInput
            id="seer-rating"
            label="SEER Rating"
            type="number"
            value={seerRating}
            onChange={(value) => setSeerRating(parseFloat(value) || 0)}
            min={8}
            max={30}
            step={0.5}
            helperText="Enter your AC's SEER rating (typically 13-22 for modern units)"
          />
          
          <CalculatorInput
            id="average-temp"
            label="Average Summer Temperature"
            type="number"
            value={averageTemp}
            onChange={(value) => setAverageTemp(parseFloat(value) || 0)}
            min={60}
            max={120}
            step={1}
            suffix="°F"
            helperText="Enter your area's average summer temperature"
          />
          
          <CalculatorInput
            id="cooling-months"
            label="Cooling Season Length"
            type="number"
            value={coolingMonths}
            onChange={(value) => setCoolingMonths(parseFloat(value) || 0)}
            min={1}
            max={12}
            step={1}
            suffix=" months"
            helperText="Enter the number of months you use air conditioning in a year"
          />
          
          <Button 
            onClick={calculateCoolingCost}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Cooling Cost
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Cooling Cost Summary</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Monthly Energy Usage"
                    value={`${results.monthlyKwh.toFixed(0)} kWh`}
                    icon={<Thermometer className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Monthly Cost"
                    value={`$${results.monthlyCost.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label={`Seasonal Cost (${coolingMonths} months)`}
                    value={`$${results.seasonalCost.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label="Cost per Square Foot"
                    value={`$${results.costPerSquareFoot.toFixed(2)}/sq ft`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>For a {homeSize} sq ft home with a SEER {seerRating} air conditioner:</p>
                  <p className="mt-2">Your estimated monthly cooling cost is <strong>${results.monthlyCost.toFixed(2)}</strong></p>
                  <p className="mt-1">Your total seasonal cooling cost is approximately <strong>${results.seasonalCost.toFixed(2)}</strong></p>
                  
                  {seerRating < 16 && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                      <p className="font-medium">Energy Saving Tip:</p>
                      <p>Consider upgrading to a higher efficiency AC unit. Upgrading from SEER {seerRating} to SEER 18 could reduce your cooling costs by approximately ${(results.seasonalCost - (results.seasonalCost * seerRating / 18)).toFixed(2)} per season.</p>
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

export default CoolingCostCalculator;
