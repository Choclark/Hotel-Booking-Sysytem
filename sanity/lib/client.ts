import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:"sk62EiuustGTSFyrQGhlVVREFU2tXrDUijaenHR3dSRELOPJ7im8brwQgMbNl662MxpLJEcRwCOYCpN0FMDEnP0KXhACs7TkmLtgeapSymz2H6nXU7jR8k1Zgg2dzSQcEuKdrwVWOWLZHQ8pkhKuH3ohEDh9R9tSBwrABivjTJZB8dliBfU0",
})
