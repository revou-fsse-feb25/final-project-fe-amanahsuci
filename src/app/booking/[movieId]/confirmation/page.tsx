'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';

interface Seat {
    id: string;
    row: string;
    number: number;
    status: 'available' | 'selected' | 'booked';
    price: number;
}

interface ConfirmationData {
    movieTitle: string;
    cinemaName: string;
    cinemaLocation: string;
    showtime: string;
    cinemaType: string;
    selectedSeats: Seat[];
    totalPrice: number;
    bookingId: string;
    paymentMethod: string;
    customerData: {
        fullName: string;
        email: string;
        phone: string;
    } | null;
    finalAmount: number;
    discount: number;
    promoCode: string | null;
}

const ConfirmationPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { movieId } = useParams();
    
    const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
    const [showTicket, setShowTicket] = useState(false);

    useEffect(() => {
        const dataParam = searchParams.get('data');
        if (dataParam) {
            try {
                const parsedData: ConfirmationData = JSON.parse(decodeURIComponent(dataParam));
                setConfirmationData(parsedData);
                setTimeout(() => setShowTicket(true), 500);
            } catch (error) {
                console.error('Error parsing confirmation data:', error);
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }, [searchParams, router]);

    const downloadTicket = () => {
        alert('Ticket download feature will be implemented soon!');
    };

    const sendToEmail = () => {
        if (confirmationData?.customerData?.email) {
            alert(`Ticket will be sent to ${confirmationData.customerData.email}`);
        }
    };

    if (!confirmationData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-white">Loading confirmation...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="bg-stone-200 shadow-md p-6 mb-6">
                    <div className="flex justify-center items-center space-x-8">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-500 text-white text-sm font-medium">
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-stone-600">Seat Selection</span>
                        </div>
                        
                        <div className="w-16 h-1 bg-stone-500"></div>
                        
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-500 text-white text-sm font-medium">
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-stone-600">Payment</span>
                        </div>
                        
                        <div className="w-16 h-1 bg-stone-500"></div>
                        
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-500 text-white text-sm font-medium">
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-stone-600">Confirmation</span>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <div className="bg-stone-200 border border-stone-600 p-6 mb-6 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">Booking Confirmed!</h1>
                    <p className="text-stone-600">Your movie tickets have been successfully booked.</p>
                    <p className="text-stone-600 text-sm mt-2">Booking ID: <span className="font-mono font-bold">{confirmationData.bookingId}</span></p>
                </div>

                {/* Movie Ticket */}
                <div className={`transition-all duration-700 ${showTicket ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    <div className="bg-stone-200 shadow-lg overflow-hidden border-2 border-dashed border-gray-300">
                        {/* Ticket Header */}
                        <div className="bg-gradient-to-r from-stone-400 to-slate-800 text-white p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{confirmationData.movieTitle}</h2>
                                    <p className="opacity-90">🎬 Movie Ticket</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-lg">{confirmationData.bookingId}</p>
                                    <p className="text-sm opacity-90">Booking ID</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left: Movie Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">🎭</span>
                                        <div>
                                            <p className="font-semibold text-gray-800">{confirmationData.cinemaName}</p>
                                            <p className="text-gray-600 text-sm">{confirmationData.cinemaLocation}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">📅</span>
                                        <div>
                                            <p className="font-semibold text-gray-800">{new Date().toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</p>
                                            <p className="text-gray-600 text-sm">{confirmationData.showtime}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">🪑</span>
                                        <div>
                                            <p className="font-semibold text-gray-800">{confirmationData.cinemaType}</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {confirmationData.selectedSeats.map(seat => (
                                                    <span key={seat.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                                                        {seat.id}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Payment Details */}
                                <div className="space-y-4">
                                    {confirmationData.customerData && (
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">👤</span>
                                            <div>
                                                <p className="font-semibold text-gray-800">{confirmationData.customerData.fullName}</p>
                                                <p className="text-gray-600 text-sm">{confirmationData.customerData.email}</p>
                                                <p className="text-gray-600 text-sm">{confirmationData.customerData.phone}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">💳</span>
                                        <div>
                                            <p className="font-semibold text-gray-800">Payment Method</p>
                                            <p className="text-gray-600 text-sm capitalize">{confirmationData.paymentMethod}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">💰</span>
                                        <div>
                                            <p className="font-semibold text-gray-800">Total Paid</p>
                                            <p className="text-green-600 font-bold">Rp {confirmationData.finalAmount.toLocaleString('id-ID')}</p>
                                            {confirmationData.discount > 0 && (
                                                <p className="text-green-600 text-sm">Discount applied: {confirmationData.promoCode}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code Placeholder */}
                            <div className="mt-6 flex justify-center">
                                <div className="bg-gray-100 p-4">
                                    <div className="w-32 h-32 bg-black flex items-center justify-center text-white text-xs text-center">
                                        QR CODE<br/>
                                        {confirmationData.bookingId}
                                    </div>
                                    <p className="text-center text-xs text-gray-600 mt-2">Scan at cinema entrance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={downloadTicket}
                        className="px-6 py-3 bg-stone-200 text-stone-500 font-medium hover:bg-stone-500 hover:text-stone-100 transition-colors flex items-center justify-center"
                    >
                        Download Ticket
                    </button>
                    
                    {confirmationData.customerData?.email && (
                        <button
                            onClick={sendToEmail}
                            className="px-6 py-3 bg-stone-200 text-stone-500 font-medium hover:bg-stone-500 hover:text-stone-100 transition-colors flex items-center justify-center"
                        >
                            Send to Email
                        </button>
                    )}
                    
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-stone-200 text-stone-500 font-medium hover:bg-stone-500 hover:text-stone-100 transition-colors flex items-center justify-center"
                    >
                        Back to Home
                    </button>
                </div>

                {/* Important Notes */}
                <div className="mt-6 bg-stone-300 border border-stone-700 p-4">
                    <h3 className="font-bold text-yellow-800 mb-2">📝 Important Notes:</h3>
                    <ul className="text-stone-500 text-sm space-y-1">
                        <li>• Please arrive 15 minutes before showtime</li>
                        <li>• Present this ticket at the cinema entrance</li>
                        <li>• No refunds or exchanges allowed</li>
                        <li>• Keep this booking ID for your records: {confirmationData.bookingId}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;