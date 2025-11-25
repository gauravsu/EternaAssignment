"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { SortDirection, SortField } from "@/types/token";

export interface SortableHeaderProps {
  field: SortField;
  label: string;
  currentField: SortField;
  currentDirection: SortDirection;
  onSort: (field: SortField) => void;
  align?: "left" | "center" | "right";
  className?: string;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  field,
  label,
  currentField,
  currentDirection,
  onSort,
  align = "left",
  className,
}) => {
  const isActive = currentField === field;
  const isSorted = isActive && currentDirection !== null;

  const handleClick = () => {
    onSort(field);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSort(field);
    }
  };

  const getAriaSort = (): "ascending" | "descending" | "none" => {
    if (!isActive || !currentDirection) return "none";
    return currentDirection === "asc" ? "ascending" : "descending";
  };

  const alignmentStyles = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };

  return (
    <th className={className} aria-sort={getAriaSort()}>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center space-x-2 group hover:text-white transition-colors duration-200 w-full",
          "focus:outline-none focus:text-white",
          alignmentStyles[align],
          isSorted ? "text-white" : "text-gray-400",
        )}
        aria-label={`Sort by ${label}`}
      >
        <span className="font-medium text-xs uppercase tracking-wider">
          {label}
        </span>
        <div
          className={cn(
            "flex transition-all duration-200 ml-1",
            isSorted ? "opacity-100" : "opacity-0 group-hover:opacity-60",
          )}
        >
          {!isSorted && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 8l5-5 5 5H5zM5 12l5 5 5-5H5z" />
            </svg>
          )}
          {isSorted && currentDirection === "asc" && (
            <svg
              className="w-3 h-3 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 15l5-5 5 5H5z" />
            </svg>
          )}
          {isSorted && currentDirection === "desc" && (
            <svg
              className="w-3 h-3 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 8l5 5 5-5H5z" />
            </svg>
          )}
        </div>
      </button>
    </th>
  );
};

export default React.memo(SortableHeader);
