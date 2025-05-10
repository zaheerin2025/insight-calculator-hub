
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Search, ArrowRight, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Blog post data
import { blogPosts } from '@/data/blog-posts';

const categoriesFromPosts = Array.from(new Set(blogPosts.flatMap(post => post.categories)));

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || post.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <SEOMeta
        title="Financial Calculator Blog | Expert Tips & Guides | Calculators-Hub"
        description="Explore expert articles on financial planning, mortgage decisions, investment strategies, and how to make the most of calculators for your financial journey."
        canonicalUrl="https://calculators-hub.com/blog"
      />

      {/* Hero section */}
      <div className="bg-muted py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Financial Knowledge Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert insights, practical tips, and in-depth guides to help you make better financial decisions.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Categories filter */}
        <div className="mb-10 overflow-x-auto whitespace-nowrap pb-3 flex gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
            size="sm"
          >
            All Posts
          </Button>
          {categoriesFromPosts.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-2">No articles found</h2>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter to find what you're looking for.</p>
            <Button onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}>Reset Filters</Button>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {filteredPosts.length > 0 && !searchTerm && selectedCategory === null && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Featured Article</h2>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {filteredPosts[0].coverImage && (
                    <div className="lg:col-span-7 rounded-xl overflow-hidden aspect-[16/9]">
                      <img 
                        src={filteredPosts[0].coverImage} 
                        alt={filteredPosts[0].title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  )}
                  <div className="lg:col-span-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {filteredPosts[0].categories.map(category => (
                        <Badge key={category} variant="outline" className="bg-primary/5">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold mb-3 tracking-tight">
                      <Link to={`/blog/${filteredPosts[0].slug}`} className="hover:text-primary transition-colors">
                        {filteredPosts[0].title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4">{filteredPosts[0].excerpt}</p>
                    <div className="flex items-center text-sm mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(filteredPosts[0].date)}</span>
                    </div>
                    <Button asChild>
                      <Link to={`/blog/${filteredPosts[0].slug}`}>
                        Read Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* All posts grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                {searchTerm
                  ? `Search Results for "${searchTerm}"`
                  : selectedCategory
                  ? `${selectedCategory} Articles`
                  : 'Latest Articles'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchTerm || selectedCategory ? filteredPosts : filteredPosts.slice(1)).map((post) => (
                  <Card key={post.slug} className="flex flex-col h-full group hover:shadow-md transition-shadow duration-300">
                    {post.coverImage && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.slice(0, 2).map(category => (
                          <Badge key={category} variant="outline" className="bg-primary/5 text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl line-clamp-2">
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-2" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link to={`/blog/${post.slug}`}>Read More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Newsletter signup */}
        <div className="bg-muted rounded-xl p-8 shadow-sm my-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground mb-6">Stay updated with our latest articles, calculator updates, and financial tips.</p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
