
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CalculatorsFinance from "./pages/CalculatorsFinance";
import CalculatorsHealth from "./pages/CalculatorsHealth";
import CalculatorsMath from "./pages/CalculatorsMath";
import CalculatorsBusiness from "./pages/CalculatorsBusiness";
import CalculatorsConstruction from "./pages/CalculatorsConstruction";
import MortgageCalculatorPage from "./pages/calculator-pages/MortgageCalculatorPage";
import CompoundInterestCalculatorPage from "./pages/calculator-pages/CompoundInterestCalculatorPage";
import LoanEMICalculatorPage from "./pages/calculator-pages/LoanEMICalculatorPage";
import SimpleInterestCalculatorPage from "./pages/calculator-pages/SimpleInterestCalculatorPage";
import BMICalculatorPage from "./pages/calculator-pages/BMICalculatorPage";
import PercentageCalculatorPage from "./pages/calculator-pages/PercentageCalculatorPage";
import RetirementSavingsCalculatorPage from "./pages/calculator-pages/RetirementSavingsCalculatorPage";
import InvestmentReturnCalculatorPage from "./pages/calculator-pages/InvestmentReturnCalculatorPage";
import CreditCardPayoffCalculatorPage from "./pages/calculator-pages/CreditCardPayoffCalculatorPage";
import DebtToIncomeCalculatorPage from "./pages/calculator-pages/DebtToIncomeCalculatorPage";
import HomeAffordabilityCalculatorPage from "./pages/calculator-pages/HomeAffordabilityCalculatorPage";
import AutoLoanCalculatorPage from "./pages/calculator-pages/AutoLoanCalculatorPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Helmet>
        <title>Calculators-Hub | Your Ultimate Calculator Hub</title>
        <meta name="description" content="Access powerful calculators for finance, health, math, business, and construction. Make informed decisions with Calculators-Hub's simple, accurate tools." />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Main Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Calculator Category Pages */}
          <Route path="/calculators/finance" element={<CalculatorsFinance />} />
          <Route path="/calculators/health" element={<CalculatorsHealth />} />
          <Route path="/calculators/math" element={<CalculatorsMath />} />
          <Route path="/calculators/business" element={<CalculatorsBusiness />} />
          <Route path="/calculators/construction" element={<CalculatorsConstruction />} />
          
          {/* Finance Calculator Pages */}
          <Route path="/calculators/finance/mortgage-calculator" element={<MortgageCalculatorPage />} />
          <Route path="/calculators/finance/compound-interest-calculator" element={<CompoundInterestCalculatorPage />} />
          <Route path="/calculators/finance/loan-emi-calculator" element={<LoanEMICalculatorPage />} />
          <Route path="/calculators/finance/simple-interest-calculator" element={<SimpleInterestCalculatorPage />} />
          <Route path="/calculators/finance/retirement-savings-calculator" element={<RetirementSavingsCalculatorPage />} />
          <Route path="/calculators/finance/investment-return-calculator" element={<InvestmentReturnCalculatorPage />} />
          <Route path="/calculators/finance/credit-card-payoff-calculator" element={<CreditCardPayoffCalculatorPage />} />
          <Route path="/calculators/finance/debt-to-income-calculator" element={<DebtToIncomeCalculatorPage />} />
          <Route path="/calculators/finance/home-affordability-calculator" element={<HomeAffordabilityCalculatorPage />} />
          <Route path="/calculators/finance/auto-loan-calculator" element={<AutoLoanCalculatorPage />} />
          
          {/* Health Calculator Pages */}
          <Route path="/calculators/health/bmi-calculator" element={<BMICalculatorPage />} />
          
          {/* Math Calculator Pages */}
          <Route path="/calculators/math/percentage-calculator" element={<PercentageCalculatorPage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
