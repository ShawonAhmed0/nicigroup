import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/shared'
import { bengaliPanel, bengaliSeoField } from '@/fields/bengali'
import { slugField } from '@/fields/slug'
import { isEditor, publishedOrSignedIn } from '@/lib/access'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News item', plural: 'News' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'company', '_status'],
    group: 'Content',
  },
  versions: { drafts: true, maxPerDoc: 10 },
  access: {
    read: publishedOrSignedIn,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      admin: { position: 'sidebar', description: 'Leave empty for group-wide announcements.' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', maxLength: 240 },
    { name: 'body', type: 'richText' },
    seoField,
    bengaliPanel([
      { name: 'title', type: 'text' },
      { name: 'excerpt', type: 'textarea', maxLength: 240 },
      { name: 'body', type: 'richText' },
      bengaliSeoField(),
    ]),
    slugField('title'),
  ],
}
