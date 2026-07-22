import { ContentItem, MOVIES, SHOWS, MUSIC_CONTENT, DOCUMENTARIES, PROGRAMS, Program } from './mockData';

// Consolidate all seed content items
export const ALL_MOCK_CONTENT: ContentItem[] = [
  ...MOVIES,
  ...SHOWS,
  ...MUSIC_CONTENT,
  ...DOCUMENTARIES,
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper to get fallback items
function getFallbackContentList(): ContentItem[] {
  return ALL_MOCK_CONTENT;
}

/**
 * Fetch all catalog content items from custom Node.js API
 */
export async function getAllContentFromFirestore(): Promise<ContentItem[]> {
  try {
    const response = await fetch(`${API_URL}/api/content`, {
      // Next.js caching optimization: Revalidate every hour since catalog doesn't change often
      next: { revalidate: 3600 } 
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.data && result.data.length > 0) {
        return result.data;
      }
    }
  } catch (err) {
    console.warn('Custom API fetch for all content failed/offline, using fallback catalog data:', err);
  }
  return getFallbackContentList();
}

/**
 * Fetch content item by ID from custom Node.js API
 */
export async function getContentByIdFromFirestore(id: string): Promise<ContentItem | null> {
  try {
    const response = await fetch(`${API_URL}/api/content/${id}`, {
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      const result = await response.json();
      if (result.data) {
        return result.data;
      }
    }
  } catch (err) {
    console.warn(`Custom API fetch for content id '${id}' failed/offline, using fallback catalog data:`, err);
  }

  // Check seeded catalog fallback
  const fallbackList = getFallbackContentList();
  const foundItem = fallbackList.find((item) => item.id === id);
  if (foundItem) return foundItem;

  const prog = PROGRAMS.find((p) => p.id === id);
  if (prog) {
    return {
      id: prog.id,
      type: 'show',
      titleEn: prog.nameEn,
      titleHi: prog.nameHi,
      year: 2024,
      rating: 'U',
      duration: '60 Min',
      genres: prog.tags,
      categoryId: prog.categoryId,
      description: prog.description,
      posterGradient: prog.thumbnailGradient || 'linear-gradient(135deg, #1a0800, #3d1500)',
      posterColor: '#1a0800',
      teaserUrl: '',
      watchHref: `/watch/${prog.id}`,
    };
  }

  return null;
}

/**
 * Helper to fetch content filtered by type or categoryId from Firestore
 */
export async function getContentByTypeFromFirestore(typeOrCategory: string): Promise<ContentItem[]> {
  try {
    const all = await getAllContentFromFirestore();
    return all.filter(
      (item) => item.type === typeOrCategory || item.categoryId === typeOrCategory
    );
  } catch (err) {
    console.warn(`Firestore filter query for type '${typeOrCategory}' failed:`, err);
    return getFallbackContentList().filter(
      (item) => item.type === typeOrCategory || item.categoryId === typeOrCategory
    );
  }
}

/**
 * Helper to fetch programs by categoryId or list all programs from Firestore
 */
export async function getProgramsFromFirestore(categoryId?: string): Promise<Program[]> {
  try {
    const allContent = await getAllContentFromFirestore();
    let filtered = allContent;
    if (categoryId) {
      filtered = allContent.filter((c) => c.categoryId === categoryId);
    }
    if (filtered.length > 0) {
      return filtered.map((c) => ({
        id: c.id,
        nameEn: c.titleEn,
        nameHi: c.titleHi,
        category: c.categoryId,
        categoryId: c.categoryId,
        startTime: '09:00',
        endTime: '10:00',
        description: c.description,
        descriptionHi: c.description,
        thumbnailGradient: c.posterGradient || 'linear-gradient(135deg, #1a0800, #3d1500)',
        tags: c.genres || [],
        trpScore: c.isTrending ? 85 : 70,
        isLive: false,
        youtubeVideoId: c.youtubeVideoId,
      }));
    }
  } catch (err) {
    console.warn('Firestore programs query failed:', err);
  }

  if (categoryId) {
    return PROGRAMS.filter((p) => p.categoryId === categoryId);
  }
  return PROGRAMS;
}

/**
 * Helper to query Firestore 'content' collection for items matching title (English & Hindi) or genres/tags.
 */
export async function searchContentInFirestore(searchQuery: string): Promise<ContentItem[]> {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return [];

  try {
    const allContent = await getAllContentFromFirestore();
    return allContent.filter((item) => {
      const matchTitleEn = item.titleEn ? item.titleEn.toLowerCase().includes(q) : false;
      const matchTitleHi = item.titleHi ? item.titleHi.toLowerCase().includes(q) : false;
      const matchGenre = item.genres ? item.genres.some((g) => g.toLowerCase().includes(q)) : false;
      const matchCategory = item.categoryId ? item.categoryId.toLowerCase().includes(q) : false;
      const matchDesc = item.description ? item.description.toLowerCase().includes(q) : false;

      return matchTitleEn || matchTitleHi || matchGenre || matchCategory || matchDesc;
    });
  } catch (err) {
    console.warn(`Firestore search query failed for '${searchQuery}':`, err);
    return [];
  }
}

