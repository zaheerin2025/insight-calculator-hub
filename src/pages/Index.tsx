import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Award, Home, Heart, Percent, Shield, Zap, BarChart, Construction, DollarSign, Wrench } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatDate } from '@/lib/utils';

// Blog post data
import { blogPosts } from '@/data/blog-posts';
// Calculator categories
import { calculatorCategories, Calculator as CalculatorType } from '@/data/calculator-categories';

const features = [
  {
    title: 'Precision',
    description: 'Fast, accurate calculations every time you need them.',
    icon: <Calculator className="h-6 w-6 text-white" />,
    color: 'from-primary to-primary-light'
  },
  {
    title: 'Speed',
    description: 'Lightning fast results with no delays or waiting.',
    icon: <Zap className="h-6 w-6 text-white" />,
    color: 'from-amber-500 to-yellow-400'
  },
  {
    title: 'Privacy',
    description: 'All calculations happen in your browser. No data stored.',
    icon: <Shield className="h-6 w-6 text-white" />,
    color: 'from-green-500 to-emerald-400'
  },
  {
    title: 'Analytics',
    description: 'Visual breakdowns and analysis of your results.',
    icon: <BarChart className="h-6 w-6 text-white" />,
    color: 'from-blue-500 to-indigo-400'
  }
];

const faqs = [
  {
    question: "How accurate are the calculators on Calculators-Hub?",
    answer: "All calculators on Calculators-Hub are designed to provide highly accurate results based on the most up-to-date formulas and methodologies. They undergo rigorous testing to ensure reliability. However, for critical financial or health decisions, we always recommend consulting with a professional."
  },
  {
    question: "Is my data saved when I use a calculator?",
    answer: "No. All calculations are performed directly in your browser, and we do not store any of your input data on our servers. Your privacy is important to us, and we design our calculators with this principle in mind."
  },
  {
    question: "Can I use these calculators on my mobile device?",
    answer: "Yes! All our calculators are fully responsive and work on any device, including smartphones, tablets, laptops, and desktop computers."
  },
  {
    question: "Are the financial calculators up-to-date with current rates?",
    answer: "Our financial calculators allow you to input current market rates, but do not automatically fetch rates. For the most accurate results, we recommend checking current rates from reliable financial sources and then using those figures in our calculators."
  },
  {
    question: "How often are new calculators added?",
    answer: "We regularly add new calculators based on user feedback and emerging needs. Our team is constantly working to expand our library with useful tools across all categories."
  },
  {
    question: "Can I suggest a new calculator?",
    answer: "Absolutely! We welcome suggestions for new calculators. Please visit our Contact page to send us your ideas."
  }
];

// Use the imported blogPosts directly in the component instead of redefining it

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-br from-primary to-primary-light text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.15] bg-[length:16px_16px]"></div>
        <div className="absolute h-full w-full inset-0">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-white/10 filter blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-60 h-60 rounded-full bg-white/10 filter blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Calculators-Hub
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm inline-flex items-center mb-6 border border-white/20">
              <Award className="h-4 w-4 mr-2" />
              <span>Trusted by thousands of users daily</span>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in text-white/90" style={{ animationDelay: '0.1s' }}>
              Simple, accurate calculators for all your financial, health, mathematical, business, and construction needs.
            </p>
            <div className="animate-fade-in flex flex-wrap justify-center gap-4" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" variant="secondary" className="font-medium">
                <Link to="/all-calculators">Explore All Calculators</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Calculator Categories</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our comprehensive suite of calculators designed to help you make informed decisions.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/all-calculators">View All Calculators</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorCategories.map((category, index) => (
            <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="h-full border border-muted hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                <Link to={category.path} className="block">
                  <div className={`${category.background} p-6 flex items-center justify-center`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent)]"></div>
                    <div className="backdrop-blur-sm bg-black/10 rounded-full p-4 relative">
                      {category.icon}
                    </div>
                  </div>
                </Link>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">
                    <Link to={category.path} className="hover:text-primary transition-colors">
                      {category.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {category.calculators.slice(0, 3).map((calculator: CalculatorType, i: number) => (
                      <li key={i}>
                        {calculator.comingSoon ? (
                          <div className="flex items-center text-muted-foreground">
                            <Calculator className="h-4 w-4 mr-2" />
                            {calculator.name}
                            <span className="text-xs ml-2 py-1 px-2 bg-muted rounded-full">Coming Soon</span>
                          </div>
                        ) : (
                          <Link 
                            to={calculator.path} 
                            className="text-primary hover:text-primary-hover hover:underline transition-colors flex items-center"
                          >
                            <Calculator className="h-4 w-4 mr-2" />
                            {calculator.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-auto">
                    <Link to={category.path}>View All</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-2">Why Choose Calculators-Hub?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our calculators are designed to give you the most accurate information with the best user experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Latest Blog Posts Section */}
      <div className="bg-muted/30 py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest from Our Blog</h2>
              <p className="text-muted-foreground max-w-2xl">
                Read our latest articles about calculators, financial planning, health metrics, and more.
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/blog">View All Posts</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  <Button asChild variant="link" className="p-0 h-auto font-medium">
                    <Link to={`/blog/${post.slug}`}>
                      Read More
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="container py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Get answers to common questions about our calculators and how to use them effectively.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      <div className="bg-muted py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our calculators are designed to make complex calculations simple. Try our most popular calculators now!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link to="/calculators/finance/mortgage-calculator">
                Mortgage Calculator
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link to="/calculators/health/bmi-calculator">
                BMI Calculator
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link to="/calculators/utility/electricity-bill-calculator">
                Electricity Bill Calculator
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary hover:underline transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms-of-use" className="hover:text-primary hover:underline transition-colors">Terms of Use</Link>
            <span>|</span>
            <Link to="/sitemap" className="hover:text-primary hover:underline transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
