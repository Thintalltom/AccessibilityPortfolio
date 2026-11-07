import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 's0qbi2sk',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
