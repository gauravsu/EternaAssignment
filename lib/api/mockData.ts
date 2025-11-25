import type { Token, TokenCategory } from '@/types/token';
import { randomBetween, randomIntBetween } from '@/lib/utils';

const TOKEN_NAMES = [
  'PepeKing',
  'DogeElite',
  'ShibaRocket',
  'FlokiMoon',
  'SafeGem',
  'MoonShot',
  'DiamondPaws',
  'RocketFuel',
  'ElonCat',
  'WojakCoin',
  'ApeStrong',
  'BabyDoge',
  'KishuFloki',
  'SaitaInu',
  'HogeFinance',
  'FegToken',
  'PitBull',
  'Akita',
  'Corgi',
  'HuskyToken',
  'SamoyedCoin',
  'RetrieverDAO',
  'PoodleSwap',
  'BeagleFi',
  'BullFinance',
  'BearMarket',
  'WhaleWatch',
  'DolphinSwap',
  'SharkTank',
  'OctopusDAO',
];

const SYMBOLS = [
  'PEPEK',
  'DELITE',
  'SROCKET',
  'FLOKM',
  'SGEM',
  'MSHOT',
  'DPAWS',
  'RFUEL',
  'ECAT',
  'WOJAK',
  'APES',
  'BABYD',
  'KISHU',
  'SAITA',
  'HOGE',
  'FEG',
  'PIT',
  'AKITA',
  'CORGI',
  'HUSKY',
  'SAMO',
  'RTRVR',
  'POODLE',
  'BEAGL',
  'BULL',
  'BEAR',
  'WHALE',
  'DLPHN',
  'SHARK',
  'OCTO',
];

/**
 * Generate a random Solana-like address
 */
function generateAddress(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  let address = '';
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

/**
 * Generate a single mock token
 */
export function generateMockToken(
  id: string,
  category: TokenCategory,
  index: number
): Token {
  const nameIndex = index % TOKEN_NAMES.length;
  const name = TOKEN_NAMES[nameIndex];
  const symbol = SYMBOLS[nameIndex];

  // Price ranges based on category
  let priceRange: [number, number];
  let volumeMultiplier: number;
  let ageRange: [number, number];

  switch (category) {
    case 'new-pairs':
      priceRange = [0.00001, 0.01];
      volumeMultiplier = 0.5;
      ageRange = [0.1, 24];
      break;
    case 'final-stretch':
      priceRange = [0.0001, 0.1];
      volumeMultiplier = 1.5;
      ageRange = [12, 72];
      break;
    case 'migrated':
      priceRange = [0.001, 1];
      volumeMultiplier = 3;
      ageRange = [72, 720];
      break;
  }

  const price = randomBetween(priceRange[0], priceRange[1]);
  const volume24h = randomBetween(10000, 5000000) * volumeMultiplier;
  const marketCap = randomBetween(50000, 10000000) * volumeMultiplier;
  const liquidity = randomBetween(5000, marketCap * 0.3);

  return {
    id,
    name: `${name} ${randomIntBetween(1, 999)}`,
    symbol,
    address: generateAddress(),
    price,
    priceChange24h: randomBetween(-80, 300),
    priceChange1h: randomBetween(-30, 50),
    priceChange5m: randomBetween(-15, 25),
    volume24h,
    volume1h: volume24h * randomBetween(0.02, 0.15),
    marketCap,
    liquidity,
    holders: randomIntBetween(50, 10000),
    age: randomBetween(ageRange[0], ageRange[1]),
    category,
    verified: Math.random() > 0.7,
    migrated: category === 'migrated',
    migrationDate:
      category === 'migrated'
        ? new Date(Date.now() - randomIntBetween(1, 30) * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
    contractRenounced: Math.random() > 0.4,
    liquidityLocked: Math.random() > 0.3,
    auditScore: Math.random() > 0.5 ? randomIntBetween(60, 98) : undefined,
  };
}

/**
 * Generate multiple mock tokens for a category
 */
export function generateMockTokens(
  category: TokenCategory,
  count: number = 50
): Token[] {
  const tokens: Token[] = [];
  for (let i = 0; i < count; i++) {
    const id = `${category}-${i}-${Date.now()}`;
    tokens.push(generateMockToken(id, category, i));
  }
  return tokens;
}

/**
 * Generate all mock tokens for all categories
 */
export function generateAllMockTokens(): Token[] {
  return [
    ...generateMockTokens('new-pairs', 50),
    ...generateMockTokens('final-stretch', 30),
    ...generateMockTokens('migrated', 20),
  ];
}

/**
 * Simulate a price update for a token
 */
export function generatePriceUpdate(currentPrice: number): number {
  const changePercent = randomBetween(-5, 8); // Slight bias towards up
  const change = currentPrice * (changePercent / 100);
  const newPrice = currentPrice + change;
  return Math.max(0.00000001, newPrice); // Ensure price doesn't go negative
}

/**
 * Get initial mock tokens (cached)
 */
let cachedTokens: Token[] | null = null;

export function getInitialMockTokens(): Token[] {
  if (!cachedTokens) {
    cachedTokens = generateAllMockTokens();
  }
  return cachedTokens;
}

/**
 * Reset cached tokens (useful for testing)
 */
export function resetMockTokens(): void {
  cachedTokens = null;
}
