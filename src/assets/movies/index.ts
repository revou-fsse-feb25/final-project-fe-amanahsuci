import { MovieAsset, MovieAssets } from '@/types'
import Avengers_poster from '@/assets/images/NowShowing/Avengers_poster.jpg'
import Ballerina_poster from '@/assets/images/NowShowing/Ballerina_poster.jpg';
import Conjuring_poster from '@/assets/images/NowShowing/Conjuring_poster.jpg';
import Drifting_Home_Poster from '@/assets/images/NowShowing/Drifting_Home_Poster.jpg';
import John_wick_poster from '@/assets/images/NowShowing/John_wick_poster.jpg';
import Lima_cm_poster from '@/assets/images/NowShowing/Lima_cm_poster.jpg';
import Mufasa_poster from '@/assets/images/NowShowing/Mufasa_poster.jpg';
import Paranormal_activity_poster from '@/assets/images/NowShowing/Paranormal_activity_poster.jpg';
import Pengabdi_Setan_poster from '@/assets/images/NowShowing/Pengabdi_Setan_poster.jpg';
import Spy_X_Family_poster from '@/assets/images/NowShowing/Spy_X_Family_poster.png';
import Stampede_poster from '@/assets/images/NowShowing/Stampede_poster.jpg';
import Terrifier_poster from '@/assets/images/NowShowing/Terrifier_poster.jpg';
import Avatar_cs from '@/assets/images/ComingSoon/Avatar_cs.jpg';
import KimetsuNoYaiba_poster from '@/assets/images/ComingSoon/KimetsuNoYaiba_poster.png';
import Exorcism_poster from '@/assets/images/ComingSoon/Exorcism_poster.jpg';
import Materialists_poster from '@/assets/images/ComingSoon/Materialists_poster.jpg';
import Now_You_See_Me_cs from '@/assets/images/ComingSoon/Now_You_See_Me_cs.jpeg';
import Pamali_poster from '@/assets/images/ComingSoon/Pamali_poster.jpg';
import TheLife_poster from '@/assets/images/ComingSoon/TheLife_poster.jpg';
import Wakanda_poster from '@/assets/images/ComingSoon/Wakanda_poster.jpg';
import Wicked_2_cs from '@/assets/images/ComingSoon/Wicked_2_cs.jpg';

export const nowShowingMovies: MovieAssets = {
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
        poster: Spy_X_Family_poster,
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
    return Object.values(nowShowingMovies).find(movie => movie.id === id);
} 

export const getMoviesByGenre = (genre: string): MovieAsset[] => {
    return Object.values(nowShowingMovies).filter(movie => 
        movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
}

export const getAllMovies = (): MovieAsset[] => {
    return Object.values(nowShowingMovies);
}

export const nowShowingPosters = {
    Avengers_poster,
    Ballerina_poster,
    Conjuring_poster,
    Drifting_Home_Poster,
    John_wick_poster,
    Lima_cm_poster,
    Mufasa_poster,
    Paranormal_activity_poster,
    Pengabdi_Setan_poster,
    Spy_X_Family_poster,
    Stampede_poster,
    Terrifier_poster
} 

export const comingSoonMovies: MovieAssets = {
    avatarCs: {
        id: 'avatar',
        title: 'Avatar 3',
        poster: Avatar_cs,
        genre: ['Adventure', 'Animation']
    },
    exorcism: {
        id: 'exorcism',
        title: 'Exorcism',
        poster: Exorcism_poster,
        genre: ['Horror', 'Thriller']
    },
    demonSlayer: {
        id: 'demon_slayer',
        title: 'Kimetsu no Yaiba',
        poster: KimetsuNoYaiba_poster,
        genre: ['Animation', 'Fiction']
    },
    materialists: {
        id: 'materialists',
        title: 'Materialists',
        poster: Materialists_poster,
        genre: ['Drama', 'Romance']
    },
    nowYouSeeMe: {
        id: 'now_you_see_me',
        title: 'Now You See Me 3',
        poster: Now_You_See_Me_cs,
        genre: ['Drama']
    },
    pamali: {
        id: 'pamali',
        title: 'Pamali',
        poster: Pamali_poster,
        genre: ['Horror', 'Thriller']
    },
    theLife: {
        id: 'the life', 
        title: 'The Life of Chuck',
        poster: TheLife_poster,
        genre: ['Adventure', 'Drama']
    },
    wakanda: {
        id: 'wakanda',
        title: 'Wakanda',
        poster: Wakanda_poster,
        genre: ['Animation']
    },
    wicked_2: {
        id: 'wicked_2',
        title: 'Wicked 2',
        poster: Wicked_2_cs,
        genre: ['Drama', 'Musical']
    }
}

export const getComingSoonMovieById = (id: string): MovieAsset | undefined => {
    return Object.values(comingSoonMovies).find(movie => movie.id === id);
} 

export const getComingSoonMoviesByGenre = (genre: string): MovieAsset[] => {
    return Object.values(comingSoonMovies).filter(movie => 
        movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
}

export const getComingSoonAllMovies = (): MovieAsset[] => {
    return Object.values(comingSoonMovies);
}