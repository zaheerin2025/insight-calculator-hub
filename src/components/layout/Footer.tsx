
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">InsightCalc</h3>
            <p className="text-muted-foreground">
              Your go-to resource for accurate calculations and informed decisions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/calculators/finance" className="text-muted-foreground hover:text-primary transition-colors">
                  Finance Calculators
                </Link>
              </li>
              <li>
                <Link to="/calculators/health" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Calculators
                </Link>
              </li>
              <li>
                <Link to="/calculators/math" className="text-muted-foreground hover:text-primary transition-colors">
                  Math Calculators
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Popular Calculators</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/calculators/finance/mortgage-calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/health/bmi-calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/math/percentage-calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  Percentage Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} InsightCalc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
