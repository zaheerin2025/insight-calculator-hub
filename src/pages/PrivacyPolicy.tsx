
import React from 'react';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout>
      <SEOMeta
        title="Privacy Policy | Calculators-Hub"
        description="Our privacy policy outlines how we collect, use, and protect your information when using our calculator tools."
        canonicalUrl="https://calculators-hub.com/privacy-policy"
      />

      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 9, 2025</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="prose max-w-4xl mx-auto">
          <h2>Introduction</h2>
          <p>
            At Calculators-Hub, we respect your privacy and are committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
          
          <h2>Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li><strong>Usage Data:</strong> We collect information on how you interact with our calculators and website, such as which calculators you use and how you access our services.</li>
            <li><strong>Device Information:</strong> We collect information about your device, including your browser type, IP address, and operating system.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our website and to store certain information.</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our calculator services</li>
            <li>To improve our website and calculator functions</li>
            <li>To analyze usage patterns and optimize user experience</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
          
          <h2>Data Storage and Security</h2>
          <p>
            All calculations performed on our website are processed in your browser. We do not store the specific values you enter into our calculators on our servers unless you explicitly save or share your calculations.
          </p>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.
          </p>
          
          <h2>Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, or assist us in analyzing website usage. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
          
          <h2>Analytics</h2>
          <p>
            We use analytics services like Google Analytics to help analyze how users use our site. These tools use cookies to collect information such as how often users visit our site and what pages they visit. We use this information to improve our website and services.
          </p>
          
          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>
          
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@calculators-hub.com
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
