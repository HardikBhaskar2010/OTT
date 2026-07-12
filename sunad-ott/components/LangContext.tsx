'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Lang = 'en' | 'hi';

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (en: string, hi: string) => string;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = 'sunad-lang';

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === 'hi' || stored === 'en') {
      setLangState(stored);
    }
    setMounted(true);
  }, []);

  // Sync body class and html lang attribute whenever lang changes
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;
    const body = document.body;

    if (lang === 'hi') {
      html.setAttribute('lang', 'hi');
      body.classList.add('lang-hi');
    } else {
      html.setAttribute('lang', 'en');
      body.classList.remove('lang-hi');
    }

    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, mounted]);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'hi' : 'en'));
  }, []);

  /**
   * Translation helper — returns English or Hindi string based on active lang.
   * Usage: t('Watch Now', 'अभी देखें')
   */
  const t = useCallback(
    (en: string, hi: string): string => {
      return lang === 'hi' ? hi : en;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, toggle, t, setLang }}>
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
