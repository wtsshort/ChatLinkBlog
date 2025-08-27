import { useLanguage } from "@/hooks/use-language";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className={`bg-card border-t border-border mt-20 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-primary mb-4">WTSSHORT</h3>
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
