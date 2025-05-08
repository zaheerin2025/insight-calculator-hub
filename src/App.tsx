
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CalculatorsFinance from './pages/CalculatorsFinance';
import CalculatorsHealth from './pages/CalculatorsHealth';
import CalculatorsMath from './pages/CalculatorsMath';
import CalculatorsConstruction from './pages/CalculatorsConstruction';
import CalculatorsBusiness from './pages/CalculatorsBusiness';
import NotFound from './pages/NotFound';

// Finance calculator pages
import MortgageCalculatorPage from './pages/calculator-pages/MortgageCalculatorPage';
import CompoundInterestCalculatorPage from './pages/calculator-pages/CompoundInterestCalculatorPage';
import LoanEMICalculatorPage from './pages/calculator-pages/LoanEMICalculatorPage';
import InvestmentReturnCalculatorPage from './pages/calculator-pages/InvestmentReturnCalculatorPage';
import HomeAffordabilityCalculatorPage from './pages/calculator-pages/HomeAffordabilityCalculatorPage';
import CreditCardPayoffCalculatorPage from './pages/calculator-pages/CreditCardPayoffCalculatorPage';
import DebtToIncomeCalculatorPage from './pages/calculator-pages/DebtToIncomeCalculatorPage';
import AutoLoanCalculatorPage from './pages/calculator-pages/AutoLoanCalculatorPage';
import SimpleInterestCalculatorPage from './pages/calculator-pages/SimpleInterestCalculatorPage';
import RetirementSavingsCalculatorPage from './pages/calculator-pages/RetirementSavingsCalculatorPage';

// Health calculator pages
import BMICalculatorPage from './pages/calculator-pages/BMICalculatorPage';
import BodyFatCalculatorPage from './pages/calculator-pages/BodyFatCalculatorPage';
import CalorieNeedsCalculatorPage from './pages/calculator-pages/CalorieNeedsCalculatorPage';
import IdealWeightCalculatorPage from './pages/calculator-pages/IdealWeightCalculatorPage';
import HeartRateCalculatorPage from './pages/calculator-pages/HeartRateCalculatorPage';
import BMRCalculatorPage from './pages/calculator-pages/BMRCalculatorPage';
import WaterIntakeCalculatorPage from './pages/calculator-pages/WaterIntakeCalculatorPage';
import PregnancyDueDateCalculatorPage from './pages/calculator-pages/PregnancyDueDateCalculatorPage';
import MacroNutrientCalculatorPage from './pages/calculator-pages/MacroNutrientCalculatorPage';
import WaistHipRatioCalculatorPage from './pages/calculator-pages/WaistHipRatioCalculatorPage';

// Math calculator pages
import PercentageCalculatorPage from './pages/calculator-pages/PercentageCalculatorPage';
import AgeCalculatorPage from './pages/calculator-pages/AgeCalculatorPage';
import DiscountCalculatorPage from './pages/calculator-pages/DiscountCalculatorPage';
import AreaCalculatorPage from './pages/calculator-pages/AreaCalculatorPage';

// Business calculator pages
import ProfitMarginCalculatorPage from './pages/calculator-pages/ProfitMarginCalculatorPage';
import ROICalculatorPage from './pages/calculator-pages/ROICalculatorPage';
import BreakEvenCalculatorPage from './pages/calculator-pages/BreakEvenCalculatorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Finance Calculator Routes */}
        <Route path="/calculators/finance" element={<CalculatorsFinance />} />
        <Route path="/calculators/finance/mortgage-calculator" element={<MortgageCalculatorPage />} />
        <Route path="/calculators/finance/compound-interest-calculator" element={<CompoundInterestCalculatorPage />} />
        <Route path="/calculators/finance/loan-emi-calculator" element={<LoanEMICalculatorPage />} />
        <Route path="/calculators/finance/investment-return-calculator" element={<InvestmentReturnCalculatorPage />} />
        <Route path="/calculators/finance/home-affordability-calculator" element={<HomeAffordabilityCalculatorPage />} />
        <Route path="/calculators/finance/credit-card-payoff-calculator" element={<CreditCardPayoffCalculatorPage />} />
        <Route path="/calculators/finance/debt-to-income-calculator" element={<DebtToIncomeCalculatorPage />} />
        <Route path="/calculators/finance/auto-loan-calculator" element={<AutoLoanCalculatorPage />} />
        <Route path="/calculators/finance/simple-interest-calculator" element={<SimpleInterestCalculatorPage />} />
        <Route path="/calculators/finance/retirement-savings-calculator" element={<RetirementSavingsCalculatorPage />} />
        
        {/* Health Calculator Routes */}
        <Route path="/calculators/health" element={<CalculatorsHealth />} />
        <Route path="/calculators/health/bmi-calculator" element={<BMICalculatorPage />} />
        <Route path="/calculators/health/body-fat-calculator" element={<BodyFatCalculatorPage />} />
        <Route path="/calculators/health/calorie-needs-calculator" element={<CalorieNeedsCalculatorPage />} />
        <Route path="/calculators/health/ideal-weight-calculator" element={<IdealWeightCalculatorPage />} />
        <Route path="/calculators/health/heart-rate-calculator" element={<HeartRateCalculatorPage />} />
        <Route path="/calculators/health/bmr-calculator" element={<BMRCalculatorPage />} />
        <Route path="/calculators/health/water-intake-calculator" element={<WaterIntakeCalculatorPage />} />
        <Route path="/calculators/health/pregnancy-due-date-calculator" element={<PregnancyDueDateCalculatorPage />} />
        <Route path="/calculators/health/macro-nutrient-calculator" element={<MacroNutrientCalculatorPage />} />
        <Route path="/calculators/health/waist-hip-ratio-calculator" element={<WaistHipRatioCalculatorPage />} />

        {/* Math Calculator Routes */}
        <Route path="/calculators/math" element={<CalculatorsMath />} />
        <Route path="/calculators/math/percentage-calculator" element={<PercentageCalculatorPage />} />
        <Route path="/calculators/math/age-calculator" element={<AgeCalculatorPage />} />
        <Route path="/calculators/math/discount-calculator" element={<DiscountCalculatorPage />} />
        <Route path="/calculators/math/area-calculator" element={<AreaCalculatorPage />} />
        
        {/* Business Calculator Routes */}
        <Route path="/calculators/business" element={<CalculatorsBusiness />} />
        <Route path="/calculators/business/profit-margin-calculator" element={<ProfitMarginCalculatorPage />} />
        <Route path="/calculators/business/roi-calculator" element={<ROICalculatorPage />} />
        <Route path="/calculators/business/breakeven-calculator" element={<BreakEvenCalculatorPage />} />

        {/* Construction Calculator Routes */}
        <Route path="/calculators/construction" element={<CalculatorsConstruction />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
