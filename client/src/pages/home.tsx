import WhatsAppGenerator from "@/components/whatsapp-generator";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Zap, BarChart3, Globe } from "lucide-react";

export default function Home() {
  const { language } = useLanguage();

  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
  });

  return (
    <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {language === 'ar' ? 'إنشاء روابط واتساب' : 'Generate WhatsApp Links'}{' '}
              <span className="text-primary">
                {language === 'ar' ? 'فوراً' : 'Instantly'}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'أنشئ روابط واتساب احترافية مع رسائل مخصصة. مثالي للشركات ودعم العملاء والحملات التسويقية.'
                : 'Create professional WhatsApp links with custom messages. Perfect for businesses, customer support, and marketing campaigns.'
              }
            </p>
          </div>
          
          <WhatsAppGenerator />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'ar' ? 'لماذا تختار WTSSHORT؟' : 'Why Choose WTSSHORT?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'بسّط تواصلك عبر واتساب مع منشئ الروابط القوي لدينا'
                : 'Streamline your WhatsApp communication with our powerful link generator'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow" data-testid="feature-instant">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'ar' ? 'إنشاء فوري' : 'Instant Generation'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'أنشئ روابط واتساب في ثوانٍ مع واجهتنا سهلة الاستخدام'
                  : 'Create WhatsApp links in seconds with our user-friendly interface'
                }
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow" data-testid="feature-analytics">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'ar' ? 'تحليل النقرات' : 'Click Analytics'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'تتبع أداء الروابط مع تحليلات وإحصائيات مفصلة'
                  : 'Track link performance with detailed click analytics and insights'
                }
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow" data-testid="feature-multilang">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'ar' ? 'متعدد اللغات' : 'Multi-Language'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'دعم للعربية والإنجليزية مع دعم النص من اليمين لليسار'
                  : 'Support for Arabic and English with RTL text support'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" data-testid="stat-links">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {stats?.totalLinks?.toLocaleString() || '0'}
              </div>
              <div className="text-muted-foreground mt-1">
                {language === 'ar' ? 'الروابط المُنشأة' : 'Links Generated'}
              </div>
            </div>
            <div className="text-center" data-testid="stat-clicks">
              <div className="text-3xl md:text-4xl font-bold text-accent">
                {stats?.totalClicks?.toLocaleString() || '0'}
              </div>
              <div className="text-muted-foreground mt-1">
                {language === 'ar' ? 'إجمالي النقرات' : 'Total Clicks'}
              </div>
            </div>
            <div className="text-center" data-testid="stat-users">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">
                2,847
              </div>
              <div className="text-muted-foreground mt-1">
                {language === 'ar' ? 'المستخدمون النشطون' : 'Active Users'}
              </div>
            </div>
            <div className="text-center" data-testid="stat-countries">
              <div className="text-3xl md:text-4xl font-bold text-purple-500">
                45
              </div>
              <div className="text-muted-foreground mt-1">
                {language === 'ar' ? 'الدول' : 'Countries'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
