export interface MovieAsset {
    id: string;
    title: string;
    poster: any; // Using 'any' to accommodate different image formats
    genre: string[];
    duration?: number;
    rating?: string;
}

export interface MovieAssets {
    [key: string]: MovieAsset;
}

export interface CinemaType {
    id: string;
    name: string;
    price: number;
    totalSeats: number;
    rows: number;
    seatsPerRow: number;
}

export interface ShowTime {
    id: string;
    time: string;
    cinemaType: string;
    availableSeats: number;
}

export interface Seat {
    id: string;
    row: string;
    number: number;
    isAvailable: boolean;
    isSelected: boolean;
    type: 'regular' | 'premium' | 'vip';
}

export interface Cinema {
    id: string;
    name: string;
    location: string;
    cinemaTypes: CinemaType[];
}

export interface MovieShowTime {
    id: string;
    time: string;
    cinemaType: string;
    movieId: string;
    cinemaId: string;
    availableSeats: number;
    date: string;
}

export interface BookingData {
    movieId: string;
    cinemaId: string;
    cinemaTypeId: string;
    showTimeId: string;
    selectedSeats: string[];
    totalPrice: number;
    bookingDate: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
}
