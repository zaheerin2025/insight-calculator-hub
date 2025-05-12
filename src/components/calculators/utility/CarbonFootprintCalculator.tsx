
import React, { useState } from 'react';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Gauge, Calculator, Car } from 'lucide-react';
import { toast } from 'sonner';

const CarbonFootprintCalculator: React.FC = () => {
  // Inputs
  const [electricityUsage, setElectricityUsage] = useState<number>(900);
  const [gasUsage, setGasUsage] = useState<number>(50);
  const [carMileage, setCarMileage] = useState<number>(12000);
  const [carMpg, setCarMpg] = useState<number>(25);
  const [flightMiles, setFlightMiles] = useState<number>(5000);
  const [householdSize, setHouseholdSize] = useState<number>(3);
  
  // Results
  const [results, setResults] = useState<{
    electricityEmissions: number;
    gasEmissions: number;
    carEmissions: number;
    flightEmissions: number;
    totalEmissions: number;
    emissionsPerPerson: number;
    comparisonToAverage: number;
  } | null>(null);
  
  // Calculate carbon footprint
  const calculateFootprint = () => {
    try {
      if (
        isNaN(electricityUsage) || isNaN(gasUsage) || isNaN(carMileage) ||
        isNaN(carMpg) || isNaN(flightMiles) || isNaN(householdSize) ||
        electricityUsage < 0 || gasUsage < 0 || carMileage < 0 ||
        carMpg <= 0 || flightMiles < 0 || householdSize <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate emissions from electricity (lbs CO2 per kWh)
      const electricityEmissions = electricityUsage * 0.92;
      
      // Calculate emissions from natural gas (lbs CO2 per therm)
      const gasEmissions = gasUsage * 11.7;
      
      // Calculate emissions from car travel (lbs CO2 per gallon)
      const gallonsUsed = carMileage / carMpg;
      const carEmissions = gallonsUsed * 19.6;
      
      // Calculate emissions from flights (lbs CO2 per mile)
      const flightEmissions = flightMiles * 0.4;
      
      // Calculate total emissions
      const totalEmissions = electricityEmissions + gasEmissions + carEmissions + flightEmissions;
      
      // Calculate per person emissions
      const emissionsPerPerson = totalEmissions / householdSize;
      
      // Compare to average (U.S. average is about 36,000 lbs CO2 per person per year)
      const comparisonToAverage = (emissionsPerPerson / 36000) * 100;
      
      setResults({
        electricityEmissions,
        gasEmissions,
        carEmissions,
        flightEmissions,
        totalEmissions,
        emissionsPerPerson,
        comparisonToAverage
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
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-xl border border-green-100 mb-6 shadow-sm">
          <h3 className="flex items-center text-green-700 font-medium mb-2">
            <Gauge className="h-4 w-4 mr-2" />
            Carbon Footprint Calculator
          </h3>
          <p className="text-sm text-slate-600">
            Estimate your household's carbon footprint based on energy use, transportation, and lifestyle.
          </p>
        </div>
        
        <CalculatorInput
          id="electricity-usage"
          label="Monthly Electricity"
          type="number"
          value={electricityUsage}
          onChange={(value) => setElectricityUsage(parseFloat(value) || 0)}
          min={0}
          step={50}
          suffix=" kWh"
          helperText="Average monthly electricity usage"
        />
        
        <CalculatorInput
          id="gas-usage"
          label="Monthly Natural Gas"
          type="number"
          value={gasUsage}
          onChange={(value) => setGasUsage(parseFloat(value) || 0)}
          min={0}
          step={5}
          suffix=" therms"
          helperText="Average monthly natural gas usage"
        />
        
        <CalculatorInput
          id="car-mileage"
          label="Annual Car Mileage"
          type="number"
          value={carMileage}
          onChange={(value) => setCarMileage(parseFloat(value) || 0)}
          min={0}
          step={1000}
          suffix=" miles"
          helperText="Total miles driven by all household vehicles"
        />
        
        <CalculatorInput
          id="car-mpg"
          label="Vehicle Efficiency"
          type="number"
          value={carMpg}
          onChange={(value) => setCarMpg(parseFloat(value) || 0)}
          min={1}
          step={1}
          suffix=" mpg"
          helperText="Average fuel efficiency of your vehicles"
        />
        
        <CalculatorInput
          id="flight-miles"
          label="Annual Flight Distance"
          type="number"
          value={flightMiles}
          onChange={(value) => setFlightMiles(parseFloat(value) || 0)}
          min={0}
          step={500}
          suffix=" miles"
          helperText="Total flight distance per year"
        />
        
        <CalculatorInput
          id="household-size"
          label="Household Size"
          type="number"
          value={householdSize}
          onChange={(value) => setHouseholdSize(parseFloat(value) || 0)}
          min={1}
          step={1}
          helperText="Number of people in your household"
        />
        
        <Button 
          onClick={calculateFootprint}
          className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 shadow-md transition-all duration-300"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Carbon Footprint
        </Button>
      </div>
      
      <div>
        {results ? (
          <Card className="animate-fade-in h-full border-green-100 shadow-md bg-white">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="text-lg font-medium mb-4 border-b pb-3">Carbon Footprint Summary</h3>
              
              <div className="space-y-3">
                <ResultDisplay
                  label="Total Annual Emissions"
                  value={`${Math.round(results.totalEmissions).toLocaleString()} lbs CO₂`}
                  icon={<Gauge className="h-5 w-5 text-green-600" />}
                  isHighlighted={true}
                />
                
                <ResultDisplay
                  label="Per Person Emissions"
                  value={`${Math.round(results.emissionsPerPerson).toLocaleString()} lbs CO₂`}
                  icon={<Gauge className="h-5 w-5 text-green-500" />}
                />
                
                <ResultDisplay
                  label="Comparison to U.S. Average"
                  value={`${results.comparisonToAverage < 100 ? '-' : '+'}${Math.abs(100 - results.comparisonToAverage).toFixed(0)}%`}
                  icon={<Calculator className="h-5 w-5" />}
                  isHighlighted={results.comparisonToAverage < 100}
                />
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Emissions Breakdown:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Electricity:</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${(results.electricityEmissions / results.totalEmissions) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(results.electricityEmissions).toLocaleString()} lbs</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Natural Gas:</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-orange-500 h-2.5 rounded-full" 
                          style={{ width: `${(results.gasEmissions / results.totalEmissions) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(results.gasEmissions).toLocaleString()} lbs</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Vehicle Travel:</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${(results.carEmissions / results.totalEmissions) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(results.carEmissions).toLocaleString()} lbs</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Air Travel:</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-purple-500 h-2.5 rounded-full" 
                          style={{ width: `${(results.flightEmissions / results.totalEmissions) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(results.flightEmissions).toLocaleString()} lbs</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                <p>Your household's annual carbon footprint is approximately <strong>{Math.round(results.totalEmissions).toLocaleString()} pounds</strong> of CO₂.</p>
                <p className="mt-2">This equals about <strong>{Math.round(results.emissionsPerPerson).toLocaleString()} pounds</strong> per person, which is {results.comparisonToAverage < 100 ? 'below' : 'above'} the U.S. average of 36,000 pounds per person.</p>
                
                <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-green-700">
                  <p className="font-medium">Reduction Tips:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {results.electricityEmissions > 3000 && (
                      <li>Switch to LED light bulbs and energy-efficient appliances to reduce electricity usage.</li>
                    )}
                    {results.gasEmissions > 2000 && (
                      <li>Improve home insulation and lower your thermostat to reduce natural gas consumption.</li>
                    )}
                    {results.carEmissions > 5000 && (
                      <li>Consider carpooling, using public transit, or switching to a more fuel-efficient vehicle.</li>
                    )}
                    {results.flightEmissions > 2000 && (
                      <li>Reduce air travel or consider carbon offset programs for necessary flights.</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-green-200 rounded-lg bg-green-50/50">
            <div className="text-center">
              <Gauge className="h-12 w-12 mx-auto text-green-300 mb-3" />
              <h3 className="text-lg font-medium text-green-700 mb-1">No Results Yet</h3>
              <p className="text-sm text-green-600/70 max-w-xs mx-auto">
                Enter your household information to calculate your carbon footprint.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;
