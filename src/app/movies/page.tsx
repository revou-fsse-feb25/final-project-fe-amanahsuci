'use client';

import Navbar from '@/components/layout/Navbar';
import { getAllMovies } from '@/assets/movies';
import MovieSlider from '@/components/movies/MovieSlider';
import JoinSection from '@/components/section/JoinSection';
import ComingSoonSlider from '@/components/movies/ComingSoonSlider';
import { comingSoonMovies } from '@/assets/movies';
import Footer from '@/components/layout/Footer';

export default function MoviesPage() {
    const movies = getAllMovies();

    console.log('Movies loaded:', movies.length);
    console.log('First movie:', movies[0]);

    const handleBookTicket = (movieId: string) => {
        console.log(`Booking ticket for movie ID: ${movieId}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 p-4">
                <MovieSlider movies={movies} onBookTicket={handleBookTicket} />
                <JoinSection />
                <ComingSoonSlider movies={Object.values(comingSoonMovies)} />
            </main>
            <Footer />
        </div>
    );
}
