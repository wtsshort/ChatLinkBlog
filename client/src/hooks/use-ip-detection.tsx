import { useState, useEffect } from "react";
import axios from "axios";

export interface LocationData {
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  timezone: string;
  language: string;
  currency: string;
  ip: string;
}

export function useIPDetection() {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Arabic speaking countries and their preferred language
  const arabicCountries = [
    'SA', 'AE', 'EG', 'JO', 'LB', 'SY', 'IQ', 'KW', 'QA', 'BH', 
    'OM', 'YE', 'PS', 'MA', 'TN', 'DZ', 'LY', 'SD', 'SO', 'DJ', 'KM', 'MR'
  ];

  const detectLocationAndLanguage = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try multiple IP detection services for better reliability
      const services = [
        'https://ipapi.co/json/',
        'https://ipinfo.io/json',
        'https://api.ipify.org/?format=json'
      ];

      let response;
      for (const service of services) {
        try {
          response = await axios.get(service, { timeout: 5000 });
          if (response.data) break;
        } catch (err) {
          console.warn(`Service ${service} failed, trying next...`);
          continue;
        }
      }

      if (!response?.data) {
        throw new Error('All IP detection services failed');
      }

      const data = response.data;
      
      // Normalize data from different services
      const normalizedData: LocationData = {
        country: data.country || data.country_name || 'Unknown',
        countryCode: data.countryCode || data.country_code || 'US',
        region: data.region || data.region_code || '',
        regionName: data.regionName || data.region || '',
        city: data.city || 'Unknown',
        timezone: data.timezone || data.timezone || 'UTC',
        ip: data.query || data.ip || 'Unknown',
        language: arabicCountries.includes(data.countryCode || data.country_code || 'US') ? 'ar' : 'en',
        currency: getCurrencyByCountry(data.countryCode || data.country_code || 'US')
      };

      setLocationData(normalizedData);
      
      // Save to localStorage for future visits
      localStorage.setItem('user_location_data', JSON.stringify(normalizedData));
      localStorage.setItem('auto_detected_language', normalizedData.language);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('IP Detection Error:', errorMessage);
      
      // Fallback to saved data or defaults
      const savedData = localStorage.getItem('user_location_data');
      if (savedData) {
        try {
          setLocationData(JSON.parse(savedData));
        } catch {
          setLocationData(getDefaultLocationData());
        }
      } else {
        setLocationData(getDefaultLocationData());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultLocationData = (): LocationData => ({
    country: 'United States',
    countryCode: 'US',
    region: '',
    regionName: '',
    city: 'Unknown',
    timezone: 'America/New_York',
    language: 'en',
    currency: 'USD',
    ip: 'Unknown'
  });

  const getCurrencyByCountry = (countryCode: string): string => {
    const currencyMap: Record<string, string> = {
      'SA': 'SAR', 'AE': 'AED', 'EG': 'EGP', 'JO': 'JOD', 'LB': 'LBP',
      'SY': 'SYP', 'IQ': 'IQD', 'KW': 'KWD', 'QA': 'QAR', 'BH': 'BHD',
      'OM': 'OMR', 'YE': 'YER', 'MA': 'MAD', 'TN': 'TND', 'DZ': 'DZD',
      'LY': 'LYD', 'SD': 'SDG', 'US': 'USD', 'GB': 'GBP', 'EU': 'EUR',
      'CA': 'CAD', 'AU': 'AUD', 'IN': 'INR', 'BR': 'BRL', 'CN': 'CNY',
      'JP': 'JPY', 'KR': 'KRW', 'TR': 'TRY', 'RU': 'RUB'
    };
    return currencyMap[countryCode] || 'USD';
  };

  const getCountryFlag = (countryCode: string): string => {
    // Convert country code to flag emoji
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const isArabicCountry = (): boolean => {
    return locationData ? arabicCountries.includes(locationData.countryCode) : false;
  };

  useEffect(() => {
    // Check if we have recent data (less than 1 hour old)
    const savedData = localStorage.getItem('user_location_data');
    const lastDetection = localStorage.getItem('last_ip_detection');
    const oneHour = 60 * 60 * 1000;
    
    if (savedData && lastDetection) {
      const timeDiff = Date.now() - parseInt(lastDetection);
      if (timeDiff < oneHour) {
        try {
          setLocationData(JSON.parse(savedData));
          setIsLoading(false);
          return;
        } catch {
          // Invalid saved data, proceed with fresh detection
        }
      }
    }

    // Perform fresh detection
    detectLocationAndLanguage();
    localStorage.setItem('last_ip_detection', Date.now().toString());
  }, []);

  return {
    locationData,
    isLoading,
    error,
    isArabicCountry,
    getCountryFlag,
    refetch: detectLocationAndLanguage
  };
}