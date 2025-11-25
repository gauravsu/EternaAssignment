import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-card/30 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 flex items-center justify-center bg-primary/20 rounded border border-primary/20">
                                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-base font-bold text-white">AxiomTrade</span>
                        </div>
                        <p className="text-sm text-text-muted max-w-sm">
                            The next generation of token discovery and trading analytics.
                            Built for professionals, designed for everyone.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><a href="#" className="hover:text-primary transition-colors">Markets</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Trading Terminal</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Status</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-text-muted">
                        &copy; 2024 Axiom Trade. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-text-muted">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
