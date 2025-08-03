'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggleButton } from '../theme/ThemeToggleButton';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-black border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-gray-300 hover:text-slate-500 transition-colors duration-200">
                                TICS Cinema
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {/* <ThemeToggleButton /> */}
                            <Link 
                                href="/" 
                                className="text-gray-100 hover:text-gray-400 text-sm font-medium transition-all duration-200"
                            >
                                Home
                            </Link>
                            <Link 
                                href="/faq" 
                                className="text-gray-100 hover:text-gray-400 text-sm font-medium ransition-all duration-200"
                            >
                                FAQ
                            </Link>
                            <Link
                                href="/register" 
                                className="text-gray-100 text-sm hover:text-gray-400 text-sm font-medium ransition-all duration-200"
                            >
                                Join Us
                            </Link>
                            <Link 
                                href="/login" 
                                className="text-gray-100 hover:text-gray-400 text-sm font-medium transition-all duration-200"
                            >
                                Sign In 
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md"
                        >
                            <svg 
                                className="h-6 w-6" 
                                stroke="currentColor" 
                                fill="none" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
                        <Link 
                            href="/" 
                            className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/faq" 
                            className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            FAQ
                        </Link>
                        <Link 
                            href="/login" 
                            className="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login/Register
                        </Link>
                    </div>
                </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

