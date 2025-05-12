
import React, { useState } from 'react';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Gauge, Calculator, Car } from 'lucide-react';
import { toast } from 'sonner';

const GasMileageCalculator: React.FC = () => {
  // Inputs for MPG calculation
  const [milesDriven, setMilesDriven] = useState<number>(300);
  const [gallonsUsed, setGallonsUsed] = useState<number>(12);
  
  // Inputs for trip cost calculation
  const [tripDistance, setTripDistance] = useState<number>(500);
  const [fuelPrice, setFuelPrice] = useState<number>(3.5);
  const [vehicleMpg, setVehicleMpg] = useState<number>(25);
  
  // Results
  const [mpgResults, setMpgResults] = useState<{
    mpg: number;
    kml: number; // kilometers per liter
    l100km: number; // liters per 100 km
  } | null>(null);
  
  const [tripResults, setTripResults] = useState<{
    fuelNeeded: number;
    tripCost: number;
    co2Emissions: number;
  } | null>(null);
  
  // Calculate MPG
  const calculateMpg = () => {
    try {
      if (isNaN(milesDriven) || isNaN(gallonsUsed) || milesDriven <= 0 || gallonsUsed <= 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate MPG
      const mpg = milesDriven / gallonsUsed;
      
      // Convert to other units
      const kml = mpg * 0.425144; // kilometers per liter
      const l100km = 235.215 / mpg; // liters per 100 kilometers
      
      setMpgResults({
        mpg,
        kml,
        l100km
      });
      
      // Update vehicle MPG for trip calculation
      setVehicleMpg(mpg);
      
      toast.success('MPG calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate trip cost
  const calculateTripCost = () => {
    try {
      if (
        isNaN(tripDistance) || isNaN(fuelPrice) || isNaN(vehicleMpg) ||
        tripDistance <= 0 || fuelPrice <= 0 || vehicleMpg <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate fuel needed
      const fuelNeeded = tripDistance / vehicleMpg;
      
      // Calculate trip cost
      const tripCost = fuelNeeded * fuelPrice;
      
      // Calculate CO2 emissions (19.64 pounds CO2 per gallon of gasoline)
      const co2Emissions = fuelNeeded * 19.64;
      
      setTripResults({
        fuelNeeded,
        tripCost,
        co2Emissions
      });
      
      toast.success('Trip cost calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="border border-muted">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Calculate Your MPG</h3>
            
            <div className="space-y-4">
              <CalculatorInput
                id="miles-driven"
                label="Miles Driven"
                type="number"
                value={milesDriven}
                onChange={(value) => setMilesDriven(parseFloat(value) || 0)}
                min={1}
                step={1}
                suffix=" miles"
                helperText="Enter the distance driven since last fill-up"
              />
              
              <CalculatorInput
                id="gallons-used"
                label="Gallons Used"
                type="number"
                value={gallonsUsed}
                onChange={(value) => setGallonsUsed(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" gallons"
                helperText="Enter the amount of fuel used"
              />
              
              <Button 
                onClick={calculateMpg}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate MPG
              </Button>
              
              {mpgResults && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-3">
                    <ResultDisplay
                      label="Miles Per Gallon (MPG)"
                      value={`${mpgResults.mpg.toFixed(1)} mpg`}
                      icon={<Car className="h-5 w-5" />}
                      isHighlighted={true}
                    />
                    
                    <ResultDisplay
                      label="Kilometers Per Liter"
                      value={`${mpgResults.kml.toFixed(1)} km/L`}
                      icon={<Car className="h-5 w-5" />}
                    />
                    
                    <ResultDisplay
                      label="Liters Per 100 km"
                      value={`${mpgResults.l100km.toFixed(1)} L/100km`}
                      icon={<Car className="h-5 w-5" />}
                    />
                  </div>
                  
                  <div className="mt-4 text-sm text-muted-foreground">
                    {mpgResults.mpg < 20 ? (
                      <p>Your fuel economy is below average. Consider a tune-up or more efficient driving habits.</p>
                    ) : mpgResults.mpg < 30 ? (
                      <p>Your fuel economy is average. Small changes to driving habits could improve it.</p>
                    ) : (
                      <p>Your fuel economy is good! You're saving money and reducing emissions.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-muted">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Calculate Trip Cost</h3>
            
            <div className="space-y-4">
              <CalculatorInput
                id="trip-distance"
                label="Trip Distance"
                type="number"
                value={tripDistance}
                onChange={(value) => setTripDistance(parseFloat(value) || 0)}
                min={1}
                step={1}
                suffix=" miles"
                helperText="Enter the distance of your planned trip"
              />
              
              <CalculatorInput
                id="fuel-price"
                label="Fuel Price"
                type="number"
                value={fuelPrice}
                onChange={(value) => setFuelPrice(parseFloat(value) || 0)}
                min={0.1}
                step={0.01}
                prefix="$"
                suffix=" / gallon"
                helperText="Enter the current price per gallon"
              />
              
              <CalculatorInput
                id="vehicle-mpg"
                label="Vehicle MPG"
                type="number"
                value={vehicleMpg}
                onChange={(value) => setVehicleMpg(parseFloat(value) || 0)}
                min={1}
                step={0.1}
                suffix=" mpg"
                helperText="Enter your vehicle's fuel economy"
              />
              
              <Button 
                onClick={calculateTripCost}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Trip Cost
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        {tripResults && (
          <Card className="animate-fade-in h-full">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="text-lg font-medium mb-4">Trip Cost Summary</h3>
              
              <div className="space-y-3">
                <ResultDisplay
                  label="Fuel Needed"
                  value={`${tripResults.fuelNeeded.toFixed(1)} gallons`}
                  icon={<Gauge className="h-5 w-5" />}
                />
                
                <ResultDisplay
                  label="Trip Fuel Cost"
                  value={`$${tripResults.tripCost.toFixed(2)}`}
                  icon={<Calculator className="h-5 w-5" />}
                  isHighlighted={true}
                />
                
                <ResultDisplay
                  label="CO₂ Emissions"
                  value={`${tripResults.co2Emissions.toFixed(0)} lbs`}
                  icon={<Car className="h-5 w-5" />}
                />
                
                <ResultDisplay
                  label="Cost Per Mile"
                  value={`$${(tripResults.tripCost / tripDistance).toFixed(2)}/mile`}
                  icon={<Calculator className="h-5 w-5" />}
                />
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                <p>For a {tripDistance} mile trip at {fuelPrice.toFixed(2)}/gallon:</p>
                <p className="mt-2">Your {vehicleMpg.toFixed(1)} mpg vehicle will use approximately <strong>{tripResults.fuelNeeded.toFixed(1)} gallons</strong> of fuel</p>
                <p className="mt-1">This will cost approximately <strong>${tripResults.tripCost.toFixed(2)}</strong></p>
                <p className="mt-1">Your trip will emit approximately <strong>{tripResults.co2Emissions.toFixed(0)} pounds</strong> of CO₂</p>
                
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                  <p className="font-medium">Trip Planning Tip:</p>
                  <p>Consider mapping your route to avoid traffic and minimize stops. Each stop-and-go cycle can reduce your fuel economy by up to 10%.</p>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-2">Compare with Other Vehicles:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Compact Car (35 mpg):</span>
                    <span className="font-medium">${((tripDistance / 35) * fuelPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mid-Size (28 mpg):</span>
                    <span className="font-medium">${((tripDistance / 28) * fuelPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SUV (20 mpg):</span>
                    <span className="font-medium">${((tripDistance / 20) * fuelPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Electric Vehicle:</span>
                    <span className="font-medium">${((tripDistance / 100) * 3.8).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {!tripResults && (
          <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/50">
            <div className="text-center">
              <Car className="h-12 w-12 mx-auto text-blue-300 mb-3" />
              <h3 className="text-lg font-medium text-blue-700 mb-1">No Results Yet</h3>
              <p className="text-sm text-blue-600/70 max-w-xs mx-auto">
                Calculate your MPG and enter trip details to see cost estimates.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GasMileageCalculator;
