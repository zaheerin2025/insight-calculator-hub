
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Droplet, Calculator } from 'lucide-react';
import { toast } from 'sonner';

const WaterBillCalculator: React.FC = () => {
  // Inputs
  const [waterUsage, setWaterUsage] = useState<number>(8000);
  const [waterRate, setWaterRate] = useState<number>(0.01);
  const [fixedCharges, setFixedCharges] = useState<number>(20);
  const [sewerRate, setSewerRate] = useState<number>(0.008);
  
  // Results
  const [results, setResults] = useState<{
    waterCharge: number;
    sewerCharge: number;
    fixedCharge: number;
    totalBill: number;
  } | null>(null);
  
  // Calculate water bill
  const calculateWaterBill = () => {
    try {
      if (
        isNaN(waterUsage) || isNaN(waterRate) || isNaN(fixedCharges) || isNaN(sewerRate) ||
        waterUsage < 0 || waterRate < 0 || fixedCharges < 0 || sewerRate < 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate water charge
      const waterCharge = waterUsage * waterRate;
      
      // Calculate sewer charge
      const sewerCharge = waterUsage * sewerRate;
      
      // Calculate total bill
      const totalBill = waterCharge + sewerCharge + fixedCharges;
      
      setResults({
        waterCharge,
        sewerCharge,
        fixedCharge: fixedCharges,
        totalBill
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
    "name": "Water Bill Calculator",
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
    { title: "Heating Cost Calculator", path: "/calculators/utility/heating-cost-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Water Bill Calculator"
      description="Calculate your water bill based on usage and local rates."
      intro="Our water bill calculator helps you estimate your monthly water costs based on your water usage, local water rates, and additional charges."
      formula={
        <div>
          <p>The water bill calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Water Charge:</strong></p>
            <code>Water Charge = Water Usage (gallons) × Rate per Gallon</code>
            
            <p className="mt-3"><strong>Sewer Charge:</strong></p>
            <code>Sewer Charge = Water Usage (gallons) × Sewer Rate per Gallon</code>
            
            <p className="mt-3"><strong>Total Bill:</strong></p>
            <code>Total Bill = Water Charge + Sewer Charge + Fixed Charges</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "How much water does an average household use?",
          answer: "An average American household uses about 300 gallons (1,135 liters) of water per day, or about 9,000 gallons (34,000 liters) per month. However, this varies significantly based on household size, location, climate, and water usage habits."
        },
        {
          question: "How can I reduce my water bill?",
          answer: "To reduce your water bill: 1) Fix leaks in faucets, toilets, and pipes, 2) Install water-efficient fixtures like low-flow showerheads and toilets, 3) Run dishwashers and washing machines only when full, 4) Take shorter showers, 5) Turn off the tap when brushing teeth or shaving, 6) Water your lawn and garden efficiently, and 7) Consider collecting rainwater for outdoor use."
        },
        {
          question: "Why is my water bill suddenly higher?",
          answer: "Sudden increases in your water bill could be due to: 1) Water leaks (check your toilet, faucets, and pipes), 2) Seasonal changes in water use (like summer lawn watering), 3) Rate increases from your utility company, 4) Additional people in your household, 5) New water-using appliances, or 6) Billing errors. If you can't identify the cause, contact your water utility for assistance."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/water-bill-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="water-usage"
            label="Water Usage"
            type="number"
            value={waterUsage}
            onChange={(value) => setWaterUsage(parseFloat(value) || 0)}
            min={0}
            step={100}
            suffix=" gallons"
            helperText="Enter your monthly water consumption in gallons"
          />
          
          <CalculatorInput
            id="water-rate"
            label="Water Rate"
            type="number"
            value={waterRate}
            onChange={(value) => setWaterRate(parseFloat(value) || 0)}
            min={0.001}
            step={0.001}
            prefix="$"
            suffix=" / gallon"
            helperText="Enter the cost per gallon of water"
          />
          
          <CalculatorInput
            id="sewer-rate"
            label="Sewer Rate"
            type="number"
            value={sewerRate}
            onChange={(value) => setSewerRate(parseFloat(value) || 0)}
            min={0}
            step={0.001}
            prefix="$"
            suffix=" / gallon"
            helperText="Enter the sewer rate per gallon (if applicable)"
          />
          
          <CalculatorInput
            id="fixed-charges"
            label="Fixed Charges"
            type="number"
            value={fixedCharges}
            onChange={(value) => setFixedCharges(parseFloat(value) || 0)}
            min={0}
            step={1}
            prefix="$"
            helperText="Enter any fixed monthly charges (e.g., service fee, infrastructure charge)"
          />
          
          <Button 
            onClick={calculateWaterBill}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Water Bill
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Water Bill Summary</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Water Charge"
                    value={`$${results.waterCharge.toFixed(2)}`}
                    icon={<Droplet className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Sewer Charge"
                    value={`$${results.sewerCharge.toFixed(2)}`}
                    icon={<Droplet className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Fixed Charges"
                    value={`$${results.fixedCharge.toFixed(2)}`}
                    icon={<Droplet className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Total Monthly Bill"
                    value={`$${results.totalBill.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>For {waterUsage} gallons of water usage:</p>
                  <p className="mt-2">Your water charge is <strong>${results.waterCharge.toFixed(2)}</strong></p>
                  <p className="mt-1">Your sewer charge is <strong>${results.sewerCharge.toFixed(2)}</strong></p>
                  <p className="mt-1">Fixed charges add <strong>${results.fixedCharge.toFixed(2)}</strong></p>
                  <p className="mt-2">Your total monthly water bill is <strong>${results.totalBill.toFixed(2)}</strong></p>
                  
                  {waterUsage > 12000 && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                      <p className="font-medium">Water Saving Tip:</p>
                      <p>Your water consumption is relatively high. Consider installing water-efficient fixtures or checking for leaks to lower your bill.</p>
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

export default WaterBillCalculator;
