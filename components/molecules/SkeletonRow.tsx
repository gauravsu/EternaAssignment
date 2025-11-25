"use client";
import React from "react";
import Skeleton from "@/components/atoms/Skeleton";

export interface SkeletonRowProps {
  index: number;
}

const SkeletonRow: React.FC<SkeletonRowProps> = ({ index }) => {
  return (
    <tr className="border-b border-white/5 animate-pulse">
      {/* Index */}
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-8 bg-white/5" />
      </td>

      {/* Token Name & Symbol */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-md" />
            <Skeleton className="relative w-10 h-10 rounded-full bg-white/5 ring-2 ring-white/5" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-32 bg-white/5" />
            <Skeleton className="h-3 w-20 bg-white/5" />
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <Skeleton className="h-6 w-24 bg-white/5 rounded-lg" />
        </div>
      </td>

      {/* 24h Price Change */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <Skeleton className="h-5 w-20 bg-white/5 rounded-lg" />
        </div>
      </td>

      {/* 24h Volume */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <Skeleton className="h-4 w-24 bg-white/5" />
        </div>
      </td>

      {/* Market Cap */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <Skeleton className="h-4 w-24 bg-white/5" />
        </div>
      </td>

      {/* Liquidity */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <Skeleton className="h-4 w-24 bg-white/5" />
        </div>
      </td>

      {/* Age */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <Skeleton className="h-4 w-16 bg-white/5" />
        </div>
      </td>

      {/* Holders */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <Skeleton className="h-4 w-20 bg-white/5" />
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <Skeleton className="h-9 w-20 bg-white/5 rounded-lg" />
        </div>
      </td>
    </tr>
  );
};

export default SkeletonRow;
