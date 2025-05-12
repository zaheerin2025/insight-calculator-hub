
import React, { useState } from 'react';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Car, Calculator, Gauge } from 'lucide-react';
import { toast } from 'sonner';

const FuelCostCalculator: React.FC = () => {
  // Inputs
  const [distance, setDistance] = useState<number>(500);
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(25);
  const [fuelPrice, setFuelPrice] = useState<number>(3.5);
  const [roundTrip, setRoundTrip] = useState<boolean>(false);
  
  // Results
  const [results, setResults] = useState<{
    fuelUsed: number;
    totalCost: number;
    costPerMile: number;
    actualDistance: number;
  } | null>(null);
  
  // Calculate fuel cost
  const calculateFuelCost = () => {
    try {
      if (
        isNaN(distance) || isNaN(fuelEfficiency) || isNaN(fuelPrice) ||
        distance <= 0 || fuelEfficiency <= 0 || fuelPrice <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate actual distance (accounting for round trip)
      const actualDistance = roundTrip ? distance * 2 : distance;
      
      // Calculate fuel used
      const fuelUsed = actualDistance / fuelEfficiency;
      
      // Calculate total cost
      const totalCost = fuelUsed * fuelPrice;
      
      // Calculate cost per mile
      const costPerMile = totalCost / actualDistance;
      
      setResults({
        fuelUsed,
        totalCost,
        costPerMile,
        actualDistance
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 mb-6 shadow-sm">
          <h3 className="flex items-center text-blue-700 font-medium mb-2">
            <Gauge className="h-4 w-4 mr-2" />
            Fuel Cost Calculator
          </h3>
          <p className="text-sm text-slate-600">
            Estimate how much you'll spend on fuel for your trips or commutes.
          </p>
        </div>
        
        <CalculatorInput
          id="distance"
          label="Distance"
          type="number"
          value={distance}
          onChange={(value) => setDistance(parseFloat(value) || 0)}
          min={1}
          step={10}
          suffix=" miles"
          helperText="Enter the one-way trip distance"
        />
        
        <CalculatorInput
          id="fuel-efficiency"
          label="Fuel Efficiency"
          type="number"
          value={fuelEfficiency}
          onChange={(value) => setFuelEfficiency(parseFloat(value) || 0)}
          min={1}
          step={0.5}
          suffix=" mpg"
          helperText="Enter your vehicle's miles per gallon"
        />
        
        <CalculatorInput
          id="fuel-price"
          label="Fuel Price"
          type="number"
          value={fuelPrice}
          onChange={(value) => setFuelPrice(parseFloat(value) || 0)}
          min={0.1}
          step={0.1}
          prefix="$"
          suffix=" / gallon"
          helperText="Enter the current fuel price per gallon"
        />
        
        <div className="flex items-center space-x-2 mt-4">
          <input
            id="round-trip"
            type="checkbox"
            checked={roundTrip}
            onChange={(e) => setRoundTrip(e.target.checked)}
            className="h-4 w-4 border-gray-300 rounded"
          />
          <label htmlFor="round-trip" className="text-sm font-medium">
            Round Trip (calculate both ways)
          </label>
        </div>
        
        <Button 
          onClick={calculateFuelCost}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 shadow-md transition-all duration-300"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Fuel Cost
        </Button>
      </div>
      
      <div>
        {results ? (
          <Card className="animate-fade-in h-full border-blue-100 shadow-md bg-white">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="text-lg font-medium mb-4 border-b pb-3">Fuel Cost Summary</h3>
              
              <div className="space-y-3">
                <ResultDisplay
                  label="Trip Distance"
                  value={`${results.actualDistance.toFixed(0)} miles`}
                  icon={<Car className="h-5 w-5 text-blue-500" />}
                />
                
                <ResultDisplay
                  label="Fuel Required"
                  value={`${results.fuelUsed.toFixed(2)} gallons`}
                  icon={<Gauge className="h-5 w-5 text-blue-500" />}
                />
                
                <ResultDisplay
                  label="Total Fuel Cost"
                  value={`$${results.totalCost.toFixed(2)}`}
                  icon={<Calculator className="h-5 w-5 text-blue-600" />}
                  isHighlighted={true}
                />
                
                <ResultDisplay
                  label="Cost Per Mile"
                  value={`$${results.costPerMile.toFixed(2)}/mile`}
                  icon={<Calculator className="h-5 w-5 text-blue-500" />}
                />
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                <p>For a {results.actualDistance} mile {roundTrip ? 'round trip' : 'one-way trip'} with a {fuelEfficiency} mpg vehicle:</p>
                <p className="mt-2">You'll need approximately <strong>{results.fuelUsed.toFixed(2)} gallons</strong> of fuel</p>
                <p className="mt-1">At ${fuelPrice.toFixed(2)}/gallon, this will cost <strong>${results.totalCost.toFixed(2)}</strong></p>
                <p className="mt-1">Your cost per mile is <strong>${results.costPerMile.toFixed(2)}</strong></p>
                
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                  <p className="font-medium">Driving Tip:</p>
                  <p>Maintaining a steady speed and avoiding rapid acceleration can improve your fuel economy by up to 20%, saving you money on fuel costs.</p>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-2">Compare with Different Vehicles:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Compact Car (35 mpg):</span>
                    <span className="font-medium">${((results.actualDistance / 35) * fuelPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SUV (20 mpg):</span>
                    <span className="font-medium">${((results.actualDistance / 20) * fuelPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Electric Vehicle (3.5 mi/kWh):</span>
                    <span className="font-medium">${((results.actualDistance / 3.5) * 0.13).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/50">
            <div className="text-center">
              <Gauge className="h-12 w-12 mx-auto text-blue-300 mb-3" />
              <h3 className="text-lg font-medium text-blue-700 mb-1">No Results Yet</h3>
              <p className="text-sm text-blue-600/70 max-w-xs mx-auto">
                Enter your trip details and click calculate to see your fuel costs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuelCostCalculator;
