import type { APIRoute } from 'astro';
import { site } from '../data/site.ts';

/* robots.txt, generated so the sitemap URL can never drift from astro.config.

   Build standard §4 requires this file and requires it to ALLOW AI crawlers.
   That is a commercial decision, not a default: being cited in an AI answer is
   now a primary acquisition route for a local trade, and the agents below are
   the ones that actually fetch pages to answer a question. Blocking them
   removes Abbey from those answers entirely.

   The `User-agent: *` rule already permits everything, so the named blocks are
   deliberately redundant. They are here as documentation-as-code: if someone
   later adds a blanket `Disallow`, the named allows make the intent obvious and
   the mistake loud. `Google-Extended` is the one that only ever appears as a
   disallow in the wild; naming it Allow records that we chose to be included.

   Nothing on this site is disallowed. There are no admin paths, no thank-you
   pages yet, and no staging routes. When an ad landing or thank-you page lands
   it gets `noindex,follow` plus a sitemap exclusion (§4), NOT a robots block —
   a robots block would stop the noindex ever being read. */

const AI_AGENTS = [
  // OpenAI: training, search index, and the live fetch ChatGPT does mid-answer
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google's AI products (Gemini, AI Overviews grounding)
  'Google-Extended',
  // Microsoft Copilot answers come off the Bing index
  'bingbot',
  // Apple Intelligence / Siri
  'Applebot',
  'Applebot-Extended',
  // Meta AI
  'meta-externalagent',
  // DuckDuckGo's assistant
  'DuckAssistBot',
  // Common Crawl feeds a great many models
  'CCBot',
];

export const GET: APIRoute = () => {
  const lines = [
    '# Abbey Group — abbeygroup.uk',
    '# Whitby home services: plumbing and heating, homecare plans, renovations,',
    '# building and joinery, electrical.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# AI assistants and answer engines are explicitly welcome.',
    ...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${site.domain}/sitemap-index.xml`,
    '',
    `# Plain-language index for language models: ${site.domain}/llms.txt`,
    `# Full version with every answer:        ${site.domain}/llms-full.txt`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
