
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Import blog post data
import { blogPosts, findPostBySlug } from '@/data/blog-posts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = findPostBySlug(slug || '');

  if (!post) {
    return <Navigate to="/blog" />;
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
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
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-primary mb-6 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {post.coverImage && (
            <div className="aspect-[16/9] mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-12">
            {post.content}
          </div>

          <div className="border-t py-8 my-10">
            <div className="flex items-center">
              <div className="flex flex-col">
                <h3 className="font-medium text-lg">Calculators-Hub</h3>
                <p className="text-muted-foreground text-sm">Calculator Experts</p>
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="my-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.slug} className="hover:shadow-md transition-shadow">
                    {relatedPost.coverImage && (
                      <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">
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
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(relatedPost.date)}
                        </span>
                        <Button asChild variant="link" className="p-0 h-auto">
                          <Link to={`/blog/${relatedPost.slug}`}>Read More</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-muted p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground mb-4">Get the latest calculator tips and financial insights delivered to your inbox.</p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button className="rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
