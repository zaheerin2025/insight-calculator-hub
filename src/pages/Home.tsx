
import React from 'react';
import SEOMeta from '@/components/ui/seo-meta';

// Import the Index component which contains the main home page content
import Index from './Index';

const Home: React.FC = () => {
  return (
    <>
      <SEOMeta
        title="Calculators Hub - Free Online Calculators for Every Need"
        description="Access free online calculators for finance, health, math, business, construction, and utility needs. Simple, accurate tools to make informed decisions."
        canonicalUrl="https://calculators-hub.com"
      />
      {/* Google AdSense Code */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1264514278457797"
        crossOrigin="anonymous"
      />
      <Index />
    </>
  );
};

export default Home;
