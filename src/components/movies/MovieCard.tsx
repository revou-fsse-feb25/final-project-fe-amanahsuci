import React from 'react';
import Image from 'next/image';
import { MovieAsset } from '@/types';
import Link from 'next/link';

interface MovieCardProps {
    movie: MovieAsset;
    onBookTicket?: (movieId: string) => void;
    className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
    movie, 
    onBookTicket, 
    className = '' 
}) => {
    const getRatingColor = (rating: string): string => {
        switch (rating) {
            case 'G':
                return 'bg-green-500';
            case '11+':
            case '13+':
                return 'bg-blue-500';
            case '14+':
                return 'bg-yellow-500';
            case '17+':
                return 'bg-orange-500';
            case '21+':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const handleBookTicket = () => {
        if (onBookTicket) {
            onBookTicket(movie.id);
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-[180px] ${className}`}>
            <div className="group relative aspect-[2/3] w-full">
                <Image
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                        href={`/booking/${movie.id}`}
                        className="bg-black/60 text-stone-300 text-sm font-semibold px-4 py-2 hover:bg-stone-200 hover:text-stone-800 transition"
                    >
                        Get Ticket
                    </Link>
                </div>
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white text-xs font-semibold ${getRatingColor(movie.rating ?? '')}`}>
                {movie.rating}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
