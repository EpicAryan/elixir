import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
            ],
          },
        ],
      }
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ]
    }),

    defineArrayMember({
      name: 'codeBlock',
      title: 'Code Block',
      type: 'code',
    }),
    defineArrayMember({
        name: 'callout',
        title: 'Callout',
        type: 'object',
        fields: [
            {
                name: 'text',
                title: 'Text',
                type: 'text',
                rows: 2,
            },
            {
                name: 'style',
                title: 'Style',
                type: 'string',
                options: {
                    list: [
                        {title: 'Info (Blue)', value: 'info'},
                        {title: 'Success (Green)', value: 'success'},
                        {title: 'Warning (Yellow)', value: 'warning'},
                        {title: 'Danger (Red)', value: 'danger'},
                    ],
                    layout: 'radio'
                },
                initialValue: 'info'
            }
        ]
    })
  ],
})
