import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import { Sparkles, FileText, Eye, Edit, Trash2, LogOut, Save, Wand2 } from "lucide-react";
import { useLocation } from "wouter";
import DashboardStats from "@/components/dashboard-stats";
import { type BlogPost } from "@shared/schema";

const articleSchema = z.object({
  topic: z.string().min(5, "الموضوع يجب أن يكون على الأقل 5 أحرف"),
  language: z.enum(['ar', 'en']),
  category: z.string().min(1, "اختر التصنيف"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const postSchema = z.object({
  title: z.string().min(1, "العنوان مطلوب"),
  content: z.string().min(100, "المحتوى يجب أن يكون على الأقل 100 حرف"),
  excerpt: z.string().optional(),
  category: z.string(),
  status: z.enum(['draft', 'published']),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function AdminPanel() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");
  const [generatedArticle, setGeneratedArticle] = useState<any>(null);

  // التحقق من المصادقة
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setLocation('/admin-login');
      return;
    }
    
    // التحقق من صحة التوكن
    apiRequest('GET', '/api/admin/check', null, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin_token');
        setLocation('/admin-login');
      }
    })
    .catch(() => {
      localStorage.removeItem('admin_token');
      setLocation('/admin-login');
    });
  }, [setLocation]);

  const articleForm = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      topic: "",
      language: "ar",
      category: "مقالات عامة",
    },
  });

  const postForm = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "مقالات عامة",
      status: "draft",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
  });

  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
    enabled: isAuthenticated,
  });

  const generateArticleMutation = useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const token = localStorage.getItem('admin_token');
      const response = await apiRequest("POST", "/api/admin/generate-article", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedArticle(data);
      // ملء النموذج بالبيانات المُولدة
      postForm.reset({
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        category: data.category || 'مقالات عامة',
        status: 'draft',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        keywords: Array.isArray(data.keywords) ? data.keywords.join(', ') : (data.keywords || ''),
      });
      setActiveTab("edit");
      toast({
        title: language === 'ar' ? 'تم إنشاء المقال!' : 'Article Generated!',
        description: language === 'ar' ? 'يمكنك الآن مراجعة وتحرير المقال' : 'You can now review and edit the article',
      });
    },
    onError: (error) => {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في إنشاء المقال' : 'Failed to generate article',
        variant: "destructive",
      });
    },
  });

  const savePostMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      const token = localStorage.getItem('admin_token');
      const response = await apiRequest("POST", "/api/admin/blog-posts", {
        ...data,
        language: articleForm.getValues().language,
        author: 'مدير الموقع',
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: language === 'ar' ? 'تم حفظ المقال!' : 'Article Saved!',
        description: language === 'ar' ? 'تم حفظ المقال بنجاح' : 'Article saved successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      // إعادة تعيين النماذج
      articleForm.reset();
      postForm.reset();
      setGeneratedArticle(null);
      setActiveTab("generate");
    },
    onError: (error) => {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في حفظ المقال' : 'Failed to save article',
        variant: "destructive",
      });
    },
  });

  const onGenerateArticle = (data: ArticleFormData) => {
    generateArticleMutation.mutate(data);
  };

  const onSavePost = (data: PostFormData) => {
    savePostMutation.mutate(data);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setLocation('/admin-login');
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">تحميل...</div>;
  }

  return (
    <div className={`min-h-screen bg-muted/30 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {language === 'ar' ? 'لوحة تحكم المدونة' : 'Blog Admin Panel'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'إنشاء وإدارة المقالات بالذكاء الاصطناعي' : 'Create and manage articles with AI'}
            </p>
          </div>
          <Button variant="outline" onClick={logout} data-testid="logout-button">
            <LogOut className="mr-2 h-4 w-4" />
            {language === 'ar' ? 'تسجيل خروج' : 'Logout'}
          </Button>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Main Content */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="generate" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                  data-testid="generate-tab"
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'إنشاء مقال' : 'Generate Article'}
                </TabsTrigger>
                <TabsTrigger 
                  value="edit"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                  data-testid="edit-tab"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'تحرير المقال' : 'Edit Article'}
                </TabsTrigger>
                <TabsTrigger 
                  value="manage"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                  data-testid="manage-tab"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'إدارة المقالات' : 'Manage Articles'}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Generate Article Tab */}
            <TabsContent value="generate" className="p-6">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    {language === 'ar' ? 'إنشاء مقال بالذكاء الاصطناعي' : 'Generate Article with AI'}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'أدخل موضوع المقال وسيقوم الذكاء الاصطناعي بإنشاء محتوى محسن لمحركات البحث'
                      : 'Enter a topic and AI will generate SEO-optimized content'
                    }
                  </p>
                </div>

                <Form {...articleForm}>
                  <form onSubmit={articleForm.handleSubmit(onGenerateArticle)} className="space-y-6">
                    <FormField
                      control={articleForm.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'ar' ? 'موضوع المقال' : 'Article Topic'}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={language === 'ar' 
                                ? 'مثال: أفضل استراتيجيات التسويق الرقمي 2024'
                                : 'Example: Best Digital Marketing Strategies 2024'
                              }
                              {...field}
                              data-testid="topic-input"
                            />
                          </FormControl>
                          <FormDescription>
                            {language === 'ar' 
                              ? 'كن محدداً قدر الإمكان للحصول على أفضل النتائج'
                              : 'Be as specific as possible for best results'
                            }
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={articleForm.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'ar' ? 'لغة المقال' : 'Article Language'}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="language-select">
                                  <SelectValue placeholder={language === 'ar' ? 'اختر اللغة' : 'Select language'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ar">العربية</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={articleForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'ar' ? 'التصنيف' : 'Category'}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="category-select">
                                  <SelectValue placeholder={language === 'ar' ? 'اختر التصنيف' : 'Select category'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="تسويق رقمي">تسويق رقمي</SelectItem>
                                <SelectItem value="تقنية">تقنية</SelectItem>
                                <SelectItem value="أعمال">أعمال</SelectItem>
                                <SelectItem value="مقالات عامة">مقالات عامة</SelectItem>
                                <SelectItem value="نصائح">نصائح</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={generateArticleMutation.isPending}
                      data-testid="generate-article-button"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {generateArticleMutation.isPending 
                        ? (language === 'ar' ? 'جاري إنشاء المقال...' : 'Generating Article...') 
                        : (language === 'ar' ? 'إنشاء المقال بالذكاء الاصطناعي' : 'Generate AI Article')
                      }
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>

            {/* Edit Article Tab */}
            <TabsContent value="edit" className="p-6">
              {generatedArticle ? (
                <Form {...postForm}>
                  <form onSubmit={postForm.handleSubmit(onSavePost)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={postForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'ar' ? 'عنوان المقال' : 'Article Title'}</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="title-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={postForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'ar' ? 'حالة النشر' : 'Status'}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="status-select">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">
                                  {language === 'ar' ? 'مسودة' : 'Draft'}
                                </SelectItem>
                                <SelectItem value="published">
                                  {language === 'ar' ? 'منشور' : 'Published'}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={postForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'ar' ? 'محتوى المقال' : 'Article Content'}</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={20}
                              className="font-mono text-sm"
                              data-testid="content-textarea"
                            />
                          </FormControl>
                          <FormDescription>
                            {language === 'ar' ? 'يمكنك تحرير المحتوى بصيغة Markdown' : 'You can edit content in Markdown format'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={savePostMutation.isPending}
                      data-testid="save-post-button"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {savePostMutation.isPending 
                        ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') 
                        : (language === 'ar' ? 'حفظ المقال' : 'Save Article')
                      }
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {language === 'ar' ? 'لا يوجد مقال للتحرير' : 'No Article to Edit'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'ar' 
                      ? 'قم أولاً بإنشاء مقال بالذكاء الاصطناعي'
                      : 'Generate an article with AI first'
                    }
                  </p>
                  <Button onClick={() => setActiveTab("generate")} data-testid="go-generate-button">
                    {language === 'ar' ? 'إنشاء مقال' : 'Generate Article'}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Manage Articles Tab */}
            <TabsContent value="manage" className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {language === 'ar' ? 'إدارة المقالات' : 'Manage Articles'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'ar' ? 'جميع المقالات المحفوظة' : 'All saved articles'}
                </p>
              </div>

              {postsLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse border border-border rounded-lg p-4">
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {posts?.length > 0 ? posts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">
                                {post.title}
                              </h3>
                              <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status === 'published' 
                                  ? (language === 'ar' ? 'منشور' : 'Published')
                                  : (language === 'ar' ? 'مسودة' : 'Draft')
                                }
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <span>{post.category}</span>
                              <span>•</span>
                              <span>{post.views?.toLocaleString() || 0} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
                              <span>•</span>
                              <span>{post.readingTime} {language === 'ar' ? 'دقيقة قراءة' : 'min read'}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Button variant="ghost" size="sm" data-testid={`view-post-${post.id}`}>
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" data-testid={`edit-post-${post.id}`}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" data-testid={`delete-post-${post.id}`}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )) : (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {language === 'ar' ? 'لا توجد مقالات' : 'No Articles'}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {language === 'ar' 
                          ? 'ابدأ بإنشاء مقال جديد'
                          : 'Start by creating a new article'
                        }
                      </p>
                      <Button onClick={() => setActiveTab("generate")} data-testid="create-first-article-button">
                        {language === 'ar' ? 'إنشاء أول مقال' : 'Create First Article'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}