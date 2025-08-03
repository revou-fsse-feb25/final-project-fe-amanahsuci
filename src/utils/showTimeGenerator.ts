import { cinemaTypes, showtimes, cinemas, getCinemaTypeById, getShowtimesByCinemaType } from '@/data/cinema';
import { MovieShowTime } from '@/types';

export const generateMovieShowTimes = (movieId: string, date: string, cinemaId: string): MovieShowTime[] => {
    const movieShowTimes: MovieShowTime[] = [];

  // Generate show times for each cinema type
    cinemaTypes.forEach(cinemaType => {
        const baseShowTimes = getShowtimesByCinemaType(cinemaType.id);
        
        baseShowTimes.forEach(showtime => {
        // Generate random availability (70-100% of total seats)
            const totalSeats = cinemaType.totalSeats;
            const minAvailable = Math.floor(totalSeats * 0.7);
            const maxAvailable = totalSeats;
            const availableSeats = Math.floor(Math.random() * (maxAvailable - minAvailable + 1)) + minAvailable;
            
            movieShowTimes.push({
                id: `${movieId}_${cinemaId}_${showtime.id}_${date}`,
                time: showtime.time,
                cinemaType: showtime.cinemaType,
                movieId,
                cinemaId,
                availableSeats,
                date
            });
        });
    });

    return movieShowTimes.sort((a, b) => a.time.localeCompare(b.time));
};

export const getAvailableShowTimes = (movieId: string, date: string): Record<string, MovieShowTime[]> => {
    const showTimesByCinema: Record<string, MovieShowTime[]> = {};
    
    cinemas.forEach(cinema => {
        showTimesByCinema[cinema.id] = generateMovieShowTimes(movieId, date, cinema.id);
    });

    return showTimesByCinema;
};