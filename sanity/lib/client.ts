import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:"sk62EiuustGTSFyrQGhlVVREFU2tXrDUijaenHR3dSRELOPJ7im8brwQgMbNl662MxpLJEcRwCOYCpN0FMDEnP0KXhACs7TkmLtgeapSymz2H6nXU7jR8k1Zgg2dzSQcEuKdrwVWOWLZHQ8pkhKuH3ohEDh9R9tSBwrABivjTJZB8dliBfU0",
})
export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    // disable cache in development
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    next: { tags },
  });
}
