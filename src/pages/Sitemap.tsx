
import React from 'react';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';
import { Link } from 'react-router-dom';
import { calculatorCategories, Calculator as CalculatorType } from '@/data/calculator-categories';

const Sitemap: React.FC = () => {
  return (
    <Layout>
      <SEOMeta
        title="Sitemap | Calculators-Hub"
        description="Browse the complete sitemap of Calculators-Hub to find all available calculators and pages."
        canonicalUrl="https://calculators-hub.com/sitemap"
      />

      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sitemap</h1>
          <p className="text-muted-foreground">Find all pages available on Calculators-Hub</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Main Pages</h2>
            <ul className="space-y-2 ml-5 list-disc">
              <li><Link to="/" className="text-primary hover:underline">Home</Link></li>
              <li><Link to="/about" className="text-primary hover:underline">About</Link></li>
              <li><Link to="/contact" className="text-primary hover:underline">Contact</Link></li>
              <li><Link to="/blog" className="text-primary hover:underline">Blog</Link></li>
              <li><Link to="/all-calculators" className="text-primary hover:underline">All Calculators</Link></li>
              <li><Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="text-primary hover:underline">Terms of Use</Link></li>
            </ul>
          </div>

          {calculatorCategories.map((category, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
              <ul className="space-y-2 ml-5 list-disc">
                <li>
                  <Link to={category.path} className="text-primary hover:underline font-medium">
                    {category.title} Overview
                  </Link>
                </li>
                {category.calculators
                  .filter((calc: CalculatorType) => !calc.comingSoon)
                  .map((calculator: CalculatorType, calcIndex: number) => (
                    <li key={calcIndex}>
                      <Link to={calculator.path} className="text-primary hover:underline">
                        {calculator.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
            <ul className="space-y-2 ml-5 list-disc">
              {/* This would normally be populated from your actual blog posts */}
              <li><Link to="/blog" className="text-primary hover:underline">View All Blog Posts</Link></li>
            </ul>
          </div>
          
          <div className="bg-muted p-6 mt-10 rounded-lg">
            <h3 className="font-semibold mb-2">Looking for something specific?</h3>
            <p>If you can't find what you're looking for, please visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link> or use the navigation menu at the top of the site.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
