import { useLanguage } from "@/hooks/use-language";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, Lock, Eye, Database, Globe, CheckCircle, AlertTriangle } from "lucide-react";

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ar' 
          ? "سياسة الخصوصية - WTSSHORT | حماية البيانات وخصوصية المستخدمين"
          : "Privacy Policy - WTSSHORT | Data Protection & User Privacy"
        }
        description={language === 'ar'
          ? "سياسة الخصوصية لموقع WTSSHORT. تعرف على كيفية حماية بياناتك الشخصية، ملفات تعريف الارتباط، والامتثال لقواعد GDPR."
          : "Privacy policy for WTSSHORT website. Learn how we protect your personal data, cookies usage, and GDPR compliance."
        }
        keywords={language === 'ar'
          ? "سياسة الخصوصية، حماية البيانات، GDPR، ملفات تعريف الارتباط، أمان المعلومات، WTSSHORT"
          : "privacy policy, data protection, GDPR, cookies, information security, WTSSHORT"
        }
        canonical="https://wtsshort.com/privacy"
        ogImage="https://wtsshort.com/og-image-privacy.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": language === 'ar' ? "سياسة الخصوصية" : "Privacy Policy",
          "description": language === 'ar' 
            ? "سياسة الخصوصية وحماية البيانات لموقع WTSSHORT"
            : "Privacy policy and data protection for WTSSHORT website",
          "dateModified": "2025-01-28",
          "publisher": {
            "@type": "Organization",
            "name": "WTSSHORT"
          },
          "mainEntity": {
            "@type": "PrivacyPolicy",
            "dateCreated": "2025-01-01",
            "dateModified": "2025-01-28"
          }
        }}
      />
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Lock className="h-4 w-4 mr-2" />
            {language === 'ar' ? '🔒 حماية الخصوصية' : '🔒 Privacy Protection'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span>
              {language === 'ar' 
                ? 'آخر تحديث: يناير 2025'
                : 'Last updated: January 2025'
              }
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-sm">
                  {language === 'ar' ? 'الأقسام' : 'Sections'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <a 
                    key={num}
                    href={`#section-${num}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    {language === 'ar' ? `القسم ${num}` : `Section ${num}`}
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {language === 'ar' ? (
              <>
                {/* Introduction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-500" />
                      مقدمة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      مرحباً بك في WTSSHORT. نحن نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. 
                      هذه السياسة تشرح كيفية جمع واستخدام وحماية معلوماتك عند استخدام خدماتنا.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                            التزامنا بالخصوصية
                          </h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            نحن ملتزمون بحماية خصوصيتك ونتبع أفضل الممارسات العالمية في أمان البيانات.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-green-500" />
                      1. البيانات التي نجمعها
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      نجمع أنواع محدودة من البيانات لتحسين خدماتنا:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-green-900 dark:text-green-100">معلومات الاستخدام</h5>
                          <p className="text-sm text-green-700 dark:text-green-300">عدد النقرات، نوع المتصفح، عنوان IP (مُشفر)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-blue-900 dark:text-blue-100">بيانات الروابط</h5>
                          <p className="text-sm text-blue-700 dark:text-blue-300">الروابط المُنشأة والرسائل المخصصة (غير مشفرة)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200 dark:border-purple-800">
                        <CheckCircle className="h-4 w-4 text-purple-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-purple-900 dark:text-purple-100">ملفات تعريف الارتباط</h5>
                          <p className="text-sm text-purple-700 dark:text-purple-300">لحفظ تفضيلات اللغة والموضوع</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-500" />
                      2. كيف نستخدم بياناتك
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">تحسين أداء الخدمة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">توفير الإحصائيات والتحليلات</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">منع الاستخدام الضار أو المسيء</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">تحسين تجربة المستخدم</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-3">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      3. حماية البيانات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      نستخدم إجراءات أمنية متقدمة لحماية بياناتك:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                        <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">🔐 التشفير</h5>
                        <p className="text-sm text-red-700 dark:text-red-300">جميع البيانات مشفرة أثناء النقل والتخزين</p>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800">
                        <h5 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">🛡️ الحماية</h5>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">حماية من الهجمات والوصول غير المصرح</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-indigo-500" />
                      4. ملفات تعريف الارتباط (Cookies)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      نستخدم ملفات تعريف الارتباط لتحسين تجربتك:
                    </p>
                    <div className="space-y-2">
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded">
                        <span className="font-medium text-indigo-900 dark:text-indigo-100">ضرورية: </span>
                        <span className="text-indigo-700 dark:text-indigo-300">لحفظ تفضيلات اللغة والموضوع</span>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                        <span className="font-medium text-blue-900 dark:text-blue-100">تحليلية: </span>
                        <span className="text-blue-700 dark:text-blue-300">لفهم كيفية استخدام الموقع (مجهولة الهوية)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-teal-500" />
                      5. مشاركة البيانات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded border border-red-200 dark:border-red-800">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">
                            نحن لا نبيع بياناتك
                          </h5>
                          <p className="text-sm text-red-700 dark:text-red-300">
                            لا نشارك أو نبيع معلوماتك الشخصية لأطراف ثالثة إلا في الحالات القانونية المطلوبة.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      6. حقوقك
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      لديك الحق في:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">الوصول إلى بياناتك المحفوظة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">طلب تصحيح البيانات الخاطئة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">طلب حذف بياناتك</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">سحب الموافقة في أي وقت</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-7">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      7. خدمات الطرف الثالث
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      قد نستخدم خدمات تحليلات من أطراف ثالثة:
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                        <span className="font-medium text-blue-900 dark:text-blue-100">Google Analytics: </span>
                        <span className="text-blue-700 dark:text-blue-300">لتحليل الاستخدام (مجهول الهوية)</span>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                        <span className="font-medium text-green-900 dark:text-green-100">Cloudflare: </span>
                        <span className="text-green-700 dark:text-green-300">للحماية وتسريع الموقع</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      8. التحديثات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      قد نحدث هذه السياسة من وقت لآخر. سيتم نشر التحديثات على هذه الصفحة مع تاريخ التحديث.
                    </p>
                  </CardContent>
                </Card>

                <Card id="section-9">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      9. التواصل
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      لأي استفسارات حول سياسة الخصوصية، تواصل معنا:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-700 dark:text-green-400">واتساب: +966590965110</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-700 dark:text-blue-400">البريد الإلكتروني: wtsshort@gmail.com</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* English version */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-500" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Welcome to WTSSHORT. We value your privacy and are committed to protecting your personal data. 
                      This policy explains how we collect, use, and protect your information when using our services.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                            Our Privacy Commitment
                          </h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            We are committed to protecting your privacy and follow global best practices in data security.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-green-500" />
                      1. Data We Collect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We collect limited types of data to improve our services:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-green-900 dark:text-green-100">Usage Information</h5>
                          <p className="text-sm text-green-700 dark:text-green-300">Click counts, browser type, IP address (encrypted)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-blue-900 dark:text-blue-100">Link Data</h5>
                          <p className="text-sm text-blue-700 dark:text-blue-300">Generated links and custom messages (not encrypted)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200 dark:border-purple-800">
                        <CheckCircle className="h-4 w-4 text-purple-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-purple-900 dark:text-purple-100">Cookies</h5>
                          <p className="text-sm text-purple-700 dark:text-purple-300">To save language and theme preferences</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-500" />
                      2. How We Use Your Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Improve service performance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Provide statistics and analytics</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Prevent harmful or abusive usage</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Enhance user experience</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-3">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      3. Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use advanced security measures to protect your data:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                        <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">🔐 Encryption</h5>
                        <p className="text-sm text-red-700 dark:text-red-300">All data encrypted in transit and at rest</p>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800">
                        <h5 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">🛡️ Protection</h5>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">Protection from attacks and unauthorized access</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-indigo-500" />
                      4. Cookies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use cookies to improve your experience:
                    </p>
                    <div className="space-y-2">
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded">
                        <span className="font-medium text-indigo-900 dark:text-indigo-100">Essential: </span>
                        <span className="text-indigo-700 dark:text-indigo-300">To save language and theme preferences</span>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                        <span className="font-medium text-blue-900 dark:text-blue-100">Analytics: </span>
                        <span className="text-blue-700 dark:text-blue-300">To understand website usage (anonymous)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-teal-500" />
                      5. Data Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded border border-red-200 dark:border-red-800">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">
                            We Don't Sell Your Data
                          </h5>
                          <p className="text-sm text-red-700 dark:text-red-300">
                            We do not share or sell your personal information to third parties except when legally required.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      6. Your Rights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You have the right to:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Access your stored data</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Request correction of inaccurate data</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Request deletion of your data</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Withdraw consent at any time</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-7">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      7. Third-Party Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may use third-party analytics services:
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                        <span className="font-medium text-blue-900 dark:text-blue-100">Google Analytics: </span>
                        <span className="text-blue-700 dark:text-blue-300">For usage analysis (anonymous)</span>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                        <span className="font-medium text-green-900 dark:text-green-100">Cloudflare: </span>
                        <span className="text-green-700 dark:text-green-300">For protection and site acceleration</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="section-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      8. Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this policy from time to time. Updates will be posted on this page with the update date.
                    </p>
                  </CardContent>
                </Card>

                <Card id="section-9">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      9. Contact Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      For any questions about this privacy policy, contact us:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-700 dark:text-green-400">WhatsApp: +966590965110</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-700 dark:text-blue-400">Email: wtsshort@gmail.com</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}