import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import { Lock } from "lucide-react";
import { useLocation } from "wouter";

const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminLogin() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/admin/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        toast({
          title: language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login successful',
          description: language === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Welcome to admin panel',
        });
        setLocation('/admin');
      }
    },
    onError: (error) => {
      toast({
        title: language === 'ar' ? 'خطأ في تسجيل الدخول' : 'Login error',
        description: language === 'ar' ? 'كلمة المرور غير صحيحة' : 'Invalid password',
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-muted/30 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-md w-full mx-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {language === 'ar' ? 'تسجيل دخول الإدارة' : 'Admin Login'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'ar' ? 'كلمة المرور' : 'Password'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
                          {...field}
                          data-testid="password-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loginMutation.isPending}
                  data-testid="login-button"
                >
                  {loginMutation.isPending 
                    ? (language === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...') 
                    : (language === 'ar' ? 'تسجيل الدخول' : 'Login')
                  }
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}