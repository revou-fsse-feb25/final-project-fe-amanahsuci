'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMovieById } from '@/assets/movies';
import { MovieAsset } from '@/types';
import { cinemas, getShowtimesByCinemaType } from '@/data/cinema';

const BookingPage = () => {
  const params = useParams();
  const movieId = params?.movieId as string;
  const [movie, setMovie] = useState<MovieAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

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

  if (loading || !movie) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Movie Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <img
            src={typeof movie.poster === 'string' ? movie.poster : movie.poster?.src}
            alt={movie.title}
            className="w-32 md:w-52 h-auto rounded shadow-lg"
          />
          <div>
            <h1 className="mt-8 text-2xl font-bold text-gray-300">{movie.title}</h1>
            <br />
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Duration:</strong> {movie.duration} minutes</p>
            <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Pilih Tanggal</h2>
          <div className="flex space-x-2 mb-6">
            {dateOptions.map((date, index) => {
              const iso = date.toISOString().split('T')[0];
              const label = date.toLocaleDateString('id-ID', {
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
                    ${!isToday ? 'opacity-50 cursor-not-allowed' :'hover:bg-stone-500 hover:text-stone-300'

                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <h2 className="text-lg font-semibold mb-2">Pilih Bioskop & Showtime</h2>
          <div className="space-y-8">
            {cinemas.map((cinema) => (
              <div key={cinema.id} className="border-b pb-4">
                <h3 className="text-xl font-bold mb-1">{cinema.name}</h3>
                <p className="text-gray-600 mb-3">{cinema.location}</p>

                {cinema.cinemaTypes.map((type) => {
                  const typeShowtimes = getShowtimesByCinemaType(type.id);
                  return (
                    <div key={type.id} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{type.name}</span>
                        <span className="text-sm text-gray-500">
                          Rp{type.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {typeShowtimes.map((showtime) => (
                          <button
                            key={showtime.id}
                            className="px-3 py-1 border rounded text-sm hover:bg-blue-100"
                          >
                            {showtime.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
