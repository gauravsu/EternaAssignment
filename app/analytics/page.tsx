"use client";

import React from "react";

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-enter">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 font-display">
          Market Analytics
        </h1>
        <p className="text-text-secondary">
          Deep dive into market trends and volume
        </p>
      </div>

      <div className="glass-card p-6 mb-8 h-96 flex flex-col relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-lg font-semibold text-white">
            Total Market Volume
          </h3>
          <div className="flex gap-2">
            {["1D", "1W", "1M", "1Y"].map((period) => (
              <button
                key={period}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${period === "1M" ? "bg-primary text-white" : "bg-white/5 text-text-muted hover:bg-white/10"}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow flex items-end justify-between gap-2 px-4 relative z-10">
          {Array.from({ length: 40 }).map((_, i) => {
            const height = Math.random() * 80 + 20;
            return (
              <div
                key={i}
                className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Gainers</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success font-bold text-xs">
                    {i}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Token {i}
                    </div>
                    <div className="text-xs text-text-muted">TKN{i}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-success font-mono-numbers">
                    +{Math.floor(Math.random() * 100)}%
                  </div>
                  <div className="text-xs text-text-secondary">
                    $0.{Math.floor(Math.random() * 9000)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Swap ETH to USDC
                    </div>
                    <div className="text-xs text-text-muted">2 mins ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white font-mono-numbers">
                    $1,240.50
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
