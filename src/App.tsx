
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AllCalculators from './pages/AllCalculators';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Sitemap from './pages/Sitemap';
import CalculatorsFinance from './pages/CalculatorsFinance';
import CalculatorsHealth from './pages/CalculatorsHealth';
import CalculatorsMath from './pages/CalculatorsMath';
import CalculatorsConstruction from './pages/CalculatorsConstruction';
import CalculatorsBusiness from './pages/CalculatorsBusiness';
import CalculatorsUtility from './pages/CalculatorsUtility';
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
import PythagoreanTheoremCalculatorPage from './pages/calculator-pages/PythagoreanTheoremCalculatorPage';
import SquareRootCalculatorPage from './pages/calculator-pages/SquareRootCalculatorPage';
import FactorialCalculatorPage from './pages/calculator-pages/FactorialCalculatorPage';
import FractionsCalculatorPage from './pages/calculator-pages/FractionsCalculatorPage';
import MeanMedianModeCalculatorPage from './pages/calculator-pages/MeanMedianModeCalculatorPage';

// Business calculator pages
import ProfitMarginCalculatorPage from './pages/calculator-pages/ProfitMarginCalculatorPage';
import ROICalculatorPage from './pages/calculator-pages/ROICalculatorPage';
import BreakEvenCalculatorPage from './pages/calculator-pages/BreakEvenCalculatorPage';
import MarkupCalculatorPage from './pages/calculator-pages/MarkupCalculatorPage';
import SalesTaxCalculatorPage from './pages/calculator-pages/SalesTaxCalculatorPage';
import InventoryTurnoverCalculatorPage from './pages/calculator-pages/InventoryTurnoverCalculatorPage';

// Construction calculator pages
import ConcreteCalculatorPage from './pages/calculator-pages/ConcreteCalculatorPage';
import FlooringCalculatorPage from './pages/calculator-pages/FlooringCalculatorPage';
import PaintCalculatorPage from './pages/calculator-pages/PaintCalculatorPage';
import RoofingCalculatorPage from './pages/calculator-pages/RoofingCalculatorPage';
import TileCalculatorPage from './pages/calculator-pages/TileCalculatorPage';
import WallFramingCalculatorPage from './pages/calculator-pages/WallFramingCalculatorPage';

// Utility calculator pages
import TipCalculatorPage from './pages/calculator-pages/TipCalculatorPage';
import UnitConverterPage from './pages/calculator-pages/UnitConverterPage';
import ElectricityBillCalculatorPage from './pages/calculator-pages/ElectricityBillCalculatorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/all-calculators" element={<AllCalculators />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/sitemap" element={<Sitemap />} />
        
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
        <Route path="/calculators/math/pythagorean-theorem-calculator" element={<PythagoreanTheoremCalculatorPage />} />
        <Route path="/calculators/math/square-root-calculator" element={<SquareRootCalculatorPage />} />
        <Route path="/calculators/math/factorial-calculator" element={<FactorialCalculatorPage />} />
        <Route path="/calculators/math/fractions-calculator" element={<FractionsCalculatorPage />} />
        <Route path="/calculators/math/mean-median-mode-calculator" element={<MeanMedianModeCalculatorPage />} />
        
        {/* Business Calculator Routes */}
        <Route path="/calculators/business" element={<CalculatorsBusiness />} />
        <Route path="/calculators/business/profit-margin-calculator" element={<ProfitMarginCalculatorPage />} />
        <Route path="/calculators/business/roi-calculator" element={<ROICalculatorPage />} />
        <Route path="/calculators/business/breakeven-calculator" element={<BreakEvenCalculatorPage />} />
        <Route path="/calculators/business/markup-calculator" element={<MarkupCalculatorPage />} />
        <Route path="/calculators/business/sales-tax-calculator" element={<SalesTaxCalculatorPage />} />
        <Route path="/calculators/business/inventory-turnover-calculator" element={<InventoryTurnoverCalculatorPage />} />

        {/* Construction Calculator Routes */}
        <Route path="/calculators/construction" element={<CalculatorsConstruction />} />
        <Route path="/calculators/construction/concrete-calculator" element={<ConcreteCalculatorPage />} />
        <Route path="/calculators/construction/flooring-calculator" element={<FlooringCalculatorPage />} />
        <Route path="/calculators/construction/paint-calculator" element={<PaintCalculatorPage />} />
        <Route path="/calculators/construction/roofing-calculator" element={<RoofingCalculatorPage />} />
        <Route path="/calculators/construction/tile-calculator" element={<TileCalculatorPage />} />
        <Route path="/calculators/construction/wall-framing-calculator" element={<WallFramingCalculatorPage />} />
        
        {/* Utility Calculator Routes */}
        <Route path="/calculators/utility" element={<CalculatorsUtility />} />
        <Route path="/calculators/utility/tip-calculator" element={<TipCalculatorPage />} />
        <Route path="/calculators/utility/unit-converter" element={<UnitConverterPage />} />
        <Route path="/calculators/utility/electricity-bill-calculator" element={<ElectricityBillCalculatorPage />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
