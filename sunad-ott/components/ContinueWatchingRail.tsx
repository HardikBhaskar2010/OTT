'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { getUserContinueWatching } from '@/lib/firestoreUserData';
import { ContentRail } from '@/components/ContentCard';
import type { ContentItem } from '@/lib/mockData';

interface ContinueWatchingRailProps {
  fallbackItems: ContentItem[];
}

export default function ContinueWatchingRail({ fallbackItems }: ContinueWatchingRailProps) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<ContentItem[]>(fallbackItems);

  useEffect(() => {
    if (authLoading) return;

    let active = true;
    async function loadContinueWatching() {
      if (user?.uid) {
        const userProgressItems = await getUserContinueWatching(user.uid, 5);
        if (active) {
          setItems(userProgressItems);
        }
      } else {
        if (active) {
          setItems(fallbackItems);
        }
      }
    }

    loadContinueWatching();
    return () => {
      active = false;
    };
  }, [user, authLoading, fallbackItems]);

  if (items.length === 0) return null;

  return (
    <div className="reveal">
      <ContentRail
        title="Continue Watching"
        titleHi="जहाँ छोड़ा था"
        kicker="Resume"
        items={items}
        variant="wide"
        viewAllHref="/history"
      />
    </div>
  );
}
