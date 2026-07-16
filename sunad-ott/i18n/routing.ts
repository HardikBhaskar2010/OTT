import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // All 22 officially recognized Indian languages
  locales: [
    'en',   // English (Latin)
    'hi',   // हिंदी (Devanagari)
    'ta',   // தமிழ் (Tamil)
    'te',   // తెలుగు (Telugu)
    'mr',   // मराठी (Devanagari)
    'bn',   // বাংলা (Bengali)
    'gu',   // ગુજરાતી (Gujarati)
    'kn',   // ಕನ್ನಡ (Kannada)
    'ml',   // മലയാളം (Malayalam)
    'pa',   // ਪੰਜਾਬੀ (Gurmukhi)
    'or',   // ଓଡ଼ିଆ (Odia)
    'as',   // অসমীয়া (Assamese)
    'mai',  // मैथिली (Devanagari)
    'sa',   // संस्कृत (Devanagari)
    'ur',   // اردو (Nastaliq)
    'ks',   // कश्मीरी (Devanagari)
    'sd',   // सिन्धी (Devanagari)
    'ne',   // नेपाली (Devanagari)
    'doi',  // डोगरी (Devanagari)
    'kok',  // कोंकणी (Devanagari)
    'mni',  // মণিপুরী (Meitei Mayek)
    'brx',  // बड़ो (Devanagari)
  ],
  defaultLocale: 'hi', // Default to Hindi as primary language
  localePrefix: 'as-needed', // Don't prefix the default locale URL
});
