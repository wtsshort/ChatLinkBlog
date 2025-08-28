import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { type BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { language } = useLanguage();
  const params = useParams();
  const slug = params.slug;

  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const post = posts?.find(p => p.slug === slug && p.status === 'published');

  if (!post) {
    return (
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'المقال غير موجود' : 'Post Not Found'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {language === 'ar' ? 'لا يمكن العثور على المقال المطلوب' : 'The requested post could not be found'}
          </p>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Back to Blog */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
          </Button>
        </Link>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Post Header */}
      <header className="mb-8">
        {post.category && (
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
        )}
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Post Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {post.author && (
            <span className="font-medium">
              {language === 'ar' ? 'بواسطة' : 'By'} {post.author}
            </span>
          )}
          
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString(
                language === 'ar' ? 'ar-SA' : 'en-US',
                { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }
              ) : ''}
            </span>
          </div>
          
          {post.readingTime && post.readingTime > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {post.readingTime} {language === 'ar' ? 'دقيقة قراءة' : 'min read'}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>
              {post.views?.toLocaleString() || 0} {language === 'ar' ? 'مشاهدة' : 'views'}
            </span>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div 
          className="space-y-6 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: post.content.replace(/\n/g, '<br>').replace(/##/g, '<h2>').replace(/###/g, '<h3>') 
          }}
        />
      </div>

      {/* Post Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {post.keywords && (
            <div className="flex flex-wrap gap-2">
              {post.keywords.split(',').map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {keyword.trim()}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            {language === 'ar' ? 'آخر تحديث:' : 'Last updated:'} {' '}
            {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString(
              language === 'ar' ? 'ar-SA' : 'en-US'
            ) : ''}
          </div>
        </div>
      </footer>
    </article>
  );
}