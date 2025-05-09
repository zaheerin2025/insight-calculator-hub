
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';
import ResultDisplay from '@/components/calculators/ResultDisplay';
import { Fuel } from 'lucide-react';

const FuelCostCalculator: React.FC = () => {
  // Trip calculation
  const [distance, setDistance] = useState<string>('100');
  const [fuelEfficiency, setFuelEfficiency] = useState<string>('25');
  const [fuelPrice, setFuelPrice] = useState<string>('3.50');
  const [distanceUnit, setDistanceUnit] = useState<'miles' | 'kilometers'>('miles');
  const [efficiencyUnit, setEfficiencyUnit] = useState<'mpg' | 'kml' | 'l/100km'>('mpg');
  const [fuelUnit, setFuelUnit] = useState<'usd_gal' | 'usd_liter'>('usd_gal');
  const [tripResult, setTripResult] = useState<string | null>(null);
  
  // Annual calculation
  const [annualDistance, setAnnualDistance] = useState<string>('12000');
  const [annualFuelEfficiency, setAnnualFuelEfficiency] = useState<string>('25');
  const [annualFuelPrice, setAnnualFuelPrice] = useState<string>('3.50');
  const [annualDistanceUnit, setAnnualDistanceUnit] = useState<'miles' | 'kilometers'>('miles');
  const [annualEfficiencyUnit, setAnnualEfficiencyUnit] = useState<'mpg' | 'kml' | 'l/100km'>('mpg');
  const [annualFuelUnit, setAnnualFuelUnit] = useState<'usd_gal' | 'usd_liter'>('usd_gal');
  const [annualResult, setAnnualResult] = useState<string | null>(null);
  
  // Comparison calculation
  const [vehicle1Efficiency, setVehicle1Efficiency] = useState<string>('22');
  const [vehicle2Efficiency, setVehicle2Efficiency] = useState<string>('32');
  const [comparisonDistance, setComparisonDistance] = useState<string>('12000');
  const [comparisonFuelPrice, setComparisonFuelPrice] = useState<string>('3.50');
  const [comparisonEfficiencyUnit, setComparisonEfficiencyUnit] = useState<'mpg' | 'kml' | 'l/100km'>('mpg');
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  
  // Helper functions for unit conversion
  const convertToGallons = (amount: number, fromUnit: 'mpg' | 'kml' | 'l/100km'): number => {
    if (fromUnit === 'mpg') return amount;
    if (fromUnit === 'kml') return amount * 2.35215;
    if (fromUnit === 'l/100km') return 235.215 / amount;
    return amount;
  };
  
  const convertToMiles = (distance: number, fromUnit: 'miles' | 'kilometers'): number => {
    return fromUnit === 'miles' ? distance : distance * 0.621371;
  };
  
  const convertToUsdGallon = (price: number, fromUnit: 'usd_gal' | 'usd_liter'): number => {
    return fromUnit === 'usd_gal' ? price : price * 3.78541;
  };
  
  const calculateTripCost = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);
    
    if (!isNaN(dist) && !isNaN(efficiency) && !isNaN(price)) {
      // Convert everything to miles, mpg, and USD/gallon for calculation
      const milesDistance = convertToMiles(dist, distanceUnit);
      const mpgEfficiency = convertToGallons(efficiency, efficiencyUnit);
      const usdGallonPrice = convertToUsdGallon(price, fuelUnit);
      
      // Calculate gallons needed and cost
      const gallonsNeeded = milesDistance / mpgEfficiency;
      const cost = gallonsNeeded * usdGallonPrice;
      
      setTripResult(`Cost for ${distance} ${distanceUnit} trip: $${cost.toFixed(2)}`);
    } else {
      setTripResult('Please enter valid numbers for all fields');
    }
  };
  
  const calculateAnnualCost = () => {
    const dist = parseFloat(annualDistance);
    const efficiency = parseFloat(annualFuelEfficiency);
    const price = parseFloat(annualFuelPrice);
    
    if (!isNaN(dist) && !isNaN(efficiency) && !isNaN(price)) {
      // Convert everything to miles, mpg, and USD/gallon for calculation
      const milesDistance = convertToMiles(dist, annualDistanceUnit);
      const mpgEfficiency = convertToGallons(efficiency, annualEfficiencyUnit);
      const usdGallonPrice = convertToUsdGallon(price, annualFuelUnit);
      
      // Calculate gallons needed and cost
      const gallonsNeeded = milesDistance / mpgEfficiency;
      const cost = gallonsNeeded * usdGallonPrice;
      const monthlyCost = cost / 12;
      
      setAnnualResult(`Annual fuel cost: $${cost.toFixed(2)} ($${monthlyCost.toFixed(2)}/month)`);
    } else {
      setAnnualResult('Please enter valid numbers for all fields');
    }
  };
  
  const calculateComparison = () => {
    const dist = parseFloat(comparisonDistance);
    const efficiency1 = parseFloat(vehicle1Efficiency);
    const efficiency2 = parseFloat(vehicle2Efficiency);
    const price = parseFloat(comparisonFuelPrice);
    
    if (!isNaN(dist) && !isNaN(efficiency1) && !isNaN(efficiency2) && !isNaN(price)) {
      // Convert efficiencies to mpg
      const mpgEfficiency1 = convertToGallons(efficiency1, comparisonEfficiencyUnit);
      const mpgEfficiency2 = convertToGallons(efficiency2, comparisonEfficiencyUnit);
      
      // Calculate costs
      const gallonsNeeded1 = dist / mpgEfficiency1;
      const gallonsNeeded2 = dist / mpgEfficiency2;
      const cost1 = gallonsNeeded1 * price;
      const cost2 = gallonsNeeded2 * price;
      const savings = Math.abs(cost1 - cost2);
      
      const moreEfficient = mpgEfficiency1 > mpgEfficiency2 ? 'Vehicle 1' : 'Vehicle 2';
      setComparisonResult(
        `Vehicle 1 cost: $${cost1.toFixed(2)}\n` +
        `Vehicle 2 cost: $${cost2.toFixed(2)}\n` +
        `Annual savings with ${moreEfficient}: $${savings.toFixed(2)}`
      );
    } else {
      setComparisonResult('Please enter valid numbers for all fields');
    }
  };

  return (
    <CalculatorLayout
      title="Fuel Cost Calculator"
      description="Estimate fuel costs for trips based on distance, fuel efficiency, and current fuel prices."
      intro="Calculate how much you'll spend on fuel for a single trip or estimate your annual fuel costs. You can also compare fuel costs between two different vehicles."
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fuel className="mr-2 h-5 w-5" />
            Fuel Cost Calculator
          </CardTitle>
          <CardDescription>
            Calculate fuel costs for trips or compare vehicles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trip" className="space-y-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="trip">Trip Cost</TabsTrigger>
              <TabsTrigger value="annual">Annual Cost</TabsTrigger>
              <TabsTrigger value="compare">Compare Vehicles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trip" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="distance"
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      placeholder="Enter distance"
                      className="flex-grow"
                    />
                    <Select 
                      value={distanceUnit} 
                      onValueChange={(value: 'miles' | 'kilometers') => setDistanceUnit(value)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miles">miles</SelectItem>
                        <SelectItem value="kilometers">km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fuelEfficiency">Fuel Efficiency</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="fuelEfficiency"
                      type="number"
                      value={fuelEfficiency}
                      onChange={(e) => setFuelEfficiency(e.target.value)}
                      placeholder="Enter efficiency"
                      className="flex-grow"
                    />
                    <Select 
                      value={efficiencyUnit} 
                      onValueChange={(value: 'mpg' | 'kml' | 'l/100km') => setEfficiencyUnit(value)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpg">MPG</SelectItem>
                        <SelectItem value="kml">km/L</SelectItem>
                        <SelectItem value="l/100km">L/100km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuelPrice">Fuel Price</Label>
                <div className="flex space-x-2">
                  <Input
                    id="fuelPrice"
                    type="number"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    placeholder="Enter fuel price"
                    className="flex-grow"
                  />
                  <Select 
                    value={fuelUnit} 
                    onValueChange={(value: 'usd_gal' | 'usd_liter') => setFuelUnit(value)}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd_gal">$/gal</SelectItem>
                      <SelectItem value="usd_liter">$/L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full" onClick={calculateTripCost}>
                Calculate Trip Cost
              </Button>
              
              {tripResult && (
                <ResultDisplay
                  title="Trip Fuel Cost"
                  value={tripResult}
                />
              )}
            </TabsContent>
            
            <TabsContent value="annual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualDistance">Annual Distance</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="annualDistance"
                      type="number"
                      value={annualDistance}
                      onChange={(e) => setAnnualDistance(e.target.value)}
                      placeholder="Enter annual distance"
                      className="flex-grow"
                    />
                    <Select 
                      value={annualDistanceUnit} 
                      onValueChange={(value: 'miles' | 'kilometers') => setAnnualDistanceUnit(value)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miles">miles</SelectItem>
                        <SelectItem value="kilometers">km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="annualFuelEfficiency">Fuel Efficiency</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="annualFuelEfficiency"
                      type="number"
                      value={annualFuelEfficiency}
                      onChange={(e) => setAnnualFuelEfficiency(e.target.value)}
                      placeholder="Enter efficiency"
                      className="flex-grow"
                    />
                    <Select 
                      value={annualEfficiencyUnit} 
                      onValueChange={(value: 'mpg' | 'kml' | 'l/100km') => setAnnualEfficiencyUnit(value)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpg">MPG</SelectItem>
                        <SelectItem value="kml">km/L</SelectItem>
                        <SelectItem value="l/100km">L/100km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="annualFuelPrice">Fuel Price</Label>
                <div className="flex space-x-2">
                  <Input
                    id="annualFuelPrice"
                    type="number"
                    value={annualFuelPrice}
                    onChange={(e) => setAnnualFuelPrice(e.target.value)}
                    placeholder="Enter fuel price"
                    className="flex-grow"
                  />
                  <Select 
                    value={annualFuelUnit} 
                    onValueChange={(value: 'usd_gal' | 'usd_liter') => setAnnualFuelUnit(value)}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd_gal">$/gal</SelectItem>
                      <SelectItem value="usd_liter">$/L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full" onClick={calculateAnnualCost}>
                Calculate Annual Cost
              </Button>
              
              {annualResult && (
                <ResultDisplay
                  title="Annual Fuel Cost"
                  value={annualResult}
                />
              )}
            </TabsContent>
            
            <TabsContent value="compare" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle1Efficiency">Vehicle 1 Efficiency</Label>
                  <Input
                    id="vehicle1Efficiency"
                    type="number"
                    value={vehicle1Efficiency}
                    onChange={(e) => setVehicle1Efficiency(e.target.value)}
                    placeholder="Enter efficiency"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehicle2Efficiency">Vehicle 2 Efficiency</Label>
                  <Input
                    id="vehicle2Efficiency"
                    type="number"
                    value={vehicle2Efficiency}
                    onChange={(e) => setVehicle2Efficiency(e.target.value)}
                    placeholder="Enter efficiency"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="comparisonEfficiencyUnit">Efficiency Unit</Label>
                  <Select 
                    value={comparisonEfficiencyUnit} 
                    onValueChange={(value: 'mpg' | 'kml' | 'l/100km') => setComparisonEfficiencyUnit(value)}
                  >
                    <SelectTrigger id="comparisonEfficiencyUnit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mpg">MPG</SelectItem>
                      <SelectItem value="kml">km/L</SelectItem>
                      <SelectItem value="l/100km">L/100km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comparisonFuelPrice">Fuel Price ($/gal)</Label>
                  <Input
                    id="comparisonFuelPrice"
                    type="number"
                    value={comparisonFuelPrice}
                    onChange={(e) => setComparisonFuelPrice(e.target.value)}
                    placeholder="Enter price per gallon"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comparisonDistance">Annual Distance (miles)</Label>
                <Input
                  id="comparisonDistance"
                  type="number"
                  value={comparisonDistance}
                  onChange={(e) => setComparisonDistance(e.target.value)}
                  placeholder="Enter annual distance"
                />
              </div>
              
              <Button className="w-full" onClick={calculateComparison}>
                Compare Vehicles
              </Button>
              
              {comparisonResult && (
                <ResultDisplay
                  title="Vehicle Comparison"
                  value={comparisonResult}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default FuelCostCalculator;
