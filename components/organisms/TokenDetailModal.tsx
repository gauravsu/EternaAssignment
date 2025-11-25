'use client';

import React, { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { cn, formatCurrency, formatCompactNumber, formatTimeAgo, truncateAddress, copyToClipboard } from '@/lib/utils';
import type { Token } from '@/types/token';
import { fetchTokenById } from '@/lib/api/tokenApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal } from '@/store/tokenSlice';
import PriceChangeIndicator from '@/components/atoms/PriceChangeIndicator';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Skeleton from '@/components/atoms/Skeleton';
import Tooltip from '@/components/atoms/Tooltip';

const TokenDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.token.isModalOpen);
  const selectedTokenId = useAppSelector((state) => state.token.selectedTokenId);

  // Fetch token details
  const { data: token, isLoading, error } = useQuery({
    queryKey: ['token', selectedTokenId],
    queryFn: () => fetchTokenById(selectedTokenId!),
    enabled: !!selectedTokenId && isOpen,
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleCopyAddress = async () => {
    if (token) {
      const success = await copyToClipboard(token.address);
      if (success) {
        // Could add toast notification here
        console.log('Address copied to clipboard');
      }
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fadeIn" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'w-full max-w-4xl max-h-[90vh] overflow-y-auto',
            'bg-gray-900 rounded-xl shadow-2xl border border-gray-800',
            'animate-fadeIn',
            'focus:outline-none'
          )}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
            <Dialog.Title className="text-2xl font-bold text-white">
              {isLoading ? 'Loading...' : token ? 'Token Details' : 'Error'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {isLoading && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" width={64} height={64} />
                  <div className="space-y-2 flex-1">
                    <Skeleton width="60%" height={28} />
                    <Skeleton width="40%" height={20} />
                  </div>
                </div>
                <Skeleton width="100%" height={200} />
                <Skeleton width="100%" height={300} />
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-red-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Failed to Load Token
                </h3>
                <p className="text-gray-400">
                  {error instanceof Error ? error.message : 'Unknown error'}
                </p>
              </div>
            )}

            {token && (
              <div className="space-y-6">
                {/* Token Header */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-2xl">
                    {token.symbol.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white">{token.name}</h2>
                      {token.verified && (
                        <Tooltip content="Verified Token">
                          <svg
                            className="w-6 h-6 text-blue-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Tooltip>
                      )}
                      {token.migrated && (
                        <Badge variant="success">Migrated</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <span className="font-semibold text-gray-300">{token.symbol}</span>
                      <span>•</span>
                      <span className="font-mono">{truncateAddress(token.address, 8, 6)}</span>
                      <button
                        onClick={handleCopyAddress}
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                        aria-label="Copy address"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {token.contractRenounced && (
                        <Badge variant="success">🔒 Contract Renounced</Badge>
                      )}
                      {token.liquidityLocked && (
                        <Badge variant="info">🔐 Liquidity Locked</Badge>
                      )}
                      {token.auditScore && token.auditScore >= 80 && (
                        <Badge variant="success">✓ Audited ({token.auditScore})</Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Current Price</div>
                      <div className="text-2xl font-bold text-white font-mono">
                        {formatCurrency(token.price, { maximumFractionDigits: 8 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">24h Change</div>
                      <PriceChangeIndicator value={token.priceChange24h} showIcon showSign />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">1h Change</div>
                      <PriceChangeIndicator value={token.priceChange1h} showIcon showSign />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">5m Change</div>
                      <PriceChangeIndicator value={token.priceChange5m} showIcon showSign />
                    </div>
                  </div>
                </div>

                {/* Market Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Market Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard
                      label="Market Cap"
                      value={formatCompactNumber(token.marketCap, true)}
                      fullValue={formatCurrency(token.marketCap)}
                    />
                    <StatCard
                      label="24h Volume"
                      value={formatCompactNumber(token.volume24h, true)}
                      fullValue={formatCurrency(token.volume24h)}
                    />
                    <StatCard
                      label="1h Volume"
                      value={formatCompactNumber(token.volume1h, true)}
                      fullValue={formatCurrency(token.volume1h)}
                    />
                    <StatCard
                      label="Liquidity"
                      value={formatCompactNumber(token.liquidity, true)}
                      fullValue={formatCurrency(token.liquidity)}
                    />
                    <StatCard
                      label="Holders"
                      value={token.holders.toLocaleString()}
                    />
                    <StatCard
                      label="Token Age"
                      value={formatTimeAgo(token.age)}
                    />
                  </div>
                </div>

                {/* Additional Info */}
                {token.migrated && token.migrationDate && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-green-400 font-semibold mb-1">Successfully Migrated</h4>
                        <p className="text-sm text-gray-300">
                          This token was migrated on {new Date(token.migrationDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <Button variant="primary" className="flex-1">
                    Trade Now
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    View Chart
                  </Button>
                  <Button variant="ghost">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  fullValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, fullValue }) => {
  const content = (
    <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-800">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-lg font-semibold text-white font-mono">{value}</div>
    </div>
  );

  if (fullValue) {
    return <Tooltip content={fullValue}>{content}</Tooltip>;
  }

  return content;
};

export default TokenDetailModal;
