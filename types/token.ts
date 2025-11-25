export type TokenCategory = 'new-pairs' | 'final-stretch' | 'migrated';

export type SortDirection = 'asc' | 'desc' | null;

export type SortField =
  | 'name'
  | 'price'
  | 'priceChange24h'
  | 'volume24h'
  | 'marketCap'
  | 'liquidity'
  | 'age'
  | 'holders';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  price: number;
  priceChange24h: number;
  priceChange1h: number;
  priceChange5m: number;
  volume24h: number;
  volume1h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  age: number; // in hours
  category: TokenCategory;
  logoUrl?: string;
  verified: boolean;
  migrated?: boolean;
  migrationDate?: string;
  contractRenounced: boolean;
  liquidityLocked: boolean;
  auditScore?: number;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  timestamp: number;
}

export interface TokenListResponse {
  tokens: Token[];
  total: number;
  timestamp: number;
}

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface TokenFilters {
  category: TokenCategory;
  minLiquidity?: number;
  minMarketCap?: number;
  verified?: boolean;
}
