
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Mail, Home, Info, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted border-t">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-primary/10 rounded-full px-6 py-2 mb-4 shadow-sm">
              <Calculator className="h-5 w-5 text-primary mr-2" />
              <span className="text-primary font-medium">Stay Updated</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get the latest updates, calculator tips, and exclusive content delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                required
              />
              <Button type="submit" className="bg-primary hover:bg-primary-hover text-white h-11 shadow-sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-light rounded-lg h-10 w-10 shadow-sm">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Calculators-Hub</h3>
              </div>
              <p className="text-muted-foreground">
                Your comprehensive resource for accurate and reliable online calculators, helping you make informed decisions across finance, health, math, business, and construction.
              </p>
              <div className="flex space-x-3">
                <a href="https://twitter.com" className="bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-colors p-2.5 rounded-full">
                  <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://facebook.com" className="bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-colors p-2.5 rounded-full">
                  <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" className="bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-colors p-2.5 rounded-full">
                  <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Blog
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
            
            <div className="md:col-span-3">
              <h4 className="font-semibold mb-4 text-lg">Calculator Categories</h4>
              <div className="grid grid-cols-1 gap-2">
                <Link to="/calculators/finance" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                  Finance Calculators
                </Link>
                <Link to="/calculators/health" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                  Health Calculators
                </Link>
                <Link to="/calculators/math" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                  Math Calculators
                </Link>
                <Link to="/calculators/business" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                  Business Calculators
                </Link>
                <Link to="/calculators/construction" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                  Construction Calculators
                </Link>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="font-semibold mb-4 text-lg">Popular Calculators</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/calculators/finance/mortgage-calculator" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                    Mortgage Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/finance/compound-interest-calculator" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                    Compound Interest Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/health/bmi-calculator" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                    BMI Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/math/percentage-calculator" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2 inline-block"></span>
                    Percentage Calculator
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Calculators-Hub.com. All rights reserved.
              </p>
              <span className="mx-2 text-muted-foreground">•</span>
              <p className="text-muted-foreground text-sm flex items-center">
                Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for better calculations
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-use" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link>
              <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
