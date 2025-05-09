
import React from 'react';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';
import { Link } from 'react-router-dom';

const TermsOfUse: React.FC = () => {
  return (
    <Layout>
      <SEOMeta
        title="Terms of Use | Calculators-Hub"
        description="Read our terms of use to understand the rules and guidelines for using Calculators-Hub's online tools and services."
        canonicalUrl="https://calculators-hub.com/terms-of-use"
      />

      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Use</h1>
          <p className="text-muted-foreground">Last updated: May 9, 2025</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="prose max-w-4xl mx-auto">
          <h2>Welcome to Calculators-Hub</h2>
          <p>
            These terms and conditions outline the rules and regulations for the use of Calculators-Hub's website.
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use
            Calculators-Hub if you do not accept all of the terms and conditions stated on this page.
          </p>
          
          <h2>License to Use</h2>
          <p>
            Unless otherwise stated, Calculators-Hub and/or its licensors own the intellectual property rights for
            all material on Calculators-Hub. All intellectual property rights are reserved. You may view and use
            the calculators on this website for your own personal use, subject to the restrictions set out in these terms.
          </p>
          
          <h2>Restrictions</h2>
          <p>You are specifically restricted from:</p>
          <ul>
            <li>Publishing any website material in any other media without proper attribution</li>
            <li>Selling, sublicensing, and/or otherwise commercializing any website material</li>
            <li>Using this website in any way that is or may be damaging to this website</li>
            <li>Using this website in any way that impacts user access to this website</li>
            <li>Using this website contrary to applicable laws and regulations, or in a way that causes harm to the website, or to any person or business entity</li>
          </ul>
          
          <h2>Your Content</h2>
          <p>
            Any information you input into our calculators is your responsibility. We do not claim ownership over the information
            you provide to our calculators, and we do not store your calculation data on our servers unless you explicitly save
            or share your calculations.
          </p>
          
          <h2>No Warranties</h2>
          <p>
            This website is provided "as is," with all faults, and Calculators-Hub makes no express or implied representations or warranties.
            While we strive to provide accurate calculators and information, we make no warranty that the information and calculators on this
            website are accurate, complete, or suitable for your specific needs. You use our calculators at your own risk.
          </p>
          
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Calculators-Hub or its suppliers be liable for any damages (including, without limitation, damages for
            loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Calculators-Hub,
            even if Calculators-Hub or a Calculators-Hub authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          
          <h2>External Links</h2>
          <p>
            Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy,
            relevance, timeliness, or completeness of any information on these external websites.
          </p>
          
          <h2>Amendments</h2>
          <p>
            We may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version
            of these terms of service.
          </p>
          
          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive
            jurisdiction of the courts in that location.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: terms@calculators-hub.com
          </p>
          
          <p className="mt-8">
            For more information about how we handle your data, please see our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;
