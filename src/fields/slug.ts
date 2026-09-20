import type { Field } from 'payload'

export const slugify = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * URL segment for a record. Auto-filled from `from` on create, then left alone —
 * editors can still override it, but nothing rewrites a slug behind their back,
 * because changing one after launch breaks every existing link to the page.
 */
export const slugField = (from = 'name'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'The URL segment for this record. Avoid changing it after launch — existing links will break.',
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, value }) => {
        if (typeof value === 'string' && value.length > 0) return slugify(value)
        const source = data?.[from]
        if (operation === 'create' && typeof source === 'string') return slugify(source)
        return value
      },
    ],
  },
})
