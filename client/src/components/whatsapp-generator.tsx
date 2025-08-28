import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import { generateWhatsAppLink, validatePhoneNumber } from "@/lib/whatsapp";
import { Link, Copy, Share, MessageSquare, Calendar, Shield, Tag, QrCode, BarChart3, Send, Twitter } from "lucide-react";
import { PhoneInput } from "@/components/phone-input";
import { QRCodeGenerator } from "@/components/qr-code-generator";
import { MessageTemplates } from "@/components/message-templates";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  title: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required").refine(validatePhoneNumber, "Invalid phone number format"),
  message: z.string().optional(),
  customSlug: z.string().optional(),
  expiresAt: z.date().optional(),
  isProtected: z.boolean().default(false),
  password: z.string().optional(),
  tags: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function WhatsAppGenerator() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [linkId, setLinkId] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      phoneNumber: "",
      message: "",
      customSlug: "",
      expiresAt: undefined,
      isProtected: false,
      password: "",
      tags: "",
    },
  });

  const createLinkMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const link = generateWhatsAppLink(data.phoneNumber, data.message);
      const response = await apiRequest("POST", "/api/whatsapp-links", {
        title: data.title || "",
        phoneNumber: data.phoneNumber,
        message: data.message || "",
        generatedLink: link,
        customSlug: data.customSlug || "",
        expiresAt: data.expiresAt || null,
        isProtected: data.isProtected || false,
        password: data.password || "",
        tags: data.tags || "",
      });
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedLink(data.generatedLink);
      setLinkId(data.id);
      toast({
        title: language === 'ar' ? 'تم إنشاء الرابط بنجاح!' : 'Link Generated Successfully!',
        description: language === 'ar' ? 'تم إنشاء رابط واتساب الخاص بك.' : 'Your WhatsApp link has been created.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/whatsapp-links'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
    onError: (error) => {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في إنشاء الرابط' : 'Failed to create link',
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createLinkMutation.mutate(data);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast({
        title: language === 'ar' ? 'تم النسخ!' : 'Copied!',
        description: language === 'ar' ? 'تم نسخ الرابط إلى الحافظة.' : 'Link copied to clipboard.',
      });
    } catch (err) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في نسخ الرابط' : 'Failed to copy link',
        variant: "destructive",
      });
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: form.getValues("title") || (language === 'ar' ? 'رابط واتساب' : 'WhatsApp Link'),
          text: form.getValues("message") || (language === 'ar' ? 'تحقق من هذا الرابط' : 'Check out this link'),
          url: generatedLink,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const handleTemplateSelect = (template: string) => {
    form.setValue("message", template);
    toast({
      title: language === 'ar' ? 'تم التطبيق' : 'Applied',
      description: language === 'ar' ? 'تم تطبيق القالب على الرسالة' : 'Template applied to message',
    });
  };

  return (
    <div className={`max-w-3xl mx-auto ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="card-interactive hover-lift shadow-2xl border-0 bg-gradient-to-br from-white via-white to-green-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-green-900/20 backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] overflow-hidden">
        {/* Decorative background patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
        
        <CardHeader className="relative bg-gradient-to-r from-green-600/10 via-emerald-500/10 to-teal-500/10 rounded-t-2xl border-b border-green-200/30 dark:border-green-800/30 py-8">
          <div className="text-center">
            {/* Main icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
              <MessageSquare className="h-10 w-10 text-white drop-shadow-sm" />
            </div>
            
            <CardTitle className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'أنشئ رابط واتساب مميز' : 'Create Your WhatsApp Link'}
            </CardTitle>
            <p className={`text-muted-foreground text-lg font-medium max-w-lg mx-auto leading-relaxed text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'أسرع وأسهل طريقة لإنشاء روابط واتساب احترافية مجانية' : 'The fastest way to create professional WhatsApp links for free'}
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 hover:scale-105 transition-transform">
                {language === 'ar' ? '🚀 فوري' : '🚀 Instant'}
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200 hover:scale-105 transition-transform">
                {language === 'ar' ? '🔒 آمن' : '🔒 Secure'}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 hover:scale-105 transition-transform">
                {language === 'ar' ? '📊 تحليلات' : '📊 Analytics'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <PhoneInput
                          value={field.value}
                          onChange={field.onChange}
                          language={language}
                          placeholder={language === 'ar' ? '501234567' : '1234567890'}
                          data-testid="phone-input"
                          className="transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </FormControl>
                    <FormDescription className="text-slate-600 dark:text-slate-400 font-medium">
                      {language === 'ar' ? 'اختر الدولة وأدخل رقم الهاتف بدون رمز الدولة' : 'Select country and enter phone number without country code'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                      {language === 'ar' ? 'الرسالة (اختيارية)' : 'Message (Optional)'}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder={language === 'ar' ? 'مرحبا! أنا مهتم بخدماتكم...' : 'Hello! I\'m interested in your services...'}
                          rows={5}
                          {...field}
                          data-testid="message-input"
                          className="resize-none transition-all duration-300 hover:scale-[1.01] focus:scale-[1.01] bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-700/50 border-2 hover:border-green-300 focus:border-green-400 text-base leading-relaxed"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </FormControl>
                    <FormDescription className="text-slate-600 dark:text-slate-400 font-medium">
                      {language === 'ar' ? 'املأ مسبقاً رسالة واتساب للمستخدمين' : 'Pre-fill the WhatsApp message for your users'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button 
                type="submit" 
                className="w-full relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-bold py-6 px-8 text-xl rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-70 group"
                disabled={createLinkMutation.isPending}
                data-testid="generate-button"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {createLinkMutation.isPending ? (
                  <div className="flex items-center justify-center gap-4 relative z-10">
                    <div className="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <span className="font-extrabold">{language === 'ar' ? 'جاري الإنشاء...' : 'Generating...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <Link className="h-6 w-6 drop-shadow-sm" />
                    <span className="font-extrabold tracking-wide">{language === 'ar' ? 'إنشاء رابط واتساب' : 'Generate WhatsApp Link'}</span>
                  </div>
                )}
              </Button>
            </form>
          </Form>

          {generatedLink && (
            <div className="mt-6 space-y-4">
              {/* Generated Link */}
              <div className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-green-200 dark:border-green-700/50 card-interactive" data-testid="generated-link">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <label className="text-lg font-semibold gradient-text">
                      {language === 'ar' ? '🎉 رابط واتساب الخاص بك جاهز!' : '🎉 Your WhatsApp Link is Ready!'}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 gap-2">
                    <Input
                      value={generatedLink}
                      readOnly
                      className="flex-1 bg-white/80 dark:bg-black/40 border-green-300 dark:border-green-600 font-mono text-sm"
                      data-testid="generated-link-input"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyToClipboard}
                      className="hover-lift border-green-300 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/50"
                      data-testid="copy-button"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={shareLink}
                      className="hover-lift border-green-300 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/50"
                      data-testid="share-button"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
                      <span className="font-medium">0 {language === 'ar' ? 'نقرة مُتتبعة' : 'clicks tracked'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                      <span>{language === 'ar' ? 'نشط الآن' : 'Live now'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code and Analytics */}
              <Tabs defaultValue="qr" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-1 rounded-xl shadow-inner">
                  <TabsTrigger value="qr" className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover-lift">
                    <QrCode className="h-4 w-4" />
                    {language === 'ar' ? 'رمز QR' : 'QR Code'}
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover-lift">
                    <BarChart3 className="h-4 w-4" />
                    {language === 'ar' ? 'التحليلات' : 'Analytics'}
                  </TabsTrigger>
                  <TabsTrigger value="sharing" className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover-lift">
                    <Share className="h-4 w-4" />
                    {language === 'ar' ? 'المشاركة' : 'Sharing'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="qr" className="space-y-4">
                  <QRCodeGenerator url={generatedLink} title={form.getValues("title")} />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'ar' ? 'إحصائيات الرابط' : 'Link Analytics'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">0</div>
                          <div className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'إجمالي النقرات' : 'Total Clicks'}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">0</div>
                          <div className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'اليوم' : 'Today'}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">0</div>
                          <div className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'هذا الأسبوع' : 'This Week'}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">0</div>
                          <div className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'هذا الشهر' : 'This Month'}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-muted-foreground text-center">
                        {language === 'ar' ? 
                          'ستظهر الإحصائيات عند بدء النقر على الرابط' : 
                          'Analytics will appear once the link starts receiving clicks'
                        }
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sharing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'ar' ? 'خيارات المشاركة' : 'Sharing Options'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(generatedLink)}`, '_blank')}
                      >
                        <MessageSquare className="h-4 w-4" />
                        {language === 'ar' ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => window.open(`https://telegram.me/share/url?url=${encodeURIComponent(generatedLink)}`, '_blank')}
                      >
                        <Send className="h-4 w-4" />
                        {language === 'ar' ? 'مشاركة عبر تيليجرام' : 'Share via Telegram'}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedLink)}`, '_blank')}
                      >
                        <Twitter className="h-4 w-4" />
                        {language === 'ar' ? 'مشاركة عبر تويتر' : 'Share via Twitter'}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                        {language === 'ar' ? 'نسخ الرابط' : 'Copy Link'}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
