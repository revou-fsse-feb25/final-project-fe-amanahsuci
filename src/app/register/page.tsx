'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register data:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-white mb-2">Register</h1>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm text-white mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-white text-black cursor-pointer hover:bg-zinc-300 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-zinc-400 text-center mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-stone-300 underline hover:text-stone-600">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
