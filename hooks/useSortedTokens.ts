import { useMemo } from "react";
import type { Token, SortConfig } from "@/types/token";

/**
 * Hook to sort tokens based on the current sort configuration
 */
export function useSortedTokens(
  tokens: Token[] | undefined,
  sortConfig: SortConfig,
): Token[] {
  return useMemo(() => {
    if (!tokens || tokens.length === 0) {
      return [];
    }

    if (!sortConfig.direction) {
      return [...tokens];
    }

    const { field, direction } = sortConfig;
    const multiplier = direction === "asc" ? 1 : -1;

    const sortedTokens = [...tokens];

    sortedTokens.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (field) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "priceChange24h":
          aValue = a.priceChange24h;
          bValue = b.priceChange24h;
          break;
        case "volume24h":
          aValue = a.volume24h;
          bValue = b.volume24h;
          break;
        case "marketCap":
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        case "liquidity":
          aValue = a.liquidity;
          bValue = b.liquidity;
          break;
        case "age":
          aValue = a.age;
          bValue = b.age;
          break;
        case "holders":
          aValue = a.holders;
          bValue = b.holders;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * multiplier;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * multiplier;
      }

      return 0;
    });

    return sortedTokens;
  }, [tokens, sortConfig]);
}

/**
 * Hook to filter and sort tokens by category
 */
export function useFilteredAndSortedTokens(
  tokens: Token[] | undefined,
  category: string,
  sortConfig: SortConfig,
): Token[] {
  const filteredTokens = useMemo(() => {
    if (!tokens) return [];
    return tokens.filter((token) => token.category === category);
  }, [tokens, category]);

  return useSortedTokens(filteredTokens, sortConfig);
}
