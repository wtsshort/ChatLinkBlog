import WhatsAppGenerator from "@/components/whatsapp-generator";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Zap, 
  BarChart3, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp,
  Shield,
  Clock,
  HeadphonesIcon,
  Smartphone,
  Target,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { language } = useLanguage();

  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
  });

  return (
    <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-purple-500/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-primary to-accent text-white hover-float">
              {language === 'ar' ? '🚀 منصة الجيل الجديد' : '🚀 Next-Gen Platform'}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black gradient-text mb-8 leading-tight">
              {language === 'ar' ? 'ثورة في' : 'Revolutionize'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
                {language === 'ar' ? 'التواصل' : 'Communication'}
              </span>
              <br />
              {language === 'ar' ? 'عبر واتساب' : 'via WhatsApp'}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'منصة شاملة ومجانية لإنشاء وإدارة وتحليل روابط واتساب الاحترافية. مصممة للجميع لتسهيل التواصل الرقمي.'
                : 'The complete FREE platform for creating, managing, and analyzing professional WhatsApp links. Built for everyone to simplify digital communication.'
              }
            </p>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 mb-12 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                  {language === 'ar' 
                    ? '🎉 مجاني بالكامل! جميع الميزات متاحة للجميع بدون أي تكلفة'
                    : '🎉 Completely Free! All features available to everyone at no cost'
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="btn-gradient hover-lift text-lg px-8 py-4">
                <Zap className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'ابدأ مجاناً - للأبد!' : 'Start Free Forever!'}
              </Button>
              <Button size="lg" variant="outline" className="hover-lift text-lg px-8 py-4">
                <Star className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'شاهد العرض التوضيحي' : 'Watch Demo'}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {language === 'ar' ? 'مجاني 100%' : '100% Free'}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {language === 'ar' ? 'بدون حدود' : 'No Limits'}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {language === 'ar' ? 'بدون بطاقة ائتمان' : 'No Credit Card'}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {language === 'ar' ? 'إعداد فوري' : 'Instant Setup'}
              </div>
            </div>
          </div>
          
          <WhatsAppGenerator />
        </div>
      </div>

      {/* Advanced Features Section */}
      <div className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {language === 'ar' ? '⚡ قوة لا محدودة' : '⚡ Unlimited Power'}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              {language === 'ar' ? 'ميزات تقنية متقدمة' : 'Advanced Technical Features'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف مجموعة شاملة من الأدوات المتطورة التي تجعل من WTSSHORT المنصة الأولى لإدارة التواصل الاحترافي'
                : 'Discover a comprehensive suite of advanced tools that make WTSSHORT the premier platform for professional communication management'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="card-interactive hover-lift group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{language === 'ar' ? 'إنشاء فوري ذكي' : 'Smart Instant Generation'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {language === 'ar' 
                    ? 'تقنية AI متقدمة لإنشاء روابط محسنة تلقائياً مع رسائل ذكية'
                    : 'Advanced AI technology for automatically optimized links with smart messaging'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="card-interactive hover-lift group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{language === 'ar' ? 'تحليلات عميقة' : 'Deep Analytics'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {language === 'ar' 
                    ? 'تتبع شامل مع تحليلات جغرافية وسلوكية وتقارير في الوقت الفعلي'
                    : 'Comprehensive tracking with geo and behavioral analytics plus real-time reports'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="card-interactive hover-lift group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{language === 'ar' ? 'حماية متقدمة' : 'Advanced Security'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {language === 'ar' 
                    ? 'تشفير متطور وحماية بكلمة مرور ومصادقة ثنائية للأمان الأقصى'
                    : 'Advanced encryption, password protection, and 2FA for maximum security'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="card-interactive hover-lift group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{language === 'ar' ? 'عالمي متطور' : 'Global Advanced'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {language === 'ar' 
                    ? 'دعم 50+ لغة مع ذكاء اصطناعي لترجمة وتحسين المحتوى تلقائياً'
                    : '50+ languages with AI-powered translation and automatic content optimization'
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Features Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold gradient-text mb-6">
                {language === 'ar' ? 'أتمتة ذكية شاملة' : 'Complete Smart Automation'}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <Clock className="h-5 w-5" />,
                    title: language === 'ar' ? 'جدولة الروابط' : 'Link Scheduling',
                    desc: language === 'ar' ? 'برمج روابطك للنشر التلقائي' : 'Schedule your links for automatic publishing'
                  },
                  {
                    icon: <Target className="h-5 w-5" />,
                    title: language === 'ar' ? 'استهداف ذكي' : 'Smart Targeting',
                    desc: language === 'ar' ? 'وصل للجمهور المناسب تلقائياً' : 'Reach the right audience automatically'
                  },
                  {
                    icon: <TrendingUp className="h-5 w-5" />,
                    title: language === 'ar' ? 'تحسين مستمر' : 'Continuous Optimization',
                    desc: language === 'ar' ? 'تحسين الأداء بالذكاء الاصطناعي' : 'AI-powered performance optimization'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 hover-lift">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="card-interactive text-center p-6">
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">{language === 'ar' ? 'معدل الوقت التشغيلي' : 'Uptime Rate'}</div>
              </Card>
              <Card className="card-interactive text-center p-6">
                <div className="text-3xl font-bold text-accent">50ms</div>
                <div className="text-sm text-muted-foreground">{language === 'ar' ? 'سرعة الاستجابة' : 'Response Time'}</div>
              </Card>
              <Card className="card-interactive text-center p-6">
                <div className="text-3xl font-bold text-green-500">256bit</div>
                <div className="text-sm text-muted-foreground">{language === 'ar' ? 'تشفير SSL' : 'SSL Encryption'}</div>
              </Card>
              <Card className="card-interactive text-center p-6">
                <div className="text-3xl font-bold text-purple-500">24/7</div>
                <div className="text-sm text-muted-foreground">{language === 'ar' ? 'مراقبة مستمرة' : 'Monitoring'}</div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-gradient-to-r from-muted/50 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              {language === 'ar' ? 'أرقام تتحدث عن نفسها' : 'Numbers That Speak for Themselves'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'انضم إلى آلاف الشركات التي تثق في منصتنا' : 'Join thousands of companies that trust our platform'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <Card className="card-interactive text-center p-6 hover-lift" data-testid="stat-links">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stats?.totalLinks?.toLocaleString() || '847,392'}
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                {language === 'ar' ? 'روابط ذكية مُنشأة' : 'Smart Links Created'}
              </div>
            </Card>

            <Card className="card-interactive text-center p-6 hover-lift" data-testid="stat-clicks">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stats?.totalClicks?.toLocaleString() || '2.4M'}
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                {language === 'ar' ? 'نقرات ناجحة' : 'Successful Clicks'}
              </div>
            </Card>

            <Card className="card-interactive text-center p-6 hover-lift" data-testid="stat-users">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                12,847
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                {language === 'ar' ? 'شركة نشطة' : 'Active Businesses'}
              </div>
            </Card>

            <Card className="card-interactive text-center p-6 hover-lift" data-testid="stat-countries">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                85
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                {language === 'ar' ? 'دولة حول العالم' : 'Countries Worldwide'}
              </div>
            </Card>
          </div>

          {/* Customer Testimonials Preview */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: language === 'ar' ? 'أحمد المحمد' : 'Ahmed Al-Mohammed',
                role: language === 'ar' ? 'مدير تسويق' : 'Marketing Director',
                company: language === 'ar' ? 'شركة النجاح' : 'Success Corp',
                quote: language === 'ar' 
                  ? 'زادت WTSSHORT معدل التحويل لدينا بنسبة 300% في 3 أشهر فقط!'
                  : 'WTSSHORT increased our conversion rate by 300% in just 3 months!',
                rating: 5
              },
              {
                name: language === 'ar' ? 'سارة الزهراني' : 'Sarah Al-Zahrani',
                role: language === 'ar' ? 'مؤسسة' : 'Founder',
                company: language === 'ar' ? 'متجر الإبداع' : 'Creative Store',
                quote: language === 'ar' 
                  ? 'أداة لا غنى عنها لكل من يريد احتراف التسويق عبر واتساب'
                  : 'An indispensable tool for anyone wanting to master WhatsApp marketing',
                rating: 5
              },
              {
                name: language === 'ar' ? 'خالد العتيبي' : 'Khalid Al-Otaibi',
                role: language === 'ar' ? 'مطور' : 'Developer',
                company: language === 'ar' ? 'تك سوليوشنز' : 'Tech Solutions',
                quote: language === 'ar' 
                  ? 'سهولة التكامل مع API والتحليلات المتقدمة جعلت عملنا أكثر كفاءة'
                  : 'Easy API integration and advanced analytics made our work more efficient',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="card-interactive p-6 hover-lift">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role} • {testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Preview Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
              {language === 'ar' ? '🏢 للشركات' : '🏢 For Business'}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
              {language === 'ar' ? 'حلول مخصصة لكل مجال' : 'Tailored Solutions for Every Industry'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'من التجارة الإلكترونية إلى الخدمات المالية، نوفر حلولاً متخصصة لكل صناعة'
                : 'From e-commerce to financial services, we provide specialized solutions for every industry'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Smartphone className="h-8 w-8" />, title: language === 'ar' ? 'التجارة الإلكترونية' : 'E-commerce', desc: language === 'ar' ? 'زيد مبيعاتك 300%' : 'Boost sales by 300%' },
              { icon: <HeadphonesIcon className="h-8 w-8" />, title: language === 'ar' ? 'دعم العملاء' : 'Customer Support', desc: language === 'ar' ? 'رضا عملاء 95%' : '95% customer satisfaction' },
              { icon: <Award className="h-8 w-8" />, title: language === 'ar' ? 'التسويق الرقمي' : 'Digital Marketing', desc: language === 'ar' ? 'تفاعل أعلى 250%' : '250% higher engagement' }
            ].map((solution, index) => (
              <Card key={index} className="card-interactive p-6 text-center hover-lift group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{solution.desc}</p>
                <Button variant="outline" size="sm" className="hover-lift">
                  {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/solutions">
              <Button size="lg" className="btn-gradient hover-lift">
                {language === 'ar' ? 'استكشف جميع الحلول' : 'Explore All Solutions'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
