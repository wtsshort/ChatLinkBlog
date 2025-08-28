import { AdvancedAnalytics } from "@/components/advanced-analytics";
import { useLanguage } from "@/hooks/use-language";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' ? 
                  'اكتشف أداء روابطك وتحليلات شاملة للنقرات' : 
                  'Discover your links performance and comprehensive click analytics'
                }
              </p>
            </div>
          </div>
        </div>

        {/* مكون التحليلات */}
        <AdvancedAnalytics />
      </div>
    </div>
  );
}