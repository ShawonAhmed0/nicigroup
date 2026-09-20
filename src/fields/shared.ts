import type { Field, GroupField } from 'payload'

/** Search engine + social share metadata. Falls back to the record's own name/summary. */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'Search & sharing',
  admin: {
    description: 'Leave blank to fall back to the name and summary above.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 70,
      admin: { description: 'Shown as the headline in Google results. Up to 70 characters.' },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 160,
      admin: { description: 'The grey text under the headline in Google results. Up to 160 characters.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Shown when the page is shared on Facebook, LinkedIn or WhatsApp. 1200 x 630.' },
    },
  ],
}

/** Where this business is and who picks up its enquiries. */
export const contactField: GroupField = {
  name: 'contact',
  type: 'group',
  label: 'Contact',
  fields: [
    { name: 'address', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { width: '50%' } },
        { name: 'email', type: 'email', admin: { width: '50%' } },
      ],
    },
    {
      name: 'mapUrl',
      type: 'text',
      label: 'Google Maps link',
      admin: { description: 'Paste the "Share" link from Google Maps.' },
    },
    {
      name: 'enquiryInbox',
      type: 'email',
      admin: {
        description: 'Enquiries sent from this page are delivered here. Falls back to the group inbox if empty.',
      },
    },
  ],
}

export const SOCIAL_PLATFORMS = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'X (Twitter)', value: 'x' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'WhatsApp', value: 'whatsapp' },
] as const

/** Profile links. Independent of whether a live feed is connected. */
export const socialsField: Field = {
  name: 'socials',
  type: 'array',
  label: 'Social profiles',
  labels: { singular: 'Profile', plural: 'Profiles' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [...SOCIAL_PLATFORMS],
          admin: { width: '40%' },
        },
        { name: 'url', type: 'text', required: true, admin: { width: '60%' } },
      ],
    },
  ],
}

/**
 * Live feed wiring. Only Facebook, Instagram and YouTube can be pulled —
 * LinkedIn and X have no usable public feed API. See docs/social-feeds.md.
 */
export const feedConfigField: Field = {
  name: 'feedConfig',
  type: 'group',
  label: 'Live updates',
  admin: {
    description:
      'Connect a feed, or leave it off and curate the updates below by hand. The section never renders empty.',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Show the "Latest updates" section on this page',
      defaultValue: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'facebookPageId',
          type: 'text',
          label: 'Facebook Page ID',
          admin: { width: '33%' },
        },
        {
          name: 'instagramUserId',
          type: 'text',
          label: 'Instagram Business ID',
          admin: { width: '33%' },
        },
        {
          name: 'youtubeChannelId',
          type: 'text',
          label: 'YouTube Channel ID',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'curated',
      type: 'array',
      label: 'Curated updates',
      labels: { singular: 'Update', plural: 'Updates' },
      admin: {
        description:
          'Used when no feed is connected, and as the fallback if a platform is unreachable. Pin anything here at any time.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          type: 'row',
          fields: [
            { name: 'date', type: 'date', required: true, admin: { width: '50%' } },
            { name: 'url', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          name: 'platform',
          type: 'select',
          options: [...SOCIAL_PLATFORMS, { label: 'Website', value: 'website' }],
          defaultValue: 'website',
        },
      ],
    },
  ],
}

/** Headline figures. Each sector counts by something different, so label and unit are free text. */
export const statsField: Field = {
  name: 'stats',
  type: 'array',
  label: 'Key figures',
  labels: { singular: 'Figure', plural: 'Figures' },
  maxRows: 4,
  admin: {
    description: 'Shown as a row on the page. Publish real numbers only — leave empty to hide the block.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'value', type: 'text', required: true, admin: { width: '30%', placeholder: '12,000' } },
        { name: 'unit', type: 'text', admin: { width: '25%', placeholder: 'tonnes / year' } },
        { name: 'label', type: 'text', required: true, admin: { width: '45%', placeholder: 'Paper recycled' } },
      ],
    },
  ],
}

export const capabilitiesField: Field = {
  name: 'capabilities',
  type: 'array',
  label: 'Capabilities',
  labels: { singular: 'Capability', plural: 'Capabilities' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
  ],
}

export const galleryField: Field = {
  name: 'gallery',
  type: 'upload',
  relationTo: 'media',
  hasMany: true,
  admin: { description: 'Site, warehouse and workshop photography. Highest resolution available.' },
}
