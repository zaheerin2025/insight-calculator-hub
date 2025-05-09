
import React from 'react';
import { Home, Heart, Percent, Construction, DollarSign, Wrench } from 'lucide-react';

export const calculatorCategories = [
  {
    title: 'Finance Calculators',
    description: 'Plan your financial future with precision and confidence.',
    icon: <Home className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-primary to-primary-light',
    path: '/calculators/finance',
    calculators: [
      { name: 'Mortgage Calculator', path: '/calculators/finance/mortgage-calculator' },
      { name: 'Compound Interest Calculator', path: '/calculators/finance/compound-interest-calculator' },
      { name: 'Loan EMI Calculator', path: '/calculators/finance/loan-emi-calculator' },
      { name: 'Investment Return Calculator', path: '/calculators/finance/investment-return-calculator' },
      { name: 'Home Affordability Calculator', path: '/calculators/finance/home-affordability-calculator' },
      { name: 'Credit Card Payoff Calculator', path: '/calculators/finance/credit-card-payoff-calculator' },
      { name: 'Debt-to-Income Calculator', path: '/calculators/finance/debt-to-income-calculator' },
      { name: 'Auto Loan Calculator', path: '/calculators/finance/auto-loan-calculator' },
      { name: 'Simple Interest Calculator', path: '/calculators/finance/simple-interest-calculator' },
      { name: 'Retirement Savings Calculator', path: '/calculators/finance/retirement-savings-calculator' },
    ]
  },
  {
    title: 'Health Calculators',
    description: 'Monitor your health metrics for a better quality of life.',
    icon: <Heart className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-pink-500 to-rose-400',
    path: '/calculators/health',
    calculators: [
      { name: 'BMI Calculator', path: '/calculators/health/bmi-calculator' },
      { name: 'Body Fat Calculator', path: '/calculators/health/body-fat-calculator' },
      { name: 'Calorie Needs Calculator', path: '/calculators/health/calorie-needs-calculator' },
      { name: 'Ideal Weight Calculator', path: '/calculators/health/ideal-weight-calculator' },
      { name: 'Heart Rate Calculator', path: '/calculators/health/heart-rate-calculator' },
      { name: 'BMR Calculator', path: '/calculators/health/bmr-calculator' },
      { name: 'Water Intake Calculator', path: '/calculators/health/water-intake-calculator' },
      { name: 'Pregnancy Due Date Calculator', path: '/calculators/health/pregnancy-due-date-calculator' },
      { name: 'Macro Nutrient Calculator', path: '/calculators/health/macro-nutrient-calculator' },
      { name: 'Waist-Hip Ratio Calculator', path: '/calculators/health/waist-hip-ratio-calculator' },
    ]
  },
  {
    title: 'Math Calculators',
    description: 'Solve everyday math problems quickly and accurately.',
    icon: <Percent className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    path: '/calculators/math',
    calculators: [
      { name: 'Percentage Calculator', path: '/calculators/math/percentage-calculator' },
      { name: 'Square Root Calculator', path: '/calculators/math/square-root-calculator' },
      { name: 'Factorial Calculator', path: '/calculators/math/factorial-calculator' },
      { name: 'Age Calculator', path: '/calculators/math/age-calculator' },
      { name: 'Discount Calculator', path: '/calculators/math/discount-calculator' },
      { name: 'Area Calculator', path: '/calculators/math/area-calculator' },
      { name: 'Pythagorean Theorem Calculator', path: '/calculators/math/pythagorean-theorem-calculator' },
      { name: 'Fractions Calculator', path: '/calculators/math/fractions-calculator' },
      { name: 'Mean Median Mode Calculator', path: '/calculators/math/mean-median-mode-calculator' },
    ]
  },
  {
    title: 'Business Calculators',
    description: 'Make better business decisions with our analytical tools.',
    icon: <DollarSign className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-green-500 to-emerald-400',
    path: '/calculators/business',
    calculators: [
      { name: 'Profit Margin Calculator', path: '/calculators/business/profit-margin-calculator' },
      { name: 'ROI Calculator', path: '/calculators/business/roi-calculator' },
      { name: 'Break-even Calculator', path: '/calculators/business/breakeven-calculator' },
      { name: 'Markup Calculator', path: '/calculators/business/markup-calculator' },
      { name: 'Sales Tax Calculator', path: '/calculators/business/sales-tax-calculator' },
      { name: 'Inventory Turnover Calculator', path: '/calculators/business/inventory-turnover-calculator' },
    ]
  },
  {
    title: 'Construction Calculators',
    description: 'Plan your construction projects with accuracy and efficiency.',
    icon: <Construction className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-amber-500 to-yellow-400',
    path: '/calculators/construction',
    calculators: [
      { name: 'Concrete Calculator', path: '/calculators/construction/concrete-calculator' },
      { name: 'Paint Calculator', path: '/calculators/construction/paint-calculator' },
      { name: 'Flooring Calculator', path: '/calculators/construction/flooring-calculator' },
      { name: 'Roofing Calculator', path: '/calculators/construction/roofing-calculator' },
      { name: 'Tile Calculator', path: '/calculators/construction/tile-calculator' },
      { name: 'Wall Framing Calculator', path: '/calculators/construction/wall-framing-calculator' },
    ]
  },
  {
    title: 'Utility Calculators',
    description: 'Simplify everyday tasks with these practical tools.',
    icon: <Wrench className="h-10 w-10 text-white" />,
    background: 'bg-gradient-to-br from-purple-500 to-violet-400',
    path: '/calculators/utility',
    calculators: [
      { name: 'Tip Calculator', path: '/calculators/utility/tip-calculator' },
      { name: 'Unit Converter', path: '/calculators/utility/unit-converter' },
      { name: 'Electricity Bill Calculator', path: '/calculators/utility/electricity-bill-calculator' },
      { name: 'Appliance Energy Use Calculator', path: '/calculators/utility/appliance-energy-calculator' },
      { name: 'Solar Panel Savings Calculator', path: '/calculators/utility/solar-panel-calculator' },
      { name: 'Water Bill Calculator', path: '/calculators/utility/water-bill-calculator' },
      { name: 'Heating Cost Calculator', path: '/calculators/utility/heating-cost-calculator' },
      { name: 'Cooling Cost Calculator', path: '/calculators/utility/cooling-cost-calculator' },
      { name: 'Light Bulb Energy Savings Calculator', path: '/calculators/utility/lightbulb-savings-calculator' },
      { name: 'Carbon Footprint Calculator', path: '/calculators/utility/carbon-footprint-calculator' },
      { name: 'Gas Mileage (MPG) Calculator', path: '/calculators/utility/gas-mileage-calculator' },
      { name: 'Electric Vehicle Range Calculator', path: '/calculators/utility/ev-range-calculator' },
      { name: 'Date Calculator', path: '/calculators/utility/date-calculator' },
      { name: 'Password Generator', path: '/calculators/utility/password-generator' },
      { name: 'GPA Calculator', path: '/calculators/utility/gpa-calculator' },
      { name: 'Fuel Cost Calculator', path: '/calculators/utility/fuel-cost-calculator' },
    ]
  }
];
