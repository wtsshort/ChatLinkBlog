import { useLanguage } from "@/hooks/use-language";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className={`bg-card border-t border-border mt-20 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden border border-green-300/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-30"></div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white relative z-10">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.515" fill="currentColor"/>
                </svg>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <svg width="5" height="5" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                WTS<span className="text-blue-600 font-extrabold">SHORT</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              {language === 'ar' 
                ? "أبسط طريقة لإنشاء روابط واتساب لأعمالك. أنشئ وتتبع وحسّن تواصلك عبر واتساب."
                : "The simplest way to create WhatsApp links for your business. Generate, track, and optimize your WhatsApp communication."
              }
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="twitter-link">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="linkedin-link">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="github-link">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'المنتج' : 'Product'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'منشئ الروابط' : 'Link Generator'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'التحليلات' : 'Analytics'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'الوصول لواجهة برمجة التطبيقات' : 'API Access'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'التسعير' : 'Pricing'}
              </a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'الموارد' : 'Resources'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'المدونة' : 'Blog'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'التوثيق' : 'Documentation'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'مركز المساعدة' : 'Help Center'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'اتصل بنا' : 'Contact'}
              </a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'حول' : 'About'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {language === 'ar' ? 'الدعم' : 'Support'}
              </a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            {language === 'ar' 
              ? '© 2023 WTSSHORT. جميع الحقوق محفوظة.'
              : '© 2023 WTSSHORT. All rights reserved.'
            }
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-muted-foreground text-sm">
              {language === 'ar' ? 'متوفر باللغات:' : 'Available in:'}
            </span>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-muted rounded text-xs">English</span>
              <span className="px-2 py-1 bg-muted rounded text-xs">العربية</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
