"use client";

import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { TokenCategory } from "@/types/token";

export interface CategoryTabsProps {
  selectedCategory: TokenCategory;
  onCategoryChange: (category: TokenCategory) => void;
  counts?: Record<TokenCategory, number>;
}

const CATEGORIES: Array<{
  value: TokenCategory;
  label: string;
  description: string;
  color: string;
  glow: string;
}> = [
    {
      value: "new-pairs",
      label: "New Pairs",
      description: "Recently launched",
      color: "bg-info",
      glow: "shadow-info/20",
    },
    {
      value: "final-stretch",
      label: "Final Stretch",
      description: "Nearing migration",
      color: "bg-warning",
      glow: "shadow-warning/20",
    },
    {
      value: "migrated",
      label: "Migrated",
      description: "Successful projects",
      color: "bg-success",
      glow: "shadow-success/20",
    },
  ];

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onCategoryChange,
  counts,
}) => {
  const handleTabClick = useCallback(
    (category: TokenCategory) => {
      onCategoryChange(category);
    },
    [onCategoryChange],
  );

  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 p-1.5 bg-white/[0.03] rounded-2xl border border-white/5 w-fit backdrop-blur-sm"
        role="tablist"
        aria-label="Token categories"
      >
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.value;
          const count = counts?.[category.value];

          return (
            <button
              key={category.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(category.value)}
              className={cn(
                "relative flex items-center gap-3 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                isActive
                  ? `bg-card text-white shadow-lg ${category.glow} border border-white/10`
                  : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent",
              )}
            >
              {/* Status Dot */}
              <div className="relative">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    isActive ? category.color : "bg-white/20"
                  )}
                />
                {isActive && (
                  <div className={cn(
                    "absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-75",
                    category.color
                  )} />
                )}
              </div>

              <span className={cn("font-display tracking-wide", isActive ? "font-semibold" : "font-medium")}>
                {category.label}
              </span>

              {count !== undefined && (
                <span
                  className={cn(
                    "ml-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors font-mono-numbers",
                    isActive
                      ? "bg-white/10 text-white"
                      : "bg-white/5 text-text-muted"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(CategoryTabs);
