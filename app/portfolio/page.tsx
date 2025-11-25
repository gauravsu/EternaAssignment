"use client";

import React from "react";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

export default function PortfolioPage() {
  const portfolioStats = {
    totalValue: 12450.8,
    dayChange: 234.5,
    dayChangePercent: 1.92,
  };

  const assets = [
    {
      id: "1",
      name: "Ethereum",
      symbol: "ETH",
      balance: 4.2,
      price: 2450.2,
      value: 10290.84,
      change: 2.5,
    },
    {
      id: "2",
      name: "Axiom",
      symbol: "AXM",
      balance: 15000,
      price: 0.12,
      value: 1800.0,
      change: 15.4,
    },
    {
      id: "3",
      name: "USDC",
      symbol: "USDC",
      balance: 359.96,
      price: 1.0,
      value: 359.96,
      change: 0.01,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-enter">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 font-display">
          Your Portfolio
        </h1>
        <p className="text-text-secondary">Track your assets and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-8 md:col-span-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg
              className="w-32 h-32 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">
              Total Balance
            </div>
            <div className="text-5xl font-bold text-white font-mono-numbers mb-4">
              {formatCurrency(portfolioStats.totalValue)}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-md text-sm font-medium ${portfolioStats.dayChange >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
              >
                {portfolioStats.dayChange >= 0 ? "+" : ""}
                {formatCurrency(portfolioStats.dayChange)} (
                {portfolioStats.dayChangePercent}%)
              </span>
              <span className="text-text-muted text-sm">Past 24 Hours</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto text-primary">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Deposit Crypto
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Add funds to start trading
            </p>
            <button className="btn-secondary w-full">Deposit</button>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white font-display">
            Your Assets
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
                  Balance
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
                  Value
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {asset.name}
                        </div>
                        <div className="text-xs text-text-muted">
                          {asset.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-text-secondary font-mono-numbers">
                    {formatCurrency(asset.price)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-text-secondary font-mono-numbers">
                    {asset.balance} {asset.symbol}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-white font-medium font-mono-numbers">
                    {formatCurrency(asset.value)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-primary hover:text-primary-hover font-medium transition-colors">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
