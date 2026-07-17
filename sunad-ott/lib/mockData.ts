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
    category: 'Education & Skills',
    categoryId: 'education',
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
    category: 'Culture & Heritage',
    categoryId: 'culture',
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
    nameHi: 'हथकरघा खादी ध्यान शॉल',
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

/* ─── HERO SLIDES V2 (Main OTT carousel — famous titles for demonstration) ─── */
export interface HeroSlideV2 {
  id: string;
  type: 'movie' | 'show' | 'documentary' | 'original';
  badge: string;
  titleEn: string;
  titleHi: string;
  tagline: string;
  year: number;
  rating: string;
  duration: string;
  genres: string[];
  gradientOverlay: string;
  posterGradient: string;   // Used as bg when real image isn't available
  posterColor: string;      // Primary poster color for theming
  watchHref: string;
  infoHref: string;
  teaserUrl: string;        // Points to CDN: process.env.NEXT_PUBLIC_CDN_BASE_URL + teaserUrl
}

export const HERO_SLIDES_V2: HeroSlideV2[] = [
  {
    id: 'mystic-bharat',
    type: 'documentary',
    badge: 'MUST WATCH ORIGINAL',
    titleEn: 'Mystic Bharat',
    titleHi: 'मिस्टिक भारत',
    tagline: 'Civilizational mysteries of ancient India, decoded through modern science.',
    year: 2024,
    rating: 'U',
    duration: '6 Episodes',
    genres: ['History', 'Science', 'Sacred'],
    gradientOverlay: 'linear-gradient(105deg, rgba(14,12,8,0.98) 0%, rgba(14,12,8,0.9) 45%, rgba(14,12,8,0.5) 68%, transparent 100%)',
    posterGradient: 'url(/mystic_bharat.jpg) center/cover no-repeat',
    posterColor: '#B8860B',
    watchHref: '/watch/mystic-bharat',
    infoHref: '/info/mystic-bharat',
    teaserUrl: '/teasers/mystic-bharat-teaser.mp4',
  },
  {
    id: 'tantra-rahasya',
    type: 'original',
    badge: 'NEW ORIGINAL SERIES',
    titleEn: 'Tantra Rahasya',
    titleHi: 'तंत्र रहस्य',
    tagline: 'The classical shastric foundations of Kundalini energy and sacred geometry, revealed.',
    year: 2024,
    rating: 'UA',
    duration: '8 Episodes',
    genres: ['Spiritual', 'Tantra', 'Philosophy'],
    gradientOverlay: 'linear-gradient(105deg, rgba(20,5,30,0.98) 0%, rgba(20,5,30,0.9) 45%, rgba(20,5,30,0.5) 68%, transparent 100%)',
    posterGradient: 'url(/tantra_rahasya.jpg) center/cover no-repeat',
    posterColor: '#800080',
    watchHref: '/watch/tantra-rahasya',
    infoHref: '/info/tantra-rahasya',
    teaserUrl: '/teasers/tantra-rahasya-teaser.mp4',
  },
  {
    id: 'sanatan-gyan',
    type: 'show',
    badge: 'VEDIC PHILOSOPHY',
    titleEn: 'Sanatan Gyan',
    titleHi: 'सनातन ज्ञान',
    tagline: 'Delve into the eternal wisdom of the Vedas, Upanishads, and the Bhagavad Gita.',
    year: 2023,
    rating: 'U',
    duration: '12 Episodes',
    genres: ['Spiritual', 'Philosophy', 'Vedas'],
    gradientOverlay: 'linear-gradient(105deg, rgba(30,15,0,0.98) 0%, rgba(30,15,0,0.9) 45%, rgba(30,15,0,0.5) 68%, transparent 100%)',
    posterGradient: 'url(/sanatan_gyan.jpg) center/cover no-repeat',
    posterColor: '#D97706',
    watchHref: '/watch/sanatan-gyan',
    infoHref: '/info/sanatan-gyan',
    teaserUrl: '/teasers/sanatan-gyan-teaser.mp4',
  },
  {
    id: 'arogya-bharat',
    type: 'show',
    badge: 'HEALTH & WELLNESS',
    titleEn: 'Arogya Bharat',
    titleHi: 'आरोग्य भारत',
    tagline: 'Unlock traditional Indian health secrets — Ayurveda, Naturopathy, and Yoga.',
    year: 2024,
    rating: 'U',
    duration: '24 Episodes',
    genres: ['Ayurveda', 'Wellness', 'Yoga'],
    gradientOverlay: 'linear-gradient(105deg, rgba(10,30,15,0.98) 0%, rgba(10,30,15,0.9) 45%, rgba(10,30,15,0.5) 68%, transparent 100%)',
    posterGradient: 'url(/arogya_bharat.jpg) center/cover no-repeat',
    posterColor: '#064E3B',
    watchHref: '/watch/arogya-bharat',
    infoHref: '/info/arogya-bharat',
    teaserUrl: '/teasers/arogya-bharat-teaser.mp4',
  },
  {
    id: 'bharat-yatra',
    type: 'documentary',
    badge: 'HERITAGE TRAVELOGUE',
    titleEn: 'Bharat Yatra',
    titleHi: 'भारत यात्रा',
    tagline: 'An immersive travelogue showcasing India\'s sacred temples and regional folk traditions.',
    year: 2023,
    rating: 'U',
    duration: '15 Episodes',
    genres: ['Travel', 'Culture', 'Temples'],
    gradientOverlay: 'linear-gradient(105deg, rgba(25,10,5,0.98) 0%, rgba(25,10,5,0.9) 45%, rgba(25,10,5,0.5) 68%, transparent 100%)',
    posterGradient: 'url(/bharat_yatra.jpg) center/cover no-repeat',
    posterColor: '#B85309',
    watchHref: '/watch/bharat-yatra',
    infoHref: '/info/bharat-yatra',
    teaserUrl: '/teasers/bharat-yatra-teaser.mp4',
  },
  {
    id: 'the-craftsmen',
    type: 'original',
    badge: 'CULTURE COMMERCE',
    titleEn: 'The Craftsmen',
    titleHi: 'द क्राफ्ट्समैन',
    tagline: 'Explore the life, hands, and stories of regional Indian artisans and heritage crafts.',
    year: 2024,
    rating: 'U',
    duration: '5 Episodes',
    genres: ['Crafts', 'Heritage', 'Artisans'],
    gradientOverlay: 'linear-gradient(105deg, rgba(20,10,5,0.98) 0%, rgba(20,10,5,0.9) 45%, rgba(20,10,5,0.5) 68%, transparent 100%)',
    posterGradient: 'url(/the_craftsmen.jpg) center/cover no-repeat',
    posterColor: '#8B3A0A',
    watchHref: '/watch/the-craftsmen',
    infoHref: '/info/the-craftsmen',
    teaserUrl: '/teasers/the-craftsmen-teaser.mp4',
  },
  {
    id: 'prabhat-bharat',
    type: 'show',
    badge: 'MORNING YOGA',
    titleEn: 'Prabhat Bharat',
    titleHi: 'प्रभात भारत',
    tagline: 'Start your day with live morning Aarti, Mantras, Meditation and Yoga.',
    year: 2024,
    rating: 'U',
    duration: 'Daily Live',
    genres: ['Devotion', 'Yoga', 'Meditation'],
    gradientOverlay: 'linear-gradient(105deg, rgba(15,10,5,0.98) 0%, rgba(15,10,5,0.9) 45%, rgba(15,10,5,0.5) 68%, transparent 100%)',
    posterGradient: 'url(/thumb_spiritual.jpg) center/cover no-repeat',
    posterColor: '#D97706',
    watchHref: '/watch/prabhat-bharat',
    infoHref: '/info/prabhat-bharat',
    teaserUrl: '/teasers/prabhat-bharat-teaser.mp4',
  },
  {
    id: 'ancient-technology',
    type: 'documentary',
    badge: 'ANCIENT WONDERS',
    titleEn: 'Ancient Technology of India',
    titleHi: 'भारत की प्राचीन तकनीक',
    tagline: 'Discover the sophisticated architectural and metallurgical feats of ancient India.',
    year: 2023,
    rating: 'U',
    duration: '4 Episodes',
    genres: ['History', 'Science', 'Civilization'],
    gradientOverlay: 'linear-gradient(105deg, rgba(5,15,20,0.95) 0%, rgba(5,15,20,0.75) 50%, rgba(5,15,20,0.2) 100%)',
    posterGradient: 'url(/thumb_history.jpg) center/cover no-repeat',
    posterColor: '#0F766E',
    watchHref: '/watch/ancient-technology',
    infoHref: '/info/ancient-technology',
    teaserUrl: '/teasers/ancient-tech-teaser.mp4',
  },
];

/* Keep old HERO_SLIDES for backward compatibility */
export const HERO_SLIDES = HERO_SLIDES_V2;

/* ─── CONTENT ITEM (Generic Movie/Show/Music/Doc card) ─── */
export interface ContentItem {
  id: string;
  type: 'movie' | 'show' | 'music' | 'documentary' | 'short';
  titleEn: string;
  titleHi: string;
  year: number;
  rating: string;
  duration: string;
  genres: string[];
  categoryId: string;
  description: string;
  posterGradient: string;
  posterColor: string;
  watchProgress?: number;   // 0-100, present for "continue watching"
  isNew?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  teaserUrl: string;
  watchHref: string;
}

/* ─── MOVIES ─── */
export const MOVIES: ContentItem[] = [
  {
    id: 'mystic-bharat-m',
    type: 'documentary',
    titleEn: 'Mystic Bharat',
    titleHi: 'मिस्टिक भारत',
    year: 2024,
    rating: 'U',
    duration: '1h 20m',
    genres: ['history', 'science', 'sacred'],
    categoryId: 'movies',
    description: 'Civilizational mysteries of ancient India, decoded through modern science.',
    posterGradient: 'url(/mystic_bharat.jpg) center/cover no-repeat',
    posterColor: '#B8860B',
    isTrending: true,
    trendingRank: 1,
    teaserUrl: '/teasers/mystic-bharat-teaser.mp4',
    watchHref: '/watch/mystic-bharat',
  },
  {
    id: 'tantra-rahasya-m',
    type: 'movie',
    titleEn: 'Tantra Rahasya',
    titleHi: 'तंत्र रहस्य',
    year: 2024,
    rating: 'UA',
    duration: '1h 45m',
    genres: ['spiritual', 'tantra', 'philosophy'],
    categoryId: 'movies',
    description: 'The classical shastric foundations of Kundalini energy and sacred geometry, revealed.',
    posterGradient: 'url(/tantra_rahasya.jpg) center/cover no-repeat',
    posterColor: '#800080',
    isTrending: true,
    trendingRank: 2,
    teaserUrl: '/teasers/tantra-rahasya-teaser.mp4',
    watchHref: '/watch/tantra-rahasya',
  },
  {
    id: 'sanatan-gyan-m',
    type: 'movie',
    titleEn: 'Sanatan Gyan',
    titleHi: 'सनातन ज्ञान',
    year: 2023,
    rating: 'U',
    duration: '2h 15m',
    genres: ['spiritual', 'philosophy', 'vedas'],
    categoryId: 'movies',
    description: 'Delve into the eternal wisdom of the Vedas, Upanishads, and the Bhagavad Gita.',
    posterGradient: 'url(/sanatan_gyan.jpg) center/cover no-repeat',
    posterColor: '#D97706',
    isTrending: true,
    trendingRank: 3,
    teaserUrl: '/teasers/sanatan-gyan-teaser.mp4',
    watchHref: '/watch/sanatan-gyan',
  },
  {
    id: 'arogya-bharat-m',
    type: 'movie',
    titleEn: 'Arogya Bharat',
    titleHi: 'आरोग्य भारत',
    year: 2024,
    rating: 'U',
    duration: '1h 30m',
    genres: ['ayurveda', 'wellness', 'yoga'],
    categoryId: 'movies',
    description: 'Unlock traditional Indian health secrets — Ayurveda, Naturopathy, and Yoga.',
    posterGradient: 'url(/arogya_bharat.jpg) center/cover no-repeat',
    posterColor: '#064E3B',
    isTrending: true,
    trendingRank: 4,
    watchProgress: 45,
    teaserUrl: '/teasers/arogya-bharat-teaser.mp4',
    watchHref: '/watch/arogya-bharat',
  },
  {
    id: 'bharat-yatra-m',
    type: 'movie',
    titleEn: 'Bharat Yatra',
    titleHi: 'भारत यात्रा',
    year: 2023,
    rating: 'U',
    duration: '2h 10m',
    genres: ['travel', 'culture', 'temples'],
    categoryId: 'movies',
    description: 'An immersive travelogue showcasing India\'s sacred temples and regional folk traditions.',
    posterGradient: 'url(/bharat_yatra.jpg) center/cover no-repeat',
    posterColor: '#B85309',
    isNew: true,
    isTrending: true,
    trendingRank: 5,
    teaserUrl: '/teasers/bharat-yatra-teaser.mp4',
    watchHref: '/watch/bharat-yatra',
  },
  {
    id: 'the-craftsmen-m',
    type: 'movie',
    titleEn: 'The Craftsmen',
    titleHi: 'द क्राफ्ट्समैन',
    year: 2024,
    rating: 'U',
    duration: '1h 15m',
    genres: ['crafts', 'heritage', 'artisans'],
    categoryId: 'movies',
    description: 'Explore the life, hands, and stories of regional Indian artisans and heritage crafts.',
    posterGradient: 'url(/the_craftsmen.jpg) center/cover no-repeat',
    posterColor: '#8B3A0A',
    isTrending: true,
    trendingRank: 6,
    teaserUrl: '/teasers/the-craftsmen-teaser.mp4',
    watchHref: '/watch/the-craftsmen',
  },
  {
    id: 'prabhat-bharat-m',
    type: 'movie',
    titleEn: 'Prabhat Bharat',
    titleHi: 'प्रभात भारत',
    year: 2024,
    rating: 'U',
    duration: '1h 00m',
    genres: ['devotion', 'yoga', 'meditation'],
    categoryId: 'movies',
    description: 'Start your day with live morning Aarti, Mantras, Meditation and Yoga.',
    posterGradient: 'url(/thumb_spiritual.jpg) center/cover no-repeat',
    posterColor: '#D97706',
    isTrending: true,
    trendingRank: 7,
    watchProgress: 70,
    teaserUrl: '/teasers/prabhat-bharat-teaser.mp4',
    watchHref: '/watch/prabhat-bharat',
  },
  {
    id: 'ancient-tech-m',
    type: 'movie',
    titleEn: 'Ancient Technology of India',
    titleHi: 'भारत की प्राचीन तकनीक',
    year: 2023,
    rating: 'U',
    duration: '1h 45m',
    genres: ['history', 'science', 'civilization'],
    categoryId: 'movies',
    description: 'Discover the sophisticated architectural and metallurgical feats of ancient India.',
    posterGradient: 'url(/thumb_history.jpg) center/cover no-repeat',
    posterColor: '#0F766E',
    teaserUrl: '/teasers/ancient-tech-teaser.mp4',
    watchHref: '/watch/ancient-technology',
  },
];

export const SHOWS: ContentItem[] = [
  {
    id: 'arogya-bharat-s',
    type: 'show',
    titleEn: 'Arogya Bharat',
    titleHi: 'आरोग्य भारत',
    year: 2024,
    rating: 'U',
    duration: '24 Episodes',
    genres: ['ayurveda', 'wellness', 'yoga'],
    categoryId: 'shows',
    description: 'Unlock traditional Indian health secrets — Ayurveda, Naturopathy, and Yoga.',
    posterGradient: 'url(/arogya_bharat.jpg) center/cover no-repeat',
    posterColor: '#064E3B',
    isTrending: true,
    trendingRank: 1,
    watchProgress: 30,
    teaserUrl: '/teasers/arogya-bharat-teaser.mp4',
    watchHref: '/watch/arogya-bharat',
  },
  {
    id: 'prabhat-bharat-s',
    type: 'show',
    titleEn: 'Prabhat Bharat',
    titleHi: 'प्रभात भारत',
    year: 2024,
    rating: 'U',
    duration: 'Daily Live',
    genres: ['devotion', 'yoga', 'meditation'],
    categoryId: 'shows',
    description: 'Start your day with live morning Aarti, Mantras, Meditation and Yoga.',
    posterGradient: 'url(/thumb_spiritual.jpg) center/cover no-repeat',
    posterColor: '#D97706',
    isTrending: true,
    trendingRank: 2,
    teaserUrl: '/teasers/prabhat-bharat-teaser.mp4',
    watchHref: '/watch/prabhat-bharat',
  },
  {
    id: 'sanatan-gyan-s',
    type: 'show',
    titleEn: 'Sanatan Gyan',
    titleHi: 'सनातन ज्ञान',
    year: 2023,
    rating: 'U',
    duration: '12 Episodes',
    genres: ['spiritual', 'philosophy', 'vedas'],
    categoryId: 'shows',
    description: 'Delve into the eternal wisdom of the Vedas, Upanishads, and the Bhagavad Gita.',
    posterGradient: 'url(/sanatan_gyan.jpg) center/cover no-repeat',
    posterColor: '#D97706',
    isTrending: true,
    trendingRank: 3,
    teaserUrl: '/teasers/sanatan-gyan-teaser.mp4',
    watchHref: '/watch/sanatan-gyan',
  },
  {
    id: 'tantra-rahasya-s',
    type: 'show',
    titleEn: 'Tantra Rahasya',
    titleHi: 'तंत्र रहस्य',
    year: 2024,
    rating: 'UA',
    duration: '8 Episodes',
    genres: ['spiritual', 'tantra', 'philosophy'],
    categoryId: 'shows',
    description: 'The classical shastric foundations of Kundalini energy and sacred geometry, revealed.',
    posterGradient: 'url(/tantra_rahasya.jpg) center/cover no-repeat',
    posterColor: '#800080',
    teaserUrl: '/teasers/tantra-rahasya-teaser.mp4',
    watchHref: '/watch/tantra-rahasya',
  },
  {
    id: 'bharat-yatra-s',
    type: 'show',
    titleEn: 'Bharat Yatra',
    titleHi: 'भारत यात्रा',
    year: 2023,
    rating: 'U',
    duration: '15 Episodes',
    genres: ['travel', 'culture', 'temples'],
    categoryId: 'shows',
    description: 'An immersive travelogue showcasing India\'s sacred temples and regional folk traditions.',
    posterGradient: 'url(/bharat_yatra.jpg) center/cover no-repeat',
    posterColor: '#B85309',
    isTrending: true,
    trendingRank: 4,
    teaserUrl: '/teasers/bharat-yatra-teaser.mp4',
    watchHref: '/watch/bharat-yatra',
  },
  {
    id: 'the-craftsmen-s',
    type: 'show',
    titleEn: 'The Craftsmen',
    titleHi: 'द क्राफ्ट्समैन',
    year: 2024,
    rating: 'U',
    duration: '5 Episodes',
    genres: ['crafts', 'heritage', 'artisans'],
    categoryId: 'shows',
    description: 'Explore the life, hands, and stories of regional Indian artisans and heritage crafts.',
    posterGradient: 'url(/the_craftsmen.jpg) center/cover no-repeat',
    posterColor: '#8B3A0A',
    teaserUrl: '/teasers/the-craftsmen-teaser.mp4',
    watchHref: '/watch/the-craftsmen',
  },
];

/* ─── MUSIC CONTENT ─── */
export const MUSIC_CONTENT: ContentItem[] = [
  {
    id: 'anoushka-shankar-m',
    type: 'music',
    titleEn: 'Anoushka Shankar Live',
    titleHi: 'अनुष्का शंकर लाइव',
    year: 2023,
    rating: 'U',
    duration: '1h 45m',
    genres: ['classical', 'instrumental'],
    categoryId: 'music',
    description: 'A breathtaking live performance blending Indian classical with world music.',
    posterGradient: 'linear-gradient(135deg, #0a001a 0%, #14002d 60%, #200040 100%)',
    posterColor: '#5B21B6',
    isNew: true,
    teaserUrl: '/teasers/anoushka-teaser.mp4',
    watchHref: '/watch/anoushka-shankar',
  },
  {
    id: 'raag-bhairav-m',
    type: 'music',
    titleEn: 'Raag Bhairav — Dawn Raag',
    titleHi: 'राग भैरव — प्रातःकालीन राग',
    year: 2022,
    rating: 'U',
    duration: '1h 20m',
    genres: ['classical'],
    categoryId: 'music',
    description: 'A master rendition of Raag Bhairav, the sacred morning raga of the Bhairav family.',
    posterGradient: 'linear-gradient(135deg, #1a0800 0%, #2d1400 60%, #3d2000 100%)',
    posterColor: '#92400E',
    teaserUrl: '/teasers/raag-bhairav-teaser.mp4',
    watchHref: '/watch/raag-bhairav',
  },
  {
    id: 'folk-rajasthan-m',
    type: 'music',
    titleEn: 'Folk of Rajasthan',
    titleHi: 'राजस्थान का लोक संगीत',
    year: 2023,
    rating: 'U',
    duration: '58m',
    genres: ['folk'],
    categoryId: 'music',
    description: 'Traditional Rajasthani folk music — Manganiyar, Langas, and the desert winds.',
    posterGradient: 'linear-gradient(135deg, #2d1400 0%, #5c2800 60%, #8b3d00 100%)',
    posterColor: '#C2410C',
    teaserUrl: '/teasers/folk-rajasthan-teaser.mp4',
    watchHref: '/watch/folk-rajasthan',
  },
  {
    id: 'bhajan-kirtan-m',
    type: 'music',
    titleEn: 'Bhajan Kirtan Mahotsav',
    titleHi: 'भजन कीर्तन महोत्सव',
    year: 2024,
    rating: 'U',
    duration: '2h 10m',
    genres: ['bhajan'],
    categoryId: 'music',
    description: 'A spiritual evening of devotional singing from some of India\'s finest bhajan singers.',
    posterGradient: 'linear-gradient(135deg, #1a1000 0%, #3d2500 60%, #5c3800 100%)',
    posterColor: '#D97706',
    isNew: true,
    teaserUrl: '/teasers/bhajan-kirtan-teaser.mp4',
    watchHref: '/watch/bhajan-kirtan',
  },
];

/* ─── DOCUMENTARIES ─── */
export const DOCUMENTARIES: ContentItem[] = [
  {
    id: 'mystic-bharat-d',
    type: 'documentary',
    titleEn: 'Mystic Bharat',
    titleHi: 'मिस्टिक भारत',
    year: 2024,
    rating: 'U',
    duration: '6 Episodes',
    genres: ['history', 'science', 'sacred'],
    categoryId: 'documentaries',
    description: 'Civilizational mysteries of ancient India decoded through modern science.',
    posterGradient: 'url(/mystic_bharat.jpg) center/cover no-repeat',
    posterColor: '#B8860B',
    isTrending: true,
    trendingRank: 1,
    teaserUrl: '/teasers/mystic-bharat-teaser.mp4',
    watchHref: '/watch/mystic-bharat',
  },
  {
    id: 'bharat-yatra-d',
    type: 'documentary',
    titleEn: 'Bharat Yatra',
    titleHi: 'भारत यात्रा',
    year: 2023,
    rating: 'U',
    duration: '15 Episodes',
    genres: ['travel', 'culture', 'temples'],
    categoryId: 'documentaries',
    description: 'An immersive travelogue showcasing India\'s sacred temples and regional traditions.',
    posterGradient: 'url(/bharat_yatra.jpg) center/cover no-repeat',
    posterColor: '#B85309',
    isNew: true,
    isTrending: true,
    trendingRank: 2,
    teaserUrl: '/teasers/bharat-yatra-teaser.mp4',
    watchHref: '/watch/bharat-yatra',
  },
  {
    id: 'ancient-tech-d',
    type: 'documentary',
    titleEn: 'Ancient Technology of India',
    titleHi: 'भारत की प्राचीन तकनीक',
    year: 2023,
    rating: 'U',
    duration: '4 Episodes',
    genres: ['history', 'science', 'civilization'],
    categoryId: 'documentaries',
    description: 'Exploring the sophisticated architectural and metallurgical feats of ancient India.',
    posterGradient: 'url(/thumb_history.jpg) center/cover no-repeat',
    posterColor: '#0F766E',
    teaserUrl: '/teasers/ancient-tech-teaser.mp4',
    watchHref: '/watch/ancient-technology',
  },
];

/* ─── GENRE DEFINITIONS ─── */
export interface GenreDef {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  color: string;
}

export const MOVIE_GENRES: GenreDef[] = [
  { id: 'action',    nameEn: 'Action',     nameHi: 'एक्शन',    icon: '⚡', color: '#DC2626' },
  { id: 'adventure', nameEn: 'Adventure',  nameHi: 'एडवेंचर', icon: '🏔', color: '#0891B2' },
  { id: 'comedy',    nameEn: 'Comedy',     nameHi: 'कॉमेडी',   icon: '😄', color: '#D97706' },
  { id: 'crime',     nameEn: 'Crime',      nameHi: 'क्राइम',   icon: '🔍', color: '#7C3AED' },
  { id: 'drama',     nameEn: 'Drama',      nameHi: 'ड्रामा',   icon: '🎭', color: '#BE185D' },
  { id: 'fantasy',   nameEn: 'Fantasy',    nameHi: 'फैंटेसी',  icon: '🧙', color: '#5B21B6' },
  { id: 'horror',    nameEn: 'Horror',     nameHi: 'हॉरर',     icon: '👁', color: '#991B1B' },
  { id: 'musical',   nameEn: 'Musical',    nameHi: 'म्यूज़िकल', icon: '🎵', color: '#0D9488' },
  { id: 'romance',   nameEn: 'Romance',    nameHi: 'रोमांस',   icon: '❤', color: '#DB2777' },
  { id: 'scifi',     nameEn: 'Sci-Fi',     nameHi: 'साइ-फाई', icon: '🚀', color: '#0284C7' },
  { id: 'thriller',  nameEn: 'Thriller',   nameHi: 'थ्रिलर',   icon: '😰', color: '#374151' },
];

export const MUSIC_GENRES: GenreDef[] = [
  { id: 'classical',    nameEn: 'Classical / Raag', nameHi: 'शास्त्रीय / राग', icon: '🪗', color: '#92400E' },
  { id: 'folk',         nameEn: 'Folk',             nameHi: 'लोक संगीत',       icon: '🪘', color: '#065F46' },
  { id: 'bhajan',       nameEn: 'Bhajan Kirtan',    nameHi: 'भजन कीर्तन',      icon: '🕉', color: '#D97706' },
  { id: 'kavya',        nameEn: 'Kavya (Kavita)',   nameHi: 'काव्य (कविता)',    icon: '📜', color: '#5B21B6' },
  { id: 'instrumental', nameEn: 'Instrumental',     nameHi: 'वाद्य संगीत',     icon: '🎻', color: '#0E7490' },
  { id: 'concerts',     nameEn: 'Music Concerts',   nameHi: 'संगीत कार्यक्रम', icon: '🎤', color: '#BE185D' },
];

export const SHOW_GENRES: GenreDef[] = [
  { id: 'adventure', nameEn: 'Adventure',         nameHi: 'साहसिक',            icon: '🏔', color: '#0891B2' },
  { id: 'dharma',    nameEn: 'Dharma',             nameHi: 'धर्म',              icon: '☸', color: '#D97706' },
  { id: 'tantra',    nameEn: 'Tantra',             nameHi: 'तंत्र',             icon: '🔮', color: '#7C3AED' },
  { id: 'shashtra',  nameEn: 'Shashtra',           nameHi: 'शास्त्र',           icon: '📚', color: '#92400E' },
  { id: 'jyotish',   nameEn: 'Jyotish',            nameHi: 'ज्योतिष',           icon: '⭐', color: '#0284C7' },
  { id: 'travel',    nameEn: 'Travel',             nameHi: 'यात्रा',            icon: '🗺', color: '#059669' },
  { id: 'tirth',     nameEn: 'Tirth / Mandir',     nameHi: 'तीर्थ / मंदिर',    icon: '🏛', color: '#B45309' },
  { id: 'culture',   nameEn: 'Culture / Festivals', nameHi: 'संस्कृति / उत्सव', icon: '🎉', color: '#BE185D' },
  { id: 'skill',     nameEn: 'Skill Learning',     nameHi: 'कौशल शिक्षा',      icon: '🎓', color: '#374151' },
];

/* ─── INDIAN LANGUAGES (22 Scheduled Languages) ─── */
export interface IndianLanguage {
  code: string;
  nativeName: string;      // Name in its own script
  englishName: string;
  script: string;
  scriptName: string;
  primaryStates: string[];
  rtl?: boolean;            // For Urdu
  fontFamily?: string;      // Specific font hint for rendering
}

export const INDIAN_LANGUAGES: IndianLanguage[] = [
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['UP', 'MP', 'Rajasthan', 'Bihar', 'Jharkhand', 'Uttarakhand', 'Himachal Pradesh', 'Haryana', 'Chhattisgarh'],
    fontFamily: 'Mukta, Noto Sans Devanagari',
  },
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    script: 'Latin',
    scriptName: 'Latin',
    primaryStates: ['All India (Official)'],
    fontFamily: 'General Sans, Inter',
  },
  {
    code: 'bn',
    nativeName: 'বাংলা',
    englishName: 'Bangla',
    script: 'Bengali',
    scriptName: 'বাংলা লিপি',
    primaryStates: ['West Bengal', 'Tripura', 'Assam'],
    fontFamily: 'Noto Sans Bengali',
  },
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    script: 'Telugu',
    scriptName: 'తెలుగు లిపి',
    primaryStates: ['Andhra Pradesh', 'Telangana'],
    fontFamily: 'Noto Sans Telugu',
  },
  {
    code: 'mr',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Maharashtra', 'Goa'],
    fontFamily: 'Mukta, Noto Sans Devanagari',
  },
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    script: 'Tamil',
    scriptName: 'தமிழ் எழுத்து',
    primaryStates: ['Tamil Nadu', 'Puducherry'],
    fontFamily: 'Noto Sans Tamil',
  },
  {
    code: 'gu',
    nativeName: 'ગુજરાતી',
    englishName: 'Gujarati',
    script: 'Gujarati',
    scriptName: 'ગુજરાતી લિપિ',
    primaryStates: ['Gujarat', 'Dadra & Nagar Haveli'],
    fontFamily: 'Noto Sans Gujarati',
  },
  {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    script: 'Kannada',
    scriptName: 'ಕನ್ನಡ ಲಿಪಿ',
    primaryStates: ['Karnataka'],
    fontFamily: 'Noto Sans Kannada',
  },
  {
    code: 'pa',
    nativeName: 'ਪੰਜਾਬੀ',
    englishName: 'Punjabi',
    script: 'Gurmukhi',
    scriptName: 'ਗੁਰਮੁਖੀ',
    primaryStates: ['Punjab', 'Haryana', 'Delhi'],
    fontFamily: 'Noto Sans Gurmukhi',
  },
  {
    code: 'ml',
    nativeName: 'മലയാളം',
    englishName: 'Malayalam',
    script: 'Malayalam',
    scriptName: 'മലയാളം ലിപി',
    primaryStates: ['Kerala', 'Lakshadweep'],
    fontFamily: 'Noto Sans Malayalam',
  },
  {
    code: 'or',
    nativeName: 'ଓଡ଼ିଆ',
    englishName: 'Odia',
    script: 'Odia',
    scriptName: 'ଓଡ଼ିଆ ଲିପି',
    primaryStates: ['Odisha'],
    fontFamily: 'Noto Sans Oriya',
  },
  {
    code: 'as',
    nativeName: 'অসমীয়া',
    englishName: 'Assamese',
    script: 'Assamese',
    scriptName: 'অসমীয়া লিপি',
    primaryStates: ['Assam'],
    fontFamily: 'Noto Sans Bengali',
  },
  {
    code: 'mai',
    nativeName: 'मैथिली',
    englishName: 'Maithili',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Bihar', 'Jharkhand'],
    fontFamily: 'Mukta',
  },
  {
    code: 'sa',
    nativeName: 'संस्कृत',
    englishName: 'Sanskrit',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Uttarakhand (Official)'],
    fontFamily: 'Tiro Devanagari Hindi',
  },
  {
    code: 'ur',
    nativeName: 'اردو',
    englishName: 'Urdu',
    script: 'Nastaliq',
    scriptName: 'نستعلیق',
    primaryStates: ['J&K', 'Telangana', 'UP'],
    rtl: true,
    fontFamily: 'Noto Nastaliq Urdu',
  },
  {
    code: 'ks',
    nativeName: 'कॉशुर',
    englishName: 'Kashmiri',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Jammu & Kashmir'],
    fontFamily: 'Mukta',
  },
  {
    code: 'sd',
    nativeName: 'सिन्धी',
    englishName: 'Sindhi',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Gujarat', 'Maharashtra', 'Rajasthan'],
    fontFamily: 'Mukta',
  },
  {
    code: 'ne',
    nativeName: 'नेपाली',
    englishName: 'Nepali',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Sikkim', 'West Bengal (Darjeeling)'],
    fontFamily: 'Mukta',
  },
  {
    code: 'doi',
    nativeName: 'डोगरी',
    englishName: 'Dogri',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Jammu & Kashmir'],
    fontFamily: 'Mukta',
  },
  {
    code: 'kok',
    nativeName: 'कोंकणी',
    englishName: 'Konkani',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Goa', 'Karnataka', 'Maharashtra'],
    fontFamily: 'Mukta',
  },
  {
    code: 'mni',
    nativeName: 'মৈতৈলোন্',
    englishName: 'Meitei (Manipuri)',
    script: 'Meitei Mayek',
    scriptName: 'Meitei Mayek',
    primaryStates: ['Manipur'],
    fontFamily: 'Noto Sans Meetei Mayek',
  },
  {
    code: 'brx',
    nativeName: 'बड़ो',
    englishName: 'Bodo',
    script: 'Devanagari',
    scriptName: 'देवनागरी',
    primaryStates: ['Assam'],
    fontFamily: 'Mukta',
  },
];

/* ─── CONTINUE WATCHING (simulated — real data from user profile API) ─── */
export const CONTINUE_WATCHING: ContentItem[] = [
  { ...MOVIES[1], watchProgress: 45 },  // Tantra Rahasya — 45%
  { ...MOVIES[5], watchProgress: 70 },  // The Craftsmen — 70%
  { ...SHOWS[0], watchProgress: 30 },   // Arogya Bharat — 30%
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

