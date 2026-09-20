import type { Field } from 'payload'

export const bengaliPanel = (fields: Field[]): Field => ({
  name: 'bengali',
  type: 'group',
  label: 'বাংলা',
  admin: {
    description: 'Optional Bengali copy. Empty fields fall back to the English content.',
  },
  fields,
})

export const bengaliSeoField = (): Field => ({
  name: 'seo',
  type: 'group',
  label: 'Search & sharing',
  fields: [
    { name: 'title', type: 'text', maxLength: 70 },
    { name: 'description', type: 'textarea', maxLength: 160 },
  ],
})

export const bengaliContactField = (): Field => ({
  name: 'contact',
  type: 'group',
  label: 'Address',
  fields: [{ name: 'address', type: 'textarea' }],
})

export const bengaliStatsField = (): Field => ({
  name: 'stats',
  type: 'array',
  label: 'Key figures',
  maxRows: 4,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
        { name: 'unit', type: 'text', admin: { width: '25%' } },
        { name: 'label', type: 'text', required: true, admin: { width: '45%' } },
      ],
    },
  ],
})
export const bengaliCapabilitiesField = (): Field => ({
  name: 'capabilities',
  type: 'array',
  label: 'Capabilities',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
  ],
})

export const bengaliFeedField = (): Field => ({
  name: 'feedConfig',
  type: 'group',
  label: 'Curated updates',
  fields: [
    {
      name: 'curated',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea' },
        { name: 'date', type: 'date', required: true },
        { name: 'url', type: 'text' },
        {
          name: 'platform',
          type: 'select',
          options: ['facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website'],
          defaultValue: 'website',
        },
      ],
    },
  ],
})
