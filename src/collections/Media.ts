import type { CollectionConfig } from 'payload'

import { isEditor } from '@/lib/access'

const webImage = {
  formatOptions: { format: 'webp' as const, options: { quality: 84 } },
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Library' },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: isEditor,
  },
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre', ...webImage },
      { name: 'card', width: 768, height: 512, position: 'centre', ...webImage },
      { name: 'wide', width: 1440, position: 'centre', ...webImage },
      { name: 'share', width: 1200, height: 630, position: 'centre', ...webImage },
    ],
    focalPoint: true,
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe the image for someone who cannot see it. Required — this is what screen readers and Google read.',
      },
    },
    { name: 'credit', type: 'text', admin: { description: 'Photographer or source, if attribution is needed.' } },
    {
      name: 'bengali',
      type: 'group',
      label: 'বাংলা',
      fields: [{ name: 'alt', type: 'text', label: 'Alternative text' }],
    },
  ],
}
