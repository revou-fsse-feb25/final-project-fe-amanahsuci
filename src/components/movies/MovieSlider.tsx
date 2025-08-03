'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '@/components/movies/MovieCard';
import { MovieAsset } from '@/types';

interface MovieSliderProps {
    movies?: MovieAsset[];
    title?: string;
    onBookTicket?: (movieId: string) => void;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ 
    movies = [], 
    title = "Now Showing",
    onBookTicket 
}) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="w-full cinema-bg-light dark:cinema-bg-dark py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient dark:text-gradient-dark mb-6">
                        {title}
                    </h2>
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400">No movies available at the moment</p>
                    </div>
                </div>
            </div>
        );
    }
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const itemsPerView = {
        mobile: 2,
        tablet: 3,
        desktop: 3,
        large: 4
    };

    const slideLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const slideRight = () => {
        const maxIndex = movies.length - itemsPerView.desktop;
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const canSlideLeft = currentIndex > 0;
    const canSlideRight = currentIndex < movies.length - itemsPerView.desktop;

    return (
        <div className="w-full cinema-bg-light dark:cinema-bg-dark py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gradient dark:text-gradient-dark">
                        {title}
                    </h2>
                </div>

                {/* Movies Slider with Centered Navigation */}
                <div className="relative">
                    {/* Left Navigation Button */}
                    <button
                        onClick={slideLeft}
                        disabled={!canSlideLeft}
                        className="nav-button absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer inline-flex items-center mt-8 px-2 py-1 border border-white text-white uppercase font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                        style={{ transform: 'translateX(-50%) translateY(-50%)' }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Right Navigation Button */}
                    <button
                        onClick={slideRight}
                        disabled={!canSlideRight}
                        className="nav-button absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer inline-flex items-center mt-8 px-2 py-1 border border-white text-white uppercase font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                        style={{ transform: 'translateX(50%) translateY(-50%)' }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Movies Container */}
                    <div className="overflow-hidden mx-8">
                        <div
                            ref={sliderRef}
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`
                            }}
                        >
                            {movies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 px-2"
                                >
                                    <MovieCard
                                        movie={movie}
                                        onBookTicket={onBookTicket}
                                        className="h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-8 space-x-3">
                    {Array.from({ length: Math.ceil(movies.length / itemsPerView.desktop) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentIndex 
                                ? 'bg-stone-800 dark:bg-stone-400 scale-110' 
                                : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieSlider;
