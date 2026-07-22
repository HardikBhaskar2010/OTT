import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HERO_SLIDES_V2, PRODUCTS, ContentItem } from '@/lib/mockData';
import { getContentByIdFromFirestore, getAllContentFromFirestore } from '@/lib/firestoreCatalog';
import { TitleInfoContent } from './TitleInfoContent';

interface TitleInfoPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TitleInfoPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getContentByIdFromFirestore(id);
  const slide = HERO_SLIDES_V2.find((s) => s.id === id);

  if (!item && !slide) {
    return { title: 'Title Not Found — Sunad TV' };
  }

  const title = item?.titleEn || slide?.titleEn || id;
  const desc = item?.description || slide?.tagline || 'Watch on Sunad TV';

  return {
    title: `${title} — Sunad TV`,
    description: desc,
  };
}

export default async function TitleInfoPage({ params }: TitleInfoPageProps) {
  const { id } = await params;

  // Search Firestore collection 'content/{id}'
  const firestoreDoc = await getContentByIdFromFirestore(id);
  const heroSlide = HERO_SLIDES_V2.find((s) => s.id === id);

  const titleEn = firestoreDoc?.titleEn || heroSlide?.titleEn;
  const titleHi = firestoreDoc?.titleHi || heroSlide?.titleHi;
  const tagline = firestoreDoc?.description || heroSlide?.tagline || 'Experience authentic civilizational storytelling.';
  const year = firestoreDoc?.year || heroSlide?.year || 2024;
  const rating = firestoreDoc?.rating || heroSlide?.rating || 'U';
  const duration = firestoreDoc?.duration || heroSlide?.duration || '1h 45m';
  const genres = firestoreDoc?.genres || heroSlide?.genres || ['Culture', 'Heritage'];
  const posterGradient = firestoreDoc?.posterUrl
    ? `url(${firestoreDoc.posterUrl}) center/cover no-repeat`
    : (firestoreDoc?.posterGradient || heroSlide?.posterGradient || 'linear-gradient(135deg, #1a0800 0%, #3d1500 100%)');
  const watchHref = firestoreDoc?.watchHref || heroSlide?.watchHref || `/watch/${id}`;

  if (!titleEn) {
    notFound();
  }

  // Linked culture store products
  const linkedProducts = PRODUCTS.slice(0, 3);

  // Similar recommended content from Firestore
  const allCatalog = await getAllContentFromFirestore();
  const relatedItems: ContentItem[] = allCatalog.filter(m => m.id !== id).slice(0, 5);

  return (
    <TitleInfoContent
      id={id}
      titleEn={titleEn}
      titleHi={titleHi}
      tagline={tagline}
      year={year}
      rating={rating}
      duration={duration}
      genres={genres}
      posterGradient={posterGradient}
      watchHref={watchHref}
      linkedProducts={linkedProducts}
      relatedItems={relatedItems}
    />
  );
}
