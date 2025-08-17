import { CinemaType, ShowTime, Cinema } from '../types';

const cinemaTypes: CinemaType[] = [
    {
        id: '2d',
        name: '2D',
        price: 45000,
        totalSeats: 120,
        rows: 10, // A-J
        seatsPerRow: 12
    },
    {
        id: '3d',
        name: '3D',
        price: 65000,
        totalSeats: 80,
        rows: 8, // A-H
        seatsPerRow: 10
    },
    {
        id: 'premier',
        name: 'Premier',
        price: 85000,
        totalSeats: 32,
        rows: 6, // A-F
        seatsPerRow: 6
    }
];

const showtimes: ShowTime[] = [
    // 2D showtimes
    { id: '2d-10:00', time: '10:00', cinemaType: '2d', availableSeats: 120 },
    { id: '2d-13:00', time: '13:00', cinemaType: '2d', availableSeats: 120 },
    { id: '2d-16:00', time: '16:00', cinemaType: '2d', availableSeats: 120 },
    { id: '2d-19:00', time: '19:00', cinemaType: '2d', availableSeats: 120 },
    { id: '2d-22:00', time: '22:00', cinemaType: '2d', availableSeats: 120 },
    
    // 3D showtimes
    { id: '3d-11:00', time: '11:00', cinemaType: '3d', availableSeats: 80 },
    { id: '3d-14:00', time: '14:00', cinemaType: '3d', availableSeats: 80 },
    { id: '3d-17:00', time: '17:00', cinemaType: '3d', availableSeats: 80 },
    { id: '3d-20:00', time: '20:00', cinemaType: '3d', availableSeats: 80 },
    
    // Premier showtimes
    { id: 'premier-12:00', time: '12:00', cinemaType: 'premier', availableSeats: 24 },
    { id: 'premier-15:00', time: '15:00', cinemaType: 'premier', availableSeats: 24 },
    { id: 'premier-18:00', time: '18:00', cinemaType: 'premier', availableSeats: 24 },
    { id: 'premier-21:00', time: '21:00', cinemaType: 'premier', availableSeats: 24 }
];

const cinemas: Cinema[] = [
    {
        id: 'cinema-1',
        name: 'CinemaXX Padang',
        location: 'Plaza Andalas',
        cinemaTypes
    },
    {
        id: 'cinema-2',
        name: 'Cineklex Padang',
        location: 'BASKO Mall',
        cinemaTypes
    }
];

const getCinemaTypeById = (id: string): CinemaType | undefined => {
    return cinemaTypes.find(type => type.id === id);
};

const getShowtimesByCinemaType = (cinemaTypeId: string): ShowTime[] => {
    return showtimes.filter(showtime => showtime.cinemaType === cinemaTypeId);
};

export { 
    cinemaTypes, 
    showtimes, 
    cinemas, 
    getCinemaTypeById, 
    getShowtimesByCinemaType 
};