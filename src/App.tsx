
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CalculatorsFinance from './pages/CalculatorsFinance';
import CalculatorsHealth from './pages/CalculatorsHealth';

// Finance calculator pages
import MortgageCalculatorPage from './pages/calculator-pages/MortgageCalculatorPage';
import CompoundInterestCalculatorPage from './pages/calculator-pages/CompoundInterestCalculatorPage';
import LoanEMICalculatorPage from './pages/calculator-pages/LoanEMICalculatorPage';
import InvestmentReturnCalculatorPage from './pages/calculator-pages/InvestmentReturnCalculatorPage';
import HomeAffordabilityCalculatorPage from './pages/calculator-pages/HomeAffordabilityCalculatorPage';
import CreditCardPayoffCalculatorPage from './pages/calculator-pages/CreditCardPayoffCalculatorPage';
import DebtToIncomeCalculatorPage from './pages/calculator-pages/DebtToIncomeCalculatorPage';
import AutoLoanCalculatorPage from './pages/calculator-pages/AutoLoanCalculatorPage';

// Health calculator pages
import BMICalculatorPage from './pages/calculator-pages/BMICalculatorPage';
import BodyFatCalculatorPage from './pages/calculator-pages/BodyFatCalculatorPage';
import CalorieNeedsCalculatorPage from './pages/calculator-pages/CalorieNeedsCalculatorPage';
import IdealWeightCalculatorPage from './pages/calculator-pages/IdealWeightCalculatorPage';

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
        
        {/* Health Calculator Routes */}
        <Route path="/calculators/health" element={<CalculatorsHealth />} />
        <Route path="/calculators/health/bmi-calculator" element={<BMICalculatorPage />} />
        <Route path="/calculators/health/body-fat-calculator" element={<BodyFatCalculatorPage />} />
        <Route path="/calculators/health/calorie-needs-calculator" element={<CalorieNeedsCalculatorPage />} />
        <Route path="/calculators/health/ideal-weight-calculator" element={<IdealWeightCalculatorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
