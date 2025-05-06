
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Mail, Home, Info } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-light rounded-lg h-8 w-8">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Calculators-Hub</h3>
            </div>
            <p className="text-muted-foreground">
              Your go-to resource for accurate calculations and informed decisions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Calculator Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/calculators/finance" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 inline-block"></span>
                  Finance Calculators
                </Link>
              </li>
              <li>
                <Link to="/calculators/health" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 inline-block"></span>
                  Health Calculators
                </Link>
              </li>
              <li>
                <Link to="/calculators/math" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 inline-block"></span>
                  Math Calculators
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Popular Calculators</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/calculators/finance/mortgage-calculator" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 inline-block"></span>
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/health/bmi-calculator" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 inline-block"></span>
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/math/percentage-calculator" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 inline-block"></span>
                  Percentage Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Calculators-Hub.com. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
