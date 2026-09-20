import type { CollectionConfig } from 'payload'

import {
  capabilitiesField,
  contactField,
  feedConfigField,
  galleryField,
  seoField,
  socialsField,
  statsField,
} from '@/fields/shared'
import { slugField } from '@/fields/slug'
import {
  bengaliCapabilitiesField,
  bengaliContactField,
  bengaliFeedField,
  bengaliPanel,
  bengaliSeoField,
  bengaliStatsField,
} from '@/fields/bengali'
import { isEditor, publishedOrSignedIn, scopedToCompany } from '@/lib/access'

/**
 * An operating business under NICI Group. Adding one here is all it takes for it
 * to appear in the homepage grid, the main navigation, the footer index, the
 * sitemap and the Organization markup — nothing is hard-coded anywhere else.
 */
export const Companies: CollectionConfig = {
  slug: 'companies',
  labels: { singular: 'Company', plural: 'Companies' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sector', 'order', '_status'],
    group: 'Businesses',
    description: 'The operating companies of NICI Group.',
    livePreview: {
      url: ({ data }) => `/companies/${data?.slug}`,
    },
  },
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    read: publishedOrSignedIn,
    create: isEditor,
    update: scopedToCompany('id'),
    delete: isEditor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { placeholder: 'Paper Star & Co.' } },
            {
              name: 'sector',
              type: 'text',
              required: true,
              admin: {
                description: 'One line under the name, everywhere the company appears.',
                placeholder: 'Garments paper, China supply & recycling',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 200,
              admin: { description: 'Two lines on the homepage card. Up to 200 characters.' },
            },
            { name: 'overview', type: 'richText', admin: { description: 'The main body of the company page.' } },
            { name: 'vision', type: 'richText' },
            capabilitiesField,
            statsField,
          ],
        },
        {
          label: 'Identity',
          fields: [
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { description: '16:9, 2000px wide or more.' } },
            {
              name: 'brandColour',
              type: 'text',
              defaultValue: '#2F5F82',
              admin: {
                description: 'Hex colour used for this company’s card rail and page accent.',
                placeholder: '#2F5F82',
              },
              validate: (value: unknown) =>
                typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value)
                  ? true
                  : 'Enter a six-digit hex colour, for example #2F5F82.',
            },
            { name: 'establishedYear', type: 'number', min: 1900, max: 2100 },
            galleryField,
            {
              name: 'partners',
              type: 'array',
              label: 'Clients & partners',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'logo', type: 'upload', relationTo: 'media' },
                { name: 'url', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Social & contact',
          fields: [socialsField, feedConfigField, contactField],
        },
        {
          label: 'Search & sharing',
          fields: [seoField],
        },
      ],
    },
    bengaliPanel([
      { name: 'name', type: 'text' },
      { name: 'sector', type: 'text' },
      { name: 'summary', type: 'textarea', maxLength: 200 },
      { name: 'overview', type: 'richText' },
      { name: 'vision', type: 'richText' },
      bengaliCapabilitiesField(),
      bengaliStatsField(),
      bengaliFeedField(),
      bengaliContactField(),
      bengaliSeoField(),
    ]),
    slugField('name'),
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Lower numbers appear first in the grid and the menu.' },
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Uncheck to keep the page live but off the homepage grid.' },
    },
  ],
}
