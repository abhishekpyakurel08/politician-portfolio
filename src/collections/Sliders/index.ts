import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  TextStateFeature,
  defaultColors,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Sliders: CollectionConfig = {
  slug: 'sliders',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'createdAt'],
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
      localized:true,
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
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon (Fallback if no image)',
          options: [
            { label: 'User', value: 'User' },
            { label: 'Info', value: 'Info' },
            { label: 'Calendar', value: 'Calendar' },
            { label: 'Star', value: 'Star' },
            { label: 'Heart', value: 'Heart' },
            { label: 'Globe', value: 'Globe' },
            { label: 'Search', value: 'Search' },
            { label: 'MapPin', value: 'MapPin' },
            { label: 'Activity', value: 'Activity' },
            { label: 'Award', value: 'Award' },
            { label: 'BookOpen', value: 'BookOpen' },
            { label: 'Building2', value: 'Building2' },
            { label: 'CheckCircle', value: 'CheckCircle' },
            { label: 'Users', value: 'Users' },
          ],
          admin: {
            description: 'Select an icon to display if no image is uploaded.',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'subTitle',
          type: 'text',
          maxLength: 150,
          localized: true,
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                BoldFeature(),
                ItalicFeature(),
                UnderlineFeature(),
                TextStateFeature({
                  state: {
                    color: defaultColors.text,
                    background: defaultColors.background,
                  },
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
      ],
    },
  ],
}
