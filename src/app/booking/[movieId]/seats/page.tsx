'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { getCinemaTypeById } from '@/data/cinema';

interface Seat {
    id: string;
    row: string;
    number: number;
    status: 'available' | 'selected' | 'booked';
    price: number;
}

interface BookingDetails {
    movieTitle: string;
    cinemaName: string;
    cinemaLocation: string;
    showtime: string;
    cinemaType: string;
    selectedSeats: Seat[];
    totalPrice: number;
}

const BookingSeatPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { movieId } = useParams();
    
    const movieTitle = searchParams.get('movie') || 'Unknown Movie';
    const cinemaName = searchParams.get('cinema') || 'Unknown Cinema';
    const cinemaLocation = searchParams.get('location') || '';
    const showtime = searchParams.get('time') || '';
    const cinemaTypeId = searchParams.get('type') || '2d';

    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const cinemaType = getCinemaTypeById(cinemaTypeId);

    useEffect(() => {
        if (cinemaType) {
        generateSeats();
        }
    }, [cinemaType]);

    const generateSeats = () => {
        if (!cinemaType) return;

        const newSeats: Seat[] = [];
        const rows = Array.from({ length: cinemaType.rows }, (_, i) => 
        String.fromCharCode(65 + i) 
        );

        const bookedSeats = new Set([
        'A3', 'A4', 'B5', 'C2', 'C7', 'D1', 'E6', 'F8'
        ]);

        rows.forEach(row => {
        for (let i = 1; i <= cinemaType.seatsPerRow; i++) {
            const seatId = `${row}${i}`;
            const isBooked = bookedSeats.has(seatId);
            
            newSeats.push({
            id: seatId,
            row,
            number: i,
            status: isBooked ? 'booked' : 'available',
            price: cinemaType.price
            });
        }
        });

        setSeats(newSeats);
        setIsLoading(false);
    };

    const handleSeatClick = (seat: Seat) => {
        if (seat.status === 'booked') return;

        const updatedSeats = seats.map(s => {
        if (s.id === seat.id) {
            return {
            ...s,
            status: s.status === 'selected' ? 'available' : 'selected'
            } as Seat;
        }
        return s;
        });

        setSeats(updatedSeats);

        const newSelectedSeats = updatedSeats.filter(s => s.status === 'selected');
        setSelectedSeats(newSelectedSeats);
    };

    const getSeatColor = (status: Seat['status']) => {
        switch (status) {
        case 'available': return 'bg-gray-200 hover:bg-blue-200 cursor-pointer';
        case 'selected': return 'bg-blue-500 cursor-pointer';
        case 'booked': return 'bg-red-400 cursor-not-allowed';
        default: return 'bg-gray-200';
        }
    };

    const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    const handleContinue = () => {
        if (selectedSeats.length === 0) {
        alert('Please choose the seat first.');
        return;
        }

        const bookingData: BookingDetails = {
        movieTitle,
        cinemaName,
        cinemaLocation,
        showtime,
        cinemaType: cinemaType?.name || '',
        selectedSeats,
        totalPrice
        };

        router.push(`/booking/${movieId}/payment?data=${encodeURIComponent(JSON.stringify(bookingData))}`);
    };

    if (isLoading || !cinemaType) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-stone-600">Loading seats...</p>
            </div>
        </div>
        );
    }

    const rows = Array.from({ length: cinemaType.rows }, (_, i) => 
        String.fromCharCode(65 + i)
    );

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-stone-200 shadow-md p-6 mb-6">
                    <button 
                        onClick={() => router.back()}
                        className="mb-4 flex items-center text-stone-500 hover:text-stone-800"
                    >
                        <span className="mr-2">←</span> Back
                    </button>
                    
                    <h1 className="text-2xl font-bold text-stone-500 mb-2">Seat Selection</h1>
                    <div className="text-stone-500 space-y-1">
                        <p><strong>Movie:</strong> {movieTitle}</p>
                        <p><strong>Cinema:</strong> {cinemaName} - {cinemaLocation}</p>
                        <p><strong>Showtime:</strong> {showtime}</p>
                        <p><strong>Cinema Type:</strong> {cinemaType.name}</p>
                    </div>
                </div>

                {/* Screen */}
                <div className="mb-8">
                    <div className="border-2 border-gray-600 bg-stone-100 text-center py-3 rounded-t-3xl mx-20">
                        <p className="text-sm font-medium text-stone-500">SCREEN</p>
                    </div>
                </div>

                {/* Seat Layout */}
                <div className="bg-stone-200 shadow-md p-6 mb-6 isolate">
                    <div className="mb-6">
                        <div className="flex justify-center space-x-6 text-sm">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-200 rounded-sm mr-2"></div>
                                <span className="text-stone-500">Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
                                <span className="text-stone-500">Selected</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-red-400 rounded-sm mr-2"></div>
                                <span className="text-stone-500">Booked</span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full">
                        {rows.map(row => (
                            <div key={row} className="flex justify-center items-center mb-2">
                            {/* Row Label */}
                            <div className="w-8 text-center font-medium text-stone-400 mr-4">
                                {row}
                            </div>
                            
                            {/* Seats */}
                            <div className="flex space-x-1">
                                {Array.from({ length: cinemaType.seatsPerRow }, (_, i) => {
                                    const seatNumber = i + 1;
                                    const seat = seats.find(s => s.row === row && s.number === seatNumber);

                                    return (
                                    <React.Fragment key={`${row}${seatNumber}`}>
                                        <button
                                        onClick={() => seat && handleSeatClick(seat)}
                                        className={`
                                            w-8 h-8 rounded-sm text-xs font-medium transition-colors duration-200
                                            ${seat ? getSeatColor(seat.status) : 'bg-gray-200'}
                                            ${seat?.status === 'selected' ? 'text-white' : 'text-gray-700'}
                                        `}
                                        disabled={seat?.status === 'booked'}
                                        >
                                        {seatNumber}
                                        </button>
                                        {seatNumber === 6 && <div className="w-6" />}
                                    </React.Fragment>
                                    );
                                })}
                                </div>
                            
                                {/* Row Label (Right) */}
                                <div className="w-8 text-center font-medium text-stone-400 ml-4">
                                    {row}
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-stone-200 shadow-md p-6">
                <h2 className="text-xl font-bold text-stone-600 mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4 text-stone-600">
                    <div className="flex justify-between">
                        <span>Selected Seats:</span>
                        <span className="font-medium">
                            {selectedSeats.length > 0 
                            ? selectedSeats.map(seat => seat.id).join(', ')
                            : 'No seat selected'
                            }
                        </span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span>Number of Seats:</span>
                        <span className="font-medium">{selectedSeats.length}</span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span>Price per Seat:</span>
                        <span className="font-medium">
                            Rp {cinemaType.price.toLocaleString('id-ID')}
                        </span>
                    </div>
                    
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={selectedSeats.length === 0}
                    className={`
                    w-full py-3 font-medium transition-colors duration-200
                    ${selectedSeats.length > 0
                        ? 'bg-stone-300 hover:bg-stone-600 text-stone-600 hover:text-stone-100'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                    `}
                >
                    {selectedSeats.length > 0 
                    ? `Continue to Payment`
                    : 'Please choose your seat to continue'
                    }
                </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSeatPage;