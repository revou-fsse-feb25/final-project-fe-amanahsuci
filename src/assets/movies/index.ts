import Avengers_poster from '../images/Avengers_poster.jpg';
import Ballerina_poster from '../images/Ballerina_poster.jpg';
import Conjuring_poster from '../images/Conjuring_poster.jpg';
import Drifting_Home_Poster from '../images/Drifting_Home_Poster.jpg';
import John_wick_poster from '../images/John_wick_poster.jpg';
import Lima_cm_poster from '../images/Lima_cm_poster.jpg';
import Mufasa_poster from '../images/Mufasa_poster.jpg';
import Paranormal_activity_poster from '../images/Paranormal_activity_poster.jpg';
import Pengabdi_Setan_poster from '../images/Pengabdi_Setan_poster.jpg';
import Spy_x_Family_poster from '../images/Spy_x_Family_poster.jpg';
import Stampede_poster from '../images/Stampede_poster.jpg';
import Terrifier_poster from '../images/Terrifier_poster.jpg';

export interface MovieAsset {
    id: string;
    title: string;
    poster: any; // Using 'any' to accommodate different image formats
    genre: string[];
    duration: number;
    rating: string;
}

export interface MovieAssets {
    [key: string]: MovieAsset;
}

export const movieAssets: MovieAssets = {
    avengers: {
        id: 'avengers',
        title: 'Avengers: Endgame',
        poster: Avengers_poster,
        genre: ['Adventure', 'Drama'],
        duration: 181,
        rating: '13+'
    },
    ballerina: {
        id: 'ballerina',
        title: 'Ballerina',
        poster: Ballerina_poster,
        genre: ['Action', 'Criminal'],
        duration: 125,
        rating: '17+'
    },
    conjuring: {
        id: 'the_conjuring',
        title: 'The Conjuring',
        poster: Conjuring_poster,
        genre: ['Horror', 'Thriller'],
        duration: 125,
        rating: '17+'
    },
    driftingHome: {
        id: 'drifting_home',
        title: 'Drifting Home',
        poster: Drifting_Home_Poster,
        genre: ['Adventure', 'Drama'],
        duration: 120,
        rating: '13+'
    },
    johnWick: {
        id: 'john_wick',
        title: 'John Wick',
        poster: John_wick_poster,
        genre: ['Action', 'Thriller'],
        duration: 101,
        rating: '17+'
    },
    limaCm: {
        id: 'lima_cm',
        title: '5 CM',
        poster: Lima_cm_poster,
        genre: ['Adventure', 'Drama'],
        duration: 125,
        rating: '13+'
    },
    mufasa: {
        id: 'mufasa',
        title: 'Mufasa: The Lion King',
        poster: Mufasa_poster,
        genre: ['Adventure', 'Animation', 'Musical'],
        duration: 118,
        rating: 'G'
    },
    paranormalActivity: {
        id: 'paranormal_activity',
        title: 'Paranormal Activity',
        poster: Paranormal_activity_poster,
        genre: ['Horror', 'Thriller'],
        duration: 86,
        rating: '17+'
    },
    pengabdiSetan: {
        id: 'pengabdi_setan',
        title: 'Pengabdi Setan',
        poster: Pengabdi_Setan_poster,
        genre: ['Horror', 'Thriller'],
        duration: 107,
        rating: '17+'
    },
    spyFamily: {
        id: 'spy_x_family',
        title: 'Spy X Family Code: White',
        poster: Spy_x_Family_poster,
        genre: ['Action', 'Animation', 'Comedy'],
        duration: 110,
        rating: '11+'
    },
    stampede: {
        id: 'stampede',
        title: 'One Piece: Stampede',
        poster: Stampede_poster,
        genre: ['Adventure', 'Animation', 'Drama'],
        duration: 101,
        rating: '14+'
    },
    terrifier: {
        id: 'terrifier',
        title: 'Terrifier 3',
        poster: Terrifier_poster,
        genre: ['Horror', 'Thriller'],
        duration: 125,
        rating: '21+'
    }
}

export const getMovieById = (id: string): MovieAsset | undefined => {
    return Object.values(movieAssets).find(movie => movie.id === id);
} 

export const getMoviesByGenre = (genre: string): MovieAsset[] => {
    return Object.values(movieAssets).filter(movie => 
        movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
}

export const getAllMovies = (): MovieAsset[] => {
    return Object.values(movieAssets);
}

export const moviePosters = {
    Avengers_poster,
    Ballerina_poster,
    Conjuring_poster,
    Drifting_Home_Poster,
    John_wick_poster,
    Lima_cm_poster,
    Mufasa_poster,
    Paranormal_activity_poster,
    Pengabdi_Setan_poster,
    Spy_x_Family_poster,
    Stampede_poster,
    Terrifier_poster
} 

