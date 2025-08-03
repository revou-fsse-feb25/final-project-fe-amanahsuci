'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import Image from 'next/image';
import { ArrowLeft, Clock, Star, Calendar, MapPin, Users } from 'lucide-react';
import { getMovieById } from '@/assets/movies';
import { cinemaTypes, cinemas, getCinemaTypeById } from '@/data/cinema';
import { getAvailableShowTimes } from '@/utils/showTimeGenerator';
import { CinemaType, ShowTime, Cinema, MovieShowTime } from '@/types';

interface Movie {
    id: string;
    title: string;
    poster: string;
    genre: string[];
    duration: number;
    rating: string;
}

interface BookingPageProps {
    movieId: string; 
}

const BookingPage: React.FC<BookingPageProps> = ({ movieId }) => { 
    const router = useRouter();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedCinema, setSelectedCinema] = useState<string>('');
    const [selectedCinemaType, setSelectedCinemaType] = useState<string>('');
    const [selectedShowTime, setSelectedShowTime] = useState<string>('');
    const [showTimesByCinema, setShowTimesByCinema] = useState<Record<string, MovieShowTime[]>>({});
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (movieId) { // Use movieId from props instead of router.query
            try {
                const movieData = getMovieById(movieId);
                if (movieData) {
                    setMovie(movieData);
                    
                    // Generate available dates (next 7 days)
                    const dates = [];
                    for (let i = 0; i < 7; i++) {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        dates.push(date.toISOString().split('T')[0]);
                    }
                    setAvailableDates(dates);
                    setSelectedDate(dates[0]);
                    
                    // Set default cinema if available
                    if (cinemas.length > 0) {
                        setSelectedCinema(cinemas[0].id);
                    }
                    
                    setLoading(false);
                } else {
                    setError('Movie not found');
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error loading movie:', err);
                setError('Failed to load movie details');
                setLoading(false);
            }
        }
    }, [movieId]);

    useEffect(() => {
        if (movie?.id && selectedDate) {
            try {
                const generatedShowTimes = getAvailableShowTimes(movie.id, selectedDate);
                setShowTimesByCinema(generatedShowTimes);
            } catch (err) {
                console.error('Error generating show times:', err);
                setError('Failed to load show times');
            }
        }
    }, [movie, selectedDate]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDuration = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getFilteredShowTimes = (): MovieShowTime[] => {
        if (!selectedCinema || !selectedCinemaType) return [];
        const cinemaShowTimes = showTimesByCinema[selectedCinema] || [];
        return cinemaShowTimes.filter(st => st.cinemaType === selectedCinemaType);
    };

    const handleContinueBooking = () => {
        if (!selectedShowTime) {
            alert('Please select a show time');
            return;
        }

        try {
            // Find selected data
            const selectedShow = getFilteredShowTimes().find(st => st.id === selectedShowTime);
            const selectedCinemaData = cinemas.find(c => c.id === selectedCinema);
            const selectedCinemaTypeData = getCinemaTypeById(selectedCinemaType);

            if (!selectedShow || !selectedCinemaData || !selectedCinemaTypeData) {
                alert('Invalid selection. Please try again.');
                return;
            }

            // Here you would typically navigate to seat selection page
            const bookingData = {
                movie: movie!.title,
                date: selectedDate,
                cinema: selectedCinemaData.name,
                cinemaType: selectedCinemaTypeData.name,
                time: selectedShow.time,
                price: selectedCinemaTypeData.price,
                availableSeats: selectedShow.availableSeats
            };

            console.log('Booking Data:', bookingData);

            alert(`Booking confirmed!\nMovie: ${movie!.title}\nDate: ${formatDate(selectedDate)}\nCinema: ${selectedCinemaData.name}\nType: ${selectedCinemaTypeData.name}\nTime: ${selectedShow.time}\nPrice: ${formatPrice(selectedCinemaTypeData.price)}`);
        } catch (err) {
            console.error('Error processing booking:', err);
            alert('Failed to process booking. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading movie details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">Movie not found</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center py-4">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Book Tickets</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Movie Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
                            <div className="relative aspect-[2/3] w-full">
                                <Image
                                    src={movie.poster}
                                    alt={`${movie.title} poster`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{movie.title}</h2>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {movie.genre.map((genre: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>{formatDuration(movie.duration)}</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 mr-2" />
                                        <span>Rating: {movie.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Options */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Date Selection */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Calendar className="w-5 h-5 mr-2" />
                                Select Date
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {availableDates.map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(date)}
                                        className={`p-3 rounded-lg border text-sm transition-colors ${
                                            selectedDate === date
                                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="font-medium">
                                            {new Date(date).toLocaleDateString('id-ID', { weekday: 'short' })}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cinema Selection */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2" />
                                Select Cinema
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {cinemas.map((cinema) => (
                                    <button
                                        key={cinema.id}
                                        onClick={() => setSelectedCinema(cinema.id)}
                                        className={`p-4 rounded-lg border text-left transition-colors ${
                                            selectedCinema === cinema.id
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="font-medium text-gray-900">{cinema.name}</div>
                                        <div className="text-sm text-gray-500">{cinema.location}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cinema Type Selection */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Users className="w-5 h-5 mr-2" />
                                Select Cinema Type
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {cinemaTypes.map((cinemaType) => (
                                    <button
                                        key={cinemaType.id}
                                        onClick={() => setSelectedCinemaType(cinemaType.id)}
                                        className={`p-4 rounded-lg border text-left transition-colors ${
                                            selectedCinemaType === cinemaType.id
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="font-medium text-gray-900">{cinemaType.name}</div>
                                        <div className="text-sm text-gray-500">{cinemaType.totalSeats} seats</div>
                                        <div className="text-sm font-medium text-blue-600 mt-1">
                                            {formatPrice(cinemaType.price)}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Show Times */}
                        {selectedCinemaType && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <Clock className="w-5 h-5 mr-2" />
                                    Select Show Time
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {getFilteredShowTimes().map((showTime) => (
                                        <button
                                            key={showTime.id}
                                            onClick={() => setSelectedShowTime(showTime.id)}
                                            className={`p-3 rounded-lg border text-sm transition-colors ${
                                                selectedShowTime === showTime.id
                                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="font-medium">{showTime.time}</div>
                                            <div className="text-xs text-gray-500 flex items-center mt-1">
                                                <Users className="w-3 h-3 mr-1" />
                                                {showTime.availableSeats} left
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Continue Button */}
                        {selectedShowTime && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Booking Summary</h4>
                                        <p className="text-sm text-gray-600">
                                            {movie.title} • {formatDate(selectedDate)} • {
                                                getFilteredShowTimes().find(st => st.id === selectedShowTime)?.time
                                            }
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {cinemas.find(c => c.id === selectedCinema)?.name} • {getCinemaTypeById(selectedCinemaType)?.name}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleContinueBooking}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        Continue Booking
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;