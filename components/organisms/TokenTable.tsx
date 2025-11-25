"use client";
import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Token, SortField } from "@/types/token";
import TokenRow from "@/components/molecules/TokenRow";
import SkeletonRow from "@/components/molecules/SkeletonRow";
import SortableHeader from "@/components/molecules/SortableHeader";

export interface TokenTableProps {
  tokens?: Token[];
  isLoading: boolean;
  sortConfig: {
    field: SortField;
    direction: "asc" | "desc" | null;
  };
  onSort: (field: SortField) => void;
  onRowClick: (tokenId: string) => void;
}

const TokenTable: React.FC<TokenTableProps> = ({
  tokens,
  isLoading,
  sortConfig,
  onSort,
  onRowClick,
}) => {
  const headers: { field: SortField; label: string; className?: string }[] = [
    { field: "name", label: "Asset", className: "text-left pl-6" },
    { field: "price", label: "Price", className: "text-right" },
    { field: "priceChange24h", label: "24h Change", className: "text-right" },
    { field: "volume24h", label: "Volume (24h)", className: "text-right" },
    { field: "marketCap", label: "Market Cap", className: "text-right" },
    { field: "liquidity", label: "Liquidity", className: "text-right" },
    { field: "age", label: "Age", className: "text-right" },
    { field: "holders", label: "Holders", className: "text-right pr-6" },
  ];

  const renderTableContent = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 15 }).map((_, i) => (
        <SkeletonRow key={`skeleton-${i}`} index={i} />
      ));
    }
    if (!tokens || tokens.length === 0) {
      return (
        <tr>
          <td
            colSpan={headers.length + 1}
            className="text-center py-24 text-text-muted"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                <svg
                  className="w-10 h-10 text-text-muted opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-text-secondary">
                  No tokens found
                </p>
                <p className="text-sm text-text-muted mt-1">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            </div>
          </td>
        </tr>
      );
    }
    return tokens.map((token, index) => (
      <TokenRow key={token.id} token={token} index={index} onRowClick={onRowClick} />
    ));
  }, [isLoading, tokens, onRowClick, headers.length]);

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <table className="w-full border-collapse text-left">
        <thead className="sticky top-0 z-20 bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/5">
          <tr>
            {/* Index Header */}
            <th className="w-12 px-6 py-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-left">
              #
            </th>

            {/* Dynamic Headers */}
            {headers.map((header) => (
              <SortableHeader
                key={header.field}
                field={header.field}
                label={header.label}
                currentField={sortConfig.field}
                currentDirection={sortConfig.direction}
                onSort={onSort}
                className={cn("py-5 text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap transition-colors hover:text-text-secondary cursor-pointer select-none group", header.className)}
              />
            ))}

            {/* Actions Header */}
            <th className="px-6 py-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
              Trade
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {renderTableContent()}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;
