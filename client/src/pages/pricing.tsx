import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Rocket } from "lucide-react";

export default function Pricing() {
  const { language } = useLanguage();

  const plans = [
    {
      id: 'free',
      name: language === 'ar' ? 'مجاني' : 'Free',
      price: '0',
      period: language === 'ar' ? 'مجاناً للأبد' : 'Forever free',
      description: language === 'ar' ? 'مثالي للاستخدام الشخصي' : 'Perfect for personal use',
      features: [
        language === 'ar' ? '10 روابط شهرياً' : '10 links per month',
        language === 'ar' ? 'إحصائيات أساسية' : 'Basic analytics',
        language === 'ar' ? 'رموز QR' : 'QR codes',
        language === 'ar' ? 'دعم البريد الإلكتروني' : 'Email support',
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'pro',
      name: language === 'ar' ? 'احترافي' : 'Pro',
      price: '29',
      period: language === 'ar' ? 'شهرياً' : 'per month',
      description: language === 'ar' ? 'للشركات المتنامية' : 'For growing businesses',
      features: [
        language === 'ar' ? 'روابط غير محدودة' : 'Unlimited links',
        language === 'ar' ? 'إحصائيات متقدمة' : 'Advanced analytics',
        language === 'ar' ? 'روابط مخصصة' : 'Custom links',
        language === 'ar' ? 'حماية بكلمة مرور' : 'Password protection',
        language === 'ar' ? 'تواريخ انتهاء صلاحية' : 'Expiration dates',
        language === 'ar' ? 'دعم الأولوية' : 'Priority support',
      ],
      icon: <Star className="h-6 w-6" />,
      popular: true,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'enterprise',
      name: language === 'ar' ? 'مؤسسات' : 'Enterprise',
      price: '99',
      period: language === 'ar' ? 'شهرياً' : 'per month',
      description: language === 'ar' ? 'للمؤسسات الكبيرة' : 'For large organizations',
      features: [
        language === 'ar' ? 'كل ميزات الاحترافي' : 'Everything in Pro',
        language === 'ar' ? 'API مخصص' : 'Custom API',
        language === 'ar' ? 'تكاملات متقدمة' : 'Advanced integrations',
        language === 'ar' ? 'إدارة الفرق' : 'Team management',
        language === 'ar' ? 'تقارير مخصصة' : 'Custom reports',
        language === 'ar' ? 'دعم مخصص 24/7' : 'Dedicated 24/7 support',
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <div className={`min-h-screen py-20 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
            {language === 'ar' ? '💰 الأسعار' : '💰 Pricing'}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            {language === 'ar' ? 'خطط تناسب كل احتياجاتك' : 'Plans That Scale With You'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اختر الخطة المثالية لك. ابدأ مجاناً وارتقِ وقتما تحتاج. جميع الخطط تتضمن دعماً فنياً ممتازاً.'
              : 'Choose the perfect plan for your needs. Start free and upgrade as you grow. All plans include excellent support.'
            }
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative card-interactive hover-lift-strong ${plan.popular ? 'border-primary/50 ring-2 ring-primary/20' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1">
                    {language === 'ar' ? '⭐ الأكثر شيوعاً' : '⭐ Most Popular'}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold gradient-text">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'btn-gradient' : 'btn-gradient-accent'} hover-lift`}
                  size="lg"
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">
            {language === 'ar' ? 'أسئلة شائعة حول الأسعار' : 'Pricing FAQ'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="card-interactive text-right">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'هل يمكنني تغيير خطتي في أي وقت؟' : 'Can I change my plan anytime?'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' 
                    ? 'نعم، يمكنك الترقية أو التراجع في خطتك في أي وقت. التغييرات تسري على الفور.'
                    : 'Yes, you can upgrade or downgrade your plan anytime. Changes take effect immediately.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="card-interactive text-right">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'هل تقدمون خصومات سنوية؟' : 'Do you offer annual discounts?'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' 
                    ? 'نعم! احصل على خصم 20% عند الدفع السنوي. اتصل بنا للحصول على عرض خاص.'
                    : 'Yes! Get 20% off when you pay annually. Contact us for a special quote.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}