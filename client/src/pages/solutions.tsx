import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  Building2, 
  HeadphonesIcon, 
  TrendingUp, 
  Users, 
  MessageCircle,
  ShoppingCart,
  UserCheck,
  Calendar,
  Gift,
  BarChart3,
  Shield
} from "lucide-react";

export default function Solutions() {
  const { language } = useLanguage();

  const solutions = [
    {
      id: 'ecommerce',
      title: language === 'ar' ? 'التجارة الإلكترونية' : 'E-commerce',
      description: language === 'ar' ? 'زيد مبيعاتك مع روابط واتساب ذكية' : 'Boost sales with smart WhatsApp links',
      icon: <ShoppingCart className="h-8 w-8" />,
      features: [
        language === 'ar' ? 'روابط منتجات مباشرة' : 'Direct product links',
        language === 'ar' ? 'تتبع المبيعات' : 'Sales tracking',
        language === 'ar' ? 'دعم عربة التسوق' : 'Cart support',
        language === 'ar' ? 'قوالب طلبات جاهزة' : 'Ready order templates'
      ],
      gradient: 'from-green-500 to-emerald-600',
      stats: { 
        increase: '300%', 
        metric: language === 'ar' ? 'زيادة التحويل' : 'conversion increase' 
      }
    },
    {
      id: 'support',
      title: language === 'ar' ? 'دعم العملاء' : 'Customer Support',
      description: language === 'ar' ? 'قدم دعماً فورياً ومخصصاً' : 'Provide instant, personalized support',
      icon: <HeadphonesIcon className="h-8 w-8" />,
      features: [
        language === 'ar' ? 'تذاكر دعم ذكية' : 'Smart support tickets',
        language === 'ar' ? 'ردود سريعة' : 'Quick responses',
        language === 'ar' ? 'قاعدة معرفة' : 'Knowledge base',
        language === 'ar' ? 'تقييم الخدمة' : 'Service rating'
      ],
      gradient: 'from-blue-500 to-cyan-600',
      stats: { 
        increase: '85%', 
        metric: language === 'ar' ? 'رضا العملاء' : 'customer satisfaction' 
      }
    },
    {
      id: 'marketing',
      title: language === 'ar' ? 'التسويق الرقمي' : 'Digital Marketing',
      description: language === 'ar' ? 'حملات تسويقية فعالة عبر واتساب' : 'Effective WhatsApp marketing campaigns',
      icon: <TrendingUp className="h-8 w-8" />,
      features: [
        language === 'ar' ? 'حملات مستهدفة' : 'Targeted campaigns',
        language === 'ar' ? 'تحليلات تفصيلية' : 'Detailed analytics',
        language === 'ar' ? 'رسائل مخصصة' : 'Custom messages',
        language === 'ar' ? 'تتبع النتائج' : 'Results tracking'
      ],
      gradient: 'from-purple-500 to-pink-600',
      stats: { 
        increase: '250%', 
        metric: language === 'ar' ? 'معدل التفاعل' : 'engagement rate' 
      }
    },
    {
      id: 'restaurants',
      title: language === 'ar' ? 'المطاعم والكافيهات' : 'Restaurants & Cafes',
      description: language === 'ar' ? 'اجعل طلب الطعام أسهل من أي وقت مضى' : 'Make food ordering easier than ever',
      icon: <Store className="h-8 w-8" />,
      features: [
        language === 'ar' ? 'قوائم طعام ديناميكية' : 'Dynamic menus',
        language === 'ar' ? 'طلبات مباشرة' : 'Direct orders',
        language === 'ar' ? 'تتبع الطلبات' : 'Order tracking',
        language === 'ar' ? 'تقييمات العملاء' : 'Customer reviews'
      ],
      gradient: 'from-amber-500 to-yellow-600',
      stats: { 
        increase: '180%', 
        metric: language === 'ar' ? 'زيادة الطلبات' : 'order increase' 
      }
    },
    {
      id: 'realestate',
      title: language === 'ar' ? 'العقارات' : 'Real Estate',
      description: language === 'ar' ? 'اربط العملاء بالعقارات فوراً' : 'Connect clients to properties instantly',
      icon: <Building2 className="h-8 w-8" />,
      features: [
        language === 'ar' ? 'جولات افتراضية' : 'Virtual tours',
        language === 'ar' ? 'استفسارات مباشرة' : 'Direct inquiries',
        language === 'ar' ? 'مواعيد المعاينة' : 'Viewing appointments',
        language === 'ar' ? 'متابعة العملاء' : 'Client follow-up'
      ],
      gradient: 'from-teal-500 to-green-600',
      stats: { 
        increase: '220%', 
        metric: language === 'ar' ? 'زيادة الاستفسارات' : 'inquiry increase' 
      }
    },
    {
      id: 'events',
      title: language === 'ar' ? 'تنظيم الفعاليات' : 'Event Management',
      description: language === 'ar' ? 'سهّل التسجيل والتواصل مع الحضور' : 'Simplify registration and attendee communication',
      icon: <Calendar className="h-8 w-8" />,
      features: [
        language === 'ar' ? 'تسجيل سريع' : 'Quick registration',
        language === 'ar' ? 'تذكيرات تلقائية' : 'Automatic reminders',
        language === 'ar' ? 'تحديثات الفعالية' : 'Event updates',
        language === 'ar' ? 'تقييم الفعالية' : 'Event feedback'
      ],
      gradient: 'from-indigo-500 to-purple-600',
      stats: { 
        increase: '150%', 
        metric: language === 'ar' ? 'معدل الحضور' : 'attendance rate' 
      }
    }
  ];

  return (
    <div className={`min-h-screen py-20 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
            {language === 'ar' ? '🚀 الحلول' : '🚀 Solutions'}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            {language === 'ar' ? 'حلول مخصصة لكل مجال' : 'Tailored Solutions for Every Industry'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف كيف يمكن لـ WTSSHORT أن يحول مجال عملك مع حلول مبتكرة مصممة خصيصاً لاحتياجاتك'
              : 'Discover how WTSSHORT can transform your industry with innovative solutions designed for your specific needs'
            }
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution) => (
            <Card 
              key={solution.id}
              className="card-interactive hover-lift group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${solution.gradient} rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {solution.icon}
                </div>
                <CardTitle className="text-xl font-bold">{solution.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{solution.description}</p>
              </CardHeader>

              <CardContent className="relative z-10">
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{solution.stats.increase}</div>
                    <div className="text-xs text-muted-foreground">{solution.stats.metric}</div>
                  </div>
                </div>

                <Button className="w-full btn-gradient hover-lift" size="sm">
                  {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              {language === 'ar' ? 'جاهز لتحويل مجال عملك؟' : 'Ready to Transform Your Business?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {language === 'ar' 
                ? 'ابدأ رحلتك اليوم واكتشف كيف يمكن لحلولنا المبتكرة أن تأخذ عملك إلى المستوى التالي'
                : 'Start your journey today and discover how our innovative solutions can take your business to the next level'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-gradient hover-lift">
                <MessageCircle className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'ابدأ مجاناً' : 'Start Free'}
              </Button>
              <Button size="lg" variant="outline" className="hover-lift">
                <UserCheck className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'احجز عرضاً توضيحياً' : 'Book a Demo'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}