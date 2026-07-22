'use client';

import { useState, useTransition } from 'react';
import { useLang } from '@/components/LangContext';
import { PRODUCTS, Product } from '@/lib/mockData';

const CartIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const TrashIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

export default function StorePage() {
  const { t } = useLang();
  const [, startTransition] = useTransition();

  // Tab selection
  const tabs = [
    { key: 'All', labelEn: 'All Products', labelHi: 'सभी उत्पाद' },
    { key: 'Artisan', labelEn: 'Artisan Crafts', labelHi: 'कला और शिल्प' },
    { key: 'Organic', labelEn: 'Organic Produce', labelHi: 'जैविक उत्पाद' },
    { key: 'Wellness', labelEn: 'Wellness & Yoga', labelHi: 'योग और स्वास्थ्य' },
    { key: 'Spiritual', labelEn: 'Spiritual Goods', labelHi: 'आध्यात्मिक वस्तुएं' },
  ];

  const [activeTab, setActiveTab] = useState('All');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  // Filter products by tab
  const filteredProducts = activeTab === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.type === activeTab);

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open cart drawer immediately for visual confirmation
    setShowCartDrawer(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)', position: 'relative' }}>
      {/* ─── STORE HEADER ─── */}
      <header style={{
        marginBottom: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: 'var(--space-4)',
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
            Sunad Store / सुनाद स्टोर
          </span>
          <h1 className="type-display-l" style={{ color: 'var(--primitive-white)', margin: 0 }}>
            {t('Civilizational Commerce', 'सांस्कृतिक वाणिज्य')}
          </h1>
          <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)', marginTop: '4px' }}>
            {t('Support local artisans, organic farming, and wellness practitioners of Bharat.', 'भारत के स्थानीय कारीगरों, जैविक खेती और स्वास्थ्य परंपराओं का समर्थन करें।')}
          </p>
        </div>

        {/* Floating Cart Trigger */}
        <button
          onClick={() => setShowCartDrawer(true)}
          style={{
            background: 'var(--color-gold)',
            color: 'var(--primitive-black)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '12px 24px',
            fontWeight: 600,
            fontSize: 'var(--type-label)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-1)',
            transition: 'all var(--motion-fast) var(--motion-easing)'
          }}
          className="btn-primary-hover"
        >
          <CartIcon size={16} /> {t('Shopping Bag', 'कार्ट')} ({totalCartItems})
        </button>
      </header>

      {/* ─── CATEGORY TABS ─── */}
      <section style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              startTransition(() => {
                setActiveTab(tab.key);
              });
            }}
            style={{
              background: activeTab === tab.key ? 'var(--color-gold)' : 'var(--color-surface)',
              color: activeTab === tab.key ? 'var(--primitive-black)' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all var(--motion-fast) var(--motion-easing)'
            }}
          >
            {t(tab.labelEn, tab.labelHi)}
          </button>
        ))}
      </section>

      {/* ─── PRODUCTS GRID ─── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--space-3)'
      }}>
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="content-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              transition: 'all var(--motion-base) var(--motion-easing)'
            }}
          >
            {/* Image Placeholder */}
            <div style={{
              aspectRatio: '16/9',
              background: p.thumbnail,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <span style={{ opacity: 0.15, display: 'inline-flex' }}><CartIcon size={32} /></span>
              <span style={{
                position: 'absolute',
                top: 'var(--space-1)',
                left: 'var(--space-1)',
                background: 'rgba(0,0,0,0.8)',
                color: 'var(--color-gold)',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                letterSpacing: '0.04em'
              }}>
                {p.type.toUpperCase()}
              </span>
            </div>

            {/* Meta */}
            <div style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: 'var(--type-body-l)', fontWeight: 600, color: 'var(--primitive-white)', margin: 0 }}>
                  {t(p.nameEn, p.nameHi)}
                </h3>
              </div>
              <p style={{ fontSize: 'var(--type-label)', color: 'var(--color-text-dim)', margin: '4px 0', lineHeight: 1.5, flexGrow: 1 }} className="truncate-2">
                {p.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--type-body-l)', color: 'var(--color-gold)', fontWeight: 700 }}>
                  ₹{p.price}
                </span>
                <button
                  onClick={() => handleAddToCart(p)}
                  disabled={!p.inStock}
                  style={{
                    background: p.inStock ? 'var(--color-gold)' : 'var(--color-muted)',
                    color: 'var(--primitive-black)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    fontWeight: 600,
                    fontSize: 'var(--type-caption)',
                    cursor: p.inStock ? 'pointer' : 'not-allowed',
                    transition: 'all var(--motion-fast) var(--motion-easing)'
                  }}
                >
                  {p.inStock ? t('Add to Cart', 'कार्ट में जोड़ें') : t('Out of Stock', 'स्टॉक में नहीं')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── SHOPPING CART DRAWER OVERLAY ─── */}
      {showCartDrawer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'var(--glass-blur-subtle)',
          zIndex: 300,
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fadeIn 300ms ease-out'
        }}>
          {/* Backdrop Click Dismiss */}
          <div onClick={() => setShowCartDrawer(false)} style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />

          {/* Drawer Panel */}
          <aside className="glass-strong" style={{
            position: 'relative',
            width: '400px',
            height: '100%',
            boxShadow: 'var(--shadow-2)',
            borderLeft: '1px solid var(--color-border-gold)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            zIndex: 10
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)' }}>
              <h2 className="type-heading-2" style={{ color: 'var(--primitive-white)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CartIcon size={20} /> {t('Your Shopping Bag', 'आपकी कार्ट')}
              </h2>
              <button
                onClick={() => setShowCartDrawer(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-text-dim)', cursor: 'pointer', fontSize: '1.5rem' }}
              >
                ✕
              </button>
            </div>

            {/* List */}
            <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="glass-subtle"
                    style={{
                      padding: 'var(--space-2)',
                      borderRadius: 'var(--radius-md)',
                      display: 'grid',
                      gridTemplateColumns: '50px 1fr 40px',
                      gap: 'var(--space-2)',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ aspectRatio: '1/1', background: item.product.thumbnail, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.1 }}>◈</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--primitive-white)', margin: 0 }}>
                        {t(item.product.nameEn, item.product.nameHi)}
                      </h4>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', marginTop: '2px' }}>
                        <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 700 }}>
                          ₹{item.product.price}
                        </span>
                        <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)' }}>
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-error)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        textAlign: 'right'
                      }}
                      title={t('Remove', 'हटाएं')}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-8) 0', color: 'var(--color-text-muted)' }}>
                  <div style={{ opacity: 0.25, display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-2)' }}>
                    <CartIcon size={48} />
                  </div>
                  {t('Your bag is empty.', 'आपकी कार्ट खाली है।')}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--type-body-l)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
                  <span>{t('Total Amount / कुल राशि', 'कुल राशि')}:</span>
                  <span style={{ color: 'var(--color-gold)' }}>₹{totalCartPrice}</span>
                </div>
                <button
                  onClick={() => {
                    alert(t('Proceeding to billing integration simulator...', 'बिलिंग एकीकरण सिम्युलेटर पर जा रहे हैं...'));
                    setCart([]);
                    setShowCartDrawer(false);
                  }}
                  style={{
                    width: '100%',
                    background: 'var(--color-gold)',
                    color: 'var(--primitive-black)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '14px',
                    fontWeight: 600,
                    fontSize: 'var(--type-label)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-1)'
                  }}
                >
                  {t('Proceed to Checkout', 'भुगतान के लिए आगे बढ़ें')}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

