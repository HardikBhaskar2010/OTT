import { getRequestConfig } from 'next-intl/server';

// Standalone mode: no [locale] routing — locale comes from a cookie or defaults to 'hi'
// This allows next-intl to work without requiring /[locale]/ URL segments.
export default getRequestConfig(async () => {
  // We default to Hindi. The OnboardingWizard saves locale preference to
  // localStorage as `cf_lang_prefs`. We can't read localStorage on the server,
  // but we can read a cookie. For now, always use 'hi' as default.
  // Client-side locale switching is handled by the LangContext + OnboardingWizard.
  const locale = 'hi';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
