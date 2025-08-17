import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock,
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    LucideBluetoothSearching
} from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-1">
                        <div>
                            <Image
                                src="/logo/logo.png"
                                alt="TICS Cinema Logo"
                                width={200}
                                height={200}
                            />
                            {/* <h2 className="text-3xl font-bold text-red-500 mb-2">TICS Cinema</h2> */}
                            <p className="text-gray-400 text-sm font-semibold">
                                Best Hangout Way for Movie Lovers
                            </p>
                        </div>
                        
                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <Link 
                                href="https://instagram.com" 
                                target="_blank"
                                className="bg-gray-800 hover:bg-pink-600 p-2 rounded-lg transition-colors duration-300"
                            >
                                <Instagram size={20} />
                            </Link>
                            <Link 
                                href="https://facebook.com" 
                                target="_blank"
                                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors duration-300"
                            >
                                <Facebook size={20} />
                            </Link>
                            <Link 
                                href="https://youtube.com" 
                                target="_blank"
                                className="bg-gray-800 hover:bg-red-600 p-2 rounded-lg transition-colors duration-300"
                            >
                                <Youtube size={20} />
                            </Link>
                            <Link 
                                href="https://twitter.com" 
                                target="_blank"
                                className="bg-gray-800 hover:bg-blue-400 p-2 rounded-lg transition-colors duration-300"
                            >
                                <Twitter size={20} />
                            </Link>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-red-400">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/movies" className="text-stone-300 hover:text-stone-600 transition-colors duration-300">
                                    Now Showing
                                </Link>
                            </li>
                            <li>
                                <Link href="/upcoming" className="text-stone-300 hover:text-stone-600 transition-colors duration-300">
                                    Coming Soon
                                </Link>
                            </li>
                            <li>
                                <Link href="/theaters" className="text-stone-300 hover:text-stone-600 transition-colors duration-300">
                                    Our Theaters
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-red-400">About Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-stone-300 hover:text-stone-600 transition-colors duration-300">
                                Our Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="text-stone-300 hover:text-stone-600 transition-colors duration-300">
                                News & Updates
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-stone-300 hover:text-stone-600 transition-colors duration-300">
                                Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                     {/* Contact Us */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-red-400">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="text-red-500 mt-1" size={16} />
                                <div>
                                    <p className="text-gray-300 text-sm">
                                        Jl. Somewhere No.123<br />
                                        Padang Kota, 00000<br />
                                        Indonesia
                                    </p>
                                </div>
                            </div>
                        
                            <div className="flex items-center space-x-3">
                                <Phone className="text-red-500" size={16} />
                                <p className="text-gray-300 text-sm">+62 751 1234 56</p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Mail className="text-red-500" size={16} />
                                <p className="text-gray-300 text-sm">info@ticscinema.com</p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <Clock className="text-red-500 mt-1" size={16} />
                                <div>
                                    <p className="text-gray-300 text-sm">
                                        Mon - Sun: 10:00 AM - 11:00 PM<br />
                                        Customer Service: 24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Section */}
                {/* <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-4 text-red-400">Stay Updated</h3>
                        <p className="text-gray-300 text-sm mb-4">
                        Subscribe to our newsletter for latest movie updates, exclusive offers, and special promotions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                            />
                            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors duration-300 font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-gray-950">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                        © {currentYear} TICS Cinema by AmanahSuci. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <button className="text-gray-400  cursor-pointer hover:text-white text-sm transition-colors duration-300">
                                Privacy Policy
                            </button>
                            <button className="text-gray-400 cursor-pointer hover:text-white text-sm transition-colors duration-300">
                                Terms of Service
                            </button>
                            <button className="text-gray-400  cursor-pointer hover:text-white text-sm transition-colors duration-300">
                                Sitemap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;