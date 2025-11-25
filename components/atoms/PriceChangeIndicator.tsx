"use client";

import React, { useEffect, useState } from "react";
import { cn, formatPercentage, getPriceChangeIcon } from "@/lib/utils";

export interface PriceChangeIndicatorProps {
  value: number;
  showIcon?: boolean;
  showSign?: boolean;
  flashOnChange?: boolean;
  previousValue?: number;
  className?: string;
}

const PriceChangeIndicator: React.FC<PriceChangeIndicatorProps> = ({
  value,
  showIcon = true,
  showSign = true,
  flashOnChange = false,
  previousValue,
  className,
}) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (
      flashOnChange &&
      previousValue !== undefined &&
      previousValue !== value
    ) {
      setIsFlashing(true);

      const timer = setTimeout(() => {
        setIsFlashing(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [value, previousValue, flashOnChange]);

  const icon = showIcon ? getPriceChangeIcon(value) : null;
  const formattedValue = formatPercentage(value, {
    maximumFractionDigits: 2,
    showSign,
  });

  const getVariantClasses = () => {
    if (value > 0) {
      return "price-up";
    }
    if (value < 0) {
      return "price-down";
    }
    return "price-neutral";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center space-x-1 font-mono text-xs",
        getVariantClasses(),
        isFlashing &&
          (value > 0
            ? "animate-pulse bg-green-500/20"
            : "animate-pulse bg-red-500/20"),
        className,
      )}
    >
      {icon && <span className="font-bold">{icon}</span>}
      <span className="font-semibold">{formattedValue}</span>
    </span>
  );
};

export default React.memo(PriceChangeIndicator);
