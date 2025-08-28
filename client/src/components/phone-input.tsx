import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

// استخدام خدمة أعلام عبر الإنترنت للحصول على صور أعلام عالية الجودة
const getFlagUrl = (countryCode: string) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

const COUNTRIES: Country[] = [
  { name: "السعودية", code: "SA", flag: getFlagUrl("SA"), dialCode: "+966" },
  { name: "الإمارات", code: "AE", flag: getFlagUrl("AE"), dialCode: "+971" },
  { name: "الكويت", code: "KW", flag: getFlagUrl("KW"), dialCode: "+965" },
  { name: "قطر", code: "QA", flag: getFlagUrl("QA"), dialCode: "+974" },
  { name: "البحرين", code: "BH", flag: getFlagUrl("BH"), dialCode: "+973" },
  { name: "عُمان", code: "OM", flag: getFlagUrl("OM"), dialCode: "+968" },
  { name: "مصر", code: "EG", flag: getFlagUrl("EG"), dialCode: "+20" },
  { name: "الأردن", code: "JO", flag: getFlagUrl("JO"), dialCode: "+962" },
  { name: "لبنان", code: "LB", flag: getFlagUrl("LB"), dialCode: "+961" },
  { name: "سوريا", code: "SY", flag: getFlagUrl("SY"), dialCode: "+963" },
  { name: "العراق", code: "IQ", flag: getFlagUrl("IQ"), dialCode: "+964" },
  { name: "المغرب", code: "MA", flag: getFlagUrl("MA"), dialCode: "+212" },
  { name: "الجزائر", code: "DZ", flag: getFlagUrl("DZ"), dialCode: "+213" },
  { name: "تونس", code: "TN", flag: getFlagUrl("TN"), dialCode: "+216" },
  { name: "ليبيا", code: "LY", flag: getFlagUrl("LY"), dialCode: "+218" },
  { name: "السودان", code: "SD", flag: getFlagUrl("SD"), dialCode: "+249" },
  { name: "اليمن", code: "YE", flag: getFlagUrl("YE"), dialCode: "+967" },
  { name: "الولايات المتحدة", code: "US", flag: getFlagUrl("US"), dialCode: "+1" },
  { name: "كندا", code: "CA", flag: getFlagUrl("CA"), dialCode: "+1" },
  { name: "المملكة المتحدة", code: "GB", flag: getFlagUrl("GB"), dialCode: "+44" },
  { name: "ألمانيا", code: "DE", flag: getFlagUrl("DE"), dialCode: "+49" },
  { name: "فرنسا", code: "FR", flag: getFlagUrl("FR"), dialCode: "+33" },
  { name: "إيطاليا", code: "IT", flag: getFlagUrl("IT"), dialCode: "+39" },
  { name: "إسبانيا", code: "ES", flag: getFlagUrl("ES"), dialCode: "+34" },
  { name: "هولندا", code: "NL", flag: getFlagUrl("NL"), dialCode: "+31" },
  { name: "بلجيكا", code: "BE", flag: getFlagUrl("BE"), dialCode: "+32" },
  { name: "سويسرا", code: "CH", flag: getFlagUrl("CH"), dialCode: "+41" },
  { name: "النمسا", code: "AT", flag: getFlagUrl("AT"), dialCode: "+43" },
  { name: "السويد", code: "SE", flag: getFlagUrl("SE"), dialCode: "+46" },
  { name: "النرويج", code: "NO", flag: getFlagUrl("NO"), dialCode: "+47" },
  { name: "الدنمارك", code: "DK", flag: getFlagUrl("DK"), dialCode: "+45" },
  { name: "فنلندا", code: "FI", flag: getFlagUrl("FI"), dialCode: "+358" },
  { name: "اليابان", code: "JP", flag: getFlagUrl("JP"), dialCode: "+81" },
  { name: "الصين", code: "CN", flag: getFlagUrl("CN"), dialCode: "+86" },
  { name: "كوريا الجنوبية", code: "KR", flag: getFlagUrl("KR"), dialCode: "+82" },
  { name: "الهند", code: "IN", flag: getFlagUrl("IN"), dialCode: "+91" },
  { name: "باكستان", code: "PK", flag: getFlagUrl("PK"), dialCode: "+92" },
  { name: "بنغلاديش", code: "BD", flag: getFlagUrl("BD"), dialCode: "+880" },
  { name: "إندونيسيا", code: "ID", flag: getFlagUrl("ID"), dialCode: "+62" },
  { name: "ماليزيا", code: "MY", flag: getFlagUrl("MY"), dialCode: "+60" },
  { name: "سنغافورة", code: "SG", flag: getFlagUrl("SG"), dialCode: "+65" },
  { name: "تايلاند", code: "TH", flag: getFlagUrl("TH"), dialCode: "+66" },
  { name: "الفلبين", code: "PH", flag: getFlagUrl("PH"), dialCode: "+63" },
  { name: "فيتنام", code: "VN", flag: getFlagUrl("VN"), dialCode: "+84" },
  { name: "أستراليا", code: "AU", flag: getFlagUrl("AU"), dialCode: "+61" },
  { name: "نيوزيلندا", code: "NZ", flag: getFlagUrl("NZ"), dialCode: "+64" },
  { name: "جنوب أفريقيا", code: "ZA", flag: getFlagUrl("ZA"), dialCode: "+27" },
  { name: "نيجيريا", code: "NG", flag: getFlagUrl("NG"), dialCode: "+234" },
  { name: "البرازيل", code: "BR", flag: getFlagUrl("BR"), dialCode: "+55" },
  { name: "الأرجنتين", code: "AR", flag: getFlagUrl("AR"), dialCode: "+54" },
  { name: "المكسيك", code: "MX", flag: getFlagUrl("MX"), dialCode: "+52" },
  { name: "تركيا", code: "TR", flag: getFlagUrl("TR"), dialCode: "+90" },
  { name: "روسيا", code: "RU", flag: getFlagUrl("RU"), dialCode: "+7" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  language?: 'ar' | 'en';
  className?: string;
  disabled?: boolean;
}

export function PhoneInput({ 
  value = "", 
  onChange, 
  placeholder, 
  language = 'ar', 
  className,
  disabled = false
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find(country => country.code === "SA") || COUNTRIES[0]
  );

  // استخراج رقم الهاتف بدون رمز الدولة
  const getPhoneNumber = (fullNumber: string): string => {
    if (!fullNumber) return "";
    
    // إذا كان الرقم يبدأ برمز الدولة المحدد، أزل الرمز
    if (fullNumber.startsWith(selectedCountry.dialCode)) {
      return fullNumber.slice(selectedCountry.dialCode.length);
    }
    
    // إذا كان الرقم يبدأ برمز دولة آخر، ابحث عن الدولة المناسبة
    const matchedCountry = COUNTRIES.find(country => 
      fullNumber.startsWith(country.dialCode)
    );
    
    if (matchedCountry) {
      setSelectedCountry(matchedCountry);
      return fullNumber.slice(matchedCountry.dialCode.length);
    }
    
    return fullNumber;
  };

  const phoneNumber = getPhoneNumber(value);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    // إنشاء الرقم الكامل مع رمز الدولة الجديد
    const fullNumber = country.dialCode + phoneNumber;
    onChange(fullNumber);
    setOpen(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // التأكد من أن المدخل يحتوي على أرقام فقط
    const cleanedValue = inputValue.replace(/[^\d]/g, '');
    const fullNumber = selectedCountry.dialCode + cleanedValue;
    onChange(fullNumber);
  };

  return (
    <div className={cn("flex", className)}>
      <div className={cn("order-1", language === 'ar' ? 'order-2' : '')}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "justify-between px-3 transition-enhanced hover-lift min-w-[110px] h-10",
                language === 'ar' ? 
                  "rounded-l-md rounded-r-none border-l-0" : 
                  "rounded-r-md rounded-l-none border-r-0"
              )}
              disabled={disabled}
              data-testid="country-selector"
            >
            <div className="flex items-center gap-2">
              <div className="relative flex-shrink-0">
                <img 
                  src={selectedCountry.flag} 
                  alt={`${selectedCountry.name} flag`}
                  className="w-6 h-4 object-cover rounded-sm shadow-sm"
                  onError={(e) => {
                    // إذا فشل تحميل الصورة، استخدم نص بديل
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-6 h-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-sm items-center justify-center text-xs font-bold text-primary">
                  {selectedCountry.code}
                </div>
              </div>
              <span className="text-sm font-medium text-foreground">{selectedCountry.dialCode}</span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder={language === 'ar' ? 'ابحث عن دولة...' : 'Search country...'} 
            />
            <CommandEmpty>
              {language === 'ar' ? 'لم يتم العثور على دولة.' : 'No country found.'}
            </CommandEmpty>
            <CommandGroup className="max-h-[250px] overflow-auto">
              {COUNTRIES.map((country) => (
                <CommandItem
                  key={country.code}
                  value={`${country.name} ${country.dialCode}`}
                  onSelect={() => handleCountrySelect(country)}
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted transition-colors py-2"
                >
                  <div className="relative flex-shrink-0">
                    <img 
                      src={country.flag} 
                      alt={`${country.name} flag`}
                      className="w-8 h-5 object-cover rounded-sm shadow-sm border border-border"
                      onError={(e) => {
                        // إذا فشل تحميل الصورة، استخدم نص بديل
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-8 h-5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-sm items-center justify-center text-xs font-bold text-primary border border-border">
                      {country.code}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-medium text-primary">{country.dialCode}</span>
                    <span className="text-sm text-muted-foreground truncate">{country.name}</span>
                  </div>
                  {selectedCountry.code === country.code && (
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      </div>
      
      <div className={cn("relative flex-1 order-2", language === 'ar' ? 'order-1' : '')}>
        <div className={cn(
          "absolute inset-y-0 flex items-center pointer-events-none px-3 z-10",
          language === 'ar' ? "right-0" : "left-0"
        )}>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder || (language === 'ar' ? '501234567' : '1234567890')}
          className={cn(
            "transition-enhanced text-left h-10",
            language === 'ar' ? 
              "rounded-r-md rounded-l-none pr-10" : 
              "rounded-l-md rounded-r-none pl-10"
          )}
          dir="ltr"
          disabled={disabled}
          data-testid="phone-number-input"
        />
      </div>
    </div>
  );
}