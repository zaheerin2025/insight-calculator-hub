
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';

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

      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          {post.coverImage && (
            <div className="aspect-[16/9] mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <span>{formatDate(post.date)}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content}
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-medium mb-2">
                      <Link 
                        to={`/blog/${relatedPost.slug}`} 
                        className="hover:text-primary transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(relatedPost.date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
