
import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { Wrench, Calculator, Lightbulb, Activity, Droplet, Thermometer, Sun, Zap, Gauge, Car, Calendar, Lock, Key, Fuel } from 'lucide-react';

const calculators = [
  {
    title: 'Tip Calculator',
    description: 'Calculate tips for restaurants, services, and more with options for splitting the bill.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/tip-calculator'
  },
  {
    title: 'Unit Converter',
    description: 'Convert between various measurement units including length, weight, volume, and more.',
    icon: <Wrench className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/unit-converter'
  },
  {
    title: 'Electricity Bill Calculator',
    description: 'Estimate your electricity bill based on usage and rates.',
    icon: <Zap className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/electricity-bill-calculator'
  },
  {
    title: 'Appliance Energy Use Calculator',
    description: 'Calculate the energy consumption and cost of various household appliances.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/appliance-energy-calculator'
  },
  {
    title: 'Solar Panel Savings Calculator',
    description: 'Estimate savings from installing solar panels based on your location and energy consumption.',
    icon: <Sun className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/solar-panel-calculator'
  },
  {
    title: 'Water Bill Calculator',
    description: 'Calculate your water bill based on usage and local rates.',
    icon: <Droplet className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/water-bill-calculator'
  },
  {
    title: 'Heating Cost Calculator',
    description: 'Estimate heating costs based on your home size and energy source.',
    icon: <Thermometer className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/heating-cost-calculator'
  },
  {
    title: 'Cooling Cost Calculator',
    description: 'Calculate air conditioning and cooling costs during warm months.',
    icon: <Thermometer className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/cooling-cost-calculator'
  },
  {
    title: 'Light Bulb Energy Savings Calculator',
    description: 'Compare different light bulb types and calculate energy savings.',
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/lightbulb-savings-calculator'
  },
  {
    title: 'Carbon Footprint Calculator',
    description: 'Estimate your personal or household carbon footprint based on lifestyle choices.',
    icon: <Activity className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/carbon-footprint-calculator'
  },
  {
    title: 'Gas Mileage (MPG) Calculator',
    description: 'Calculate your vehicle\'s fuel economy and estimate fuel costs for trips.',
    icon: <Gauge className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/gas-mileage-calculator'
  },
  {
    title: 'Electric Vehicle Range Calculator',
    description: 'Estimate how far your electric vehicle can travel on a single charge.',
    icon: <Car className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/ev-range-calculator'
  },
  {
    title: 'Date Calculator',
    description: 'Calculate the difference between dates or add/subtract days, months, or years from a date.',
    icon: <Calendar className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/date-calculator'
  },
  {
    title: 'Password Generator',
    description: 'Create strong, secure passwords with customizable options for length and character types.',
    icon: <Key className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/password-generator'
  },
  {
    title: 'GPA Calculator',
    description: 'Calculate your Grade Point Average (GPA) based on grades and credit hours.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/gpa-calculator'
  },
  {
    title: 'Fuel Cost Calculator',
    description: 'Estimate fuel costs for trips based on distance, fuel efficiency, and current fuel prices.',
    icon: <Fuel className="h-6 w-6 text-primary" />,
    path: '/calculators/utility/fuel-cost-calculator'
  },
];

const CalculatorsUtility: React.FC = () => {
  return (
    <CategoryLayout
      title="Utility Calculators"
      description="Access our collection of free utility calculators. Calculate electricity costs, estimate energy usage, calculate tips, convert units, and more for everyday tasks."
      intro="Make everyday calculations easier with our suite of utility calculators. From calculating energy bills to estimating carbon footprint, these tools simplify common tasks."
      calculators={calculators}
      canonicalUrl="https://calculators-hub.com/calculators/utility"
    />
  );
};

export default CalculatorsUtility;
