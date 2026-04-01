import type { VercelRequest, VercelResponse } from '@vercel/node';
import { tavily } from '@tavily/core';

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, maxResults = 5, searchDepth = 'advanced', topic } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const searchResults = await tavilyClient.search(query, {
      searchDepth,
      maxResults,
      ...(topic && { topic }),
    });

    return res.status(200).json(searchResults);
  } catch (error) {
    console.error('Tavily search error:', error);
    return res.status(500).json({ error: 'Search failed' });
  }
}
