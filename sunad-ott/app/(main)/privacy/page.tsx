'use client';

import { useLang } from '@/components/LangContext';

export default function PrivacyPage() {
  const { t } = useLang();

  const sections = [
    { id: 'introduction', label: '1. Introduction', labelHi: '1. परिचय' },
    { id: 'collection', label: '2. Information We Collect', labelHi: '2. एकत्रित जानकारी' },
    { id: 'usage', label: '3. How We Use Information', labelHi: '3. उपयोग के तरीके' },
    { id: 'sharing', label: '4. Sharing & Disclosure', labelHi: '4. जानकारी साझा करना' },
    { id: 'dpdp', label: '5. DPDP Rights (India)', labelHi: '5. डीपीडीपी अधिकार' },
    { id: 'security', label: '6. Data Security', labelHi: '6. डेटा सुरक्षा' },
    { id: 'contact', label: '7. Grievance Officer', labelHi: '7. शिकायत अधिकारी' },
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
            {t('Privacy Policy', 'गोपनीयता नीति')}
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
            {t('Legal Framework', 'कानूनी ढांचा')}
          </span>
          <h1 className="type-display-m" style={{ color: 'var(--primitive-white)', margin: 'var(--space-1) 0 0 0' }}>
            {t('Privacy Policy', 'गोपनीयता नीति')}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--type-caption)', margin: '4px 0 0 0' }}>
            {t('Last Updated: July 14, 2026', 'अंतिम अपडेट: 14 जुलाई, 2026')}
          </p>
        </header>

        <section id="introduction">
          <h2>{t('1. Introduction', '1. परिचय')}</h2>
          <p>
            {t(
              'Welcome to CultureFlix. CultureFlix is operated by Sunad Broadcast Pvt. Ltd. ("we", "us", or "our"). We respect your privacy and are committed to protecting your personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India and applicable global standards.',
              'कल्चरफ्लिक्स में आपका स्वागत है। कल्चरफ्लिक्स का संचालन सुनाद ब्रॉडकास्ट प्राइवेट लिमिटेड ("हम", "हमें", या "हमारा") द्वारा किया जाता है। हम आपकी गोपनीयता का सम्मान करते हैं और भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (डीपीडीपी अधिनियम) और लागू वैश्विक मानकों के अनुसार आपके व्यक्तिगत डेटा की सुरक्षा के लिए प्रतिबद्ध हैं।'
            )}
          </p>
        </section>

        <section id="collection">
          <h2>{t('2. Information We Collect', '2. एकत्रित जानकारी')}</h2>
          <p>
            {t(
              'We collect information necessary to provide you with the streaming services and artisan commerce features:',
              'हम आपको स्ट्रीमिंग सेवाएं और शिल्प वाणिज्य सुविधाएं प्रदान करने के लिए आवश्यक जानकारी एकत्र करते हैं:'
            )}
          </p>
          <ul>
            <li><strong>{t('Identity & Account Info:', 'पहचान और खाता जानकारी:')}</strong> {t('Name, email, mobile phone number, and preference settings.', 'नाम, ईमेल, मोबाइल फोन नंबर और प्राथमिकता सेटिंग्स।')}</li>
            <li><strong>{t('Usage Data:', 'उपयोग डेटा:')}</strong> {t('Viewing history, platform interactions, device information, and IP addresses.', 'देखने का इतिहास, प्लेटफ़ॉर्म इंटरैक्शन, डिवाइस की जानकारी और आईपी पते।')}</li>
            <li><strong>{t('Transaction Data:', 'लेनदेन का विवरण:')}</strong> {t('Billing details and transaction history for subscription plans and store items.', 'सदस्यता योजनाओं और स्टोर वस्तुओं के लिए बिलिंग विवरण और लेनदेन का इतिहास।')}</li>
          </ul>
        </section>

        <section id="usage">
          <h2>{t('3. How We Use Your Information', '3. जानकारी का उपयोग')}</h2>
          <p>
            {t(
              'We process your personal data based on your explicit consent for specified purposes, including to personalize your content feed, process subscription payments, deliver items ordered from the CultureFlix Store, and ensure network security and compliance with Indian regulations.',
              'हम विशिष्ट उद्देश्यों के लिए आपकी स्पष्ट सहमति के आधार पर आपके व्यक्तिगत डेटा को संसाधित करते हैं, जिसमें आपके कंटेंट फ़ीड को अनुकूलित करना, सदस्यता भुगतान संसाधित करना, कल्चरफ्लिक्स स्टोर से ऑर्डर की गई वस्तुओं को वितरित करना और नेटवर्क सुरक्षा और भारतीय नियमों का अनुपालन सुनिश्चित करना शामिल है।'
            )}
          </p>
        </section>

        <section id="sharing">
          <h2>{t('4. Sharing & Disclosure', '4. साझाकरण और प्रकटीकरण')}</h2>
          <p>
            {t(
              'We do not sell your personal data. We share your data only with trusted service providers (payment gateways, delivery partners for store goods) under strict confidentiality agreements, or when required by law to comply with government directives or legal processes.',
              'हम आपका व्यक्तिगत डेटा नहीं बेचते हैं। हम आपके डेटा को केवल विश्वसनीय सेवा प्रदाताओं (भुगतान गेटवे, स्टोर सामानों के वितरण भागीदारों) के साथ सख्त गोपनीयता समझौतों के तहत साझा करते हैं, या जब सरकारी निर्देशों या कानूनी प्रक्रियाओं का अनुपालन करने के लिए कानून द्वारा आवश्यक हो।'
            )}
          </p>
        </section>

        <section id="dpdp">
          <h2>{t('5. Your DPDP Rights (India)', '5. आपके डीपीडीपी अधिकार')}</h2>
          <p>
            {t(
              'As a Data Principal in India, you are entitled to the following rights under the DPDP Act 2023:',
              'भारत में एक डेटा प्रिंसिपल के रूप में, आप डीपीडीपी अधिनियम 2023 के तहत निम्नलिखित अधिकारों के हकदार हैं:'
            )}
          </p>
          <ul>
            <li><strong>{t('Right to Access:', 'पहुंच का अधिकार:')}</strong> {t('Request a summary of personal data being processed and the processing activities.', 'संसाधित किए जा रहे व्यक्तिगत डेटा का सारांश और प्रसंस्करण गतिविधियों का विवरण मांगें।')}</li>
            <li><strong>{t('Right to Correction & Erasure:', 'सुधार और विलोपन का अधिकार:')}</strong> {t('Correct inaccurate data, complete incomplete details, or request erasure of personal data.', 'गलत डेटा को ठीक करें, अपूर्ण विवरण पूरा करें, या व्यक्तिगत डेटा को हटाने का अनुरोध करें।')}</li>
            <li><strong>{t('Right to Withdraw Consent:', 'सहमति वापस लेने का अधिकार:')}</strong> {t('Withdraw your consent at any time, easily through your account dashboard.', 'अपने खाता डैशबोर्ड के माध्यम से आसानी से किसी भी समय अपनी सहमति वापस लें।')}</li>
            <li><strong>{t('Right to Grievance Redressal:', 'शिकायत निवारण का अधिकार:')}</strong> {t('Submit queries or raise complaints about privacy issues to our Grievance Officer.', 'गोपनीयता मुद्दों के बारे में हमारे शिकायत अधिकारी के पास प्रश्न सबमिट करें या शिकायतें दर्ज करें।')}</li>
          </ul>
        </section>

        <section id="security">
          <h2>{t('6. Data Security', '6. डेटा सुरक्षा')}</h2>
          <p>
            {t(
              'We deploy premium data protection protocols, including secure tokenization, transport layer security (HTTPS), and restricted backend access databases to shield your information from unauthorized access, breach, or disclosure.',
              'हम आपकी जानकारी को अनधिकृत पहुंच, उल्लंघन, या प्रकटीकरण से बचाने के लिए सुरक्षित टोकनाइजेशन, ट्रांसपोर्ट लेयर सिक्योरिटी (HTTPS) और प्रतिबंधित बैकएंड एक्सेस डेटाबेस सहित प्रीमियम डेटा सुरक्षा प्रोटोकॉल तैनात करते हैं।'
            )}
          </p>
        </section>

        <section id="contact">
          <h2>{t('7. Grievance Officer', '7. शिकायत अधिकारी')}</h2>
          <p>
            {t(
              'For queries regarding personal data processing or to exercise your DPDP rights, please write to:',
              'व्यक्तिगत डेटा प्रसंस्करण के संबंध में प्रश्नों या अपने डीपीडीपी अधिकारों का उपयोग करने के लिए, कृपया यहाँ लिखें:'
            )}
          </p>
          <div
            className="glass-weak"
            style={{
              marginTop: 'var(--space-3)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              lineHeight: 1.65,
            }}
          >
            <strong>{t('Grievance Officer:', 'शिकायत अधिकारी:')}</strong> Mr. Hardik Bhaskar<br />
            <strong>{t('Address:', 'पता:')}</strong> 505, C-Tower, I-Thum Building, Sector 62, Noida, UP - 201301<br />
            <strong>{t('Email:', 'ईमेल:')}</strong> <a href="mailto:privacy@sunadbroadcast.com" style={{ color: 'var(--color-gold)' }}>privacy@sunadbroadcast.com</a>
          </div>
        </section>
      </article>
    </div>
  );
}
