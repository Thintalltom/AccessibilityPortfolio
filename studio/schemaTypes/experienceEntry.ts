import { defineField, defineType } from 'sanity'

export const experienceEntry = defineType({
  name: 'experienceEntry',
  title: 'Experience Entry',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'ID', type: 'string', validation: r => r.required() }),
    defineField({ name: 'kind', title: 'Kind', type: 'string', options: { list: ['role', 'education', 'certification'] } }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'organisation', title: 'Organisation', type: 'string' }),
    defineField({ name: 'period', title: 'Period', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text' }),
    defineField({ name: 'skills', title: 'Skills', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'credentialUrl', title: 'Credential URL', type: 'url' }),
    defineField({ name: 'placeholder', title: 'Is Placeholder', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
