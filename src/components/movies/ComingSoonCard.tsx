import React from 'react';
import Image from 'next/image';
import { MovieAsset } from '@/types';
import { comingSoonMovies } from '@/assets/movies';

interface ComingSoonCardProps {
    movie: MovieAsset;
    className?: string;
}

const ComingSoonCard: React.FC<ComingSoonCardProps> = ({ movie, className = '' }) => {
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
            </div>
        </div>
    );
};

export default ComingSoonCard;
