import type { Token, TokenListResponse, TokenCategory } from '@/types/token';
import { getInitialMockTokens } from './mockData';

/**
 * Simulated API delay
 */
const API_DELAY = 300;

/**
 * Sleep utility for simulating network delay
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch tokens by category
 */
export async function fetchTokens(
  category?: TokenCategory
): Promise<TokenListResponse> {
  await sleep(API_DELAY);

  const allTokens = getInitialMockTokens();
  const filteredTokens = category
    ? allTokens.filter((token) => token.category === category)
    : allTokens;

  return {
    tokens: filteredTokens,
    total: filteredTokens.length,
    timestamp: Date.now(),
  };
}

/**
 * Fetch a single token by ID
 */
export async function fetchTokenById(id: string): Promise<Token | null> {
  await sleep(API_DELAY);

  const allTokens = getInitialMockTokens();
  const token = allTokens.find((t) => t.id === id);

  return token || null;
}

/**
 * Fetch all tokens (no filter)
 */
export async function fetchAllTokens(): Promise<TokenListResponse> {
  return fetchTokens();
}

/**
 * Search tokens by name or symbol
 */
export async function searchTokens(query: string): Promise<Token[]> {
  await sleep(API_DELAY);

  const allTokens = getInitialMockTokens();
  const lowerQuery = query.toLowerCase();

  return allTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(lowerQuery) ||
      token.symbol.toLowerCase().includes(lowerQuery) ||
      token.address.toLowerCase().includes(lowerQuery)
  );
}
