import type { APIRoute } from 'astro';
import { llmsIndex } from '../lib/llms.ts';

/* /llms.txt — the plain-language index for language models (build standard §4).
   Content is generated from the site's own data, so it cannot drift; see
   `src/lib/llms.ts` for the reasoning and the two rules it obeys. */
export const GET: APIRoute = () =>
  new Response(llmsIndex(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
