import { useLanguage } from "@/hooks/use-language";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ar' 
          ? "الشروط والأحكام - WTSSHORT | قوانين استخدام مولد روابط واتساب"
          : "Terms & Conditions - WTSSHORT | WhatsApp Link Generator Legal Policies"
        }
        description={language === 'ar'
          ? "اقرأ الشروط والأحكام الخاصة باستخدام مولد روابط واتساب WTSSHORT. شروط الاستخدام، سياسة الخصوصية، وقواعد الحماية."
          : "Read the terms and conditions for using WTSSHORT WhatsApp link generator. Usage terms, privacy policies, and protection guidelines."
        }
        keywords={language === 'ar'
          ? "شروط استخدام WTSSHORT، سياسة الخصوصية، قوانين مولد الروابط، حماية البيانات، استخدام آمن"
          : "WTSSHORT terms of use, privacy policy, link generator legal, data protection, safe usage"
        }
        canonical="https://wtsshort.com/terms"
        ogImage="https://wtsshort.com/og-image-terms.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": language === 'ar' ? "الشروط والأحكام" : "Terms & Conditions",
          "description": language === 'ar' 
            ? "الشروط والأحكام الخاصة باستخدام مولد روابط واتساب WTSSHORT"
            : "Terms and conditions for using WTSSHORT WhatsApp link generator",
          "dateModified": "2025-12-01",
          "publisher": {
            "@type": "Organization",
            "name": "WTSSHORT"
          }
        }}
      />
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
            <Shield className="h-4 w-4 mr-2" />
            {language === 'ar' ? '⚖️ الحماية القانونية' : '⚖️ Legal Protection'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span>
              {language === 'ar' 
                ? 'آخر تحديث: ديسمبر 2025'
                : 'Last updated: December 2025'
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
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    {language === 'ar' ? `${num}. القسم` : `${num}. Section`}
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {language === 'ar' ? (
                <div className="space-y-8">
                  <Card id="section-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        1. قبول الشروط
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        باستخدام موقع WTSSHORT، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.
                      </p>
                    </CardContent>
                  </Card>

                  <Card id="section-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                        2. وصف الخدمة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        WTSSHORT هي منصة مجانية تتيح للمستخدمين إنشاء روابط واتساب مخصصة مع رسائل معدة مسبقاً. الخدمة تشمل:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          'إنشاء روابط واتساب مخصصة',
                          'تتبع النقرات والإحصائيات',
                          'إنشاء رموز QR للروابط',
                          'قوالب الرسائل الجاهزة',
                          'حماية الروابط بكلمة مرور',
                          'تحديد تاريخ انتهاء الصلاحية'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="section-3">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        3. الاستخدام المقبول
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        يُسمح باستخدام خدماتنا للأغراض التجارية والشخصية المشروعة فقط. يُمنع منعاً باتاً:
                      </p>
                      <div className="space-y-3">
                        {[
                          'إرسال رسائل غير مرغوب فيها (سبام)',
                          'المحتوى المضلل أو الاحتيالي',
                          'انتهاك حقوق الطبع والنشر',
                          'المحتوى المسيء أو المهين',
                          'الأنشطة غير القانونية'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded">
                            <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="text-sm text-red-700 dark:text-red-400">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="section-4">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-purple-500" />
                        4. الخصوصية وحماية البيانات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية:
                      </p>
                      <div className="space-y-2">
                        {[
                          'لا نحفظ أرقام الهواتف أو الرسائل الشخصية',
                          'نجمع إحصائيات مجهولة الهوية فقط',
                          'لا نشارك بياناتك مع أطراف ثالثة',
                          'تُستخدم ملفات تعريف الارتباط لتحسين التجربة'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-purple-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="section-5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        5. إخلاء المسؤولية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        الخدمة متوفرة "كما هي" دون أي ضمانات. لا نتحمل مسؤولية:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          'انقطاع الخدمة أو الأخطاء التقنية',
                          'فقدان البيانات أو الروابط',
                          'الاستخدام غير المناسب من قبل المستخدمين',
                          'أي أضرار مباشرة أو غير مباشرة'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="section-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-indigo-500" />
                        6. حقوق الملكية الفكرية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        جميع المحتويات والتصاميم والبرمجيات في WTSSHORT محمية بحقوق الطبع والنشر. يُمنع النسخ أو التوزيع بدون إذن مكتوب.
                      </p>
                    </CardContent>
                  </Card>

                  <Card id="section-7">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-pink-500" />
                        7. تعديل الشروط
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات مهمة عبر الموقع أو البريد الإلكتروني.
                      </p>
                    </CardContent>
                  </Card>

                  <Card id="section-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-teal-500" />
                        8. القانون المطبق
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع يُحل من خلال المحاكم السعودية المختصة.
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
                        لأي استفسارات حول هذه الشروط، يرجى التواصل معنا عبر:
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
                </div>
              ) : (
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <h3 className="text-lg font-medium text-foreground mb-2">English version coming soon</h3>
                      <p className="text-muted-foreground">Full English translation will be available soon.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}