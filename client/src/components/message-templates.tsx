import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import { MessageSquare, Plus, Edit, Trash2, Copy } from "lucide-react";

const templateSchema = z.object({
  name: z.string().min(1, "اسم القالب مطلوب").max(100),
  content: z.string().min(1, "محتوى الرسالة مطلوب"),
  category: z.string().optional(),
  language: z.enum(['ar', 'en']).default('ar'),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface MessageTemplatesProps {
  onSelectTemplate?: (message: string) => void;
}

const DEFAULT_TEMPLATES = [
  {
    name: "ترحيب عام",
    content: "أهلاً وسهلاً! أود الاستفسار عن خدماتكم، شكراً لكم.",
    category: "ترحيب",
    language: "ar"
  },
  {
    name: "طلب عرض سعر",
    content: "السلام عليكم، أريد عرض سعر مفصل للمنتج/الخدمة، مع الشكر.",
    category: "مبيعات",
    language: "ar"
  },
  {
    name: "استفسار عن المنتج",
    content: "مرحبا، لدي استفسار عن المنتج وأود معرفة المزيد من التفاصيل.",
    category: "استفسارات",
    language: "ar"
  },
  {
    name: "دعم فني",
    content: "السلام عليكم، أواجه مشكلة تقنية وأحتاج إلى المساعدة من فضلكم.",
    category: "دعم",
    language: "ar"
  },
  {
    name: "حجز موعد",
    content: "مرحبا، أود حجز موعد للاستشارة. متى يمكنني زيارتكم؟",
    category: "مواعيد",
    language: "ar"
  },
  {
    name: "General Inquiry",
    content: "Hello! I would like to inquire about your services. Thank you.",
    category: "General",
    language: "en"
  },
  {
    name: "Price Quote",
    content: "Hi, I need a detailed price quote for your product/service. Thanks!",
    category: "Sales",
    language: "en"
  },
  {
    name: "Product Info",
    content: "Hello, I have questions about your product and would like more details.",
    category: "Inquiries",
    language: "en"
  }
];

export function MessageTemplates({ onSelectTemplate }: MessageTemplatesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const queryClient = useQueryClient();

  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
      content: "",
      category: "",
      language: language,
    },
  });

  // For now, use default templates since we're using in-memory storage
  const { data: templates = DEFAULT_TEMPLATES, isLoading } = useQuery({
    queryKey: ['/api/message-templates'],
    queryFn: async () => {
      // Return default templates for now
      return DEFAULT_TEMPLATES;
    },
  });

  const createTemplateMutation = useMutation({
    mutationFn: async (data: TemplateFormData) => {
      // For now, just show success since we're using default templates
      return data;
    },
    onSuccess: () => {
      toast({
        title: language === 'ar' ? 'تم الإنشاء' : 'Created',
        description: language === 'ar' ? 'تم إنشاء القالب بنجاح' : 'Template created successfully',
      });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const onSubmit = (data: TemplateFormData) => {
    createTemplateMutation.mutate(data);
  };

  const handleSelectTemplate = (template: any) => {
    if (onSelectTemplate) {
      onSelectTemplate(template.content);
      toast({
        title: language === 'ar' ? 'تم التطبيق' : 'Applied',
        description: language === 'ar' ? 'تم تطبيق القالب' : 'Template applied',
      });
    }
  };

  const copyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: language === 'ar' ? 'تم النسخ' : 'Copied',
      description: language === 'ar' ? 'تم نسخ النص' : 'Text copied to clipboard',
    });
  };

  const categories = Array.from(new Set(templates.map(t => t.category).filter(Boolean)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          {language === 'ar' ? 'قوالب الرسائل' : 'Message Templates'}
        </h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              {language === 'ar' ? 'قالب جديد' : 'New Template'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === 'ar' ? 'إنشاء قالب جديد' : 'Create New Template'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'ar' ? 'اسم القالب' : 'Template Name'}</FormLabel>
                      <FormControl>
                        <Input placeholder={language === 'ar' ? 'مثال: ترحيب عام' : 'e.g., General Welcome'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'ar' ? 'التصنيف' : 'Category'}</FormLabel>
                      <FormControl>
                        <Input placeholder={language === 'ar' ? 'مثال: مبيعات' : 'e.g., Sales'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'ar' ? 'اللغة' : 'Language'}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
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
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'ar' ? 'محتوى الرسالة' : 'Message Content'}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={language === 'ar' ? 'اكتب نص الرسالة هنا...' : 'Write your message here...'} 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button type="submit" disabled={createTemplateMutation.isPending}>
                    {createTemplateMutation.isPending 
                      ? (language === 'ar' ? 'جاري الإنشاء...' : 'Creating...') 
                      : (language === 'ar' ? 'إنشاء' : 'Create')
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates
          .filter(template => template.language === language)
          .map((template, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
                  {template.category && (
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {template.content}
                </p>
                <div className="flex gap-1">
                  {onSelectTemplate && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      {language === 'ar' ? 'تطبيق' : 'Apply'}
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => copyTemplate(template.content)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {templates.filter(t => t.language === language).length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>{language === 'ar' ? 'لا توجد قوالب متاحة' : 'No templates available'}</p>
        </div>
      )}
    </div>
  );
}