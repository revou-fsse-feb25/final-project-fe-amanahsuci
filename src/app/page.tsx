'use client';

// import { ThemeProvider } from '../components/theme/ThemeProvider'
import Navbar from '@/components/layout/Navbar';
// import MovieSlider from '@/components/movie/MovieSlider';
import Footer from '@/components/layout/Footer';
import { getAllMovies } from '@/assets/movies';
import HeroSection from '@/components/section/HeroSection';
import JoinSection from '@/components/section/JoinSection';
import MovieSection from '@/components/section/MovieSection';

export default function HomePage() {
  const movies = getAllMovies();
  
  console.log('Movies loaded:', movies.length);
  console.log('First movie:', movies[0]);

  const handleBookTicket = (movieId: string) => {
    console.log(`Booking ticket for movie ID: ${movieId}`);
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <JoinSection />
        <MovieSection />
      </main>
      {/* <MovieSlider 
        //   movies={movies} 
        //   title="Now Showing" 
        //   onBookTicket={handleBookTicket}
        // /> */}
      <Footer />
    </>
  );
}