import { createClient, type QueryParams } from "next-sanity";
import { isProduction } from "@/i18n/env";
import { dataset, projectId } from "./env";

export { dataset, projectId };

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-29",
  useCdn: true,
});

/**
 * Published content, regenerated in the background at most once a minute. Every query gets
 * `$preview`: true off production, so case studies ticked "Staging only" show on staging and
 * previews but not on www.
 */
export function sanityFetch<const Query extends string>(query: Query, params: QueryParams = {}) {
  return client.fetch(query, { ...params, preview: !isProduction }, { next: { revalidate: 60 } });
}
