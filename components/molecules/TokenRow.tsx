"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  cn,
  formatCurrency,
  formatCompactNumber,
  formatTimeAgo,
} from "@/lib/utils";
import type { Token } from "@/types/token";
import PriceChangeIndicator from "@/components/atoms/PriceChangeIndicator";
import Button from "@/components/atoms/Button";

export interface TokenRowProps {
  token: Token;
  index: number;
  onRowClick: (tokenId: string) => void;
}

const TokenRow: React.FC<TokenRowProps> = ({ token, index, onRowClick }) => {
  const [flashColor, setFlashColor] = useState<"green" | "red" | null>(null);
  const [previousPrice, setPreviousPrice] = useState(token.price);

  useEffect(() => {
    if (token.price !== previousPrice) {
      setFlashColor(token.price > previousPrice ? "green" : "red");
      setPreviousPrice(token.price);

      const timer = setTimeout(() => setFlashColor(null), 500);
      return () => clearTimeout(timer);
    }
  }, [token.price, previousPrice]);

  const handleClick = useCallback(() => {
    onRowClick(token.id);
  }, [onRowClick, token.id]);

  return (
    <tr
      onClick={handleClick}
      className="group hover:bg-white/[0.03] transition-colors duration-200 cursor-pointer border-b border-white/5 last:border-0"
    >
      {/* Index */}
      <td className="px-6 py-5 whitespace-nowrap">
        <span className="text-text-muted text-sm font-mono-numbers opacity-50 group-hover:opacity-100 transition-opacity">
          {index + 1}
        </span>
      </td>

      {/* Token Name & Symbol */}
      <td className="px-6 py-5 pl-6">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10 group-hover:ring-primary/30 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.2)] transition-all duration-300">
            <Image
              src={token.logoUrl || "/placeholder-token.png"}
              alt={token.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-primary group-hover:text-white transition-colors">
              {token.name}
            </span>
            <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors font-medium">
              {token.symbol}
            </span>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-5 text-right whitespace-nowrap">
        <div
          className={cn(
            "inline-flex px-2.5 py-1 rounded-md transition-all duration-300 font-mono-numbers text-sm font-medium",
            flashColor === "green" && "bg-success/10 text-success shadow-[0_0_10px_rgba(16,185,129,0.2)]",
            flashColor === "red" && "bg-danger/10 text-danger shadow-[0_0_10px_rgba(239,68,68,0.2)]",
            !flashColor && "text-text-primary"
          )}
        >
          {formatCurrency(token.price)}
        </div>
      </td>

      {/* 24h Price Change */}
      <td className="px-6 py-5 text-right whitespace-nowrap">
        <PriceChangeIndicator value={token.priceChange24h} showIcon={true} />
      </td>

      {/* 24h Volume */}
      <td className="px-6 py-5 text-right whitespace-nowrap">
        <span className="text-text-secondary font-mono-numbers text-sm group-hover:text-text-primary transition-colors">
          {formatCompactNumber(token.volume24h)}
        </span>
      </td>

      {/* Market Cap */}
      <td className="px-6 py-5 text-right whitespace-nowrap">
        <span className="text-text-secondary font-mono-numbers text-sm group-hover:text-text-primary transition-colors">
          {formatCompactNumber(token.marketCap)}
        </span>
      </td>

      {/* Liquidity */}
      <td className="px-6 py-5 text-right whitespace-nowrap">
        <span className="text-text-muted font-mono-numbers text-sm">
          {formatCompactNumber(token.liquidity)}
        </span>
      </td>

      {/* Age */}
      <td className="px-6 py-5 text-right whitespace-nowrap">
        <span className="text-text-muted text-sm">
          {formatTimeAgo(token.age)}
        </span>
      </td>

      {/* Holders */}
      <td className="px-6 py-5 text-right whitespace-nowrap pr-6">
        <span className="text-text-muted font-mono-numbers text-sm">
          {token.holders?.toLocaleString() || "-"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5 text-right whitespace-nowrap">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle trade action
          }}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-medium rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40"
        >
          Trade
        </button>
      </td>
    </tr>
  );
};

export default TokenRow;
