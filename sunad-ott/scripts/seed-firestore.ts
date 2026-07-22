import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';
import {
  MOVIES,
  SHOWS,
  MUSIC_CONTENT,
  DOCUMENTARIES,
  PROGRAMS,
  ContentItem,
} from '../lib/mockData';

// Set emulator host if not set and no credentials present
if (!process.env.FIRESTORE_EMULATOR_HOST && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
}

// 1. Read youtube_video_map.json
const mapPath = path.resolve(__dirname, '../../youtube_video_map.json');
let youtubeMap: Record<string, string> = {};

if (fs.existsSync(mapPath)) {
  try {
    const raw = fs.readFileSync(mapPath, 'utf-8');
    youtubeMap = JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse youtube_video_map.json:', err);
  }
} else {
  const altPath = path.resolve(__dirname, '../youtube_video_map.json');
  if (fs.existsSync(altPath)) {
    try {
      const raw = fs.readFileSync(altPath, 'utf-8');
      youtubeMap = JSON.parse(raw);
    } catch (err) {
      console.warn('Failed to parse alt youtube_video_map.json:', err);
    }
  }
}

// 2. Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'sunad-ott',
  });
}

const db = getFirestore();

async function fetchYoutubeTitle(videoId: string, fallbackTitle: string): Promise<string> {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  try {
    const response = await fetch(oembedUrl, { signal: AbortSignal.timeout(3000) });
    if (!response.ok) {
      return fallbackTitle;
    }
    const data = (await response.json()) as { title?: string };
    return data.title || fallbackTitle;
  } catch {
    return fallbackTitle;
  }
}

async function seedFirestore() {
  console.log('Starting Firestore catalog seed script...');

  // Consolidate all content items from mockData
  const allItems: ContentItem[] = [
    ...MOVIES,
    ...SHOWS,
    ...MUSIC_CONTENT,
    ...DOCUMENTARIES,
  ];

  // Map to deduplicate items by ID
  const itemMap = new Map<string, ContentItem>();
  allItems.forEach((item) => {
    itemMap.set(item.id, { ...item });
  });

  // Also include PROGRAMS as content items if not already present
  PROGRAMS.forEach((p) => {
    if (!itemMap.has(p.id)) {
      itemMap.set(p.id, {
        id: p.id,
        type: 'show',
        titleEn: p.nameEn,
        titleHi: p.nameHi,
        year: 2024,
        rating: 'U',
        duration: '60 Min',
        genres: p.tags,
        categoryId: p.categoryId,
        description: p.description,
        posterGradient: p.thumbnailGradient || 'linear-gradient(135deg, #1a0800, #3d1500)',
        posterColor: '#1a0800',
        teaserUrl: '',
        watchHref: `/watch/${p.id}`,
      });
    }
  });

  console.log(`Seeding ${itemMap.size} items in parallel to Firestore 'content' collection...`);

  const seededItems: Record<string, ContentItem> = {};

  const promises = Array.from(itemMap.entries()).map(async ([id, item]) => {
    const youtubeVideoId = youtubeMap[id] || 'dQw4w9WgXcQ';
    let posterUrl: string | undefined = item.posterUrl;
    let youtubeTitleFallback: string | undefined = item.youtubeTitleFallback;

    if (youtubeVideoId) {
      posterUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
      youtubeTitleFallback = await fetchYoutubeTitle(youtubeVideoId, item.titleEn || item.id);
      if (youtubeTitleFallback && youtubeTitleFallback !== item.id) {
        const hasHindi = /[\u0900-\u097F]/.test(youtubeTitleFallback);
        if (hasHindi) {
          item.titleHi = youtubeTitleFallback;
        } else {
          item.titleEn = youtubeTitleFallback;
        }
      }
    }

    const data: ContentItem = {
      ...item,
      youtubeVideoId,
      posterUrl,
      youtubeTitleFallback,
    };

    try {
      const docRef = db.collection('content').doc(id);
      await docRef.set(data, { merge: true });
    } catch (err) {
      // Log notice if offline/emulator host is unreachable
      console.warn(`Firestore write notice for item ${id}:`, (err as Error).message);
    }

    return [id, data] as const;
  });

  const results = await Promise.all(promises);
  results.forEach(([id, data]) => {
    seededItems[id] = data;
  });

  const cachePath = path.resolve(__dirname, '../lib/seeded-catalog.json');
  fs.writeFileSync(cachePath, JSON.stringify(seededItems, null, 2), 'utf-8');
  console.log(`Updated local catalog seed cache at ${cachePath}`);

  console.log(`Successfully seeded ${results.length} content items into Firestore collection 'content'.`);
}

seedFirestore().catch((err) => {
  console.error('Error seeding Firestore:', err);
  process.exit(1);
});
