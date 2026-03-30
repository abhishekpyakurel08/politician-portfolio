import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timelineBlock',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
      defaultValue: 'Communist Party of Nepal (UML) History',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Major Milestones in the Journey of CPN-UML',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
    },
    {
      name: 'category',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Party History', value: 'party' },
        { label: 'National Movement', value: 'national' },
        { label: 'Election Victory', value: 'election' },
        { label: 'Organization', value: 'organization' },
      ],
    }
  ],
  labels: {
    plural: 'Timeline Blocks',
    singular: 'Timeline Block',
  },
}
