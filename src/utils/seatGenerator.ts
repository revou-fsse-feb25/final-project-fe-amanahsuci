import { Seat, CinemaType } from '../types';

export const generateSeats = (cinemaType: CinemaType): Seat[] => {
    const seats: Seat[] = [];
    const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, cinemaType.rows);
    
    for (let i = 0; i < cinemaType.rows; i++) {
        const rowLetter = rows[i];
        
        for (let j = 1; j <= cinemaType.seatsPerRow; j++) {
            const seatId = `${rowLetter}${j}`;
            let seatType: 'regular' | 'premium' | 'vip' = 'regular';
        
        // Determine seat type based on cinema type and position
        if (cinemaType.id === 'premier') {
            seatType = 'vip';
        } else if (cinemaType.id === '3d') {
            // Middle rows are premium
            if (i >= 2 && i <= 5) {
            seatType = 'premium';
            }
        } else if (cinemaType.id === '2d') {
            // middle rows (D-G) are premium
            if (i >= 3 && i <= 6) {
            seatType = 'premium';
            }
        }
        
            seats.push({
                id: seatId,
                row: rowLetter,
                number: j,
                isAvailable: Math.random() > 0.3, // simulate some seats being taken
                isSelected: false,
                type: seatType
            });
        }
    }

    return seats;
};

export const calculateTotalPrice = (selectedSeats: Seat[], cinemaType: CinemaType): number => {
    return selectedSeats.length * cinemaType.price;
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};