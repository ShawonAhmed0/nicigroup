import type { CollectionConfig } from 'payload'

import { galleryField, seoField } from '@/fields/shared'
import { bengaliPanel, bengaliSeoField } from '@/fields/bengali'
import { slugField } from '@/fields/slug'
import { isEditor, publishedOrSignedIn, scopedToCompany } from '@/lib/access'

/** Completed work. Feeds /projects and the "Selected work" block on each company page. */
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'year', '_status'],
    group: 'Content',
  },
  versions: { drafts: true, maxPerDoc: 10 },
  access: {
    read: publishedOrSignedIn,
    create: isEditor,
    update: scopedToCompany('company'),
    delete: isEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
      index: true,
      admin: { position: 'sidebar', description: 'Used to filter the project gallery.' },
    },
    {
      name: 'wing',
      type: 'relationship',
      relationTo: 'wings',
      admin: { position: 'sidebar', description: 'Optional — narrows the project to one wing.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'year', type: 'number', required: true, min: 1900, max: 2100, admin: { width: '33%' } },
        { name: 'location', type: 'text', admin: { width: '33%', placeholder: 'Gazipur, Dhaka' } },
        { name: 'client', type: 'text', admin: { width: '34%' } },
      ],
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'summary', type: 'textarea', maxLength: 240 },
    { name: 'description', type: 'richText' },
    galleryField,
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    seoField,
    bengaliPanel([
      { name: 'title', type: 'text' },
      { name: 'location', type: 'text' },
      { name: 'summary', type: 'textarea', maxLength: 240 },
      { name: 'description', type: 'richText' },
      bengaliSeoField(),
    ]),
    slugField('title'),
  ],
}
