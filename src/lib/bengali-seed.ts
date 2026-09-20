import type { Payload } from 'payload'

const GROUP = {
  name: 'NICI Group',
  positioning: 'একই গ্রুপের অধীনে নির্মাণ, কাগজ ও পরিবেশবান্ধব জ্বালানি।',
  summary:
    'NICI Group নির্মাণ, কাগজ সরবরাহ ও পুনর্ব্যবহার এবং পরিবেশবান্ধব যাতায়াত—এই তিনটি পরিচালনাধীন ব্যবসাকে এর সামাজিক উদ্যোগগুলোর সঙ্গে একত্র করে।',
}

const COMPANIES = [
  {
    slug: 'n-islam',
    name: 'N Islam & Co.',
    sector: 'ভবন নির্মাণ ও ঠিকাদারি',
    summary: 'আবাসিক, বাণিজ্যিক ও প্রাতিষ্ঠানিক প্রকল্পে ভবন নির্মাণ ও ঠিকাদারি।',
  },
  {
    slug: 'paper-star',
    name: 'Paper Star & Co.',
    sector: 'পোশাকশিল্পের কাগজ, চীন থেকে সরবরাহ ও পুনর্ব্যবহার',
    summary: 'পোশাকশিল্পে কাগজ সরবরাহ, চীন থেকে সরাসরি আমদানি এবং ব্যবহৃত কাগজ পুনরুদ্ধার।',
  },
  {
    slug: 'smart-car',
    name: 'Smart Car Center',
    sector: 'পরিবেশবান্ধব যাতায়াত ও নবায়নযোগ্য জ্বালানি',
    summary: 'বৈদ্যুতিক যান, চার্জিং ও সৌরশক্তিকেন্দ্রিক পরিবেশবান্ধব যাতায়াত ও নবায়নযোগ্য জ্বালানি।',
  },
] as const

const WINGS = [
  { slug: 'building-construction', name: 'ভবন নির্মাণ', summary: 'আবাসিক, বাণিজ্যিক ও প্রাতিষ্ঠানিক ভবনের শুরু থেকে সম্পূর্ণ নির্মাণ।' },
  { slug: 'contracting-and-tendering', name: 'ঠিকাদারি ও দরপত্র', summary: 'সরকারি ও বেসরকারি কাজের চুক্তি বাস্তবায়ন এবং দরপত্রে অংশগ্রহণ।' },
  { slug: 'renovation-and-fit-out', name: 'সংস্কার ও ফিট-আউট', summary: 'বিদ্যমান স্থাপনার সংস্কার, সম্প্রসারণ ও অভ্যন্তরীণ ফিট-আউট।' },
  { slug: 'garments-supporting-paper', name: 'পোশাকশিল্পের সহায়ক কাগজ', summary: 'কাটিং, প্যাকিং ও প্যাটার্নের কাজে পোশাক প্রস্তুতকারকদের জন্য সহায়ক কাগজ সরবরাহ।' },
  { slug: 'china-paper-supply', name: 'চীন থেকে কাগজ সরবরাহ', summary: 'চীনের মিল ও বাণিজ্যিক অংশীদারদের কাছ থেকে সরাসরি কাগজ আমদানি ও সরবরাহ।' },
  { slug: 'wastage-recycling', name: 'বর্জ্য কাগজ পুনর্ব্যবহার', summary: 'পোশাকশিল্পের সরবরাহ শৃঙ্খল থেকে পাওয়া বর্জ্য কাগজ সংগ্রহ ও পুনর্ব্যবহার।' },
  { slug: 'ev-sales-and-service', name: 'বৈদ্যুতিক যান বিক্রয় ও সেবা', summary: 'বৈদ্যুতিক যান বিক্রয়, সার্ভিসিং ও যন্ত্রাংশ।' },
  { slug: 'charging-infrastructure', name: 'চার্জিং অবকাঠামো', summary: 'চার্জিং পয়েন্ট সরবরাহ, স্থাপন ও রক্ষণাবেক্ষণ।' },
  { slug: 'solar-and-renewables', name: 'সৌরশক্তি ও নবায়নযোগ্য জ্বালানি', summary: 'বাড়ি ও ব্যবসাপ্রতিষ্ঠানের জন্য সৌরবিদ্যুৎ স্থাপন ও নবায়নযোগ্য জ্বালানি ব্যবস্থা।' },
] as const

const CONCERNS = [
  { slug: 'dream-ground', name: 'Dream Ground', summary: 'NICI Group-এর একটি সামাজিক উদ্যোগ।' },
  { slug: 'aid-for-men', name: 'Aid for Men Foundation', summary: 'NICI Group-এর একটি সামাজিক উদ্যোগ।' },
] as const

export async function seedBengaliContent(payload: Payload) {
  await payload.updateGlobal({ slug: 'group-settings', data: { bengali: GROUP } })

  for (const translation of COMPANIES) {
    const { docs } = await payload.find({
      collection: 'companies',
      where: { slug: { equals: translation.slug } },
      limit: 1,
    })
    const company = docs[0]
    if (!company) continue

    await payload.update({
      collection: 'companies',
      id: company.id,
      data: {
        bengali: {
          name: translation.name,
          sector: translation.sector,
          summary: translation.summary,
        },
      },
    })
  }

  for (const translation of WINGS) {
    const { docs } = await payload.find({
      collection: 'wings',
      where: { slug: { equals: translation.slug } },
      draft: true,
      limit: 1,
    })
    const wing = docs[0]
    if (!wing) continue

    await payload.update({
      collection: 'wings',
      id: wing.id,
      data: { bengali: { name: translation.name, summary: translation.summary } },
      draft: wing._status === 'draft',
    })
  }

  for (const translation of CONCERNS) {
    const { docs } = await payload.find({
      collection: 'concerns',
      where: { slug: { equals: translation.slug } },
      limit: 1,
    })
    const concern = docs[0]
    if (!concern) continue

    await payload.update({
      collection: 'concerns',
      id: concern.id,
      data: { bengali: { name: translation.name, summary: translation.summary } },
    })
  }

  payload.logger.info('Bengali content is ready for the seeded NICI Group records.')
}
