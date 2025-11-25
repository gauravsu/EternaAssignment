import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  shimmer?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  shimmer = true,
  className,
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const shimmerStyles = shimmer
    ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:1000px_100%] animate-shimmer'
    : 'bg-gray-800';

  const inlineStyles: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      className={cn(
        'block',
        shimmerStyles,
        variantStyles[variant],
        className
      )}
      style={inlineStyles}
      aria-live="polite"
      aria-busy="true"
      {...props}
    />
  );
};

export default Skeleton;
