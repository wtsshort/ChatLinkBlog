import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { Link, MousePointer, FileText, Eye } from "lucide-react";

export default function DashboardStats() {
  const { language } = useLanguage();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/stats'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-muted rounded-lg">
                  <div className="w-6 h-6 bg-muted-foreground/20 rounded"></div>
                </div>
                <div className="ml-4 space-y-2">
                  <div className="w-20 h-3 bg-muted-foreground/20 rounded"></div>
                  <div className="w-16 h-6 bg-muted-foreground/20 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statItems = [
    {
      icon: Link,
      label: language === 'ar' ? 'إجمالي الروابط' : 'Total Links',
      value: stats?.totalLinks || 0,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: MousePointer,
      label: language === 'ar' ? 'إجمالي النقرات' : 'Total Clicks',
      value: stats?.totalClicks || 0,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: FileText,
      label: language === 'ar' ? 'منشورات المدونة' : 'Blog Posts',
      value: stats?.totalPosts || 0,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Eye,
      label: language === 'ar' ? 'مشاهدات الصفحة' : 'Page Views',
      value: stats?.totalViews || 0,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <Card key={index} data-testid={`stat-${index}`}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-2 ${item.bgColor} rounded-lg`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-muted-foreground text-sm">{item.label}</p>
                <p className="text-2xl font-semibold text-foreground">
                  {item.value.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
