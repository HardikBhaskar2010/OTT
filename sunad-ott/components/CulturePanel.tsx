'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ShoppingBag, Compass, IndianRupee, Languages } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CulturePanel() {
  const panelRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect on the media image using scrub
    if (mediaRef.current && panelRef.current) {
      gsap.fromTo(mediaRef.current,
        { backgroundPosition: '50% 0%' },
        {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          }
        }
      );
    }

    // Staggered entrance for the copy text
    if (copyRef.current && panelRef.current) {
      const elements = copyRef.current.children;
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  }, { scope: panelRef });

  return (
    <section ref={panelRef} className="culture-panel" aria-labelledby="culture-commerce-heading">
      <div ref={copyRef} className="culture-panel__copy">
        <span className="section-kicker">
          <IndianRupee size={15} aria-hidden="true" /> Culture Commerce
        </span>
        <h2 className="type-display-m" id="culture-commerce-heading" style={{ color: 'var(--primitive-white)', margin: 'var(--space-2) 0' }}>
          <span className="lang-en-only">Watch the story, support the hands behind it.</span>
          <span className="lang-hi-only" lang="hi">कहानी देखें, कारीगरों का साथ दें।</span>
        </h2>
        <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)', lineHeight: 1.65 }}>
          <span className="lang-en-only">
            Sunad TV connects movies, field reporting, and a Bharat-first store so viewers can discover crafts, wellness goods, and regional producers from the same story world.
          </span>
          <span className="lang-hi-only" lang="hi">
            सुनाद टीवी फिल्मों, फील्ड रिपोर्टिंग और भारत-प्रथम स्टोर को जोड़ता है।
          </span>
        </p>
        <div className="culture-chips" style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', margin: 'var(--space-4) 0' }}>
          <span className="culture-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.85rem' }}><ShoppingBag size={14} aria-hidden="true" /> Artisan Store</span>
          <span className="culture-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.85rem' }}><Compass size={14} aria-hidden="true" /> Heritage Trails</span>
          <span className="culture-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.85rem' }}><Languages size={14} aria-hidden="true" /> 22 Languages</span>
        </div>
        <div className="card-actions">
          <Link href="/store" className="btn-primary--high-contrast btn-primary" style={{ display: 'inline-flex', padding: '12px 24px', borderRadius: '8px' }}>
            <ShoppingBag size={18} aria-hidden="true" style={{ marginRight: '8px' }} />
            <span className="lang-en-only">Visit Store</span>
            <span className="lang-hi-only" lang="hi">स्टोर देखें</span>
          </Link>
        </div>
      </div>
      <div 
        ref={mediaRef} 
        className="culture-panel__media" 
        aria-hidden="true"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1605553957242-b06295deee97?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: '50% 0%'
        }}
      />
    </section>
  );
}
