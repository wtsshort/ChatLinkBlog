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

const COUNTRIES: Country[] = [
  { name: "السعودية", code: "SA", flag: "🇸🇦", dialCode: "+966" },
  { name: "الإمارات", code: "AE", flag: "🇦🇪", dialCode: "+971" },
  { name: "الكويت", code: "KW", flag: "🇰🇼", dialCode: "+965" },
  { name: "قطر", code: "QA", flag: "🇶🇦", dialCode: "+974" },
  { name: "البحرين", code: "BH", flag: "🇧🇭", dialCode: "+973" },
  { name: "عُمان", code: "OM", flag: "🇴🇲", dialCode: "+968" },
  { name: "مصر", code: "EG", flag: "🇪🇬", dialCode: "+20" },
  { name: "الأردن", code: "JO", flag: "🇯🇴", dialCode: "+962" },
  { name: "لبنان", code: "LB", flag: "🇱🇧", dialCode: "+961" },
  { name: "سوريا", code: "SY", flag: "🇸🇾", dialCode: "+963" },
  { name: "العراق", code: "IQ", flag: "🇮🇶", dialCode: "+964" },
  { name: "المغرب", code: "MA", flag: "🇲🇦", dialCode: "+212" },
  { name: "الجزائر", code: "DZ", flag: "🇩🇿", dialCode: "+213" },
  { name: "تونس", code: "TN", flag: "🇹🇳", dialCode: "+216" },
  { name: "ليبيا", code: "LY", flag: "🇱🇾", dialCode: "+218" },
  { name: "السودان", code: "SD", flag: "🇸🇩", dialCode: "+249" },
  { name: "اليمن", code: "YE", flag: "🇾🇪", dialCode: "+967" },
  { name: "الولايات المتحدة", code: "US", flag: "🇺🇸", dialCode: "+1" },
  { name: "كندا", code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { name: "المملكة المتحدة", code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { name: "ألمانيا", code: "DE", flag: "🇩🇪", dialCode: "+49" },
  { name: "فرنسا", code: "FR", flag: "🇫🇷", dialCode: "+33" },
  { name: "إيطاليا", code: "IT", flag: "🇮🇹", dialCode: "+39" },
  { name: "إسبانيا", code: "ES", flag: "🇪🇸", dialCode: "+34" },
  { name: "هولندا", code: "NL", flag: "🇳🇱", dialCode: "+31" },
  { name: "بلجيكا", code: "BE", flag: "🇧🇪", dialCode: "+32" },
  { name: "سويسرا", code: "CH", flag: "🇨🇭", dialCode: "+41" },
  { name: "النمسا", code: "AT", flag: "🇦🇹", dialCode: "+43" },
  { name: "السويد", code: "SE", flag: "🇸🇪", dialCode: "+46" },
  { name: "النرويج", code: "NO", flag: "🇳🇴", dialCode: "+47" },
  { name: "الدنمارك", code: "DK", flag: "🇩🇰", dialCode: "+45" },
  { name: "فنلندا", code: "FI", flag: "🇫🇮", dialCode: "+358" },
  { name: "اليابان", code: "JP", flag: "🇯🇵", dialCode: "+81" },
  { name: "الصين", code: "CN", flag: "🇨🇳", dialCode: "+86" },
  { name: "كوريا الجنوبية", code: "KR", flag: "🇰🇷", dialCode: "+82" },
  { name: "الهند", code: "IN", flag: "🇮🇳", dialCode: "+91" },
  { name: "باكستان", code: "PK", flag: "🇵🇰", dialCode: "+92" },
  { name: "بنغلاديش", code: "BD", flag: "🇧🇩", dialCode: "+880" },
  { name: "إندونيسيا", code: "ID", flag: "🇮🇩", dialCode: "+62" },
  { name: "ماليزيا", code: "MY", flag: "🇲🇾", dialCode: "+60" },
  { name: "سنغافورة", code: "SG", flag: "🇸🇬", dialCode: "+65" },
  { name: "تايلاند", code: "TH", flag: "🇹🇭", dialCode: "+66" },
  { name: "الفلبين", code: "PH", flag: "🇵🇭", dialCode: "+63" },
  { name: "فيتنام", code: "VN", flag: "🇻🇳", dialCode: "+84" },
  { name: "أستراليا", code: "AU", flag: "🇦🇺", dialCode: "+61" },
  { name: "نيوزيلندا", code: "NZ", flag: "🇳🇿", dialCode: "+64" },
  { name: "جنوب أفريقيا", code: "ZA", flag: "🇿🇦", dialCode: "+27" },
  { name: "نيجيريا", code: "NG", flag: "🇳🇬", dialCode: "+234" },
  { name: "البرازيل", code: "BR", flag: "🇧🇷", dialCode: "+55" },
  { name: "الأرجنتين", code: "AR", flag: "🇦🇷", dialCode: "+54" },
  { name: "المكسيك", code: "MX", flag: "🇲🇽", dialCode: "+52" },
  { name: "تركيا", code: "TR", flag: "🇹🇷", dialCode: "+90" },
  { name: "روسيا", code: "RU", flag: "🇷🇺", dialCode: "+7" },
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between rounded-l-md rounded-r-none border-r-0 px-3 transition-enhanced hover-lift min-w-[110px]",
              language === 'ar' ? "rounded-r-md rounded-l-none border-l-0" : ""
            )}
            disabled={disabled}
            data-testid="country-selector"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="text-xl drop-shadow-sm">{selectedCountry.flag}</span>
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm -z-10"></div>
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
                    <span className="text-xl drop-shadow-sm">{country.flag}</span>
                    <div className="absolute -inset-1 bg-white/10 rounded-full blur-sm -z-10"></div>
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
      
      <div className="relative flex-1">
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
            "rounded-r-md rounded-l-none transition-enhanced",
            language === 'ar' ? "rounded-l-md rounded-r-none pr-10" : "pl-10",
            language === 'ar' ? "text-right" : "text-left"
          )}
          disabled={disabled}
          data-testid="phone-number-input"
        />
      </div>
    </div>
  );
}