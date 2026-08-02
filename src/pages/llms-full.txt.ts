import type { APIRoute } from 'astro';
import { llmsFull } from '../lib/llms.ts';

/* /llms-full.txt — the index plus every question and answer verbatim, so an
   assistant can quote Abbey directly instead of paraphrasing a page it half
   read. Same single source as the pages themselves (`src/data/faqs.ts`). */
export const GET: APIRoute = () =>
  new Response(llmsFull(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
