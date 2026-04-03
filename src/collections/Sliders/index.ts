import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Sliders: CollectionConfig = {
  slug: 'sliders',
  admin: {
    useAsTitle: 'title',           // explained below
    defaultColumns: ['title', 'location', 'status'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) =>
            value ||
            data?.title
              ?.toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]/g, ''),
        ],
      },
    },
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
            name: 'description',
            type: 'richText',
            editor: lexicalEditor({
            features: ({ rootFeatures }) => {
                return [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ]
              },
            }),
        }
      ],
    },
  ],
}