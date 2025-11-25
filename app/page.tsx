"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTokens } from "@/lib/api/tokenApi";
import { useLivePrices } from "@/hooks/useLivePrices";
import { useSortedTokens } from "@/hooks/useSortedTokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCategory, toggleSort, openModal } from "@/store/tokenSlice";
import CategoryTabs from "@/components/organisms/CategoryTabs";
import TokenTable from "@/components/organisms/TokenTable";
import TokenDetailModal from "@/components/organisms/TokenDetailModal";
import type { TokenCategory, SortField } from "@/types/token";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.token.selectedCategory,
  );
  const sortConfig = useAppSelector((state) => state.token.sortConfig);

  const {
    data: tokensData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchAllTokens,
  });

  useLivePrices({
    enabled: !isLoading && !!tokensData,
    updateInterval: 3000,
    tokensPerUpdate: 3,
  });

  const filteredTokens = useMemo(() => {
    if (!tokensData?.tokens) return [];
    return tokensData.tokens.filter(
      (token) => token.category === selectedCategory,
    );
  }, [tokensData, selectedCategory]);

  const sortedTokens = useSortedTokens(filteredTokens, sortConfig);

  const categoryCounts = useMemo(() => {
    if (!tokensData?.tokens) return undefined;

    const counts: Record<TokenCategory, number> = {
      "new-pairs": 0,
      "final-stretch": 0,
      migrated: 0,
    };

    tokensData.tokens.forEach((token) => {
      counts[token.category]++;
    });

    return counts;
  }, [tokensData]);

  const marketStats = useMemo(() => {
    if (!tokensData?.tokens) return null;

    const totalVolume = tokensData.tokens.reduce(
      (sum, token) => sum + token.volume24h,
      0,
    );
    const totalMarketCap = tokensData.tokens.reduce(
      (sum, token) => sum + token.marketCap,
      0,
    );
    const avgChange =
      tokensData.tokens.reduce((sum, token) => sum + token.priceChange24h, 0) /
      tokensData.tokens.length;

    return {
      totalVolume,
      totalMarketCap,
      avgChange,
      totalTokens: tokensData.tokens.length,
    };
  }, [tokensData]);

  const handleCategoryChange = (category: TokenCategory) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSort = (field: SortField) => {
    dispatch(toggleSort(field));
  };

  const handleRowClick = (tokenId: string) => {
    dispatch(openModal(tokenId));
  };

  if (isLoading && !tokensData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-enter">
        <div className="mb-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="h-12 w-96 bg-white/5 rounded-lg animate-pulse mb-4"></div>
              <div className="h-6 w-64 bg-white/5 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="glass-card p-6 h-32 flex flex-col justify-center"
              >
                <div className="h-4 w-24 bg-white/5 rounded animate-pulse mb-3"></div>
                <div className="h-10 w-40 bg-white/5 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-32 bg-white/5 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="p-6 border-b border-border">
            <div className="h-6 w-32 bg-white/5 rounded animate-pulse"></div>
          </div>
          <div className="overflow-hidden">
            <TokenTable
              tokens={[]}
              isLoading={true}
              sortConfig={sortConfig}
              onSort={handleSort}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
        <TokenDetailModal />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-enter">
      <div className="mb-16 relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none opacity-50" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative z-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-display">
              Trade the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                Future
              </span>
            </h1>
            <p className="text-text-secondary text-xl max-w-2xl font-light">
              Discover trending assets, analyze real-time data, and trade with
              confidence on the most advanced decentralized platform.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-text-muted bg-white/5 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-sm shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
            <span className="font-medium">Live Market Data</span>
          </div>
        </div>

        {marketStats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card-hover p-6 group cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg
                  className="w-16 h-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">
                Total Volume (24h)
              </div>
              <div className="text-3xl font-bold text-white font-mono-numbers group-hover:text-primary transition-colors">
                $
                {(marketStats.totalVolume / 1000000).toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}
                M
              </div>
            </div>

            <div className="glass-card-hover p-6 group cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg
                  className="w-16 h-16 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">
                Market Cap
              </div>
              <div className="text-3xl font-bold text-white font-mono-numbers group-hover:text-success transition-colors">
                $
                {(marketStats.totalMarketCap / 1000000).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 1,
                  },
                )}
                M
              </div>
            </div>

            <div className="glass-card-hover p-6 group cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg
                  className="w-16 h-16 text-warning"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
              <div className="text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">
                Avg Change (24h)
              </div>
              <div
                className={`text-3xl font-bold font-mono-numbers ${
                  marketStats.avgChange >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {marketStats.avgChange >= 0 ? "+" : ""}
                {marketStats.avgChange.toFixed(2)}%
              </div>
            </div>

            <div className="glass-card-hover p-6 group cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg
                  className="w-16 h-16 text-info"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div className="text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">
                Active Tokens
              </div>
              <div className="text-3xl font-bold text-white font-mono-numbers group-hover:text-info transition-colors">
                {marketStats.totalTokens.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-8">
        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          counts={categoryCounts}
        />
      </div>

      <div className="glass-card overflow-hidden border border-white/5 shadow-2xl shadow-black/50">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-8 rounded-full ${
                selectedCategory === "new-pairs"
                  ? "bg-primary"
                  : selectedCategory === "final-stretch"
                    ? "bg-purple-500"
                    : "bg-success"
              }`}
            />
            <h3 className="text-xl font-bold text-white font-display">
              {selectedCategory === "new-pairs" && "New Pairs"}
              {selectedCategory === "final-stretch" && "Final Stretch"}
              {selectedCategory === "migrated" && "Migrated Tokens"}
            </h3>
          </div>

          {!isLoading && sortedTokens.length > 0 && (
            <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
              <span className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                {sortedTokens.length} Tokens Found
              </span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <TokenTable
            tokens={sortedTokens}
            isLoading={isLoading}
            sortConfig={sortConfig}
            onSort={handleSort}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      <TokenDetailModal />
    </div>
  );
}
