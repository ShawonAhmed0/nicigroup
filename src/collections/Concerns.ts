import type { CollectionConfig } from 'payload'

import { contactField, feedConfigField, galleryField, seoField, socialsField, statsField } from '@/fields/shared'
import {
  bengaliContactField,
  bengaliFeedField,
  bengaliPanel,
  bengaliSeoField,
  bengaliStatsField,
} from '@/fields/bengali'
import { slugField } from '@/fields/slug'
import { isEditor, publishedOrSignedIn } from '@/lib/access'

/**
 * Sister concerns and social initiatives — Dream Ground, Aid for Men Foundation.
 * Same shape as a company with the commercial blocks off and impact blocks on,
 * and a quieter visual treatment on the front end: these read as social work,
 * not as a product line.
 */
export const Concerns: CollectionConfig = {
  slug: 'concerns',
  labels: { singular: 'Concern', plural: 'Sister concerns & CSR' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'kind', 'order', '_status'],
    group: 'Businesses',
  },
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    read: publishedOrSignedIn,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'csr',
      options: [
        { label: 'Social initiative (CSR)', value: 'csr' },
        { label: 'Sister concern', value: 'sister' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'tagline', type: 'text' },
    { name: 'summary', type: 'textarea', required: true, maxLength: 200 },
    { name: 'mission', type: 'richText' },
    { name: 'activities', type: 'richText' },
    statsField,
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Own website',
      admin: { description: 'If this concern has its own site, link it here as well as the detail page.' },
    },
    {
      name: 'supportUrl',
      type: 'text',
      label: 'Support or volunteer link',
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    galleryField,
    socialsField,
    feedConfigField,
    contactField,
    seoField,
    bengaliPanel([
      { name: 'name', type: 'text' },
      { name: 'tagline', type: 'text' },
      { name: 'summary', type: 'textarea', maxLength: 200 },
      { name: 'mission', type: 'richText' },
      { name: 'activities', type: 'richText' },
      bengaliStatsField(),
      bengaliFeedField(),
      bengaliContactField(),
      bengaliSeoField(),
    ]),
    slugField('name'),
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
  ],
}
