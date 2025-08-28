import { useLanguage } from "@/hooks/use-language";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const { language, t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = language === 'ar' ? [
    {
      question: "ما هو WTSSHORT؟",
      answer: "WTSSHORT هو أداة مجانية لإنشاء روابط واتساب مخصصة تتيح للعملاء التواصل معك مباشرة برسائل معدة مسبقاً. مثالي للشركات وخدمة العملاء والحملات التسويقية."
    },
    {
      question: "كيف يعمل مولد روابط واتساب؟",
      answer: "يقوم مولد الروابط بإنشاء رابط خاص يحتوي على رقم هاتفك ورسالة معدة مسبقاً. عندما ينقر العميل على الرابط، يفتح واتساب تلقائياً مع الرسالة جاهزة للإرسال."
    },
    {
      question: "هل الخدمة مجانية؟",
      answer: "نعم، الخدمة الأساسية مجانية تماماً. يمكنك إنشاء روابط غير محدودة وتتبع النقرات والحصول على إحصائيات مفصلة دون أي رسوم."
    },
    {
      question: "هل يمكنني تخصيص الرسالة؟",
      answer: "بالطبع! يمكنك كتابة أي رسالة تريدها. استخدم قوالب الرسائل الجاهزة أو اكتب رسالتك الخاصة للمبيعات، الدعم الفني، أو أي غرض آخر."
    },
    {
      question: "كيف يمكنني تتبع أداء الروابط؟",
      answer: "توفر منصتنا إحصائيات شاملة تشمل عدد النقرات، المواقع الجغرافية، الأجهزة المستخدمة، والمزيد. يمكنك الوصول لهذه البيانات من صفحة التحليلات."
    },
    {
      question: "هل يمكنني إنشاء روابط مختصرة؟",
      answer: "نعم، يمكنك إنشاء روابط مختصرة مخصصة أو استخدام الروابط المختصرة التلقائية. هذا يجعل الروابط أكثر احترافية وسهولة في المشاركة."
    },
    {
      question: "هل يعمل مع جميع أجهزة واتساب؟",
      answer: "نعم، الروابط تعمل مع واتساب على جميع المنصات: الهواتف الذكية (iOS/Android)، واتساب ويب، وتطبيق واتساب للكمبيوتر."
    },
    {
      question: "كيف يمكنني حماية الروابط بكلمة مرور؟",
      answer: "يمكنك تفعيل خاصية الحماية بكلمة مرور عند إنشاء الرابط. هذا مفيد للروابط الخاصة أو المحتوى الحصري الذي تريد تقييد الوصول إليه."
    },
    {
      question: "هل يمكنني تحديد تاريخ انتهاء للروابط؟",
      answer: "نعم، يمكنك تحديد تاريخ انتهاء صلاحية للروابط. هذا مفيد للعروض المحدودة الوقت أو الحملات التسويقية المؤقتة."
    },
    {
      question: "كيف يمكنني الحصول على الدعم؟",
      answer: "يمكنك التواصل معنا عبر واتساب أو البريد الإلكتروني. نحن نوفر دعماً سريعاً ومجانياً لجميع المستخدمين."
    }
  ] : [
    {
      question: "What is WTSSHORT?",
      answer: "WTSSHORT is a free tool for creating custom WhatsApp links that allow customers to contact you directly with pre-written messages. Perfect for businesses, customer support, and marketing campaigns."
    },
    {
      question: "How does the WhatsApp link generator work?",
      answer: "The link generator creates a special link containing your phone number and a pre-written message. When customers click the link, WhatsApp opens automatically with the message ready to send."
    },
    {
      question: "Is the service free?",
      answer: "Yes, the basic service is completely free. You can create unlimited links, track clicks, and get detailed analytics without any charges."
    },
    {
      question: "Can I customize the message?",
      answer: "Absolutely! You can write any message you want. Use ready-made message templates or write your own custom message for sales, technical support, or any other purpose."
    },
    {
      question: "How can I track link performance?",
      answer: "Our platform provides comprehensive analytics including click counts, geographical locations, devices used, and more. You can access this data from the analytics page."
    },
    {
      question: "Can I create short links?",
      answer: "Yes, you can create custom short links or use automatic short links. This makes links more professional and easier to share."
    },
    {
      question: "Does it work with all WhatsApp devices?",
      answer: "Yes, the links work with WhatsApp on all platforms: smartphones (iOS/Android), WhatsApp Web, and WhatsApp desktop application."
    },
    {
      question: "How can I protect links with passwords?",
      answer: "You can enable password protection when creating the link. This is useful for private links or exclusive content that you want to restrict access to."
    },
    {
      question: "Can I set expiration dates for links?",
      answer: "Yes, you can set expiration dates for links. This is useful for limited-time offers or temporary marketing campaigns."
    },
    {
      question: "How can I get support?",
      answer: "You can contact us via WhatsApp or email. We provide fast and free support for all users."
    }
  ];

  const pageTitle = language === 'ar' ? 'الأسئلة الشائعة - WTSSHORT' : 'FAQ - WTSSHORT';
  const pageDescription = language === 'ar' 
    ? 'أجوبة شاملة للأسئلة الشائعة حول مولد روابط واتساب WTSSHORT. تعلم كيفية إنشاء روابط مخصصة وتتبع الأداء.'
    : 'Comprehensive answers to frequently asked questions about WTSSHORT WhatsApp link generator. Learn how to create custom links and track performance.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={language === 'ar' ? 'أسئلة شائعة, واتساب, روابط, تسويق, دعم عملاء' : 'FAQ, WhatsApp, links, marketing, customer support'} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'أجد الإجابات على جميع أسئلتك حول استخدام مولد روابط واتساب المجاني'
              : 'Find answers to all your questions about using our free WhatsApp link generator'
            }
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
            >
              <CollapsibleTrigger className="w-full p-6 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      openItems.includes(index) ? 'transform rotate-180' : ''
                    }`} 
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center p-8 bg-card border border-border rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'لم تجد إجابة لسؤالك؟' : "Didn't find your answer?"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'ar' 
              ? 'تواصل معنا مباشرة وسنساعدك في حل أي استفسار'
              : 'Contact us directly and we will help you with any inquiry'
            }
          </p>
          <button 
            onClick={() => window.open('https://wa.me/966590965110?text=مرحباً، لدي سؤال حول WTSSHORT', '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            data-testid="contact-support"
          >
            {language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  );
}