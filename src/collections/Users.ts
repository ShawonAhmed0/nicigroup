import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminField } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Settings',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    // Anyone signed in can read the user list; only admins can change roles.
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => {
      const user = req.user as { id: number | string; role?: string } | null
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      access: { create: isAdminField, update: isAdminField },
      options: [
        { label: 'Administrator — full access, manages users', value: 'admin' },
        { label: 'Editor — creates and publishes across the group', value: 'editor' },
        { label: 'Company manager — limited to assigned companies', value: 'company-manager' },
      ],
    },
    {
      name: 'companies',
      type: 'relationship',
      relationTo: 'companies',
      hasMany: true,
      access: { create: isAdminField, update: isAdminField },
      admin: {
        condition: (data) => data?.role === 'company-manager',
        description: 'This person can only edit these companies and their wings.',
      },
    },
  ],
}
