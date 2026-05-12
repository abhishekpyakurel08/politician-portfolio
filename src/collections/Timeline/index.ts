import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'category'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        placeholder: 'e.g. 2006, Oct 2021, etc.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Party History', value: 'party' },
        { label: 'National Movement', value: 'national' },
        { label: 'Election Victory', value: 'election' },
        { label: 'Organization', value: 'organization' },
      ],
      defaultValue: 'party',
    },
    {
      name: 'fullDetail',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional long detail for a full history page.',
      },
    },
  ],
  timestamps: true,
}
