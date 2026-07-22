import * as admin from 'firebase-admin';
import { db } from '../config/firebase';

export interface ContentItem {
  id: string;
  title: string;
  type: 'movie' | 'show' | 'documentary' | 'music';
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  releaseYear?: number;
  genres?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  email?: string;
  displayName?: string;
  verified?: boolean;
  disabled?: boolean;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  uid: string;
  plan: 'free' | 'basic' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  expiresAt?: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id?: string;
  adminUid: string;
  action: string;
  targetId?: string;
  timestamp: string;
  payload?: Record<string, unknown>;
}

// In-memory fallbacks for development/testing when Firestore is unavailable
const memoryContent: Map<string, ContentItem> = new Map([
  [
    'item-1',
    {
      id: 'item-1',
      title: 'Sunad Feature Film',
      type: 'movie',
      description: 'An flagship cinema production.',
      videoUrl: 'https://example.com/videos/movie-1.mp4',
      thumbnailUrl: 'https://example.com/thumbs/movie-1.jpg',
      duration: 120,
      releaseYear: 2024,
      genres: ['Drama', 'Thriller'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    'item-2',
    {
      id: 'item-2',
      title: 'Classic Music Concert',
      type: 'music',
      description: 'Live performance video.',
      videoUrl: 'https://example.com/videos/music-1.mp4',
      thumbnailUrl: 'https://example.com/thumbs/music-1.jpg',
      duration: 90,
      releaseYear: 2023,
      genres: ['Classical', 'Live'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
]);

const memoryUsers: Map<string, UserProfile> = new Map([
  [
    'user-123',
    {
      uid: 'user-123',
      email: 'user@sunad.tv',
      displayName: 'Standard User',
      verified: false,
      disabled: false,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    'admin-123',
    {
      uid: 'admin-123',
      email: 'admin@sunad.tv',
      displayName: 'Admin User',
      verified: true,
      disabled: false,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
]);

const memorySubscriptions: Map<string, Subscription> = new Map([
  [
    'user-123',
    {
      uid: 'user-123',
      plan: 'basic',
      status: 'active',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
]);

const memoryAuditLogs: AuditLogEntry[] = [];

// Content Store Methods
export async function getContentList(typeFilter?: string): Promise<ContentItem[]> {
  try {
    if (db) {
      let query: admin.firestore.Query = db.collection('content');
      if (typeFilter) {
        query = query.where('type', '==', typeFilter);
      }
      const snapshot = await query.get();
      if (!snapshot.empty) {
        return snapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => ({
          id: doc.id,
          ...(doc.data() as Omit<ContentItem, 'id'>),
        }));
      }
    }
  } catch (e) {
    console.warn('[Store] Firestore content list query failed, using memory store:', e);
  }

  const items = Array.from(memoryContent.values());
  if (typeFilter) {
    return items.filter((item) => item.type === typeFilter);
  }
  return items;
}

export async function getContentById(id: string): Promise<ContentItem | null> {
  try {
    if (db) {
      const doc = await db.collection('content').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...(doc.data() as Omit<ContentItem, 'id'>) };
      }
    }
  } catch (e) {
    console.warn('[Store] Firestore get content failed, using memory store:', e);
  }

  return memoryContent.get(id) || null;
}

export async function createContentItem(data: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContentItem> {
  const id = `content_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();
  const newItem: ContentItem = { id, ...data, createdAt: now, updatedAt: now };

  try {
    if (db) {
      await db.collection('content').doc(id).set(newItem);
    }
  } catch (e) {
    console.warn('[Store] Firestore content creation failed, using memory store:', e);
  }

  memoryContent.set(id, newItem);
  return newItem;
}

export async function updateContentItem(
  id: string,
  data: Partial<Omit<ContentItem, 'id' | 'createdAt'>>
): Promise<ContentItem | null> {
  const existing = await getContentById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const updatedItem: ContentItem = {
    ...existing,
    ...data,
    updatedAt: now,
  };

  try {
    if (db) {
      await db.collection('content').doc(id).set(updatedItem, { merge: true });
    }
  } catch (e) {
    console.warn('[Store] Firestore content update failed, using memory store:', e);
  }

  memoryContent.set(id, updatedItem);
  return updatedItem;
}

export async function deleteContentItem(id: string): Promise<boolean> {
  const existing = await getContentById(id);
  if (!existing) return false;

  try {
    if (db) {
      await db.collection('content').doc(id).delete();
    }
  } catch (e) {
    console.warn('[Store] Firestore content delete failed, using memory store:', e);
  }

  memoryContent.delete(id);
  return true;
}

// User Store Methods
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    if (db) {
      const doc = await db.collection('users').doc(uid).get();
      if (doc.exists) {
        return { uid: doc.id, ...(doc.data() as Omit<UserProfile, 'uid'>) };
      }
    }
  } catch (e) {
    console.warn('[Store] Firestore get user profile failed, using memory store:', e);
  }

  return memoryUsers.get(uid) || null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<UserProfile> {
  const existing = (await getUserProfile(uid)) || {
    uid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated: UserProfile = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  try {
    if (db) {
      await db.collection('users').doc(uid).set(updated, { merge: true });
    }
  } catch (e) {
    console.warn('[Store] Firestore user update failed, using memory store:', e);
  }

  memoryUsers.set(uid, updated);
  return updated;
}

export async function deleteUserSubcollectionsAndDoc(uid: string): Promise<void> {
  try {
    if (db) {
      const userRef = db.collection('users').doc(uid);
      const subcollections = await userRef.listCollections();
      for (const subcol of subcollections) {
        const snapshot = await subcol.get();
        for (const doc of snapshot.docs) {
          await doc.ref.delete();
        }
      }
      await userRef.delete();
    }
  } catch (e) {
    console.warn('[Store] Firestore GDPR subcollection delete failed, clearing memory store:', e);
  }

  memoryUsers.delete(uid);
  memorySubscriptions.delete(uid);
}

// Subscription Store Methods
export async function getSubscription(uid: string): Promise<Subscription | null> {
  try {
    if (db) {
      const doc = await db.collection('users').doc(uid).collection('subscription').doc('current').get();
      if (doc.exists) {
        return doc.data() as Subscription;
      }
    }
  } catch (e) {
    console.warn('[Store] Firestore get subscription failed, using memory store:', e);
  }

  return memorySubscriptions.get(uid) || null;
}

export async function setSubscription(uid: string, data: Omit<Subscription, 'uid' | 'updatedAt'>): Promise<Subscription> {
  const now = new Date().toISOString();
  const sub: Subscription = {
    uid,
    plan: data.plan,
    status: data.status,
    expiresAt: data.expiresAt,
    updatedAt: now,
  };

  try {
    if (db) {
      await db.collection('users').doc(uid).collection('subscription').doc('current').set(sub, { merge: true });
      await db.collection('users').doc(uid).set({ subscription: sub }, { merge: true });
    }
  } catch (e) {
    console.warn('[Store] Firestore set subscription failed, using memory store:', e);
  }

  memorySubscriptions.set(uid, sub);
  return sub;
}

// Audit Log Store Method
export async function saveAuditLog(entry: AuditLogEntry): Promise<AuditLogEntry> {
  try {
    if (db) {
      await db.collection('auditLog').add(entry);
    }
  } catch (e) {
    console.warn('[Store] Firestore auditLog save failed, using memory log:', e);
  }

  memoryAuditLogs.push(entry);
  return entry;
}

export function getMemoryAuditLogs(): AuditLogEntry[] {
  return [...memoryAuditLogs];
}
