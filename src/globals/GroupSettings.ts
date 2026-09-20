import type { GlobalConfig } from 'payload'

import {
  bengaliContactField,
  bengaliPanel,
  bengaliSeoField,
  bengaliStatsField,
} from '@/fields/bengali'
import { contactField, seoField, socialsField, statsField } from '@/fields/shared'
import { isEditor } from '@/lib/access'

/** The parent brand. One record, feeding the homepage hero, /about and the footer. */
export const GroupSettings: GlobalConfig = {
  slug: 'group-settings',
  label: 'NICI Group',
  admin: { group: 'Settings' },
  access: { read: () => true, update: isEditor },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'name', type: 'text', required: true, defaultValue: 'NICI Group' },
            {
              name: 'positioning',
              type: 'text',
              required: true,
              admin: { description: 'The one line under the logo on the homepage.' },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 400,
              admin: { description: 'Two sentences introducing the group. Used in the hero and in search results.' },
            },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'logoDark', type: 'upload', relationTo: 'media', admin: { description: 'Optional light-on-dark version.' } },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'story', type: 'richText', label: 'Group story' },
            { name: 'mission', type: 'richText' },
            {
              name: 'chairman',
              type: 'group',
              label: 'Chairman',
              admin: { description: 'Appears in the homepage hero. The portrait is the first photograph anyone sees — supply the highest resolution available.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', admin: { width: '50%' } },
                    { name: 'title', type: 'text', defaultValue: 'Chairman', admin: { width: '50%' } },
                  ],
                },
                {
                  name: 'portrait',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Portrait orientation, 3:4. Shot against a plain or softly lit background.' },
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  maxLength: 240,
                  admin: { description: 'One or two sentences in the chairman’s own words, shown beside the portrait.' },
                },
              ],
            },
            { name: 'chairmanMessage', type: 'richText', label: 'Chairman’s full message (About page)' },
            statsField,
            {
              name: 'leadership',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
                  ],
                },
                { name: 'photo', type: 'upload', relationTo: 'media' },
                { name: 'bio', type: 'textarea' },
              ],
            },
            {
              name: 'milestones',
              type: 'array',
              admin: { description: 'The timeline on the About page. Order them oldest first.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'year', type: 'number', required: true, admin: { width: '25%' } },
                    { name: 'title', type: 'text', required: true, admin: { width: '75%' } },
                  ],
                },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'certifications',
              type: 'array',
              label: 'Certifications & licences',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'issuer', type: 'text' },
                { name: 'document', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Contact & social',
          fields: [
            { ...contactField, label: 'Head office' },
            socialsField,
          ],
        },
        { label: 'Search & sharing', fields: [seoField] },
      ],
    },
    bengaliPanel([
      { name: 'name', type: 'text' },
      { name: 'positioning', type: 'text' },
      { name: 'summary', type: 'textarea', maxLength: 400 },
      { name: 'story', type: 'richText' },
      { name: 'mission', type: 'richText' },
      {
        name: 'chairman',
        type: 'group',
        fields: [
          { name: 'name', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'quote', type: 'textarea', maxLength: 240 },
        ],
      },
      { name: 'chairmanMessage', type: 'richText' },
      bengaliStatsField(),
      {
        name: 'leadership',
        type: 'array',
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'bio', type: 'textarea' },
        ],
      },
      {
        name: 'milestones',
        type: 'array',
        fields: [
          { name: 'year', type: 'number', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea' },
        ],
      },
      {
        name: 'certifications',
        type: 'array',
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'issuer', type: 'text' },
        ],
      },
      bengaliContactField(),
      bengaliSeoField(),
    ]),
  ],
}
