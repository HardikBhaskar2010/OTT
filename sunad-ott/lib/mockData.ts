/**
 * SUNAD OTT — Mock Data
 * Source: 12_Program_Chart.md, 07_Information_Architecture.md, 02_PRD.md
 * All 19 FPC programs + categories + products + plans
 */

/* ─── PROGRAMS (FPC — Fixed Programming Chart) ─── */
export interface Program {
  id: string;
  nameEn: string;
  nameHi: string;
  category: string;
  categoryId: string;
  startTime: string;
  endTime: string;
  description: string;
  descriptionHi: string;
  thumbnailGradient: string;
  trpScore?: number;
  isLive?: boolean;
  isPrimeTime?: boolean;
  tags: string[];
}

export function getProgramThumbnail(categoryId: string): string {
  switch (categoryId) {
    case 'spiritual':
    case 'yoga':
    case 'family':
      return '/thumb_spiritual.jpg';
    case 'history':
    case 'tourism':
    case 'education':
      return '/thumb_history.jpg';
    case 'culture':
    case 'arts':
      return '/thumb_crafts.jpg';
    case 'agriculture':
    case 'entrepreneurship':
    default:
      return '/thumb_agriculture.jpg';
  }
}

export const PROGRAMS: Program[] = [
  {
    id: 'prabhat-bharat',
    nameEn: 'Prabhat Bharat',
    nameHi: 'प्रभात भारत',
    category: 'Spiritual Knowledge',
    categoryId: 'spiritual',
    startTime: '05:00',
    endTime: '06:00',
    description: 'Morning spirituality & devotion — Live Aarti, Mantras, Meditation, Yoga & Surya Namaskar.',
    descriptionHi: 'सुबह की आध्यात्मिकता — लाइव आरती, मंत्र, ध्यान, योग और सूर्य नमस्कार।',
    thumbnailGradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1800 50%, #4a2a00 100%)',
    trpScore: 65,
    tags: ['Devotion', 'Yoga', 'Meditation', 'Morning'],
  },
  {
    id: 'arogya-bharat',
    nameEn: 'Arogya Bharat',
    nameHi: 'आरोग्य भारत',
    category: 'Yoga & Ayurveda',
    categoryId: 'yoga',
    startTime: '06:00',
    endTime: '07:00',
    description: 'Wellness & traditional health — Ayurveda, Naturopathy, Yoga, Mental Health, Sattvic Diet.',
    descriptionHi: 'आयुर्वेद, प्राकृतिक चिकित्सा, योग, मानसिक स्वास्थ्य और सात्विक भोजन।',
    thumbnailGradient: 'linear-gradient(135deg, #0a1a00 0%, #1a3000 50%, #2d4a10 100%)',
    trpScore: 75,
    tags: ['Ayurveda', 'Wellness', 'Yoga', 'Health'],
  },
  {
    id: 'bharat-samachar',
    nameEn: 'Bharat Samachar',
    nameHi: 'भारत समाचार',
    category: 'Culture & Heritage',
    categoryId: 'culture',
    startTime: '07:00',
    endTime: '08:00',
    description: 'Constructive & positive news — Science, Culture, Agriculture, Technology.',
    descriptionHi: 'Positive News, विज्ञान, संस्कृति, कृषि और तकनीक।',
    thumbnailGradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2d 50%, #2d2d40 100%)',
    trpScore: 60,
    tags: ['Positive News', 'Science', 'Culture', 'Agriculture'],
  },
  {
    id: 'sanatan-gyan',
    nameEn: 'Sanatan Gyan',
    nameHi: 'सनातन ज्ञान',
    category: 'Spiritual Knowledge',
    categoryId: 'spiritual',
    startTime: '08:00',
    endTime: '09:00',
    description: 'Vedic Philosophy & Wisdom — Vedas, Upanishads, Bhagavad Gita, Tantra Shastra.',
    descriptionHi: 'वेद, उपनिषद, भगवद गीता, तंत्र शास्त्र और योग।',
    thumbnailGradient: 'linear-gradient(135deg, #1a1000 0%, #2d1a00 50%, #402a00 100%)',
    trpScore: 80,
    tags: ['Vedas', 'Upanishads', 'Gita', 'Philosophy'],
  },
  {
    id: 'mystic-files',
    nameEn: 'Mystic Files',
    nameHi: 'मिस्टिक फाइल्स',
    category: 'Documentaries',
    categoryId: 'documentaries',
    startTime: '09:00',
    endTime: '10:00',
    description: 'Signature Mystery Program — Mysterious Temples, Ancient Secrets, Shiva, Shakti, Nath, Siddhas.',
    descriptionHi: 'रहस्यमयी मंदिर, प्राचीन रहस्य, शिव, शक्ति, नाथ, सिद्ध पुरुष।',
    thumbnailGradient: 'linear-gradient(135deg, #0a0014 0%, #14002d 50%, #200040 100%)',
    trpScore: 85,
    tags: ['Mysteries', 'Sacred Science', 'Shiva', 'Nath'],
  },
  {
    id: 'bharat-yatra',
    nameEn: 'Bharat Yatra',
    nameHi: 'भारत यात्रा',
    category: 'Tourism & Heritage Walks',
    categoryId: 'tourism',
    startTime: '10:00',
    endTime: '11:00',
    description: 'Cultural Travelogue — Temples, Pilgrimage, Heritage Tourism, Regional Folk Life.',
    descriptionHi: 'मंदिर, तीर्थ यात्रा, पर्यटन, संस्कृति और लोक जीवन।',
    thumbnailGradient: 'linear-gradient(135deg, #001a0a 0%, #002d14 50%, #00401e 100%)',
    trpScore: 88,
    tags: ['Pilgrimage', 'Travelogue', 'Heritage Tourism'],
  },
  {
    id: 'indian-heritage',
    nameEn: 'Indian Heritage',
    nameHi: 'भारतीय विरासत',
    category: 'History & Civilization',
    categoryId: 'history',
    startTime: '11:00',
    endTime: '12:00',
    description: 'History & Archaeology — Ancient India, Lost Civilizations, Archaeological sites.',
    descriptionHi: 'इतिहास, पुरातत्व, प्राचीन भारत, खोई हुई सभ्यताएँ।',
    thumbnailGradient: 'linear-gradient(135deg, #1a0d00 0%, #2d1a00 50%, #401800 100%)',
    trpScore: 78,
    tags: ['Archaeology', 'Ancient Civilizations', 'History'],
  },
  {
    id: 'success-india',
    nameEn: 'Success India',
    nameHi: 'सक्सेस इंडिया',
    category: 'Entrepreneurship',
    categoryId: 'entrepreneurship',
    startTime: '12:00',
    endTime: '13:00',
    description: 'Motivation & Innovation — Inspirational Personalities, Youth Icons, Startups, Skill Development.',
    descriptionHi: 'प्रेरक व्यक्तित्व, युवा आइकन, Startup, Innovation और Skill Development।',
    thumbnailGradient: 'linear-gradient(135deg, #001400 0%, #0d2d00 50%, #1a4000 100%)',
    trpScore: 72,
    tags: ['Motivation', 'Startups', 'Youth', 'Innovation'],
  },
  {
    id: 'food-and-culture',
    nameEn: 'Food & Culture',
    nameHi: 'खाना और संस्कृति',
    category: 'Culture & Heritage',
    categoryId: 'culture',
    startTime: '13:00',
    endTime: '14:00',
    description: 'Culinary Traditions — Indian Cuisine, Temple Prasad, Sacred Kitchens, Rural Cooking.',
    descriptionHi: 'भारतीय भोजन, प्रसाद, मंदिर रसोई और ग्रामीण भोजन।',
    thumbnailGradient: 'linear-gradient(135deg, #1a0800 0%, #2d1400 50%, #401a00 100%)',
    trpScore: 68,
    tags: ['Cuisine', 'Temple Prasad', 'Rural Cooking'],
  },
  {
    id: 'village-india',
    nameEn: 'Village India',
    nameHi: 'ग्राम भारत',
    category: 'Culture & Heritage',
    categoryId: 'culture',
    startTime: '14:00',
    endTime: '15:00',
    description: 'Rural Life & Indigenous Arts — Villages, Farmers, Folk Art, Tribal Traditions.',
    descriptionHi: 'गाँव, किसान, लोक कला और जनजातीय संस्कृति।',
    thumbnailGradient: 'linear-gradient(135deg, #001a00 0%, #0d2d0d 50%, #1a401a 100%)',
    trpScore: 65,
    tags: ['Rural Arts', 'Folk Culture', 'Tribal Heritage'],
  },
  {
    id: 'kids-dharma',
    nameEn: 'Kids Dharma',
    nameHi: 'किड्स धर्म',
    category: 'Family & Children',
    categoryId: 'family',
    startTime: '15:00',
    endTime: '16:00',
    description: 'Animation-based Values — Panchatantra, Ramayana, Mahabharata, Moral Values.',
    descriptionHi: 'पंचतंत्र, रामायण, महाभारत, संस्कार — Animation आधारित।',
    thumbnailGradient: 'linear-gradient(135deg, #00101a 0%, #00202d 50%, #003040 100%)',
    trpScore: 70,
    tags: ['Panchatantra', 'Animation', 'Moral Values'],
  },
  {
    id: 'women-of-india',
    nameEn: 'Women of India',
    nameHi: 'भारत की महिलाएं',
    category: 'Entrepreneurship',
    categoryId: 'entrepreneurship',
    startTime: '16:00',
    endTime: '17:00',
    description: 'Women Empowerment — Female Entrepreneurs, Health, Inspiration, Nari Shakti.',
    descriptionHi: 'नारी शक्ति, महिला उद्यमिता, स्वास्थ्य और प्रेरणा।',
    thumbnailGradient: 'linear-gradient(135deg, #1a001a 0%, #2d002d 50%, #3d003d 100%)',
    trpScore: 74,
    tags: ['Women Empowerment', 'Inspiration', 'Health'],
  },
  {
    id: 'live-temple-connect',
    nameEn: 'Live Temple Connect',
    nameHi: 'लाइव मंदिर कनेक्ट',
    category: 'Culture & Heritage',
    categoryId: 'culture',
    startTime: '17:00',
    endTime: '18:00',
    description: 'Daily Live Pilgrimage — Broadcast from a different historic Indian temple every day.',
    descriptionHi: 'प्रतिदिन अलग मंदिर से लाइव — ऐतिहासिक भारतीय मंदिरों से सीधा प्रसारण।',
    thumbnailGradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1a00 50%, #401800 100%)',
    trpScore: 92,
    isLive: true,
    tags: ['Live Broadcast', 'Pilgrimage', 'Aarti', 'Temples'],
  },
  {
    id: 'bharat-samvad',
    nameEn: 'Bharat Samvad',
    nameHi: 'भारत संवाद',
    category: 'Education & Skill Development',
    categoryId: 'education',
    startTime: '18:00',
    endTime: '19:00',
    description: 'National Discourse & Panel — Culture, Education, Expert Discussions.',
    descriptionHi: 'राष्ट्रीय विषय, संस्कृति, शिक्षा और विशेषज्ञ चर्चा।',
    thumbnailGradient: 'linear-gradient(135deg, #0a0a1a 0%, #14142d 50%, #1e1e40 100%)',
    trpScore: 76,
    tags: ['Discourse', 'Education', 'Panel', 'National Issues'],
  },
  {
    id: 'tantra-rahasya',
    nameEn: 'Tantra Rahasya',
    nameHi: 'तंत्र रहस्य',
    category: 'Spiritual Knowledge',
    categoryId: 'spiritual',
    startTime: '19:00',
    endTime: '20:00',
    description: 'Prime Time — Esoteric Wisdom: Tantra, Kundalini Energy, Siddhis, Classical Shastric Foundations.',
    descriptionHi: 'तंत्र, योग, कुंडलिनी, सिद्धियां और शास्त्रीय आधार — High TRP शो।',
    thumbnailGradient: 'linear-gradient(135deg, #140014 0%, #200020 50%, #300030 100%)',
    trpScore: 98,
    isPrimeTime: true,
    tags: ['Tantra', 'Kundalini', 'Esoteric', 'High-TRP'],
  },
  {
    id: 'mystic-bharat',
    nameEn: 'Mystic Bharat',
    nameHi: 'मिस्टिक भारत',
    category: 'Documentaries',
    categoryId: 'documentaries',
    startTime: '20:00',
    endTime: '21:00',
    description: 'Prime Time — Civilizational Mysteries: Unresolved Mysteries, Scientific Analysis, Sacred Energy Sites.',
    descriptionHi: 'अनसुलझे रहस्य, वैज्ञानिक विश्लेषण, मंदिर, ऊर्जा स्थल, इतिहास — Highest TRP Slot।',
    thumbnailGradient: 'linear-gradient(135deg, #0a001a 0%, #14002d 50%, #1e0040 100%)',
    trpScore: 100,
    isPrimeTime: true,
    tags: ['Mysteries', 'Energy Sites', 'History', 'Scientific Analysis'],
  },
  {
    id: 'real-bharat-documentary',
    nameEn: 'Real Bharat Documentary',
    nameHi: 'रियल भारत डॉक्यूमेंट्री',
    category: 'Documentaries',
    categoryId: 'documentaries',
    startTime: '21:00',
    endTime: '22:00',
    description: 'Prime Time — Deep Investigation: Exclusive Documentaries, Hidden India, Ancient Technology.',
    descriptionHi: 'Exclusive Documentary, Investigation, Hidden India, Ancient Technology।',
    thumbnailGradient: 'linear-gradient(135deg, #001414 0%, #002020 50%, #003030 100%)',
    trpScore: 95,
    isPrimeTime: true,
    tags: ['Investigation', 'Ancient Technology', 'Hidden India'],
  },
  {
    id: 'spiritual-podcast',
    nameEn: 'Spiritual Podcast',
    nameHi: 'स्पिरिचुअल पॉडकास्ट',
    category: 'Spiritual Knowledge',
    categoryId: 'spiritual',
    startTime: '22:00',
    endTime: '23:00',
    description: 'Prime Time — Intellectual Discourse: Dialogues with Gurus, Scientists, Authors, and Researchers.',
    descriptionHi: 'गुरु, वैज्ञानिक, लेखक और शोधकर्ताओं के साथ बातचीत।',
    thumbnailGradient: 'linear-gradient(135deg, #0a0a00 0%, #1a1a00 50%, #2a2a00 100%)',
    trpScore: 82,
    isPrimeTime: true,
    tags: ['Podcast', 'Gurus', 'Scientific Discourse'],
  },
  {
    id: 'divas-ka-saar',
    nameEn: 'Divas Ka Saar',
    nameHi: 'दिवस का सार',
    category: 'Culture & Heritage',
    categoryId: 'culture',
    startTime: '23:00',
    endTime: '05:00',
    description: 'Daily Highlights & Wrap-up — Key moments and highlights of the day\'s programming.',
    descriptionHi: 'दिनभर के प्रमुख अंश और झलकियाँ।',
    thumbnailGradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #262626 100%)',
    trpScore: 55,
    tags: ['Summary', 'Daily Highlights', 'News'],
  },
];

/* ─── CATEGORIES ─── */
export interface Category {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  description: string;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'documentaries',
    nameEn: 'Documentaries',
    nameHi: 'वृत्तचित्र',
    icon: '🎬',
    description: 'Nonfiction long-form films on culture, regional identity, and craftsmanship.',
    gradient: 'linear-gradient(135deg, #0a001a 0%, #14002d 100%)',
  },
  {
    id: 'spiritual',
    nameEn: 'Spiritual Knowledge',
    nameHi: 'आध्यात्मिक ज्ञान',
    icon: '🕉',
    description: 'Discourse, Upanishads, Vedas, Gita philosophy, and teacher-led series.',
    gradient: 'linear-gradient(135deg, #1a0800 0%, #2d1400 100%)',
  },
  {
    id: 'history',
    nameEn: 'History & Civilization',
    nameHi: 'इतिहास और सभ्यता',
    icon: '🏛',
    description: 'Documented history, archaeology, ancient architecture, and biographies.',
    gradient: 'linear-gradient(135deg, #1a0500 0%, #2d0d00 100%)',
  },
  {
    id: 'culture',
    nameEn: 'Culture & Heritage',
    nameHi: 'संस्कृति और विरासत',
    icon: '🎭',
    description: 'Festivals, rituals, regional customs, and traditional lifestyles.',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #2d1a00 100%)',
  },
  {
    id: 'tourism',
    nameEn: 'Tourism & Heritage Walks',
    nameHi: 'पर्यटन और विरासत',
    icon: '🗺',
    description: 'Travelogues, sacred routes, historic temples, and tourism.',
    gradient: 'linear-gradient(135deg, #001a0d 0%, #002d1a 100%)',
  },
  {
    id: 'yoga',
    nameEn: 'Yoga & Ayurveda',
    nameHi: 'योग और आयुर्वेद',
    icon: '🧘',
    description: 'Traditional Indian medicine, yoga postures, and mental health.',
    gradient: 'linear-gradient(135deg, #0a1a00 0%, #142d00 100%)',
  },
  {
    id: 'arts',
    nameEn: 'Art & Crafts',
    nameHi: 'कला और शिल्प',
    icon: '🎨',
    description: 'Documentation of traditional crafts, pottery, weaving, and local artists.',
    gradient: 'linear-gradient(135deg, #1a0d14 0%, #2d1422 100%)',
  },
  {
    id: 'agriculture',
    nameEn: 'Agriculture & Rural',
    nameHi: 'कृषि और ग्रामीण',
    icon: '🌾',
    description: 'Stories of farmers, organic farming techniques, and rural technology.',
    gradient: 'linear-gradient(135deg, #001400 0%, #002000 100%)',
  },
  {
    id: 'education',
    nameEn: 'Education & Skills',
    nameHi: 'शिक्षा और कौशल',
    icon: '📚',
    description: 'Civilizational science, linguistics, learning series.',
    gradient: 'linear-gradient(135deg, #001420 0%, #002040 100%)',
  },
  {
    id: 'entrepreneurship',
    nameEn: 'Entrepreneurship',
    nameHi: 'उद्यमिता',
    icon: '💡',
    description: 'Leadership interviews, local business successes, and startups.',
    gradient: 'linear-gradient(135deg, #1a1400 0%, #2d2000 100%)',
  },
  {
    id: 'family',
    nameEn: 'Family & Children',
    nameHi: 'परिवार और बच्चे',
    icon: '👨‍👩‍👧',
    description: 'Clean, animated civilizational stories and moral values for kids.',
    gradient: 'linear-gradient(135deg, #001420 0%, #003040 100%)',
  },
];

/* ─── PRODUCTS ─── */
export interface Product {
  id: string;
  nameEn: string;
  nameHi: string;
  type: 'Artisan' | 'Organic' | 'Wellness' | 'Spiritual';
  price: number;
  linkedContentIds: string[];
  description: string;
  thumbnail: string;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    nameEn: 'Hand-woven Madhubani Silk Stole',
    nameHi: 'हस्तनिर्मित मधुबनी सिल्क स्टोल',
    type: 'Artisan',
    price: 1450,
    linkedContentIds: ['village-india', 'indian-heritage'],
    description: 'Traditional Madhubani patterns hand-painted by Bihar artisans on pure silk.',
    thumbnail: 'linear-gradient(135deg, #1a0a14 0%, #2d1422 100%)',
    inStock: true,
  },
  {
    id: 'prod-02',
    nameEn: 'Organic Himalayan Turmeric Powder',
    nameHi: 'जैविक हिमालयी हल्दी पाउडर',
    type: 'Organic',
    price: 299,
    linkedContentIds: ['arogya-bharat', 'food-and-culture'],
    description: 'Cold-processed turmeric from Uttarakhand farms, 3.5% curcumin guaranteed.',
    thumbnail: 'linear-gradient(135deg, #1a1000 0%, #2d1a00 100%)',
    inStock: true,
  },
  {
    id: 'prod-03',
    nameEn: 'Pure Copper Yoga Mat',
    nameHi: 'शुद्ध कॉपर योगा मैट',
    type: 'Wellness',
    price: 2199,
    linkedContentIds: ['arogya-bharat', 'prabhat-bharat'],
    description: 'Anti-microbial copper-infused yoga mat with grip texture, eco-friendly.',
    thumbnail: 'linear-gradient(135deg, #140d00 0%, #1e1400 100%)',
    inStock: true,
  },
  {
    id: 'prod-04',
    nameEn: 'Panchagavya Herbal Soap Set',
    nameHi: 'पंचगव्य हर्बल साबुन सेट',
    type: 'Wellness',
    price: 549,
    linkedContentIds: ['arogya-bharat'],
    description: 'Set of 4 handcrafted Ayurvedic soaps using cow-derived ingredients.',
    thumbnail: 'linear-gradient(135deg, #001400 0%, #002000 100%)',
    inStock: true,
  },
  {
    id: 'prod-05',
    nameEn: 'Rudraksha Mala (108 beads)',
    nameHi: 'रुद्राक्ष माला (108 दाने)',
    type: 'Spiritual',
    price: 1850,
    linkedContentIds: ['tantra-rahasya', 'sanatan-gyan', 'prabhat-bharat'],
    description: 'Authentic Nepali Panchmukhi Rudraksha mala, individually certified.',
    thumbnail: 'linear-gradient(135deg, #1a0500 0%, #2d0800 100%)',
    inStock: true,
  },
  {
    id: 'prod-06',
    nameEn: 'Brass Diya Set (Traditional)',
    nameHi: 'पारंपरिक पीतल दीया सेट',
    type: 'Spiritual',
    price: 799,
    linkedContentIds: ['live-temple-connect', 'prabhat-bharat'],
    description: 'Set of 5 handcrafted brass diyas with intricate temple motif engravings.',
    thumbnail: 'linear-gradient(135deg, #1a0e00 0%, #2d1a00 100%)',
    inStock: true,
  },
  {
    id: 'prod-07',
    nameEn: 'Blue Pottery Ceramic Tea Set',
    nameHi: 'नीली मिट्टी की चाय सेट',
    type: 'Artisan',
    price: 3200,
    linkedContentIds: ['village-india', 'food-and-culture'],
    description: 'Authentic Jaipur blue pottery 6-piece tea set by third-generation artisans.',
    thumbnail: 'linear-gradient(135deg, #001420 0%, #002040 100%)',
    inStock: false,
  },
  {
    id: 'prod-08',
    nameEn: 'Organic Cold-Pressed Coconut Oil',
    nameHi: 'जैविक कोल्ड प्रेस्ड नारियल तेल',
    type: 'Organic',
    price: 399,
    linkedContentIds: ['arogya-bharat', 'food-and-culture'],
    description: 'Virgin coconut oil cold-pressed from fresh Kerala coconuts.',
    thumbnail: 'linear-gradient(135deg, #001a0d 0%, #002d1a 100%)',
    inStock: true,
  },
  {
    id: 'prod-09',
    nameEn: 'Dhokra Tribal Brass Figurine',
    nameHi: 'ढोकरा जनजातीय पीतल मूर्ति',
    type: 'Artisan',
    price: 2450,
    linkedContentIds: ['village-india', 'indian-heritage'],
    description: 'Lost-wax cast tribal brass sculpture from Chhattisgarh — unique, handmade.',
    thumbnail: 'linear-gradient(135deg, #1a0d00 0%, #2d1500 100%)',
    inStock: true,
  },
  {
    id: 'prod-10',
    nameEn: 'Saffron & Sandalwood Incense Kit',
    nameHi: 'केसर और चंदन अगरबत्ती किट',
    type: 'Spiritual',
    price: 649,
    linkedContentIds: ['prabhat-bharat', 'live-temple-connect', 'tantra-rahasya'],
    description: 'Handmade incense sticks using temple-grade saffron, sandalwood, and camphor.',
    thumbnail: 'linear-gradient(135deg, #1a0800 0%, #2d1400 100%)',
    inStock: true,
  },
  {
    id: 'prod-11',
    nameEn: 'Ashwagandha Stress Relief Supplement',
    nameHi: 'अश्वगंधा स्ट्रेस रिलीफ सप्लीमेंट',
    type: 'Wellness',
    price: 499,
    linkedContentIds: ['arogya-bharat', 'spiritual-podcast'],
    description: 'Certified organic Ashwagandha root extract capsules — 500mg per serving.',
    thumbnail: 'linear-gradient(135deg, #0a1000 0%, #142000 100%)',
    inStock: true,
  },
  {
    id: 'prod-12',
    nameEn: 'Handloom Khadi Meditation Shawl',
    nameHi: 'हथकरघा खादी ध्यान शाल',
    type: 'Artisan',
    price: 1799,
    linkedContentIds: ['prabhat-bharat', 'sanatan-gyan', 'spiritual-podcast'],
    description: 'Hand-spun khadi meditation shawl in natural undyed cream, from Sevagram.',
    thumbnail: 'linear-gradient(135deg, #141414 0%, #1e1e1e 100%)',
    inStock: true,
  },
];

/* ─── SUBSCRIPTION PLANS ─── */
export interface Plan {
  id: string;
  nameEn: string;
  nameHi: string;
  price: number;          /* INR per month, 0 = free */
  priceAnnual?: number;   /* INR per year */
  recommended: boolean;
  badge?: string;
  features: string[];
  featuresHi: string[];
  maxProfiles: number;
  maxStreams: number;
  videoQuality: 'SD' | 'HD' | '4K';
  hasDownloads: boolean;
  hasAds: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    nameEn: 'Sunad Sample',
    nameHi: 'सुनाद सैंपल',
    price: 0,
    recommended: false,
    features: [
      'Access to select free titles',
      'Ad-supported streaming',
      'SD quality (480p)',
      '1 profile',
      'Live TV access (limited)',
    ],
    featuresHi: [
      'सीमित निशुल्क शीर्षकों तक पहुंच',
      'विज्ञापन-सहित स्ट्रीमिंग',
      'SD गुणवत्ता (480p)',
      '1 प्रोफाइल',
      'लाइव टीवी (सीमित)',
    ],
    maxProfiles: 1,
    maxStreams: 1,
    videoQuality: 'SD',
    hasDownloads: false,
    hasAds: true,
  },
  {
    id: 'premium',
    nameEn: 'Sunad Premium',
    nameHi: 'सुनाद प्रीमियम',
    price: 299,
    priceAnnual: 2999,
    recommended: true,
    badge: 'Most Popular',
    features: [
      'Full catalog access',
      'Ad-free streaming',
      'HD & 4K Ultra HD quality',
      'Offline downloads',
      '4 profiles',
      'Full Live TV & EPG',
      'Dual audio & subtitles',
    ],
    featuresHi: [
      'पूर्ण कैटलॉग तक पहुंच',
      'विज्ञापन-मुक्त स्ट्रीमिंग',
      'HD और 4K Ultra HD गुणवत्ता',
      'ऑफलाइन डाउनलोड',
      '4 प्रोफाइल',
      'पूर्ण लाइव टीवी और EPG',
      'दोहरी ऑडियो और उपशीर्षक',
    ],
    maxProfiles: 4,
    maxStreams: 2,
    videoQuality: '4K',
    hasDownloads: true,
    hasAds: false,
  },
  {
    id: 'family',
    nameEn: 'Sunad Family',
    nameHi: 'सुनाद परिवार',
    price: 499,
    priceAnnual: 4999,
    recommended: false,
    features: [
      'Everything in Premium',
      'Up to 6 profiles',
      '4 simultaneous streams',
      'Kids profile with parental controls',
      'Priority access to new originals',
      'Family watchlist',
    ],
    featuresHi: [
      'प्रीमियम की सभी सुविधाएं',
      '6 तक प्रोफाइल',
      '4 एक साथ स्ट्रीम',
      'बच्चों का प्रोफाइल + अभिभावक नियंत्रण',
      'नए ओरिजिनल का प्राथमिकता एक्सेस',
      'परिवार वॉचलिस्ट',
    ],
    maxProfiles: 6,
    maxStreams: 4,
    videoQuality: '4K',
    hasDownloads: true,
    hasAds: false,
  },
  {
    id: 'patron',
    nameEn: 'Sunad Patron',
    nameHi: 'सुनाद संरक्षक',
    price: 999,
    priceAnnual: 9999,
    recommended: false,
    badge: 'Heritage Patron',
    features: [
      'Everything in Family',
      'Early access to all content',
      'Behind-the-scenes exclusives',
      'Invitations to live events & satsangs',
      'Patron credit in select productions',
      'Dedicated support',
      'Annual collector\'s digital gift',
    ],
    featuresHi: [
      'परिवार प्लान की सभी सुविधाएं',
      'सभी सामग्री का प्रारंभिक एक्सेस',
      'एक्सक्लूसिव बिहाइंड-द-सीन्स',
      'लाइव इवेंट और सत्संग में आमंत्रण',
      'चयनित प्रोडक्शन में क्रेडिट',
      'समर्पित सहायता',
      'वार्षिक डिजिटल संग्रह उपहार',
    ],
    maxProfiles: 6,
    maxStreams: 4,
    videoQuality: '4K',
    hasDownloads: true,
    hasAds: false,
  },
];

/* ─── WEEKLY SPECIALS ─── */
export const WEEKLY_SPECIALS: Record<string, { nameEn: string; nameHi: string }> = {
  Monday:    { nameEn: 'Shiva Special', nameHi: 'शिव विशेष' },
  Tuesday:   { nameEn: 'Hanuman & Bhairav Special', nameHi: 'हनुमान एवं भैरव' },
  Wednesday: { nameEn: 'Vedic Science Special', nameHi: 'वेद विज्ञान' },
  Thursday:  { nameEn: 'Guru Parampara Special', nameHi: 'गुरु परंपरा' },
  Friday:    { nameEn: 'Shakti Sadhana Special', nameHi: 'शक्ति साधना' },
  Saturday:  { nameEn: 'Tantra & Nath Special', nameHi: 'तंत्र एवं नाथ परंपरा' },
  Sunday:    { nameEn: 'Mega Documentary (2hr)', nameHi: 'Mega Documentary — 2 घंटे' },
};

/* ─── NAVIGATION ITEMS ─── */
export const NAV_ITEMS = [
  { id: 'home',            nameEn: 'Home',          nameHi: 'होम',            href: '/',            icon: '⌂' },
  { id: 'live-tv',         nameEn: 'Live TV',        nameHi: 'लाइव टीवी',     href: '/live',         icon: '▶', isLive: true },
  { id: 'originals',       nameEn: 'Originals',      nameHi: 'ओरिजिनल',       href: '/originals',    icon: '✦' },
  { id: 'culture',         nameEn: 'Culture',        nameHi: 'संस्कृति',       href: '/browse/culture', icon: '🎭' },
  { id: 'documentaries',   nameEn: 'Documentaries',  nameHi: 'वृत्तचित्र',    href: '/browse/documentaries', icon: '🎬' },
  { id: 'podcasts',        nameEn: 'Podcasts',       nameHi: 'पॉडकास्ट',      href: '/browse/spiritual', icon: '🎙' },
  { id: 'news',            nameEn: 'News',           nameHi: 'समाचार',         href: '/browse/culture', icon: '📰' },
  { id: 'kids',            nameEn: 'Kids',           nameHi: 'बच्चे',          href: '/browse/family', icon: '🌟' },
  { id: 'my-list',         nameEn: 'My List',        nameHi: 'मेरी सूची',     href: '/my-list',      icon: '♡' },
  { id: 'store',           nameEn: 'Store',          nameHi: 'स्टोर',          href: '/store',        icon: '🛍' },
];

/* ─── HERO SLIDES (for homepage carousel) ─── */
export const HERO_SLIDES = [
  {
    id: 'hero-1',
    badge: 'NEW ORIGINAL SERIES',
    badgeHi: 'नई ओरिजिनल सीरीज़',
    titleEn: 'Mystic Bharat',
    titleHi: 'मिस्टिक भारत',
    subtitleEn: 'Unresolved mysteries of ancient India, decoded through modern science.',
    subtitleHi: 'प्राचीन भारत के अनसुलझे रहस्य, आधुनिक विज्ञान से सुलझाए।',
    ctaEn: 'Watch Now',
    ctaHi: 'अभी देखें',
    gradient: 'linear-gradient(105deg, rgba(14,13,12,0.95) 0%, rgba(14,13,12,0.7) 50%, rgba(14,13,12,0.2) 100%)',
    thumbnailGradient: 'linear-gradient(135deg, #0a001a 0%, #14002d 50%, #200040 100%)',
    href: '/watch/mystic-bharat',
  },
  {
    id: 'hero-2',
    badge: 'SUNAD ORIGINAL',
    badgeHi: 'सुनाद ओरिजिनल',
    titleEn: 'Tantra Rahasya',
    titleHi: 'तंत्र रहस्य',
    subtitleEn: 'The classical shastric foundations of Kundalini energy, revealed.',
    subtitleHi: 'कुंडलिनी ऊर्जा के शास्त्रीय आधार, उजागर।',
    ctaEn: 'Watch Now',
    ctaHi: 'अभी देखें',
    gradient: 'linear-gradient(105deg, rgba(14,13,12,0.95) 0%, rgba(14,13,12,0.7) 50%, rgba(14,13,12,0.2) 100%)',
    thumbnailGradient: 'linear-gradient(135deg, #140014 0%, #200020 50%, #300030 100%)',
    href: '/watch/tantra-rahasya',
  },
  {
    id: 'hero-3',
    badge: 'DOCUMENTARY SERIES',
    badgeHi: 'डॉक्यूमेंट्री सीरीज़',
    titleEn: 'Real Bharat Documentary',
    titleHi: 'रियल भारत डॉक्यूमेंट्री',
    subtitleEn: 'Exclusive investigations into India\'s hidden history and ancient technology.',
    subtitleHi: 'भारत के छिपे इतिहास और प्राचीन तकनीक की विशेष जांच।',
    ctaEn: 'Watch Now',
    ctaHi: 'अभी देखें',
    gradient: 'linear-gradient(105deg, rgba(14,13,12,0.95) 0%, rgba(14,13,12,0.7) 50%, rgba(14,13,12,0.2) 100%)',
    thumbnailGradient: 'linear-gradient(135deg, #001414 0%, #002020 50%, #003030 100%)',
    href: '/watch/real-bharat-documentary',
  },
];

/* Helper: get current FPC program based on current time */
export function getCurrentProgram(): Program | undefined {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return PROGRAMS.find((p) => {
    const [sh, sm] = p.startTime.split(':').map(Number);
    const startMin = sh * 60 + sm;

    if (p.id === 'divas-ka-saar') {
      // Overnight slot: 23:00 – 05:00
      return currentMinutes >= 23 * 60 || currentMinutes < 5 * 60;
    }

    const [eh, em] = p.endTime.split(':').map(Number);
    const endMin = eh * 60 + em;
    return currentMinutes >= startMin && currentMinutes < endMin;
  });
}

/* Helper: get progress percentage within current program */
export function getProgramProgress(program: Program): number {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [sh, sm] = program.startTime.split(':').map(Number);
  const [eh, em] = program.endTime.split(':').map(Number);
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  const duration = endMin - startMin;
  const elapsed = currentMinutes - startMin;
  return Math.min(100, Math.max(0, (elapsed / duration) * 100));
}
