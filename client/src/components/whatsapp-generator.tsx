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
import { Link, Copy, Share, Phone } from "lucide-react";

const formSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required").refine(validatePhoneNumber, "Invalid phone number format"),
  message: z.string().optional(),
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
      phoneNumber: "",
      message: "",
    },
  });

  const createLinkMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const link = generateWhatsAppLink(data.phoneNumber, data.message);
      const response = await apiRequest("POST", "/api/whatsapp-links", {
        phoneNumber: data.phoneNumber,
        message: data.message || "",
        generatedLink: link,
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
          title: 'WhatsApp Link',
          url: generatedLink,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Card className="shadow-sm border border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            {language === 'ar' ? 'أنشئ رابط واتساب الخاص بك' : 'Create Your WhatsApp Link'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          placeholder={language === 'ar' ? '+966501234567' : '+1234567890'}
                          {...field}
                          className="pl-10"
                          data-testid="phone-input"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {language === 'ar' ? 'تضمين رمز البلد (مثل +966، +971، +1)' : 'Include country code (e.g., +1, +44, +966)'}
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
                    <FormLabel>{language === 'ar' ? 'الرسالة (اختيارية)' : 'Message (Optional)'}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={language === 'ar' ? 'مرحبا! أنا مهتم بخدماتكم...' : 'Hello! I\'m interested in your services...'}
                        rows={4}
                        {...field}
                        data-testid="message-input"
                      />
                    </FormControl>
                    <FormDescription>
                      {language === 'ar' ? 'املأ مسبقاً رسالة واتساب للمستخدمين' : 'Pre-fill the WhatsApp message for your users'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* hCaptcha placeholder */}
              <div className="flex justify-center">
                <div className="bg-secondary rounded-lg p-4 border-2 border-dashed border-border">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <div className="w-4 h-4 bg-muted-foreground rounded"></div>
                    <span className="text-sm">
                      {language === 'ar' ? 'التحقق من hCaptcha' : 'hCaptcha verification'}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={createLinkMutation.isPending}
                data-testid="generate-button"
              >
                <Link className="mr-2 h-4 w-4" />
                {createLinkMutation.isPending 
                  ? (language === 'ar' ? 'جاري الإنشاء...' : 'Generating...') 
                  : (language === 'ar' ? 'إنشاء رابط واتساب' : 'Generate WhatsApp Link')
                }
              </Button>
            </form>
          </Form>

          {generatedLink && (
            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20" data-testid="generated-link">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  {language === 'ar' ? 'رابط واتساب الخاص بك:' : 'Your WhatsApp Link:'}
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={generatedLink}
                    readOnly
                    className="flex-1 bg-background"
                    data-testid="generated-link-input"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    data-testid="copy-button"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={shareLink}
                    data-testid="share-button"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  <span>0 {language === 'ar' ? 'نقرة مُتتبعة' : 'clicks tracked'}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
