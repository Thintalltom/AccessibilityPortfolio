import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text' }),
    defineField({ name: 'topic', title: 'Topic', type: 'string' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['draft', 'published'] } }),
    defineField({ name: 'publishedOn', title: 'Published On', type: 'date' }),
  ],
})
