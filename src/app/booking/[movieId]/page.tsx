'use client'

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/button/BackButton';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMovieById } from '@/assets/movies';
import { MovieAsset } from '@/types';
import { cinemas, getShowtimesByCinemaType } from '@/data/cinema';

const BookingPage = () => {
  const params = useParams();
  const router = useRouter();
  const movieId = params?.movieId as string;
  const [movie, setMovie] = useState<MovieAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState<{
    time: string;
    cinemaTypeId: string;
    cinemaName: string;
    cinemaLocation: string;
    price: number;
  } | null>(null);

  const getNextDates = (count = 3) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dateOptions = getNextDates();

  useEffect(() => {
    if (!movieId) {
      console.error('No movieId found in URL');
      return;
    }
    const data = getMovieById(movieId);
    setMovie(data || null);
    setLoading(false);

    const todayISO = new Date().toISOString().split('T')[0];
    setSelectedDate(todayISO);
  }, [movieId]);

  const handleShowtimeClick = (
    showtime: string,
    cinemaTypeId: string,
    cinemaName: string,
    cinemaLocation: string,
    price: number
  ) => {
    setSelectedShowtime({
      time: showtime,
      cinemaTypeId,
      cinemaName,
      cinemaLocation,
      price
    });
  };

  const handleConfirmBooking = () => {
    if (!movie || !selectedShowtime) return;

    const params = new URLSearchParams({
      movie: movie.title,
      cinema: selectedShowtime.cinemaName,
      location: selectedShowtime.cinemaLocation,
      time: selectedShowtime.time,
      type: selectedShowtime.cinemaTypeId,
      date: selectedDate
    });

    router.push(`/booking/${movieId}/seats?${params.toString()}`);
  };

  if (loading || !movie) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <BackButton />
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Movie Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <img
            src={typeof movie.poster === 'string' ? movie.poster : movie.poster?.src}
            alt={movie.title}
            className="w-32 md:w-52 h-auto rounded shadow-lg"
          />
          <div>
            <h1 className="mt-8 text-3xl font-semibold text-stone-300">{movie.title}</h1>
            <br />
            <p className="text-xl font-medium text-stone-300"><strong>Rating:</strong> {movie.rating}</p>
            <p className="text-xl font-medium text-stone-300"><strong>Duration:</strong> {movie.duration} minutes</p>
            <p className="text-xl font-medium text-stone-300"><strong>Genre:</strong> {movie.genre.join(', ')}</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            {dateOptions.map((date, index) => {
              const iso = date.toISOString().split('T')[0];
              const label = date.toLocaleDateString('en-US', {
                weekday: 'long',
                day: '2-digit',
                month: 'short',
              });

              const isToday = index === 0;
              const isSelected = selectedDate === iso;

              return (
                <button
                  key={iso}
                  onClick={() => isToday && setSelectedDate(iso)}
                  disabled={!isToday}
                  className={`px-4 py-2 font-semibold border 
                    ${isSelected ? 'bg-stone-400 text-stone-600' : 'bg-gray-300 text-stone-700'}
                    ${!isToday ? 'opacity-50 cursor-not-allowed' :'hover:bg-stone-500 hover:text-stone-300'}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <h2 className="text-lg font-semibold mb-2">Choose your Cinema & Showtime</h2>
          <div className="space-y-8">
            {cinemas.map((cinema) => (
              <div key={cinema.id} className="mt-8 border-b pb-4">
                <h3 className="text-xl font-bold mb-1">{cinema.name}</h3>
                <p className="text-stone-500 text-lg font-semibold mb-3">{cinema.location}</p>

                {cinema.cinemaTypes.map((type) => {
                  const typeShowtimes = getShowtimesByCinemaType(type.id);
                  return (
                    <div key={type.id} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-stone-300">{type.name}</span>
                        <span className="text-lg text-stone-400">
                          Rp{type.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {typeShowtimes.map((showtime) => {
                          const isSelected = selectedShowtime?.time === showtime.time && 
                          selectedShowtime?.cinemaTypeId === type.id &&
                          selectedShowtime?.cinemaName === cinema.name;
                          
                          return (
                            <button
                              key={showtime.id}
                              onClick={() => handleShowtimeClick(
                                showtime.time,
                                type.id,
                                cinema.name,
                                cinema.location,
                                type.price
                              )}
                              className={`px-3 py-1 border text-md transition-colors duration-200 ${
                                isSelected 
                                  ? 'bg-stone-300 text-stone-800 border-stone-400' 
                                  : 'text-stone-300 hover:bg-stone-300 hover:text-stone-800'
                              }`}
                            >
                              {showtime.time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Proceed Button - Below Cinema Showtimes */}
        {selectedShowtime && (
          <div className="mt-8 mb-16 flex justify-center">
            <button
              onClick={handleConfirmBooking}
              className="px-8 py-3 bg-stone-200 text-stone-600 font-medium hover:bg-stone-500 hover:text-stone-100 transition-colors duration-200 shadow-lg"
            >
              Proceed to Seat Selection
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;