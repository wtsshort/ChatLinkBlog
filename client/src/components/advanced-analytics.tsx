import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/use-language";
import { 
  BarChart3, 
  Globe, 
  Smartphone, 
  Clock, 
  TrendingUp, 
  Users, 
  MapPin,
  Calendar
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for demonstration
const DEMO_DATA = {
  dailyClicks: [
    { date: '2025-01-20', clicks: 45 },
    { date: '2025-01-21', clicks: 62 },
    { date: '2025-01-22', clicks: 38 },
    { date: '2025-01-23', clicks: 78 },
    { date: '2025-01-24', clicks: 95 },
    { date: '2025-01-25', clicks: 123 },
    { date: '2025-01-26', clicks: 156 },
  ],
  countryStats: [
    { country: 'السعودية', code: 'SA', clicks: 1245, percentage: 35 },
    { country: 'الإمارات', code: 'AE', clicks: 892, percentage: 25 },
    { country: 'الكويت', code: 'KW', clicks: 567, percentage: 16 },
    { country: 'قطر', code: 'QA', clicks: 423, percentage: 12 },
    { country: 'البحرين', code: 'BH', clicks: 289, percentage: 8 },
    { country: 'أخرى', code: 'OTHER', clicks: 156, percentage: 4 },
  ],
  deviceStats: [
    { device: 'Mobile', percentage: 78, clicks: 2456 },
    { device: 'Desktop', percentage: 18, clicks: 567 },
    { device: 'Tablet', percentage: 4, clicks: 126 },
  ],
  hourlyStats: [
    { hour: '00:00', clicks: 12 },
    { hour: '03:00', clicks: 8 },
    { hour: '06:00', clicks: 15 },
    { hour: '09:00', clicks: 45 },
    { hour: '12:00', clicks: 78 },
    { hour: '15:00', clicks: 89 },
    { hour: '18:00', clicks: 156 },
    { hour: '21:00', clicks: 134 },
  ],
  topLinks: [
    { id: '1', title: 'متجر الإلكترونيات', clicks: 1234, url: 'electronics-store' },
    { id: '2', title: 'خدمة العملاء', clicks: 892, url: 'customer-service' },
    { id: '3', title: 'عروض خاصة', clicks: 567, url: 'special-offers' },
    { id: '4', title: 'دعم تقني', clicks: 423, url: 'tech-support' },
    { id: '5', title: 'استشارات', clicks: 289, url: 'consultations' },
  ]
};

const COLORS = ['#16a34a', '#059669', '#0d9488', '#0891b2', '#3b82f6', '#6366f1'];

export function AdvancedAnalytics() {
  const { language } = useLanguage();

  // Using demo data for now since we have in-memory storage
  const { data: analytics = DEMO_DATA, isLoading } = useQuery({
    queryKey: ['/api/analytics'],
    queryFn: async () => {
      // Return demo data for now
      return DEMO_DATA;
    },
  });

  const totalClicks = useMemo(() => {
    return analytics.dailyClicks.reduce((sum, day) => sum + day.clicks, 0);
  }, [analytics.dailyClicks]);

  const growthRate = useMemo(() => {
    const latest = analytics.dailyClicks[analytics.dailyClicks.length - 1]?.clicks || 0;
    const previous = analytics.dailyClicks[analytics.dailyClicks.length - 2]?.clicks || 0;
    return previous > 0 ? ((latest - previous) / previous * 100).toFixed(1) : '0';
  }, [analytics.dailyClicks]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              {language === 'ar' ? 'إجمالي النقرات' : 'Total Clicks'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ? 'آخر 7 أيام' : 'Last 7 days'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              {language === 'ar' ? 'معدل النمو' : 'Growth Rate'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{growthRate}%</div>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ? 'مقارنة بالأمس' : 'vs yesterday'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" />
              {language === 'ar' ? 'أعلى دولة' : 'Top Country'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {analytics.countryStats[0]?.country}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.countryStats[0]?.percentage}% {language === 'ar' ? 'من النقرات' : 'of clicks'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-purple-600" />
              {language === 'ar' ? 'الجهاز الأكثر' : 'Top Device'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {language === 'ar' ? 'موبايل' : 'Mobile'}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.deviceStats[0]?.percentage}% {language === 'ar' ? 'من النقرات' : 'of clicks'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* نقرات يومية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {language === 'ar' ? 'النقرات اليومية' : 'Daily Clicks'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.dailyClicks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [value, language === 'ar' ? 'نقرات' : 'Clicks']}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* إحصائيات الساعات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {language === 'ar' ? 'أفضل أوقات النقر' : 'Peak Hours'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.hourlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [value, language === 'ar' ? 'نقرات' : 'Clicks']}
                />
                <Bar dataKey="clicks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات الدول والأجهزة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* إحصائيات الدول */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {language === 'ar' ? 'النقرات حسب الدولة' : 'Clicks by Country'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.countryStats.map((country, index) => (
              <div key={country.code} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                      alt={`${country.country} flag`}
                      className="w-5 h-3 object-cover rounded-sm"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{country.clicks.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                  </div>
                </div>
                <Progress value={country.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* أنواع الأجهزة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              {language === 'ar' ? 'أنواع الأجهزة' : 'Device Types'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.deviceStats.map((device, index) => (
                <div key={device.device} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {language === 'ar' ? 
                        (device.device === 'Mobile' ? 'موبايل' : 
                         device.device === 'Desktop' ? 'كمبيوتر' : 'تابلت') : 
                        device.device
                      }
                    </span>
                    <div className="text-right">
                      <div className="font-bold">{device.clicks.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{device.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={device.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أفضل الروابط */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {language === 'ar' ? 'أفضل الروابط أداءً' : 'Top Performing Links'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topLinks.map((link, index) => (
              <div key={link.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="min-w-8 justify-center">
                    #{index + 1}
                  </Badge>
                  <div>
                    <div className="font-medium">{link.title}</div>
                    <div className="text-sm text-muted-foreground">/{link.url}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{link.clicks.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'نقرة' : 'clicks'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}