import type { CollectionConfig } from 'payload'

import { galleryField, seoField } from '@/fields/shared'
import { bengaliPanel, bengaliSeoField } from '@/fields/bengali'
import { slugField } from '@/fields/slug'
import { isEditor, publishedOrSignedIn, scopedToCompany } from '@/lib/access'

/**
 * A sub-business or service line inside a company — "Wastage Recycling" under
 * Paper Star & Co., for instance. The `company` relationship is the parent link
 * that produces the URL, the breadcrumb and the sibling strip. Two levels deep
 * and no further: anything finer becomes a section within the wing page.
 */
export const Wings: CollectionConfig = {
  slug: 'wings',
  labels: { singular: 'Wing', plural: 'Wings' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'order', '_status'],
    group: 'Businesses',
    description: 'Sub-businesses and service lines, each belonging to one company.',
  },
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    read: publishedOrSignedIn,
    create: isEditor,
    update: scopedToCompany('company'),
    delete: isEditor,
  },
  fields: [
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Which company this wing belongs to. Sets the page address.',
      },
    },
    { name: 'name', type: 'text', required: true, admin: { placeholder: 'Wastage Recycling' } },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: { description: 'Shown on the company page card.' },
    },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    galleryField,
    {
      name: 'details',
      type: 'array',
      label: 'Specifications',
      labels: { singular: 'Row', plural: 'Rows' },
      admin: {
        description: 'Rendered as a specification table — grade, capacity, origin, lead time, and so on.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '40%', placeholder: 'Lead time' } },
            { name: 'value', type: 'text', required: true, admin: { width: '60%', placeholder: '21–30 days from order' } },
          ],
        },
      ],
    },
    bengaliPanel([
      { name: 'name', type: 'text' },
      { name: 'summary', type: 'textarea', maxLength: 200 },
      { name: 'description', type: 'richText' },
      {
        name: 'details',
        type: 'array',
        label: 'Specifications',
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'value', type: 'text', required: true },
        ],
      },
      bengaliSeoField(),
    ]),
    seoField,
    slugField('name'),
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
}
