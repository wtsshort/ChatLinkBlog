import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import DashboardStats from "@/components/dashboard-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Download, Edit, Eye, Trash2, Copy } from "lucide-react";
import { type BlogPost, type WhatsappLink } from "@shared/schema";

export default function Dashboard() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const { data: links, isLoading: linksLoading } = useQuery<WhatsappLink[]>({
    queryKey: ['/api/whatsapp-links'],
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/whatsapp-links/${id}`);
    },
    onSuccess: () => {
      toast({
        title: language === 'ar' ? 'تم الحذف' : 'Deleted',
        description: language === 'ar' ? 'تم حذف الرابط بنجاح' : 'Link deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/whatsapp-links'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/blog-posts/${id}`);
    },
    onSuccess: () => {
      toast({
        title: language === 'ar' ? 'تم الحذف' : 'Deleted',
        description: language === 'ar' ? 'تم حذف المنشور بنجاح' : 'Post deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  const copyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: language === 'ar' ? 'تم النسخ' : 'Copied',
        description: language === 'ar' ? 'تم نسخ الرابط إلى الحافظة' : 'Link copied to clipboard',
      });
    } catch (err) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في نسخ الرابط' : 'Failed to copy link',
        variant: "destructive",
      });
    }
  };

  const exportData = (data: any[], filename: string) => {
    // Simple CSV export - in a real app, you'd use a library like papa-parse
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(data[0] || {}).join(",") + "\n" +
      data.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '';
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'إدارة المحتوى وتتبع التحليلات' : 'Manage your content and track analytics'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button data-testid="new-post-button">
              <Plus className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'منشور جديد' : 'New Post'}
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Dashboard Tabs */}
      <Card>
        <Tabs defaultValue="posts" className="w-full">
          <div className="border-b border-border">
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="posts" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                data-testid="posts-tab"
              >
                {language === 'ar' ? 'منشورات المدونة' : 'Blog Posts'}
              </TabsTrigger>
              <TabsTrigger 
                value="links"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                data-testid="links-tab"
              >
                {language === 'ar' ? 'روابط واتساب' : 'WhatsApp Links'}
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                data-testid="analytics-tab"
              >
                {language === 'ar' ? 'التحليلات' : 'Analytics'}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Posts Tab */}
          <TabsContent value="posts" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {language === 'ar' ? 'منشورات المدونة' : 'Blog Posts'}
              </h2>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => posts && exportData(posts, 'blog-posts.csv')}
                  data-testid="export-posts-button"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'تصدير CSV' : 'Export CSV'}
                </Button>
                <Button data-testid="create-post-button">
                  <Plus className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'منشور جديد' : 'New Post'}
                </Button>
              </div>
            </div>

            {postsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse border-b border-border pb-4">
                    <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'العنوان' : 'Title'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'التاريخ' : 'Date'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'المشاهدات' : 'Views'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'الإجراءات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.map((post) => (
                      <tr key={post.id} className="border-b border-border hover:bg-muted/50" data-testid={`post-row-${post.id}`}>
                        <td className="py-3 px-4">
                          <div className="font-medium text-foreground">{post.title}</div>
                          <div className="text-sm text-muted-foreground">/blog/{post.slug}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                            {post.status === 'published' 
                              ? (language === 'ar' ? 'منشور' : 'Published')
                              : (language === 'ar' ? 'مسودة' : 'Draft')
                            }
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {post.views?.toLocaleString() || 0}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" data-testid={`edit-post-${post.id}`}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" data-testid={`preview-post-${post.id}`}>
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => deletePostMutation.mutate(post.id)}
                              data-testid={`delete-post-${post.id}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* Links Tab */}
          <TabsContent value="links" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {language === 'ar' ? 'روابط واتساب' : 'WhatsApp Links'}
              </h2>
              <Button 
                variant="outline" 
                onClick={() => links && exportData(links, 'whatsapp-links.csv')}
                data-testid="export-links-button"
              >
                <Download className="mr-2 h-4 w-4" />
                {language === 'ar' ? 'تصدير CSV' : 'Export CSV'}
              </Button>
            </div>

            {linksLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse border-b border-border pb-4">
                    <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'معاينة الرسالة' : 'Message Preview'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'النقرات' : 'Clicks'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'تم الإنشاء' : 'Created'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        {language === 'ar' ? 'الإجراءات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {links?.map((link) => (
                      <tr key={link.id} className="border-b border-border hover:bg-muted/50" data-testid={`link-row-${link.id}`}>
                        <td className="py-3 px-4 font-mono text-sm">{link.phoneNumber}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-foreground max-w-xs truncate">
                            {link.message || (language === 'ar' ? 'بدون رسالة' : 'No message')}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-foreground font-medium">
                          {link.clickCount || 0}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {formatDate(link.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => copyLink(link.generatedLink)}
                              data-testid={`copy-link-${link.id}`}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => deleteLinkMutation.mutate(link.id)}
                              data-testid={`delete-link-${link.id}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {language === 'ar' ? 'نظرة عامة على التحليلات' : 'Analytics Overview'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-primary/40 rounded"></div>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {language === 'ar' ? 'نقرات الروابط عبر الزمن' : 'Link Clicks Over Time'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' 
                    ? 'رسم بياني يوضح اتجاهات النقرات لآخر 30 يوماً'
                    : 'Chart showing click trends for the past 30 days'
                  }
                </p>
              </div>

              <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-accent/40 rounded"></div>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {language === 'ar' ? 'أفضل الروابط أداءً' : 'Top Performing Links'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' 
                    ? 'تفصيل لروابط واتساب الأكثر نقراً'
                    : 'Breakdown of your most clicked WhatsApp links'
                  }
                </p>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 py-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        {language === 'ar' ? 'تم النقر على الرابط: +1234567890' : 'Link clicked: +1234567890'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'منذ دقيقتين' : '2 minutes ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 py-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        {language === 'ar' ? 'تم إنشاء رابط جديد: +9876543210' : 'New link generated: +9876543210'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'منذ 15 دقيقة' : '15 minutes ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 py-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        {language === 'ar' ? 'تم نشر منشور: "دليل تسويق واتساب"' : 'Blog post published: "WhatsApp Marketing Guide"'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'منذ ساعة' : '1 hour ago'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
