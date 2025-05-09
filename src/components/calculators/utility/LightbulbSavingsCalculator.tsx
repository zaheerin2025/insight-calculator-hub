
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Lightbulb, Calculator, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface BulbOption {
  type: string;
  wattage: number;
  lifespan: number;
  cost: number;
}

const LightbulbSavingsCalculator: React.FC = () => {
  // Bulb options (presets)
  const bulbOptions: BulbOption[] = [
    { type: 'Incandescent', wattage: 60, lifespan: 1000, cost: 1 },
    { type: 'CFL', wattage: 15, lifespan: 8000, cost: 2 },
    { type: 'LED', wattage: 9, lifespan: 25000, cost: 3 },
    { type: 'Halogen', wattage: 43, lifespan: 2000, cost: 2.5 }
  ];
  
  // Inputs
  const [oldBulbType, setOldBulbType] = useState<string>('Incandescent');
  const [newBulbType, setNewBulbType] = useState<string>('LED');
  const [oldBulbWattage, setOldBulbWattage] = useState<number>(60);
  const [newBulbWattage, setNewBulbWattage] = useState<number>(9);
  const [oldBulbCost, setOldBulbCost] = useState<number>(1);
  const [newBulbCost, setNewBulbCost] = useState<number>(3);
  const [oldBulbLifespan, setOldBulbLifespan] = useState<number>(1000);
  const [newBulbLifespan, setNewBulbLifespan] = useState<number>(25000);
  const [hoursPerDay, setHoursPerDay] = useState<number>(5);
  const [electricityRate, setElectricityRate] = useState<number>(0.15);
  const [bulbCount, setBulbCount] = useState<number>(10);
  
  // Results
  const [results, setResults] = useState<{
    annualEnergySavings: number;
    annualCostSavings: number;
    lifespan: number;
    bulbCostSavings: number;
    totalLifetimeSavings: number;
    paybackPeriod: number;
  } | null>(null);
  
  // Handle bulb type selection
  const handleOldBulbTypeChange = (type: string) => {
    const bulb = bulbOptions.find(b => b.type === type);
    if (bulb) {
      setOldBulbType(type);
      setOldBulbWattage(bulb.wattage);
      setOldBulbCost(bulb.cost);
      setOldBulbLifespan(bulb.lifespan);
    }
  };
  
  const handleNewBulbTypeChange = (type: string) => {
    const bulb = bulbOptions.find(b => b.type === type);
    if (bulb) {
      setNewBulbType(type);
      setNewBulbWattage(bulb.wattage);
      setNewBulbCost(bulb.cost);
      setNewBulbLifespan(bulb.lifespan);
    }
  };
  
  // Calculate savings
  const calculateSavings = () => {
    try {
      if (
        isNaN(oldBulbWattage) || isNaN(newBulbWattage) || isNaN(oldBulbCost) || 
        isNaN(newBulbCost) || isNaN(oldBulbLifespan) || isNaN(newBulbLifespan) || 
        isNaN(hoursPerDay) || isNaN(electricityRate) || isNaN(bulbCount) ||
        oldBulbWattage <= 0 || newBulbWattage <= 0 || oldBulbLifespan <= 0 || 
        newBulbLifespan <= 0 || hoursPerDay <= 0 || electricityRate <= 0 || bulbCount <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate annual energy usage (kWh)
      const oldBulbAnnualEnergy = (oldBulbWattage / 1000) * hoursPerDay * 365 * bulbCount;
      const newBulbAnnualEnergy = (newBulbWattage / 1000) * hoursPerDay * 365 * bulbCount;
      const annualEnergySavings = oldBulbAnnualEnergy - newBulbAnnualEnergy;
      
      // Calculate annual cost savings
      const annualCostSavings = annualEnergySavings * electricityRate;
      
      // Calculate lifespan of new bulbs in years
      const newBulbLifespanYears = newBulbLifespan / (hoursPerDay * 365);
      
      // Calculate bulb replacement costs over the lifespan of new bulbs
      const oldBulbsNeededPerNewBulbLifespan = newBulbLifespan / oldBulbLifespan;
      const oldBulbReplacementCost = oldBulbsNeededPerNewBulbLifespan * oldBulbCost * bulbCount;
      const newBulbTotalCost = newBulbCost * bulbCount;
      const bulbCostSavings = oldBulbReplacementCost - newBulbTotalCost;
      
      // Calculate total savings over new bulb lifespan
      const energyCostSavingsOverLifespan = annualCostSavings * newBulbLifespanYears;
      const totalLifetimeSavings = energyCostSavingsOverLifespan + bulbCostSavings;
      
      // Calculate payback period (in months)
      const initialInvestmentDifference = (newBulbCost - oldBulbCost) * bulbCount;
      const monthlySavings = annualCostSavings / 12;
      const paybackPeriod = initialInvestmentDifference > 0 
        ? initialInvestmentDifference / monthlySavings
        : 0;
      
      setResults({
        annualEnergySavings,
        annualCostSavings,
        lifespan: newBulbLifespanYears,
        bulbCostSavings,
        totalLifetimeSavings,
        paybackPeriod
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
    "name": "Light Bulb Energy Savings Calculator",
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
    { title: "Appliance Energy Use Calculator", path: "/calculators/utility/appliance-energy-calculator" },
    { title: "Solar Panel Savings Calculator", path: "/calculators/utility/solar-panel-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Light Bulb Energy Savings Calculator"
      description="Compare different light bulb types and calculate energy savings."
      intro="Our light bulb savings calculator helps you determine how much money and energy you can save by switching to energy-efficient lighting options."
      formula={
        <div>
          <p>The light bulb savings calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Annual Energy Usage (kWh):</strong></p>
            <code>Annual Energy = (Wattage ÷ 1000) × Hours per Day × 365 × Bulb Count</code>
            
            <p className="mt-3"><strong>Annual Cost Savings:</strong></p>
            <code>Annual Savings = (Old Bulb kWh - New Bulb kWh) × Electricity Rate</code>
            
            <p className="mt-3"><strong>Bulb Lifetime (years):</strong></p>
            <code>Lifetime = Bulb Lifespan Hours ÷ (Hours per Day × 365)</code>
            
            <p className="mt-3"><strong>Payback Period (months):</strong></p>
            <code>Payback Period = (New Bulb Cost - Old Bulb Cost) × Bulb Count ÷ (Annual Savings ÷ 12)</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "Which type of light bulb is most energy efficient?",
          answer: "LED bulbs are currently the most energy-efficient option for home lighting. They use 75-80% less energy than incandescent bulbs and last 15-25 times longer. LED technology continues to improve, with newer models offering better light quality and dimming capabilities at lower prices. CFLs (Compact Fluorescent Lamps) are the second most efficient option but contain small amounts of mercury and are being phased out in favor of LEDs."
        },
        {
          question: "How do I choose the right LED bulb brightness?",
          answer: "When switching from incandescent to LED bulbs, focus on lumens (light output) rather than watts (energy consumption). For replacement: a 40W incandescent bulb ≈ 450 lumens, 60W ≈ 800 lumens, 75W ≈ 1100 lumens, and 100W ≈ 1600 lumens. Also consider color temperature: 2700K-3000K provides warm/soft white light suitable for living spaces, 3500K-4100K gives bright white light good for workspaces, and 5000K-6500K produces cool daylight ideal for reading or detail work."
        },
        {
          question: "Are LED bulbs worth the higher upfront cost?",
          answer: "Yes, LED bulbs are worth the higher upfront cost for most households. Though they cost more initially, LEDs typically pay for themselves within 6-12 months through energy savings. Over their lifetime (typically 15-25 years for household use), a single LED bulb can save $50-$100 in electricity costs compared to incandescent alternatives. Additionally, the reduced need for replacements saves both money and the inconvenience of changing bulbs frequently."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/lightbulb-savings-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="space-y-2 mb-4">
                <label htmlFor="old-bulb-type" className="block text-sm font-medium">
                  Current Bulb Type
                </label>
                <select
                  id="old-bulb-type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={oldBulbType}
                  onChange={(e) => handleOldBulbTypeChange(e.target.value)}
                >
                  {bulbOptions.map((bulb) => (
                    <option key={`old-${bulb.type}`} value={bulb.type}>
                      {bulb.type}
                    </option>
                  ))}
                </select>
              </div>
              
              <CalculatorInput
                id="old-bulb-wattage"
                label="Current Bulb Wattage"
                type="number"
                value={oldBulbWattage}
                onChange={(value) => setOldBulbWattage(parseFloat(value) || 0)}
                min={1}
                step={1}
                suffix=" W"
                helperText=""
              />
              
              <CalculatorInput
                id="old-bulb-cost"
                label="Current Bulb Cost"
                type="number"
                value={oldBulbCost}
                onChange={(value) => setOldBulbCost(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                prefix="$"
                helperText=""
              />
              
              <CalculatorInput
                id="old-bulb-lifespan"
                label="Current Bulb Lifespan"
                type="number"
                value={oldBulbLifespan}
                onChange={(value) => setOldBulbLifespan(parseFloat(value) || 0)}
                min={100}
                step={100}
                suffix=" hours"
                helperText=""
              />
            </div>
            
            <div>
              <div className="space-y-2 mb-4">
                <label htmlFor="new-bulb-type" className="block text-sm font-medium">
                  New Bulb Type
                </label>
                <select
                  id="new-bulb-type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newBulbType}
                  onChange={(e) => handleNewBulbTypeChange(e.target.value)}
                >
                  {bulbOptions.map((bulb) => (
                    <option key={`new-${bulb.type}`} value={bulb.type}>
                      {bulb.type}
                    </option>
                  ))}
                </select>
              </div>
              
              <CalculatorInput
                id="new-bulb-wattage"
                label="New Bulb Wattage"
                type="number"
                value={newBulbWattage}
                onChange={(value) => setNewBulbWattage(parseFloat(value) || 0)}
                min={1}
                step={1}
                suffix=" W"
                helperText=""
              />
              
              <CalculatorInput
                id="new-bulb-cost"
                label="New Bulb Cost"
                type="number"
                value={newBulbCost}
                onChange={(value) => setNewBulbCost(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                prefix="$"
                helperText=""
              />
              
              <CalculatorInput
                id="new-bulb-lifespan"
                label="New Bulb Lifespan"
                type="number"
                value={newBulbLifespan}
                onChange={(value) => setNewBulbLifespan(parseFloat(value) || 0)}
                min={100}
                step={100}
                suffix=" hours"
                helperText=""
              />
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <CalculatorInput
              id="bulb-count"
              label="Number of Bulbs"
              type="number"
              value={bulbCount}
              onChange={(value) => setBulbCount(parseFloat(value) || 0)}
              min={1}
              step={1}
              suffix=" bulbs"
              helperText="Enter the number of bulbs you're replacing"
            />
            
            <CalculatorInput
              id="hours-per-day"
              label="Hours Used Per Day"
              type="number"
              value={hoursPerDay}
              onChange={(value) => setHoursPerDay(parseFloat(value) || 0)}
              min={0.5}
              max={24}
              step={0.5}
              suffix=" hours"
              helperText="Average daily use of these light bulbs"
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
              helperText="Your electricity cost per kilowatt-hour"
            />
          </div>
          
          <Button 
            onClick={calculateSavings}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Savings
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Light Bulb Savings Summary</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Annual Energy Savings"
                    value={`${results.annualEnergySavings.toFixed(0)} kWh`}
                    icon={<Zap className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Annual Cost Savings"
                    value={`$${results.annualCostSavings.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label={`New Bulbs Lifespan`}
                    value={`${results.lifespan.toFixed(1)} years`}
                    icon={<Lightbulb className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Bulb Replacement Savings"
                    value={`$${results.bulbCostSavings.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Total Lifetime Savings"
                    value={`$${results.totalLifetimeSavings.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  {results.paybackPeriod > 0 && (
                    <ResultDisplay
                      label="Payback Period"
                      value={`${results.paybackPeriod.toFixed(1)} months`}
                      icon={<Calculator className="h-5 w-5" />}
                    />
                  )}
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>By switching from {oldBulbType} ({oldBulbWattage}W) to {newBulbType} ({newBulbWattage}W) bulbs:</p>
                  <p className="mt-2">You'll save approximately <strong>${results.annualCostSavings.toFixed(2)}</strong> per year in electricity costs.</p>
                  <p className="mt-1">Over the {results.lifespan.toFixed(1)} year lifespan of your new bulbs, you'll save <strong>${results.totalLifetimeSavings.toFixed(2)}</strong> in total.</p>
                  
                  {results.paybackPeriod > 0 && (
                    <p className="mt-1">Your investment will pay for itself in <strong>{results.paybackPeriod.toFixed(1)} months</strong>.</p>
                  )}
                  
                  {oldBulbType === 'Incandescent' && newBulbType === 'LED' && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-green-700">
                      <p className="font-medium">Environmental Impact:</p>
                      <p>By switching {bulbCount} incandescent bulbs to LED, you'll reduce your carbon footprint by approximately {(results.annualEnergySavings * 0.85).toFixed(0)} pounds of CO₂ per year.</p>
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

export default LightbulbSavingsCalculator;
