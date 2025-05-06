
import React from 'react';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';

const About: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="About InsightCalc | Your Trusted Calculator Hub"
        description="Learn about InsightCalc, our mission, and our commitment to providing the most accurate and user-friendly online calculators."
        canonicalUrl="https://example.com/about"
      />
      
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About InsightCalc</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your trusted resource for accurate calculations and informed decisions.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4 text-muted-foreground">
              At InsightCalc, our mission is to provide the most accurate, easy-to-use, and accessible calculators for everyone. 
              We believe that informed decisions start with precise calculations, whether you're planning your financial future, 
              monitoring your health metrics, or solving everyday math problems.
            </p>
            <p className="text-muted-foreground">
              We're committed to creating tools that are not only accurate but also educational, 
              helping users understand the formulas and concepts behind each calculation.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Why Choose InsightCalc</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
                <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
                <p className="text-muted-foreground">
                  Our calculators are developed with precision in mind, 
                  thoroughly tested to ensure the most accurate results possible.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
                <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                <p className="text-muted-foreground">
                  We design our calculators to be intuitive and easy to use, 
                  regardless of your technical expertise.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-muted-foreground">
                  Beyond just providing answers, we explain the formulas and 
                  concepts to help you understand the calculations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
                <h3 className="text-xl font-semibold mb-2">Privacy</h3>
                <p className="text-muted-foreground">
                  All calculations are performed locally in your browser. 
                  We don't store or track your personal data.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <p className="mb-4 text-muted-foreground">
              We believe that the best calculators are those that balance functionality with simplicity. 
              That's why we focus on creating tools that provide comprehensive results without overwhelming users with unnecessary complexity.
            </p>
            <p className="text-muted-foreground">
              Each calculator is designed with user experience in mind, featuring clear inputs, 
              instant results, and helpful explanations. We're constantly improving our calculators 
              based on user feedback and the latest industry standards.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              We're always looking to improve our calculators and add new ones based on user needs. 
              If you have any suggestions, feedback, or questions, please don't hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
