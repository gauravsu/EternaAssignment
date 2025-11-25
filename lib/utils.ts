import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper override handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(
  value: number,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    compact?: boolean;
  },
): string {
  if (options?.compact) {
    return formatCompactNumber(value, true);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 6,
  }).format(value);
}

/**
 * Format a number in compact notation (1.2K, 3.4M, etc.)
 */
export function formatCompactNumber(
  value: number,
  isCurrency: boolean = false,
): string {
  const prefix = isCurrency ? "$" : "";

  if (value >= 1_000_000_000) {
    return `${prefix}${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${prefix}${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${prefix}${(value / 1_000).toFixed(2)}K`;
  }
  return `${prefix}${value.toFixed(2)}`;
}

/**
 * Format a percentage value
 */
export function formatPercentage(
  value: number,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSign?: boolean;
  },
): string {
  const sign = options?.showSign && value > 0 ? "+" : "";
  const formatted = value.toFixed(options?.maximumFractionDigits ?? 2);
  return `${sign}${formatted}%`;
}

/**
 * Format time ago from hours
 */
export function formatTimeAgo(hours: number): string {
  if (hours < 1) {
    const minutes = Math.floor(hours * 60);
    return `${minutes}m ago`;
  }
  if (hours < 24) {
    return `${Math.floor(hours)}h ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/**
 * Truncate an address with ellipsis
 */
export function truncateAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4,
): string {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Get the appropriate price change icon as string
 */
export const getPriceChangeIcon = (change: number): string | null => {
  if (change > 0) return "↑";
  if (change < 0) return "↓";
  return null;
};

/**
 * Get price change color class
 */
export function getPriceChangeColor(change: number): string {
  if (change > 0) return "text-success";
  if (change < 0) return "text-danger";
  return "text-gray-400";
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

/**
 * Generate a random number between min and max
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
