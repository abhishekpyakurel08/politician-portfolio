import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'statsBlock',
  interfaceName: 'StatsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'गर्विला उपलब्धिहरू (Impact & Achievements)',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'subValue', type: 'text', defaultValue: '+' },
        { name: 'icon', type: 'select', options: [
            { label: 'Users/People', value: 'users' },
            { label: 'Check/Verified', value: 'check' },
            { label: 'Globe', value: 'globe' },
            { label: 'Trophy', value: 'trophy' },
            { label: 'Heart', value: 'heart' },
            { label: 'Building', value: 'building' },
        ], defaultValue: 'users' },
      ],
      minRows: 2,
      maxRows: 4,
    }
  ],
  labels: {
    plural: 'Stats Blocks',
    singular: 'Stats Block',
  },
}
