import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Token, PriceUpdate } from "@/types/token";
import { generatePriceUpdate } from "@/lib/api/mockData";
import { useAppDispatch } from "@/store/hooks";
import { recordPriceUpdate } from "@/store/tokenSlice";

/**
 * Configuration for live price updates
 */
interface LivePricesConfig {
  enabled?: boolean;
  updateInterval?: number;
  tokensPerUpdate?: number;
}

/**
 * Hook to simulate live price updates via WebSocket
 */
export function useLivePrices(config: LivePricesConfig = {}) {
  const { enabled = true, updateInterval = 3000, tokensPerUpdate = 3 } = config;

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);

  const updateTokenPrice = useCallback(
    (tokenId: string, newPrice: number) => {
      queryClient.setQueryData(["tokens"], (oldData: any) => {
        if (!oldData?.tokens) return oldData;

        return {
          ...oldData,
          tokens: oldData.tokens.map((token: Token) =>
            token.id === tokenId
              ? {
                  ...token,
                  price: newPrice,

                  priceChange5m: ((newPrice - token.price) / token.price) * 100,
                }
              : token,
          ),
        };
      });

      queryClient.setQueryData(
        ["token", tokenId],
        (oldData: Token | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            price: newPrice,
            priceChange5m: ((newPrice - oldData.price) / oldData.price) * 100,
          };
        },
      );

      dispatch(recordPriceUpdate(tokenId));

      setTimeout(() => {}, 500);
    },
    [queryClient, dispatch],
  );

  const performPriceUpdate = useCallback(() => {
    const tokensData = queryClient.getQueryData(["tokens"]) as any;

    if (!tokensData?.tokens || tokensData.tokens.length === 0) {
      return;
    }

    const tokens: Token[] = tokensData.tokens;

    const selectedIndices = new Set<number>();
    while (selectedIndices.size < Math.min(tokensPerUpdate, tokens.length)) {
      selectedIndices.add(Math.floor(Math.random() * tokens.length));
    }

    selectedIndices.forEach((index) => {
      const token = tokens[index];
      const newPrice = generatePriceUpdate(token.price);
      updateTokenPrice(token.id, newPrice);
    });
  }, [queryClient, tokensPerUpdate, updateTokenPrice]);

  const start = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    intervalRef.current = setInterval(() => {
      performPriceUpdate();
    }, updateInterval);
  }, [performPriceUpdate, updateInterval]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isRunningRef.current = false;
  }, []);

  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }

    const startTimeout = setTimeout(() => {
      start();
    }, 1000);

    return () => {
      clearTimeout(startTimeout);
      stop();
    };
  }, [enabled, start, stop]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    start,
    stop,
    isRunning: isRunningRef.current,
  };
}

/**
 * Custom hook for listening to price updates for a specific token
 */
export function useTokenPriceUpdate(tokenId: string | null): boolean {
  const queryClient = useQueryClient();
  const previousPriceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!tokenId) return;

    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event.type === "updated" && event.query.queryKey[0] === "tokens") {
        const data = event.query.state.data as any;
        if (data?.tokens) {
          const token = data.tokens.find((t: Token) => t.id === tokenId);
          if (token && previousPriceRef.current !== null) {
            if (token.price !== previousPriceRef.current) {
              previousPriceRef.current = token.price;
            }
          } else if (token) {
            previousPriceRef.current = token.price;
          }
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tokenId, queryClient]);

  return false;
}
