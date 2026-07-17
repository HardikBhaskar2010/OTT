'use client';

import { useLang } from '@/components/LangContext';

export default function DpdpPage() {
  const { t } = useLang();

  const sections = [
    { id: 'overview', label: '1. DPDP Overview', labelHi: '1. डीपीडीपी सिंहावलोकन' },
    { id: 'consent', label: '2. Consent Framework', labelHi: '2. सहमति ढांचा' },
    { id: 'principals', label: '3. Data Principal Rights', labelHi: '3. डेटा प्रिंसिपल के अधिकार' },
    { id: 'officer', label: '4. Data Protection Officer', labelHi: '4. डेटा संरक्षण अधिकारी' },
    { id: 'disputes', label: '5. Grievances & Board', labelHi: '5. शिकायतें और बोर्ड' },
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
            {t('DPDP Notice', 'डीपीडीपी नोटिस')}
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
            {t('DPDPA 2023 India Compliance', 'डीपीडीपीए 2023 भारत अनुपालन')}
          </span>
          <h1 className="type-display-m" style={{ color: 'var(--primitive-white)', margin: 'var(--space-1) 0 0 0' }}>
            {t('DPDP Compliance Notice', 'डीपीडीपी अनुपालन नोटिस')}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--type-caption)', margin: '4px 0 0 0' }}>
            {t('Last Updated: July 14, 2026', 'अंतिम अपडेट: 14 जुलाई, 2026')}
          </p>
        </header>

        <section id="overview">
          <h2>{t('1. DPDP Overview', '1. डीपीडीपी सिंहावलोकन')}</h2>
          <p>
            {t(
              'Under the Digital Personal Data Protection Act, 2023 ("DPDP Act") of India, Sunad TV (operated by Sunad Broadcast Pvt. Ltd.) acts as a Data Fiduciary. This notice outlines your rights as a Data Principal regarding the digital processing of your personal data by our platform.',
              'भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 ("डीपीडीपी अधिनियम") के तहत, सुनाद टीवी (सुनाद ब्रॉडकास्ट प्राइवेट लिमिटेड द्वारा संचालित) एक डेटा फिडुशियरी के रूप में कार्य करता है। यह नोटिस हमारी वेबसाइट द्वारा आपके व्यक्तिगत डेटा के डिजिटल प्रसंस्करण के बारे में डेटा प्रिंसिपल के रूप में आपके अधिकारों को रेखांकित करता है।'
            )}
          </p>
        </section>

        <section id="consent">
          <h2>{t('2. Consent Framework', '2. सहमति ढांचा')}</h2>
          <p>
            {t(
              'We process your digital personal data solely on the basis of your explicit, specific, unconditional, and informed consent. By signing up or transacting on the platform, you consent to the processing of your data. You may withdraw this consent at any time.',
              'हम आपके डिजिटल व्यक्तिगत डेटा को केवल आपकी स्पष्ट, विशिष्ट, बिना शर्त और सूचित सहमति के आधार पर संसाधित करते हैं। साइन अप करने या प्लेटफॉर्म पर लेन-देन करने पर, आप अपने डेटा के प्रसंस्करण के लिए सहमति प्रदान करते हैं। आप किसी भी समय इस सहमति को वापस ले सकते हैं।'
            )}
          </p>
        </section>

        <section id="principals">
          <h2>{t('3. Data Principal Rights', '3. डेटा प्रिंसिपल के अधिकार')}</h2>
          <p>
            {t(
              'As a Data Principal, you have the right to request access to, correction of, and erasure of your personal data processed by us. You also have the right to nominate any other individual to exercise these rights in the event of death or incapacity.',
              'एक डेटा प्रिंसिपल के रूप में, आपके पास हमारे द्वारा संसाधित अपने व्यक्तिगत डेटा तक पहुंच, सुधार और उसे हटाने का अनुरोध करने का अधिकार है। आपके पास मृत्यु या अक्षमता की स्थिति में इन अधिकारों का प्रयोग करने के लिए किसी अन्य व्यक्ति को नामांकित करने का भी अधिकार है।'
            )}
          </p>
        </section>

        <section id="officer">
          <h2>{t('4. Data Protection Officer', '4. डेटा संरक्षण अधिकारी')}</h2>
          <p>
            {t(
              'We have appointed a dedicated Data Protection Officer to supervise compliance with the DPDP Act 2023. For inquiries, grievance filings, or data requests, please write to dpo@sunadbroadcast.com.',
              'हमने डीपीडीपी अधिनियम 2023 के अनुपालन की निगरानी के लिए एक समर्पित डेटा संरक्षण अधिकारी नियुक्त किया है। पूछताछ, शिकायत दर्ज करने या डेटा अनुरोधों के लिए, कृपया dpo@sunadbroadcast.com पर लिखें।'
            )}
          </p>
        </section>

        <section id="disputes">
          <h2>{t('5. Grievance Redressal & Board', '5. शिकायत निवारण और बोर्ड')}</h2>
          <p>
            {t(
              'We resolve all data concerns within 30 days. If you are unsatisfied with our response, you have the right to register a complaint with the Data Protection Board of India (DPBI) in accordance with the procedures set under the DPDP Rules.',
              'हम 30 दिनों के भीतर डेटा संबंधी सभी चिंताओं का समाधान करते हैं। यदि आप हमारे समाधान से संतुष्ट नहीं हैं, तो आपके पास डीपीडीपी नियमों के तहत निर्धारित प्रक्रियाओं के अनुसार भारत के डेटा संरक्षण बोर्ड (डीपीबीआई) में शिकायत दर्ज करने का अधिकार है।'
            )}
          </p>
        </section>
      </article>
    </div>
  );
}
