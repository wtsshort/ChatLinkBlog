import { useLanguage } from "@/hooks/use-language";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MessageCircle, Search, Star } from "lucide-react";
import { useState } from "react";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function FAQPage() {
  const { language, t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      answer: "WTSSHORT هو أداة مجانية لإنشاء روابط واتساب مخصصة تتيح للعملاء التواصل معك مباشرة برسائل معدة مسبقاً. مثالي للشركات وخدمة العملاء والحملات التسويقية.",
      category: "عام",
      popular: true
    },
    {
      question: "كيف يعمل مولد روابط واتساب؟",
      answer: "يقوم مولد الروابط بإنشاء رابط خاص يحتوي على رقم هاتفك ورسالة معدة مسبقاً. عندما ينقر العميل على الرابط، يفتح واتساب تلقائياً مع الرسالة جاهزة للإرسال.",
      category: "كيفية الاستخدام",
      popular: true
    },
    {
      question: "هل الخدمة مجانية؟",
      answer: "نعم، الخدمة الأساسية مجانية تماماً. يمكنك إنشاء روابط غير محدودة وتتبع النقرات والحصول على إحصائيات مفصلة دون أي رسوم.",
      category: "التسعير",
      popular: false
    },
    {
      question: "هل يمكنني تخصيص الرسالة؟",
      answer: "بالطبع! يمكنك كتابة أي رسالة تريدها. استخدم قوالب الرسائل الجاهزة أو اكتب رسالتك الخاصة للمبيعات، الدعم الفني، أو أي غرض آخر.",
      category: "كيفية الاستخدام",
      popular: false
    },
    {
      question: "كيف يمكنني تتبع أداء الروابط؟",
      answer: "توفر منصتنا إحصائيات شاملة تشمل عدد النقرات، المواقع الجغرافية، الأجهزة المستخدمة، والمزيد. يمكنك الوصول لهذه البيانات من صفحة التحليلات.",
      category: "التحليلات",
      popular: true
    },
    {
      question: "هل يمكنني إنشاء روابط مختصرة؟",
      answer: "نعم، يمكنك إنشاء روابط مختصرة مخصصة أو استخدام الروابط المختصرة التلقائية. هذا يجعل الروابط أكثر احترافية وسهولة في المشاركة.",
      category: "الميزات",
      popular: false
    },
    {
      question: "هل يعمل مع جميع أجهزة واتساب؟",
      answer: "نعم، الروابط تعمل مع واتساب على جميع المنصات: الهواتف الذكية (iOS/Android)، واتساب ويب، وتطبيق واتساب للكمبيوتر.",
      category: "التوافق",
      popular: false
    },
    {
      question: "كيف يمكنني حماية الروابط بكلمة مرور؟",
      answer: "يمكنك تفعيل خاصية الحماية بكلمة مرور عند إنشاء الرابط. هذا مفيد للروابط الخاصة أو المحتوى الحصري الذي تريد تقييد الوصول إليه.",
      category: "الأمان",
      popular: false
    },
    {
      question: "هل يمكنني تحديد تاريخ انتهاء للروابط؟",
      answer: "نعم، يمكنك تحديد تاريخ انتهاء صلاحية للروابط. هذا مفيد للعروض المحدودة الوقت أو الحملات التسويقية المؤقتة.",
      category: "الميزات",
      popular: false
    },
    {
      question: "كيف يمكنني الحصول على الدعم؟",
      answer: "يمكنك التواصل معنا عبر واتساب أو البريد الإلكتروني. نحن نوفر دعماً سريعاً ومجانياً لجميع المستخدمين.",
      category: "الدعم",
      popular: false
    }
  ] : [
    {
      question: "What is WTSSHORT?",
      answer: "WTSSHORT is a free tool for creating custom WhatsApp links that allow customers to contact you directly with pre-written messages. Perfect for businesses, customer support, and marketing campaigns.",
      category: "General",
      popular: true
    },
    {
      question: "How does the WhatsApp link generator work?",
      answer: "The link generator creates a special link containing your phone number and a pre-written message. When customers click the link, WhatsApp opens automatically with the message ready to send.",
      category: "How to Use",
      popular: true
    },
    {
      question: "Is the service free?",
      answer: "Yes, the basic service is completely free. You can create unlimited links, track clicks, and get detailed analytics without any charges.",
      category: "Pricing",
      popular: false
    },
    {
      question: "Can I customize the message?",
      answer: "Absolutely! You can write any message you want. Use ready-made message templates or write your own custom message for sales, technical support, or any other purpose.",
      category: "How to Use",
      popular: false
    },
    {
      question: "How can I track link performance?",
      answer: "Our platform provides comprehensive analytics including click counts, geographical locations, devices used, and more. You can access this data from the analytics page.",
      category: "Analytics",
      popular: true
    },
    {
      question: "Can I create short links?",
      answer: "Yes, you can create custom short links or use automatic short links. This makes links more professional and easier to share.",
      category: "Features",
      popular: false
    },
    {
      question: "Does it work with all WhatsApp devices?",
      answer: "Yes, the links work with WhatsApp on all platforms: smartphones (iOS/Android), WhatsApp Web, and WhatsApp desktop application.",
      category: "Compatibility",
      popular: false
    },
    {
      question: "How can I protect links with passwords?",
      answer: "You can enable password protection when creating the link. This is useful for private links or exclusive content that you want to restrict access to.",
      category: "Security",
      popular: false
    },
    {
      question: "Can I set expiration dates for links?",
      answer: "Yes, you can set expiration dates for links. This is useful for limited-time offers or temporary marketing campaigns.",
      category: "Features",
      popular: false
    },
    {
      question: "How can I get support?",
      answer: "You can contact us via WhatsApp or email. We provide fast and free support for all users.",
      category: "Support",
      popular: false
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    !searchQuery || 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularFaqs = faqs.filter(faq => faq.popular);
  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <>
      <SEOHead
        title={language === 'ar' 
          ? "الأسئلة الشائعة - WTSSHORT | دليل شامل لمولد روابط واتساب"
          : "FAQ - WTSSHORT | Complete Guide to WhatsApp Link Generator"
        }
        description={language === 'ar'
          ? "أجوبة شاملة للأسئلة الشائعة حول مولد روابط واتساب WTSSHORT. تعلم كيفية إنشاء روابط مخصصة، تتبع الأداء، والاستفادة من جميع الميزات المجانية."
          : "Comprehensive answers to frequently asked questions about WTSSHORT WhatsApp link generator. Learn how to create custom links, track performance, and utilize all free features."
        }
        keywords={language === 'ar'
          ? "أسئلة شائعة WTSSHORT، مساعدة واتساب، دليل مولد الروابط، كيفية استخدام واتساب، دعم العملاء، روابط مخصصة"
          : "WTSSHORT FAQ, WhatsApp help, link generator guide, how to use WhatsApp, customer support, custom links"
        }
        canonical="https://wtsshort.com/faq"
        ogImage="https://wtsshort.com/og-image-faq.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
            {language === 'ar' ? '❓ دليل المساعدة الشامل' : '❓ Complete Help Guide'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {language === 'ar' 
              ? 'أجد الإجابات على جميع أسئلتك حول استخدام مولد روابط واتساب المجاني'
              : 'Find answers to all your questions about using our free WhatsApp link generator'
            }
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder={language === 'ar' ? 'ابحث في الأسئلة...' : 'Search questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Popular Questions */}
        {!searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'ar' ? 'الأسئلة الأكثر شيوعاً' : 'Most Popular Questions'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {popularFaqs.map((faq, index) => (
                <Card key={`popular-${index}`} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        const mainIndex = faqs.findIndex(f => f.question === faq.question);
                        if (!openItems.includes(mainIndex)) {
                          setOpenItems([...openItems, mainIndex]);
                        }
                        document.getElementById(`faq-${mainIndex}`)?.scrollIntoView({ behavior: 'smooth' });
                      }}>
                  <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">{faq.category}</Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              {language === 'ar' ? 'جميع الأسئلة والإجابات' : 'All Questions & Answers'}
            </h2>
            <Badge variant="outline">{filteredFaqs.length}</Badge>
          </div>
          
          {filteredFaqs.length === 0 ? (
            <Card className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No Results Found'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'جرب البحث بكلمات مختلفة' : 'Try searching with different keywords'}
              </p>
            </Card>
          ) : (
            filteredFaqs.map((faq, index) => {
              const originalIndex = faqs.findIndex(f => f.question === faq.question);
              return (
                <Collapsible
                  key={originalIndex}
                  open={openItems.includes(originalIndex)}
                  onOpenChange={() => toggleItem(originalIndex)}
                  id={`faq-${originalIndex}`}
                >
                  <CollapsibleTrigger className="w-full p-6 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground">
                              {faq.question}
                            </h3>
                            {faq.popular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          </div>
                          <Badge variant="outline" className="text-xs">{faq.category}</Badge>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`h-5 w-5 text-muted-foreground transition-transform ${
                          openItems.includes(originalIndex) ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              );
            })
          )}
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
    </>
  );
}