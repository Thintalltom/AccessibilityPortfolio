import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['frontend', 'accessibility', 'components'] } }),
    defineField({ name: 'categoryLabel', title: 'Category Label', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text' }),
    defineField({ name: 'contribution', title: 'Contribution', type: 'text' }),
    defineField({ name: 'tech', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'caseStudyPath', title: 'Case Study Path', type: 'string' }),
    defineField({ name: 'verification', title: 'Verification', type: 'string', options: { list: ['verified', 'pending'] } }),
    defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
    defineField({ name: 'sourceUrl', title: 'Source URL', type: 'url' }),
  ],
})
