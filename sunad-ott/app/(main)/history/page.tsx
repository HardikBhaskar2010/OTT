'use client';

import { useLang } from '@/components/LangContext';
import { ContentCard } from '@/components/ContentCard';
import { CONTINUE_WATCHING, ContentItem } from '@/lib/mockData';

export default function HistoryPage() {
  const { t } = useLang();
  const historyItems: ContentItem[] = CONTINUE_WATCHING;

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
      <header style={{ marginBottom: 'var(--space-6)', paddingTop: 'var(--space-4)' }}>
        <span style={{ color: 'var(--color-gold)', fontSize: 'var(--type-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {t('User Profile', 'उपयोगकर्ता प्रोफ़ाइल')}
        </span>
        <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', marginTop: '4px' }}>
          {t('Watch History', 'देखने का इतिहास')}
        </h1>
        <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-m)' }}>
          {t('Continue watching your recently viewed titles and civilizational series.', 'अपने हाल ही में देखे गए शीर्षक और श्रृंखला देखना जारी रखें।')}
        </p>
      </header>

      {historyItems.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--space-4)'
        }}>
          {historyItems.map((item: ContentItem) => (
            <ContentCard key={item.id} item={item} variant="wide" />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--color-text-dim)' }}>
          <p>{t('Your watch history is empty.', 'आपका देखने का इतिहास खाली है।')}</p>
        </div>
      )}
    </main>
  );
}
