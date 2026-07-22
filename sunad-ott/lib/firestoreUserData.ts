import { auth } from './firebase/client';
import { ContentItem } from './mockData';
import { getContentByIdFromFirestore, getAllContentFromFirestore } from './firestoreCatalog';

export interface MyListRecord {
  contentId: string;
  addedAt?: Date;
}

export interface WatchProgressRecord {
  contentId: string;
  progressSeconds: number;
  durationSeconds: number;
  updatedAt?: Date;
}

// Typed shapes matching the backend API responses
interface ApiMyListItem { contentId: string; addedAt?: string; }
interface ApiWatchProgressItem { contentId: string; progressSeconds?: number; durationSeconds?: number; }

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Helper to securely get the current user's Firebase ID Token for API requests
 */
async function getAuthToken(): Promise<string | null> {
  if (!auth.currentUser) return null;
  try {
    return await auth.currentUser.getIdToken(true);
  } catch (error) {
    console.error('Failed to get auth token:', error);
    return null;
  }
}

/**
 * Add item to user's My List via custom API
 */
export async function addToMyList(uid: string, contentId: string): Promise<void> {
  if (!uid || !contentId) return;
  const token = await getAuthToken();
  if (!token) return;

  try {
    await fetch(`${API_URL}/api/users/${uid}/myList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ contentId }),
    });
  } catch (err) {
    console.error(`Failed to add content '${contentId}' to myList for user '${uid}':`, err);
  }
}

/**
 * Remove item from user's My List via custom API
 */
export async function removeFromMyList(uid: string, contentId: string): Promise<void> {
  if (!uid || !contentId) return;
  const token = await getAuthToken();
  if (!token) return;

  try {
    await fetch(`${API_URL}/api/users/${uid}/myList/${contentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error(`Failed to remove content '${contentId}' from myList for user '${uid}':`, err);
  }
}

/**
 * Check if item exists in user's My List via custom API
 */
export async function isInMyList(uid: string, contentId: string): Promise<boolean> {
  if (!uid || !contentId) return false;
  const token = await getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch(`${API_URL}/api/users/${uid}/myList`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;
    const json = await res.json();
    return (json.data as ApiMyListItem[])?.some((item) => item.contentId === contentId) || false;
  } catch (err) {
    console.error(`Failed to check if content '${contentId}' in myList for user '${uid}':`, err);
    return false;
  }
}

/**
 * Fetch all items in user's My List via custom API
 */
export async function getUserMyList(uid: string): Promise<ContentItem[]> {
  if (!uid) return [];
  const token = await getAuthToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/api/users/${uid}/myList`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    
    const json = await res.json();
    const itemIds = (json.data as ApiMyListItem[])?.map((item) => item.contentId) || [];

    if (itemIds.length === 0) return [];

    const allContent = await getAllContentFromFirestore();
    const contentMap = new Map<string, ContentItem>();
    allContent.forEach((item) => contentMap.set(item.id, item));

    const result: ContentItem[] = [];
    for (const id of itemIds) {
      const found = contentMap.get(id);
      if (found) {
        result.push(found);
      } else {
        const fetched = await getContentByIdFromFirestore(id);
        if (fetched) {
          result.push(fetched);
        }
      }
    }
    return result;
  } catch (err) {
    console.error(`Failed to fetch myList for user '${uid}':`, err);
    return [];
  }
}

/**
 * Save user watch progress via custom API
 */
export async function saveWatchProgress(
  uid: string,
  contentId: string,
  progressSeconds: number,
  durationSeconds: number
): Promise<void> {
  if (!uid || !contentId) return;
  const token = await getAuthToken();
  if (!token) return;

  try {
    await fetch(`${API_URL}/api/users/${uid}/watchProgress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ contentId, progressSeconds, durationSeconds }),
    });
  } catch (err) {
    console.error(`Failed to save watch progress for content '${contentId}' user '${uid}':`, err);
  }
}

/**
 * Fetch specific watch progress item via custom API
 */
export async function getWatchProgressItem(
  uid: string,
  contentId: string
): Promise<WatchProgressRecord | null> {
  if (!uid || !contentId) return null;
  const token = await getAuthToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/api/users/${uid}/watchProgress`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    
    const json = await res.json();
    const item = (json.data as ApiWatchProgressItem[])?.find((i) => i.contentId === contentId);
    
    if (item) {
      return {
        contentId: item.contentId,
        progressSeconds: item.progressSeconds || 0,
        durationSeconds: item.durationSeconds || 100,
      };
    }
  } catch (err) {
    console.error(`Failed to get watch progress item '${contentId}' for user '${uid}':`, err);
  }
  return null;
}

/**
 * Fetch continue watching items via custom API
 */
export async function getUserContinueWatching(uid: string, limitCount = 5): Promise<ContentItem[]> {
  if (!uid) return [];
  const token = await getAuthToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/api/users/${uid}/watchProgress`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    
    const json = await res.json();
    let docsList: ApiWatchProgressItem[] = json.data || [];
    docsList = docsList.slice(0, limitCount);

    if (docsList.length === 0) return [];

    const allContent = await getAllContentFromFirestore();
    const contentMap = new Map<string, ContentItem>();
    allContent.forEach((item) => contentMap.set(item.id, item));

    const result: ContentItem[] = [];
    for (const itemProgress of docsList) {
      let item = contentMap.get(itemProgress.contentId);
      if (!item) {
        item = (await getContentByIdFromFirestore(itemProgress.contentId)) || undefined;
      }
      if (item) {
        const durationSeconds = itemProgress.durationSeconds ?? 0;
        const progressSeconds = itemProgress.progressSeconds ?? 0;
        const pct =
          durationSeconds > 0
            ? Math.min(100, Math.max(0, Math.round((progressSeconds / durationSeconds) * 100)))
            : 0;
        result.push({
          ...item,
          watchProgress: pct,
        });
      }
    }
    return result;
  } catch (err) {
    console.error(`Failed to fetch continue watching for user '${uid}':`, err);
    return [];
  }
}
