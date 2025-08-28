import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/solutions", label: language === 'ar' ? 'الحلول' : 'Solutions' },
    { path: "/pricing", label: language === 'ar' ? 'الأسعار' : 'Pricing' },
    { path: "/blog", label: t("nav.blog") },
    { path: "/faq", label: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' },
    { path: "/terms", label: language === 'ar' ? 'الشروط والأحكام' : 'Terms' },
    { path: "/dashboard", label: t("nav.dashboard") },
  ];
  
  // إخفاء رابط لوحة التحكم إذا لم يكن مصرحاً
  const isAdmin = localStorage.getItem('admin_token');
  const visibleNavItems = isAdmin ? navItems : navItems.filter(item => item.path !== '/dashboard');

  return (
    <nav className={`bg-card border-b border-border sticky top-0 z-40 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center gap-3 cursor-pointer group" data-testid="logo">
                  <div className="relative">
                    {/* Modern logo container */}
                    <div className="w-11 h-11 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105 relative overflow-hidden border border-green-300/20">
                      {/* Subtle background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-40"></div>
                      
                      {/* WhatsApp icon with modern styling */}
                      <div className="relative flex items-center justify-center">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white relative z-10 drop-shadow-sm">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.515" fill="currentColor"/>
                        </svg>
                        
                        {/* Link indicator with better positioning */}
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-md border border-white"></div>
                  </div>

                  {/* Brand name with modern styling */}
                  <div className="flex flex-col">
                    <h1 className="text-xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-green-500 group-hover:via-emerald-500 group-hover:to-green-600 transition-all duration-500 tracking-tight">
                      WTS<span className="text-blue-600 group-hover:text-cyan-600 transition-colors duration-300 font-extrabold">SHORT</span>
                    </h1>
                    <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-500 rounded-full"></div>
                  </div>

                  {/* Tagline */}
                  <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
                    <span className="text-xs text-muted-foreground font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {language === 'ar' ? 'مولد واتساب' : 'WhatsApp Gen'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {visibleNavItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location === item.path
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      data-testid={`nav-${item.path.slice(1) || 'home'}`}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
                {isAdmin && (
                  <Link href="/admin">
                    <a
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location === '/admin'
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      data-testid="nav-admin"
                    >
                      {language === 'ar' ? 'الإدارة' : 'Admin'}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border mt-2 pt-2 pb-3">
            <div className="flex flex-col space-y-1">
              {visibleNavItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location === item.path
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${item.path.slice(1) || 'home'}`}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin">
                  <a
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location === '/admin'
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-admin"
                  >
                    {language === 'ar' ? 'الإدارة' : 'Admin'}
                  </a>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
