
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
import BMICalculatorPage from "./pages/calculator-pages/BMICalculatorPage";
import PercentageCalculatorPage from "./pages/calculator-pages/PercentageCalculatorPage";
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
          
          {/* Calculator Category Pages */}
          <Route path="/calculators/finance" element={<CalculatorsFinance />} />
          <Route path="/calculators/health" element={<CalculatorsHealth />} />
          <Route path="/calculators/math" element={<CalculatorsMath />} />
          <Route path="/calculators/business" element={<CalculatorsBusiness />} />
          <Route path="/calculators/construction" element={<CalculatorsConstruction />} />
          
          {/* Finance Calculator Pages */}
          <Route path="/calculators/finance/mortgage-calculator" element={<MortgageCalculatorPage />} />
          <Route path="/calculators/finance/compound-interest-calculator" element={<CompoundInterestCalculatorPage />} />
          
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
