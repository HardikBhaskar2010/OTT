'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

import en from '../messages/en.json';
import hi from '../messages/hi.json';
import ta from '../messages/ta.json';
import te from '../messages/te.json';
import mr from '../messages/mr.json';
import bn from '../messages/bn.json';
import gu from '../messages/gu.json';
import kn from '../messages/kn.json';
import ml from '../messages/ml.json';
import pa from '../messages/pa.json';
import or from '../messages/or.json';
import as from '../messages/as.json';
import mai from '../messages/mai.json';
import sa from '../messages/sa.json';
import ur from '../messages/ur.json';
import ks from '../messages/ks.json';
import sd from '../messages/sd.json';
import ne from '../messages/ne.json';
import doi from '../messages/doi.json';
import kok from '../messages/kok.json';
import mni from '../messages/mni.json';
import brx from '../messages/brx.json';

export type Lang =
  | 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn' | 'gu' | 'kn' | 'ml' | 'pa'
  | 'or' | 'as' | 'mai' | 'sa' | 'ur' | 'ks' | 'sd' | 'ne' | 'doi' | 'kok'
  | 'mni' | 'brx';

const MESSAGES: Record<Lang, any> = {
  en, hi, ta, te, mr, bn, gu, kn, ml, pa,
  or, as, mai, sa, ur, ks, sd, ne, doi, kok,
  mni, brx,
};

export const SUPPORTED_LANGUAGES: { code: Lang; nativeName: string; englishName: string }[] = [
  { code: 'hi', nativeName: 'हिंदी', englishName: 'Hindi' },
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil' },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali' },
  { code: 'gu', nativeName: 'ગુજરાતી', englishName: 'Gujarati' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada' },
  { code: 'ml', nativeName: 'മലയാളം', englishName: 'Malayalam' },
  { code: 'pa', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi' },
  { code: 'or', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia' },
  { code: 'as', nativeName: 'অসমীয়া', englishName: 'Assamese' },
  { code: 'mai', nativeName: 'मैथिली', englishName: 'Maithili' },
  { code: 'sa', nativeName: 'संस्कृतम्', englishName: 'Sanskrit' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu' },
  { code: 'ks', nativeName: 'कॉशुर', englishName: 'Kashmiri' },
  { code: 'sd', nativeName: 'सिन्धी', englishName: 'Sindhi' },
  { code: 'ne', nativeName: 'नेपाली', englishName: 'Nepali' },
  { code: 'doi', nativeName: 'डोगरी', englishName: 'Dogri' },
  { code: 'kok', nativeName: 'कोंकणी', englishName: 'Konkani' },
  { code: 'mni', nativeName: 'মৈতৈলোন্', englishName: 'Meitei' },
  { code: 'brx', nativeName: 'बड़ो', englishName: 'Bodo' },
];

interface LangContextValue {
  lang: Lang;
  messages: any;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (keyOrEn: string, fallbackOrHi?: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = 'sunad-lang';

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('hi');
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && MESSAGES[stored]) {
        setLangState(stored);
      }
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Sync body class, html lang & dir attribute whenever lang changes
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;
    const body = document.body;

    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');

    // Manage language class on body
    SUPPORTED_LANGUAGES.forEach((l) => body.classList.remove(`lang-${l.code}`));
    body.classList.add(`lang-${lang}`);

    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, mounted]);

  const setLang = useCallback((newLang: Lang) => {
    if (MESSAGES[newLang]) {
      setLangState(newLang);
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'hi' : 'en'));
  }, []);

  /**
   * Translation helper:
   * Supports key paths (e.g. t('nav.home')) or fallback strings (e.g. t('Watch Now', 'अभी देखें'))
   */
  const t = useCallback(
    (keyOrEn: string, fallbackOrHi?: string): string => {
      const activeDict = MESSAGES[lang] || MESSAGES.hi;

      // 1. Check dot-notated key path (e.g. "nav.home", "common.play")
      if (keyOrEn.includes('.')) {
        const parts = keyOrEn.split('.');
        let val: any = activeDict;
        for (const p of parts) {
          val = val?.[p];
        }
        if (typeof val === 'string') return val;
      }

      // 2. Direct key lookup in common / nav / home / hero / onboarding / categories
      if (activeDict?.common?.[keyOrEn]) return activeDict.common[keyOrEn];
      if (activeDict?.nav?.[keyOrEn]) return activeDict.nav[keyOrEn];
      if (activeDict?.home?.[keyOrEn]) return activeDict.home[keyOrEn];
      if (activeDict?.hero?.[keyOrEn]) return activeDict.hero[keyOrEn];
      if (activeDict?.categories?.[keyOrEn]) return activeDict.categories[keyOrEn];

      // 3. Fallback for two-argument t(enString, hiString)
      if (lang === 'hi' && fallbackOrHi) return fallbackOrHi;
      if (lang !== 'en' && lang !== 'hi') {
        // Look up translated nav or common string if key matches English text
        for (const ns of ['nav', 'home', 'hero', 'common', 'categories', 'genres']) {
          const dictNs = activeDict[ns];
          const enNs = MESSAGES.en[ns];
          if (dictNs && enNs) {
            const foundKey = Object.keys(enNs).find((k) => enNs[k] === keyOrEn);
            if (foundKey && dictNs[foundKey]) {
              return dictNs[foundKey];
            }
          }
        }
      }

      return keyOrEn;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, messages: MESSAGES[lang] || MESSAGES.hi, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

/** Hook to consume language context */
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return ctx;
}

export default LangContext;
