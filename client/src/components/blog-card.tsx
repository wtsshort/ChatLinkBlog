import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type BlogPost } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { language } = useLanguage();

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '';
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`blog-card-${post.slug}`}>
      <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <div className="w-8 h-8 bg-primary/40 rounded"></div>
          </div>
          <p className="text-xs text-muted-foreground">
            {language === 'ar' ? 'صورة المقال' : 'Article Image'}
          </p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <span className="text-muted-foreground text-sm">
            {formatDate(post.createdAt)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <span className="text-sm text-muted-foreground">{post.author}</span>
          </div>
          <a 
            href={`/blog/${post.slug}`} 
            className="text-primary hover:text-primary/80 font-medium text-sm"
            data-testid={`read-more-${post.slug}`}
          >
            {language === 'ar' ? 'اقرأ المزيد ←' : 'Read More →'}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
