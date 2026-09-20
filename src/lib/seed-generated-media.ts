/**
 * Registers the generated editorial image set with Payload and connects each
 * asset to the public record that currently needs it.
 *
 * The images are deliberately described as conceptual illustrations. They are
 * useful while NICI's own photography is pending, but they must never be
 * presented as evidence of a real project, facility, programme or person.
 *
 * Run with: npm run seed:media
 */
import config from '@payload-config'
import path from 'path'
import { getPayload, type Payload } from 'payload'

type GeneratedAsset = {
  key: string
  filename: string
  alt: string
  altBn: string
}

const CREDIT = 'AI-generated conceptual illustration — temporary editorial asset'

const GENERATED_ASSETS: GeneratedAsset[] = [
  {
    key: 'leadership',
    filename: 'conceptual-leadership.png',
    alt: 'Conceptual cut-paper illustration of an anonymous business leader with construction and renewable-energy motifs.',
    altBn:
      'নির্মাণ ও নবায়নযোগ্য জ্বালানির প্রতীকসহ একজন পরিচয়বিহীন ব্যবসায়িক নেতার কাগজ-কাটা ধাঁচের ধারণামূলক চিত্র।',
  },
  {
    key: 'n-islam',
    filename: 'n-islam-construction.png',
    alt: 'Conceptual editorial illustration of a concrete building structure under construction at sunrise.',
    altBn: 'সূর্যোদয়ের আলোয় নির্মাণাধীন কংক্রিট ভবনের কাঠামোর ধারণামূলক সম্পাদকীয় চিত্র।',
  },
  {
    key: 'paper-star',
    filename: 'paper-star-circular-supply.png',
    alt: 'Conceptual editorial illustration connecting garment paper supply, international sourcing and recovered paper fibre.',
    altBn:
      'পোশাকশিল্পের কাগজ সরবরাহ, আন্তর্জাতিক উৎস এবং পুনরুদ্ধার করা কাগজের আঁশকে যুক্ত করা ধারণামূলক সম্পাদকীয় চিত্র।',
  },
  {
    key: 'smart-car',
    filename: 'smart-car-green-mobility.png',
    alt: 'Conceptual editorial illustration of an electric car charging beneath a solar canopy.',
    altBn: 'সৌর ছাউনির নিচে চার্জ হওয়া বৈদ্যুতিক গাড়ির ধারণামূলক সম্পাদকীয় চিত্র।',
  },
  {
    key: 'garments-supporting-paper',
    filename: 'garments-supporting-paper.png',
    alt: 'Conceptual editorial illustration of garment pattern paper, cutting templates and measuring tools.',
    altBn: 'পোশাকের প্যাটার্ন কাগজ, কাটিং টেমপ্লেট ও পরিমাপের সরঞ্জামের ধারণামূলক সম্পাদকীয় চিত্র।',
  },
  {
    key: 'china-paper-supply',
    filename: 'china-paper-supply.png',
    alt: 'Conceptual editorial illustration of bulk paper rolls and sheet pallets moving through an international port.',
    altBn: 'আন্তর্জাতিক বন্দরের মধ্য দিয়ে পরিবাহিত বড় কাগজের রোল ও শিটের প্যালেটের ধারণামূলক সম্পাদকীয় চিত্র।',
  },
  {
    key: 'wastage-recycling',
    filename: 'wastage-recycling.png',
    alt: 'Conceptual editorial illustration showing paper offcuts becoming recovered fibre and new paper rolls.',
    altBn: 'কাগজের টুকরা থেকে পুনরুদ্ধার করা আঁশ ও নতুন কাগজের রোল তৈরির ধারণামূলক সম্পাদকীয় চিত্র।',
  },
  {
    key: 'dream-ground',
    filename: 'dream-ground.png',
    alt: 'Conceptual editorial illustration of an open community ground and a path at sunrise.',
    altBn: 'সূর্যোদয়ের আলোয় উন্মুক্ত কমিউনিটি মাঠ ও পথের ধারণামূলক সম্পাদকীয় চিত্র।',
  },
  {
    key: 'aid-for-men',
    filename: 'aid-for-men.png',
    alt: 'Conceptual cut-paper illustration of anonymous men in a calm, supportive courtyard conversation.',
    altBn: 'শান্ত ও সহায়ক উঠানে আলাপরত পরিচয়বিহীন পুরুষদের কাগজ-কাটা ধাঁচের ধারণামূলক চিত্র।',
  },
]

const imagePath = (filename: string) =>
  path.resolve(process.cwd(), 'public', 'images', 'generated', filename)

const upsertMedia = async (payload: Payload, asset: GeneratedAsset) => {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: asset.filename } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    const updated = await payload.update({
      collection: 'media',
      id: existing.docs[0].id,
      filePath: imagePath(asset.filename),
      overwriteExistingFiles: true,
      data: {
        alt: asset.alt,
        credit: CREDIT,
        bengali: { alt: asset.altBn },
      },
    })
    return updated.id
  }

  const created = await payload.create({
    collection: 'media',
    data: {
      alt: asset.alt,
      credit: CREDIT,
      bengali: { alt: asset.altBn },
    },
    filePath: imagePath(asset.filename),
  })
  return created.id
}

const findPublishedBySlug = async (
  payload: Payload,
  collection: 'companies' | 'wings' | 'concerns',
  slug: string,
) => {
  const result = await payload.find({
    collection,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 0,
  })

  const document = result.docs[0]
  if (!document) throw new Error(`Cannot attach generated media: no published ${collection} record found for ${slug}.`)
  return document
}

const seedGeneratedMedia = async () => {
  const payload = await getPayload({ config })
  const mediaIds = new Map<string, number>()

  for (const asset of GENERATED_ASSETS) {
    mediaIds.set(asset.key, await upsertMedia(payload, asset))
  }

  const mediaId = (key: string) => {
    const id = mediaIds.get(key)
    if (id === undefined) throw new Error(`Generated media was not registered for ${key}.`)
    return id
  }

  const group = await payload.findGlobal({ slug: 'group-settings', depth: 0 })
  await payload.updateGlobal({
    slug: 'group-settings',
    data: {
      chairman: {
        ...group.chairman,
        portrait: mediaId('leadership'),
      },
    },
  })

  for (const slug of ['n-islam', 'paper-star', 'smart-car'] as const) {
    const company = await findPublishedBySlug(payload, 'companies', slug)
    await payload.update({
      collection: 'companies',
      id: company.id,
      draft: false,
      data: { heroImage: mediaId(slug), _status: 'published' },
    })
  }

  for (const slug of ['garments-supporting-paper', 'china-paper-supply', 'wastage-recycling'] as const) {
    const wing = await findPublishedBySlug(payload, 'wings', slug)
    await payload.update({
      collection: 'wings',
      id: wing.id,
      draft: false,
      data: { image: mediaId(slug), _status: 'published' },
    })
  }

  for (const slug of ['dream-ground', 'aid-for-men'] as const) {
    const concern = await findPublishedBySlug(payload, 'concerns', slug)
    await payload.update({
      collection: 'concerns',
      id: concern.id,
      draft: false,
      data: { heroImage: mediaId(slug), _status: 'published' },
    })
  }

  payload.logger.info(`Registered and attached ${GENERATED_ASSETS.length} generated conceptual illustrations.`)
}

await seedGeneratedMedia()
process.exit(0)
