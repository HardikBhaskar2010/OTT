'use client';

import { useEffect } from 'react';
import { initFirebaseAnalytics } from '@/lib/analytics';

export default function FirebaseAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initFirebaseAnalytics();
    }
  }, []);

  return null;
}
