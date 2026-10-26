import type { Locale } from '@/lib/locales'

type GeneratedAsset = {
  src: string
  alt: Record<Locale, string>
}

const ASSETS = {
  leadership: {
    src: '/images/generated/conceptual-leadership.png',
    alt: {
      en: 'Conceptual cut-paper illustration of an anonymous business leader with construction and renewable-energy motifs.',
      bn: 'নির্মাণ ও নবায়নযোগ্য জ্বালানির প্রতীকসহ একজন পরিচয়বিহীন ব্যবসায়িক নেতার কাগজ-কাটা ধাঁচের ধারণামূলক চিত্র।',
    },
  },
  'n-islam': {
    src: '/images/generated/n-islam-construction.png',
    alt: {
      en: 'Conceptual editorial illustration of a concrete building structure under construction at sunrise.',
      bn: 'সূর্যোদয়ের আলোয় নির্মাণাধীন কংক্রিট ভবনের কাঠামোর ধারণামূলক সম্পাদকীয় চিত্র।',
    },
  },
  'paper-star': {
    src: '/images/generated/paper-star-circular-supply.png',
    alt: {
      en: 'Conceptual editorial illustration connecting garment paper supply, international sourcing and recovered paper fibre.',
      bn: 'পোশাকশিল্পের কাগজ সরবরাহ, আন্তর্জাতিক উৎস এবং পুনরুদ্ধার করা কাগজের আঁশকে যুক্ত করা ধারণামূলক সম্পাদকীয় চিত্র।',
    },
  },
  'smart-car': {
    src: '/images/generated/smart-car-green-mobility.png',
    alt: {
      en: 'Conceptual editorial illustration of an electric car charging beneath a solar canopy.',
      bn: 'সৌর ছাউনির নিচে চার্জ হওয়া বৈদ্যুতিক গাড়ির ধারণামূলক সম্পাদকীয় চিত্র।',
    },
  },
  'garments-supporting-paper': {
    src: '/images/generated/garments-supporting-paper.png',
    alt: {
      en: 'Conceptual editorial illustration of garment pattern paper, cutting templates and measuring tools.',
      bn: 'পোশাকের প্যাটার্ন কাগজ, কাটিং টেমপ্লেট ও পরিমাপের সরঞ্জামের ধারণামূলক সম্পাদকীয় চিত্র।',
    },
  },
  'china-paper-supply': {
    src: '/images/generated/china-paper-supply.png',
    alt: {
      en: 'Conceptual editorial illustration of bulk paper rolls and sheet pallets moving through an international port.',
      bn: 'আন্তর্জাতিক বন্দরের মধ্য দিয়ে পরিবাহিত বড় কাগজের রোল ও শিটের প্যালেটের ধারণামূলক সম্পাদকীয় চিত্র।',
    },
  },
  'wastage-recycling': {
    src: '/images/generated/wastage-recycling.png',
    alt: {
      en: 'Conceptual editorial illustration showing paper offcuts becoming recovered fibre and new paper rolls.',
      bn: 'কাগজের টুকরা থেকে পুনরুদ্ধার করা আঁশ ও নতুন কাগজের রোল তৈরির ধারণামূলক সম্পাদকীয় চিত্র।',
    },
  },
  'dream-ground': {
    src: '/images/generated/dream-ground.png',
    alt: {
      en: 'Conceptual editorial illustration of an open community ground and a path at sunrise.',
      bn: 'সূর্যোদয়ের আলোয় উন্মুক্ত কমিউনিটি মাঠ ও পথের ধারণামূলক সম্পাদকীয় চিত্র।',
    },
  },
  'aid-for-men': {
    src: '/images/generated/aid-for-men.png',
    alt: {
      en: 'Conceptual cut-paper illustration of anonymous men in a calm, supportive courtyard conversation.',
      bn: 'শান্ত ও সহায়ক উঠানে আলাপরত পরিচয়বিহীন পুরুষদের কাগজ-কাটা ধাঁচের ধারণামূলক চিত্র।',
    },
  },
} satisfies Record<string, GeneratedAsset>

export function getGeneratedAsset(slug: string | null | undefined, locale: Locale) {
  if (!slug || !(slug in ASSETS)) return null
  const asset = ASSETS[slug as keyof typeof ASSETS]
  return { src: asset.src, alt: asset.alt[locale] }
}
