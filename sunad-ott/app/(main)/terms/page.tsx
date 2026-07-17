'use client';

import { useLang } from '@/components/LangContext';

export default function TermsPage() {
  const { t } = useLang();

  const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms', labelHi: '1. शर्तों की स्वीकृति' },
    { id: 'eligibility', label: '2. Eligibility & Accounts', labelHi: '2. पात्रता और खाते' },
    { id: 'content', label: '3. Streaming Content', labelHi: '3. स्ट्रीमिंग सामग्री' },
    { id: 'commerce', label: '4. Sunad Store Transactions', labelHi: '4. सुनाद स्टोर लेनदेन' },
    { id: 'conduct', label: '5. User Conduct & IP', labelHi: '5. उपयोगकर्ता आचरण और आईपी' },
    { id: 'termination', label: '6. Suspension & Termination', labelHi: '6. निलंबन और समाप्ति' },
    { id: 'jurisdiction', label: '7. Governing Law', labelHi: '7. शासी कानून' },
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
            {t('Terms of Service', 'सेवा की शर्तें')}
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
            {t('Platform Agreement', 'प्लेटफ़ॉर्म समझौता')}
          </span>
          <h1 className="type-display-m" style={{ color: 'var(--primitive-white)', margin: 'var(--space-1) 0 0 0' }}>
            {t('Terms of Service', 'सेवा की शर्तें')}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--type-caption)', margin: '4px 0 0 0' }}>
            {t('Last Updated: July 14, 2026', 'अंतिम अपडेट: 14 जुलाई, 2026')}
          </p>
        </header>

        <section id="acceptance">
          <h2>{t('1. Acceptance of Terms', '1. शर्तों की स्वीकृति')}</h2>
          <p>
            {t(
              'By accessing or using Sunad TV website, mobile applications, and online store (collectively, the "Services"), you agree to be bound by these Terms of Service. The Services are owned and operated by Sunad Broadcast Pvt. Ltd. If you do not agree, please do not use the Services.',
              'सुनाद टीवी वेबसाइट, मोबाइल एप्लिकेशन और ऑनलाइन स्टोर (सामूहिक रूप से, "सेवाएं") का उपयोग करके, आप इन सेवा शर्तों से बंधे होने के लिए सहमत हैं। ये सेवाएं सुनाद ब्रॉडकास्ट प्राइवेट लिमिटेड के स्वामित्व और संचालन में हैं। यदि आप सहमत नहीं हैं, तो कृपया सेवाओं का उपयोग न करें।'
            )}
          </p>
        </section>

        <section id="eligibility">
          <h2>{t('2. Eligibility & Accounts', '2. पात्रता और खाते')}</h2>
          <p>
            {t(
              'You must be at least 18 years old or accessing under parental supervision to register an account. You are responsible for safeguarding your login credentials and for all activities that occur under your account. Notify us immediately of any security breaches.',
              'पंजीकरण करने के लिए आपकी आयु कम से कम 18 वर्ष होनी चाहिए या माता-पिता की देखरेख में उपयोग करना चाहिए। आप अपने लॉगिन क्रेडेंशियल को सुरक्षित रखने और अपने खाते के तहत होने वाली सभी गतिविधियों के लिए जिम्मेदार हैं। किसी भी सुरक्षा उल्लंघन की तुरंत सूचना दें।'
            )}
          </p>
        </section>

        <section id="content">
          <h2>{t('3. Streaming Content', '3. स्ट्रीमिंग सामग्री')}</h2>
          <p>
            {t(
              'All video documentaries, live streams, podcasts, and archives are for your personal, non-commercial viewing only. Subscription plans confer a limited, revocable license to access the content. Sharing credentials or attempting to download, rip, or redistribute streaming content is strictly prohibited.',
              'सभी वीडियो वृत्तचित्र, लाइव स्ट्रीम, पॉडकास्ट और संग्रह केवल आपके व्यक्तिगत, गैर-व्यावसायिक देखने के लिए हैं। सदस्यता योजनाएं सामग्री तक पहुंचने का एक सीमित, प्रतिसंहरणीय लाइसेंस प्रदान करती हैं। क्रेडेंशियल साझा करना या स्ट्रीमिंग सामग्री को डाउनलोड, रिप या पुनर्वितरित करने का प्रयास करना सख्त वर्जित है।'
            )}
          </p>
        </section>

        <section id="commerce">
          <h2>{t('4. Sunad Store Transactions', '4. सुनाद स्टोर लेनदेन')}</h2>
          <p>
            {t(
              'Products on the Sunad Store are sourced directly from traditional artisans and regional producers of India. Purchases are governed by our shipping and refund policy. Prices and availability are subject to change without notice.',
              'सुनाद स्टोर पर उत्पाद सीधे भारत के पारंपरिक कारीगरों और क्षेत्रीय उत्पादकों से मंगवाए जाते हैं। खरीदारी हमारी शिपिंग और रिफंड नीति द्वारा शासित होती है। कीमतें और उपलब्धता बिना किसी सूचना के परिवर्तन के अधीन हैं।'
            )}
          </p>
        </section>

        <section id="conduct">
          <h2>{t('5. User Conduct & IP', '5. उपयोगकर्ता आचरण और बौद्धिक संपदा')}</h2>
          <p>
            {t(
              'All trademarks, logos, brand emblems, and content displayed belong to Sunad Broadcast Pvt. Ltd. or its licensors. You agree not to upload harmful code, harvest platform metadata, or compromise Services integrity. Feedback submitted may be used by us without compensation.',
              'प्रदर्शित सभी ट्रेडमार्क, लोगो, ब्रांड प्रतीक और सामग्री सुनाद ब्रॉडकास्ट प्राइवेट लिमिटेड या उसके लाइसेंसदाताओं की संपत्ति हैं। आप हानिकारक कोड अपलोड न करने, प्लेटफ़ॉर्म मेटाडेटा एकत्र न करने या सेवाओं की अखंडता से समझौता न करने के लिए सहमत हैं।'
            )}
          </p>
        </section>

        <section id="termination">
          <h2>{t('6. Suspension & Termination', '6. निलंबन और समाप्ति')}</h2>
          <p>
            {t(
              'We reserve the right to suspend or terminate your access to the Services immediately, without prior notice, if you breach these Terms of Service, commit payment fraud, or violate regulatory requirements under Indian cyber laws.',
              'यदि आप इन सेवा शर्तों का उल्लंघन करते हैं, भुगतान धोखाधड़ी करते हैं, या भारतीय साइबर कानूनों के तहत नियामक आवश्यकताओं का उल्लंघन करते हैं, तो हम बिना किसी पूर्व सूचना के सेवाओं तक आपकी पहुंच को तुरंत निलंबित या समाप्त करने का अधिकार सुरक्षित रखते हैं।'
            )}
          </p>
        </section>

        <section id="jurisdiction">
          <h2>{t('7. Governing Law & Jurisdiction', '7. शासी कानून और क्षेत्राधिकार')}</h2>
          <p>
            {t(
              'These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.',
              'ये सेवा शर्तें भारत गणराज्य के कानूनों के अनुसार शासित और विश्लेषित की जाएंगी। इन शर्तों के तहत उत्पन्न होने वाले किसी भी विवाद को नई दिल्ली, भारत में स्थित न्यायालयों के अनन्य क्षेत्राधिकार के अधीन माना जाएगा।'
            )}
          </p>
        </section>
      </article>
    </div>
  );
}
