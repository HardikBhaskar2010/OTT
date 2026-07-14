'use client';

import { useLang } from '@/components/LangContext';

export default function CookiesPage() {
  const { t } = useLang();

  const sections = [
    { id: 'definition', label: '1. What Are Cookies', labelHi: '1. कुकीज़ क्या हैं' },
    { id: 'types', label: '2. Types of Cookies We Use', labelHi: '2. उपयोग की जाने वाली कुकीज़' },
    { id: 'analytics', label: '3. Web Analytics & Tracking', labelHi: '3. वेब एनालिटिक्स और ट्रैकिंग' },
    { id: 'preferences', label: '4. Managing Cookie Choices', labelHi: '4. कुकी विकल्पों का प्रबंधन' },
    { id: 'updates', label: '5. Policy Updates', labelHi: '5. नीति अपडेट' },
  ];

  return (
    <div className="legal-container">
      {/* Sidebar navigation */}
      <aside className="legal-sidebar">
        <div
          className="glass-weak"
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h2
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              letterSpacing: '0.08em',
              marginBottom: 'var(--space-4)',
            }}
          >
            {t('Cookie Policy', 'कुकी नीति')}
          </h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontSize: 'var(--type-label)',
                  color: 'var(--color-text-dim)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-dim)')}
              >
                {t(s.label, s.labelHi)}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <article className="legal-article">
        <header style={{ marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-4)' }}>
          <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {t('Browser Technologies', 'ब्राउज़र तकनीकें')}
          </span>
          <h1 className="type-display-m" style={{ color: 'var(--primitive-white)', margin: 'var(--space-1) 0 0 0' }}>
            {t('Cookie Policy', 'कुकी नीति')}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--type-caption)', margin: '4px 0 0 0' }}>
            {t('Last Updated: July 14, 2026', 'अंतिम अपडेट: 14 जुलाई, 2026')}
          </p>
        </header>

        <section id="definition">
          <h2>{t('1. What Are Cookies', '1. कुकीज़ क्या हैं')}</h2>
          <p>
            {t(
              'Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences, keep you logged in, and collect analytical insights to optimize features.',
              'कुकीज़ छोटी टेक्स्ट फाइलें होती हैं जो वेबसाइटों पर जाने पर आपके डिवाइस पर सहेज ली जाती हैं। वे वेबसाइटों को आपकी प्राथमिकताओं को याद रखने, आपको लॉग इन रखने और सुविधाओं को अनुकूलित करने के लिए विश्लेषणात्मक जानकारी एकत्र करने में मदद करती हैं।'
            )}
          </p>
        </section>

        <section id="types">
          <h2>{t('2. Types of Cookies We Use', '2. हमारे द्वारा उपयोग की जाने वाली कुकीज़')}</h2>
          <p>
            {t(
              'We use essential and custom preference cookies to run the platform:',
              'हम प्लेटफ़ॉर्म चलाने के लिए आवश्यक और कस्टम प्राथमिकताओं की कुकीज़ का उपयोग करते हैं:'
            )}
          </p>
          <ul>
            <li><strong>{t('Essential/Functional Cookies:', 'आवश्यक/कार्यात्मक कुकीज़:')}</strong> {t('Required to maintain your login session, handle secure checkouts in the Store, and remember if you dismissed the onboarding gate.', 'आपकी लॉगिन स्थिति बनाए रखने, स्टोर में सुरक्षित चेकआउट को संभालने और यह याद रखने के लिए आवश्यक है कि आपने पॉपअप बंद कर दिया है।')}</li>
            <li><strong>{t('Preference Cookies:', 'प्राथमिकता कुकीज़:')}</strong> {t('Used to remember your selected interface theme (Light or Dark) and selected language (English or Hindi).', 'आपके द्वारा चुनी गई थीम (लाइट या डार्क) और भाषा (अंग्रेजी या हिंदी) को याद रखने के लिए उपयोग किया जाता है।')}</li>
          </ul>
        </section>

        <section id="analytics">
          <h2>{t('3. Web Analytics & Tracking', '3. वेब एनालिटिक्स और ट्रैकिंग')}</h2>
          <p>
            {t(
              'We use Google Analytics (GA4) and Vercel Analytics tools to collect anonymous performance data — such as which documentaries are watched most and page load times. This information is purely quantitative and does not identify you individually.',
              'हम प्रदर्शन डेटा एकत्र करने के लिए Google Analytics (GA4) और Vercel Analytics का उपयोग करते हैं - जैसे कि कौन से वृत्तचित्र सबसे अधिक देखे जाते हैं और पृष्ठ लोड होने का समय। यह जानकारी पूरी तरह से संख्यात्मक है और व्यक्तिगत रूप से आपकी पहचान नहीं करती है।'
            )}
          </p>
        </section>

        <section id="preferences">
          <h2>{t('4. Managing Cookie Choices', '4. कुकी विकल्पों का प्रबंधन')}</h2>
          <p>
            {t(
              'Most web browsers allow you to block or delete cookies through browser settings. Please note that blocking essential cookies may disrupt access to features, such as account sign-in, user preference retention, and shopping cart operations.',
              'अधिकांश वेब ब्राउज़र आपको सेटिंग्स के माध्यम से कुकीज़ को ब्लॉक करने या हटाने की अनुमति देते हैं। कृपया ध्यान दें कि आवश्यक कुकीज़ को ब्लॉक करने से सुविधाओं तक पहुंच बाधित हो सकती है, जैसे खाता लॉगिन, उपयोगकर्ता प्राथमिकता सहेजना और शॉपिंग कार्ट संचालन।'
            )}
          </p>
        </section>

        <section id="updates">
          <h2>{t('5. Policy Updates', '5. नीति अपडेट')}</h2>
          <p>
            {t(
              'We may periodically update this Cookie Policy to reflect changes in our technologies or regulatory requirements. We encourage you to review this page regularly for the latest details.',
              'हम तकनीकों या नियामक आवश्यकताओं में बदलाव को दर्शाने के लिए समय-समय पर इस कुकी नीति को अपडेट कर सकते हैं। नवीनतम विवरणों के लिए हम आपको नियमित रूप से इस पृष्ठ की समीक्षा करने के लिए प्रोत्साहित करते हैं।'
            )}
          </p>
        </section>
      </article>
    </div>
  );
}
