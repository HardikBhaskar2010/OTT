'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tv, Film, Bookmark, User } from 'lucide-react';
import { useLang } from './LangContext';

const TABS = [
  { id: 'home', nameEn: 'Home', nameHi: 'होम', href: '/', icon: Home },
  { id: 'live-tv', nameEn: 'Live TV', nameHi: 'लाइव', href: '/live', icon: Tv },
  { id: 'originals', nameEn: 'Originals', nameHi: 'ओरिजिनल', href: '/originals', icon: Film },
  { id: 'my-list', nameEn: 'My List', nameHi: 'सूची', href: '/my-list', icon: Bookmark },
  { id: 'profile', nameEn: 'Profile', nameHi: 'प्रोफ़ाइल', href: '/profile', icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLang();

  return (
    <nav className="mobile-bottom-nav" aria-label={t('Mobile Bottom Navigation', 'मोबाइल निचला नेविगेशन')}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`mobile-nav-item ${isActive ? 'is-active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={20} className="mobile-nav-item__icon" aria-hidden="true" />
            <span className="mobile-nav-item__label">
              <span className="lang-en-only">{tab.nameEn}</span>
              <span className="lang-hi-only" lang="hi">{tab.nameHi}</span>
            </span>
            <div className="mobile-nav-item__indicator" aria-hidden="true"></div>
          </Link>
        );
      })}
    </nav>
  );
}
