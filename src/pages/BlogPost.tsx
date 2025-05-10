
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Import blog post data
import { blogPosts, findPostBySlug } from '@/data/blog-posts';

const TableOfContents = ({ headings }: { headings: { id: string; title: string; level: number }[] }) => {
  return (
    <div className="hidden lg:block sticky top-6 bg-white rounded-lg border p-4 shadow-sm">
      <h4 className="font-semibold mb-3">Table of Contents</h4>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block py-1 text-sm hover:text-primary transition-colors ${
              heading.level === 2 ? 'font-medium' : 'pl-3 text-muted-foreground'
            }`}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </div>
  );
};

const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-8 w-8"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on Facebook</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-8 w-8"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank')}
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on Twitter</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-8 w-8"
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, '_blank')}
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on LinkedIn</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = findPostBySlug(slug || '');

  if (!post) {
    return <Navigate to="/blog" />;
  }

  // Extract headings for table of contents
  const headings = post.toc || [];
  
  // Full URL for sharing
  const currentUrl = `https://calculators-hub.com/blog/${post.slug}`;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && (
      p.categories.some(cat => post.categories.includes(cat)) ||
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  return (
    <Layout>
      <SEOMeta
        title={`${post.title} | Calculators-Hub Blog`}
        description={post.excerpt}
        canonicalUrl={`https://calculators-hub.com/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
      />

      <div className="bg-muted/30 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-primary mb-6 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">{post.title}</h1>
            
            <div className="flex flex-wrap gap-6 items-center text-sm text-muted-foreground mb-8">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={post.authorImage || "https://api.dicebear.com/7.x/initials/svg?seed=" + post.author} />
                  <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
              </div>
              <ShareButtons title={post.title} url={currentUrl} />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map(category => (
                <Badge key={category} variant="outline" className="bg-primary/5">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <TableOfContents headings={headings} />
          </div>
          
          <div className="lg:col-span-9">
            <div className="max-w-3xl">
              {post.coverImage && (
                <div className="aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <article className="prose prose-lg max-w-none mb-12">
                {post.content}
              </article>

              <div className="flex flex-wrap gap-2 my-8">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" /> {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="my-8" />

              <div className="bg-muted/30 rounded-xl p-6 my-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={post.authorImage || "https://api.dicebear.com/7.x/initials/svg?seed=" + post.author} />
                    <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">About {post.author}</h3>
                    <p className="text-muted-foreground text-sm mb-2">Financial Expert at Calculators-Hub</p>
                    <p className="text-sm">Passionate about making finance accessible through intuitive calculators and informative content.</p>
                  </div>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="my-12">
                  <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card key={relatedPost.slug} className="hover:shadow-md transition-shadow border-t-4 border-t-primary">
                        {relatedPost.coverImage && (
                          <div className="aspect-[16/9] overflow-hidden">
                            <img
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}
                        <CardContent className="p-4">
                          <div className="text-xs text-muted-foreground mb-2">{formatDate(relatedPost.date)}</div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            <Link 
                              to={`/blog/${relatedPost.slug}`} 
                              className="hover:text-primary transition-colors"
                            >
                              {relatedPost.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <Button asChild variant="link" className="p-0 h-auto">
                            <Link to={`/blog/${relatedPost.slug}`}>Read More</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-muted p-8 rounded-lg shadow-sm text-center mt-12">
                <h3 className="text-xl font-semibold mb-2">Join Our Newsletter</h3>
                <p className="text-muted-foreground mb-6">Get financial tips, calculator updates, and exclusive content delivered to your inbox.</p>
                <div className="flex max-w-md mx-auto gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button>Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
