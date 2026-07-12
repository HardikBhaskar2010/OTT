import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROGRAMS, CATEGORIES, getProgramThumbnail } from '@/lib/mockData';

interface BrowseCategoryPageProps {
  params: Promise<{ id: string }>;
}

// Next.js 15 Server Component for Category Browsing
export default async function BrowseCategoryPage({ params }: BrowseCategoryPageProps) {
  const { id } = await params;

  // Find the active category
  const category = CATEGORIES.find((cat) => cat.id === id);

  if (!category) {
    notFound();
  }

  // Filter programs belonging to this category
  const categoryPrograms = PROGRAMS.filter((p) => p.categoryId === id);

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
      {/* ─── CATEGORY HEADER ─── */}
      <header style={{
        marginBottom: 'var(--space-6)',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: 'var(--space-4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: 'var(--space-2)'
      }}>
        <div>
          <span style={{
            color: 'var(--color-gold)',
            fontSize: 'var(--type-caption)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: 'var(--space-1)'
          }}>
            Category / श्रेणी
          </span>
          <h1 className="type-display-l" style={{ color: 'var(--primitive-ivory)', margin: 0 }}>
            {category.nameEn} <span style={{ fontSize: '0.6em', color: 'var(--color-text-dim)', marginInline: 'var(--space-1)' }}>/</span> 
            <span lang="hi" style={{ fontFamily: 'var(--font-display-hi)', fontWeight: 400 }}>{category.nameHi}</span>
          </h1>
        </div>

        {/* Filter Indicators (Visual Mock) */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <div className="glass-subtle" style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)' }}>
            Filter: All / सभी
          </div>
          <div className="glass-subtle" style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)' }}>
            Language: EN/हिं
          </div>
        </div>
      </header>

      {/* ─── PROGRAMS GRID ─── */}
      {categoryPrograms.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-3)'
        }}>
          {categoryPrograms.map((p) => (
            <Link
              key={p.id}
              href={`/watch/${p.id}`}
              className="content-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                transition: 'all var(--motion-base) var(--motion-easing)',
                position: 'relative'
              }}
            >
              {/* Image / Thumbnail Canvas */}
              <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                backgroundImage: `linear-gradient(to bottom, rgba(14,13,12,0.15), rgba(14,13,12,0.85)), url(${getProgramThumbnail(p.categoryId)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {/* Subtle branding watermark */}
                <span style={{ opacity: 0.15, fontSize: '3rem', color: 'var(--primitive-gold)' }}>◈</span>

                {/* Live or Prime tags */}
                {p.isPrimeTime && (
                  <span style={{
                    position: 'absolute',
                    top: 'var(--space-1)',
                    left: 'var(--space-1)',
                    background: 'var(--color-gold)',
                    color: 'var(--primitive-black)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    letterSpacing: '0.04em'
                  }}>
                    PRIME TIME
                  </span>
                )}
                
                {/* Duration Badge Mock */}
                <span style={{
                  position: 'absolute',
                  bottom: 'var(--space-1)',
                  right: 'var(--space-1)',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'var(--primitive-ivory)',
                  fontSize: '0.65rem',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  60 Min
                </span>
              </div>

              {/* Card Meta Content */}
              <div style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 600 }}>
                    {p.startTime} - {p.endTime}
                  </span>
                  {p.trpScore && (
                    <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)' }}>
                      TRP {p.trpScore}%
                    </span>
                  )}
                </div>
                <h2 style={{
                  fontSize: 'var(--type-body-l)',
                  fontWeight: 600,
                  color: 'var(--primitive-white)',
                  margin: '4px 0 0 0',
                  lineHeight: '1.4'
                }}>
                  {p.nameEn} / <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>{p.nameHi}</span>
                </h2>
                <p style={{
                  fontSize: 'var(--type-label)',
                  color: 'var(--color-text-dim)',
                  margin: '4px 0 0 0',
                  lineHeight: '1.5',
                  flexGrow: 1
                }} className="truncate-2">
                  {p.description}
                </p>
                <div style={{
                  display: 'flex',
                  gap: 'var(--space-1)',
                  marginTop: 'var(--space-2)',
                  flexWrap: 'wrap'
                }}>
                  {p.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.65rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-12) 0',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-2)' }}>📭</span>
          <h2 className="type-display-m" style={{ color: 'var(--primitive-ivory)' }}>
            No Shows Available / कोई शो उपलब्ध नहीं
          </h2>
          <p style={{ color: 'var(--color-text-dim)', marginBottom: 'var(--space-4)' }}>
            Check back later or browse other categories.
          </p>
          <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            Back to Home / होम पर जाएं
          </Link>
        </div>
      )}
    </main>
  );
}
