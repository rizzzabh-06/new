'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ConnectModal } from './ConnectModal';
import { Menu, X } from 'lucide-react';

export function Navigation() {
    const [connectOpen, setConnectOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/projects', label: 'Projects' },
        { href: '/#skills', label: 'Skills' },
        { href: '/writeups', label: 'Writeups' },
        { href: '/blog', label: 'Blog' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 glass-panel">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary">
                            <span className="material-symbols-outlined text-lg">terminal</span>
                        </div>
                        <Link href="/" className="text-white font-bold tracking-tight text-lg">
                            RRS<span className="text-primary">.sec</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setConnectOpen(true)}
                            className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 sm:px-5 py-2 rounded-md transition-all shadow-[0_0_10px_rgba(17,98,212,0.3)]"
                        >
                            Connect
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-slate-300 hover:text-white"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-lg">
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-base font-medium text-slate-300 hover:text-primary transition-colors py-2"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <ConnectModal open={connectOpen} onOpenChange={setConnectOpen} />
        </>
    );
}

export default Navigation;
