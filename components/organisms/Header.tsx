import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-9 h-9 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300">
                            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <svg className="w-5 h-5 text-primary relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white font-display">
                            Axiom<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Trade</span>
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
                        <Link
                            href="/"
                            className="px-5 py-2 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                        >
                            Markets
                        </Link>
                        <Link
                            href="/trade"
                            className="px-5 py-2 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                        >
                            Trade
                        </Link>
                        <Link
                            href="/portfolio"
                            className="px-5 py-2 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/analytics"
                            className="px-5 py-2 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                        >
                            Analytics
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                            </span>
                            <span className="text-xs font-medium text-text-secondary font-mono-numbers">ETH <span className="text-white">$2,450.20</span></span>
                        </div>

                        <button className="btn-primary rounded-full px-6 shadow-glow hover:shadow-glow-strong">
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
