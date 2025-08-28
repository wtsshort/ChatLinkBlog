import { useLanguage } from "@/hooks/use-language";

export default function TermsPage() {
  const { language } = useLanguage();

  const pageTitle = language === 'ar' ? 'الشروط والأحكام - WTSSHORT' : 'Terms & Conditions - WTSSHORT';
  const pageDescription = language === 'ar' 
    ? 'اقرأ الشروط والأحكام الخاصة باستخدام مولد روابط واتساب WTSSHORT. شروط الاستخدام والخصوصية.'
    : 'Read the terms and conditions for using WTSSHORT WhatsApp link generator. Usage terms and privacy policies.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={language === 'ar' ? 'شروط وأحكام, سياسة الخصوصية, استخدام, واتساب' : 'terms conditions, privacy policy, usage, WhatsApp'} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === 'ar' 
              ? 'آخر تحديث: ديسمبر 2023'
              : 'Last updated: December 2023'
            }
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {language === 'ar' ? (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. قبول الشروط</h2>
                <p className="text-muted-foreground leading-relaxed">
                  باستخدام موقع WTSSHORT، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. وصف الخدمة</h2>
                <p className="text-muted-foreground leading-relaxed">
                  WTSSHORT هي منصة مجانية تتيح للمستخدمين إنشاء روابط واتساب مخصصة مع رسائل معدة مسبقاً. الخدمة تشمل:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>إنشاء روابط واتساب مخصصة</li>
                  <li>تتبع النقرات والإحصائيات</li>
                  <li>إنشاء رموز QR للروابط</li>
                  <li>قوالب الرسائل الجاهزة</li>
                  <li>حماية الروابط بكلمة مرور</li>
                  <li>تحديد تاريخ انتهاء الصلاحية</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. الاستخدام المقبول</h2>
                <p className="text-muted-foreground leading-relaxed">
                  يُسمح باستخدام خدماتنا للأغراض التجارية والشخصية المشروعة فقط. يُمنع منعاً باتاً:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>إرسال رسائل غير مرغوب فيها (سبام)</li>
                  <li>المحتوى المضلل أو الاحتيالي</li>
                  <li>انتهاك حقوق الطبع والنشر</li>
                  <li>المحتوى المسيء أو المهين</li>
                  <li>الأنشطة غير القانونية</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. الخصوصية وحماية البيانات</h2>
                <p className="text-muted-foreground leading-relaxed">
                  نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>لا نحفظ أرقام الهواتف أو الرسائل الشخصية</li>
                  <li>نجمع إحصائيات مجهولة الهوية فقط</li>
                  <li>لا نشارك بياناتك مع أطراف ثالثة</li>
                  <li>تُستخدم ملفات تعريف الارتباط لتحسين التجربة</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. إخلاء المسؤولية</h2>
                <p className="text-muted-foreground leading-relaxed">
                  الخدمة متوفرة "كما هي" دون أي ضمانات. لا نتحمل مسؤولية:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>انقطاع الخدمة أو الأخطاء التقنية</li>
                  <li>فقدان البيانات أو الروابط</li>
                  <li>الاستخدام غير المناسب من قبل المستخدمين</li>
                  <li>أي أضرار مباشرة أو غير مباشرة</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. حقوق الملكية الفكرية</h2>
                <p className="text-muted-foreground leading-relaxed">
                  جميع المحتويات والتصاميم والبرمجيات في WTSSHORT محمية بحقوق الطبع والنشر. يُمنع النسخ أو التوزيع بدون إذن مكتوب.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. تعديل الشروط</h2>
                <p className="text-muted-foreground leading-relaxed">
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات مهمة عبر الموقع أو البريد الإلكتروني.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. القانون المطبق</h2>
                <p className="text-muted-foreground leading-relaxed">
                  تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع يُحل من خلال المحاكم السعودية المختصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. التواصل</h2>
                <p className="text-muted-foreground leading-relaxed">
                  لأي استفسارات حول هذه الشروط، يرجى التواصل معنا عبر:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>واتساب: +966590965110</li>
                  <li>البريد الإلكتروني: info@wtsshort.com</li>
                </ul>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By using WTSSHORT website, you agree to comply with these terms and conditions. If you do not agree to any of these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Service Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  WTSSHORT is a free platform that allows users to create custom WhatsApp links with pre-written messages. The service includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Creating custom WhatsApp links</li>
                  <li>Click tracking and analytics</li>
                  <li>QR code generation for links</li>
                  <li>Ready-made message templates</li>
                  <li>Password protection for links</li>
                  <li>Setting expiration dates</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services may only be used for legitimate commercial and personal purposes. The following is strictly prohibited:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Sending unsolicited messages (spam)</li>
                  <li>Misleading or fraudulent content</li>
                  <li>Copyright infringement</li>
                  <li>Offensive or abusive content</li>
                  <li>Illegal activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Privacy and Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We respect your privacy and are committed to protecting your personal data:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>We do not store phone numbers or personal messages</li>
                  <li>We only collect anonymous statistics</li>
                  <li>We do not share your data with third parties</li>
                  <li>Cookies are used to improve user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The service is provided "as is" without any warranties. We are not responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Service interruptions or technical errors</li>
                  <li>Data or link loss</li>
                  <li>Inappropriate use by users</li>
                  <li>Any direct or indirect damages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, designs, and software in WTSSHORT are protected by copyright. Copying or distribution without written permission is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Terms Modification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. You will be notified of any significant changes via the website or email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of Saudi Arabia. Any disputes will be resolved through the competent Saudi courts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For any inquiries about these terms, please contact us via:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>WhatsApp: +966590965110</li>
                  <li>Email: info@wtsshort.com</li>
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}