"use client";

import React, { useState } from "react";

export default function TradePage() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-enter flex justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 font-display">
            Swap Tokens
          </h1>
          <p className="text-text-secondary">Instant trades with best prices</p>
        </div>

        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-text-muted font-medium">
                  From
                </span>
                <span className="text-xs text-text-muted">
                  Balance: 4.2 ETH
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="bg-transparent text-3xl font-bold text-white placeholder-white/20 outline-none w-full font-mono-numbers"
                />
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    E
                  </div>
                  <span className="font-medium text-white">ETH</span>
                  <svg
                    className="w-4 h-4 text-text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-20">
              <button className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>

            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-text-muted font-medium">To</span>
                <span className="text-xs text-text-muted">
                  Balance: 0.00 USDC
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  placeholder="0.0"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="bg-transparent text-3xl font-bold text-white placeholder-white/20 outline-none w-full font-mono-numbers"
                />
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-info/20 flex items-center justify-center text-xs font-bold text-info">
                    U
                  </div>
                  <span className="font-medium text-white">USDC</span>
                  <svg
                    className="w-4 h-4 text-text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">Rate</span>
                <span className="text-text-secondary">
                  3 ETH = 2,450.20 USDC
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">Network Cost</span>
                <span className="text-text-secondary">$4.20</span>
              </div>
            </div>

            <button className="btn-primary w-full py-4 text-lg shadow-glow hover:shadow-glow-strong">
              Swap Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
