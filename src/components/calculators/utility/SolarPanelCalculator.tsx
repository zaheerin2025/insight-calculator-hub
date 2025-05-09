
import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Sun, Calculator, Zap } from 'lucide-react';
import { toast } from 'sonner';

const SolarPanelCalculator: React.FC = () => {
  // Inputs
  const [monthlyEnergyUsage, setMonthlyEnergyUsage] = useState<number>(800);
  const [electricityRate, setElectricityRate] = useState<number>(0.15);
  const [sunlightHours, setSunlightHours] = useState<number>(5);
  const [systemCost, setSystemCost] = useState<number>(15000);
  const [incentivePercentage, setIncentivePercentage] = useState<number>(30);
  
  // Results
  const [results, setResults] = useState<{
    recommendedSystemSize: number;
    annualSavings: number;
    paybackPeriod: number;
    twentyFiveYearSavings: number;
    co2Reduction: number;
  } | null>(null);
  
  // Calculate solar panel savings
  const calculateSolarSavings = () => {
    try {
      if (
        isNaN(monthlyEnergyUsage) || isNaN(electricityRate) || isNaN(sunlightHours) || 
        isNaN(systemCost) || isNaN(incentivePercentage) ||
        monthlyEnergyUsage <= 0 || electricityRate <= 0 || sunlightHours <= 0 || systemCost <= 0 || 
        incentivePercentage < 0 || incentivePercentage > 100
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate recommended system size (in kW)
      const dailyEnergyUsage = monthlyEnergyUsage / 30;
      const recommendedSystemSize = dailyEnergyUsage / (sunlightHours * 0.75); // Assuming 75% efficiency
      
      // Calculate annual energy production (kWh)
      const annualProduction = recommendedSystemSize * sunlightHours * 365 * 0.75;
      
      // Calculate annual savings
      const annualSavings = annualProduction * electricityRate;
      
      // Calculate actual system cost after incentives
      const actualSystemCost = systemCost * (1 - (incentivePercentage / 100));
      
      // Calculate payback period
      const paybackPeriod = actualSystemCost / annualSavings;
      
      // Calculate 25-year savings (excluding inflation and panel degradation for simplicity)
      const twentyFiveYearSavings = (annualSavings * 25) - actualSystemCost;
      
      // Estimate CO2 reduction (average 0.85 pounds CO2 per kWh)
      const co2Reduction = annualProduction * 0.85 / 2.2; // Convert to kg
      
      setResults({
        recommendedSystemSize,
        annualSavings,
        paybackPeriod,
        twentyFiveYearSavings,
        co2Reduction
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
    "name": "Solar Panel Savings Calculator",
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
    { title: "Light Bulb Energy Savings Calculator", path: "/calculators/utility/lightbulb-savings-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Solar Panel Savings Calculator"
      description="Estimate potential savings from installing solar panels based on your energy usage and location."
      intro="Our solar panel calculator helps you determine if solar panels are a good investment for your home by estimating potential savings, payback period, and environmental benefits."
      formula={
        <div>
          <p>The solar panel savings calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Recommended System Size (kW):</strong></p>
            <code>System Size = (Monthly Energy Usage ÷ 30) ÷ (Peak Sun Hours × Efficiency)</code>
            
            <p className="mt-3"><strong>Annual Savings:</strong></p>
            <code>Annual Savings = System Size × Peak Sun Hours × 365 × Efficiency × Electricity Rate</code>
            
            <p className="mt-3"><strong>Payback Period (years):</strong></p>
            <code>Payback Period = Actual System Cost ÷ Annual Savings</code>
            
            <p className="mt-3"><strong>Where:</strong></p>
            <code>Actual System Cost = System Cost × (1 - Incentive Percentage ÷ 100)</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "How many solar panels do I need for my home?",
          answer: "The number of solar panels needed depends on your energy consumption, available roof space, panel efficiency, and local climate. A typical home might require 20-25 panels to cover 100% of electricity needs, but this varies widely. Our calculator estimates the system size you need based on your energy usage."
        },
        {
          question: "What is the payback period for solar panels?",
          answer: "The payback period for solar panels typically ranges from 6-12 years depending on your location, electricity rates, available incentives, and system cost. After this period, the electricity generated is essentially free for the remaining life of the system, which is typically 25+ years."
        },
        {
          question: "What incentives are available for solar panel installation?",
          answer: "Incentives vary by location but often include federal tax credits (currently 30% in the US), state rebates, local utility rebates, performance-based incentives, and net metering. Check with local authorities and utilities for incentives specific to your area."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/solar-panel-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="monthly-energy"
            label="Monthly Energy Usage"
            type="number"
            value={monthlyEnergyUsage}
            onChange={(value) => setMonthlyEnergyUsage(parseFloat(value) || 0)}
            min={0}
            step={10}
            suffix=" kWh"
            helperText="Enter your average monthly electricity consumption in kilowatt-hours"
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
            helperText="Enter your current electricity rate per kWh"
          />
          
          <CalculatorInput
            id="sunlight-hours"
            label="Peak Sun Hours"
            type="number"
            value={sunlightHours}
            onChange={(value) => setSunlightHours(parseFloat(value) || 0)}
            min={1}
            max={12}
            step={0.5}
            suffix=" hours/day"
            helperText="Average daily peak sunlight hours in your location (typically 4-7)"
          />
          
          <CalculatorInput
            id="system-cost"
            label="Estimated System Cost"
            type="number"
            value={systemCost}
            onChange={(value) => setSystemCost(parseFloat(value) || 0)}
            min={1000}
            step={500}
            prefix="$"
            helperText="Estimated cost for installation before incentives"
          />
          
          <CalculatorInput
            id="incentive"
            label="Available Incentives"
            type="number"
            value={incentivePercentage}
            onChange={(value) => setIncentivePercentage(parseFloat(value) || 0)}
            min={0}
            max={100}
            step={1}
            suffix="%"
            helperText="Incentives as percentage of system cost (e.g., federal tax credits)"
          />
          
          <Button 
            onClick={calculateSolarSavings}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Solar Savings
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Solar Panel Savings Summary</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Recommended System Size"
                    value={`${results.recommendedSystemSize.toFixed(2)} kW`}
                    icon={<Sun className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Annual Savings"
                    value={`$${results.annualSavings.toFixed(2)}`}
                    icon={<Zap className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Payback Period"
                    value={`${results.paybackPeriod.toFixed(1)} years`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="25-Year Net Savings"
                    value={`$${results.twentyFiveYearSavings.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label="Annual CO₂ Reduction"
                    value={`${results.co2Reduction.toFixed(0)} kg`}
                    icon={<Sun className="h-5 w-5" />}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>Based on your inputs, a {results.recommendedSystemSize.toFixed(2)} kW solar system could save you approximately ${results.annualSavings.toFixed(2)} per year.</p>
                  <p className="mt-2">Your investment would pay for itself in about {results.paybackPeriod.toFixed(1)} years.</p>
                  <p className="mt-2">Over 25 years, you could save approximately ${results.twentyFiveYearSavings.toFixed(2)} (not accounting for inflation or panel degradation).</p>
                  <p className="mt-4 text-xs">Note: These calculations are estimates. Actual savings may vary based on weather patterns, panel efficiency, installation quality, and future electricity rates.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default SolarPanelCalculator;
