'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';

interface Seat {
    id: string;
    row: string;
    number: number;
    status: 'available' | 'selected' | 'booked';
    price: number;
}

interface BookingDetails {
    movieTitle: string;
    cinemaName: string;
    cinemaLocation: string;
    showtime: string;
    cinemaType: string;
    selectedSeats: Seat[];
    totalPrice: number;
}

type CheckoutType = 'guest' | 'login' | 'register';
type PaymentMethod = 'qris' | 'ewallet' | 'bank' | 'credit';

const PaymentPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { movieId } = useParams();
    
    const [bookingData, setBookingData] = useState<BookingDetails | null>(null);
    const [checkoutType, setCheckoutType] = useState<CheckoutType>('guest');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
    const [isProcessing, setIsProcessing] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    
    // Guest form data
    const [guestData, setGuestData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        const dataParam = searchParams.get('data');
        if (dataParam) {
            try {
                const parsedData: BookingDetails = JSON.parse(decodeURIComponent(dataParam));
                setBookingData(parsedData);
            } catch (error) {
                console.error('Error parsing booking data:', error);
                router.push(`/booking/${movieId}/seats`);
            }
        } else {
            router.push(`/booking/${movieId}/seats`);
        }
    }, [searchParams, movieId, router]);

    const handleCheckoutTypeChange = (type: CheckoutType) => {
        if (type === 'login') {
            router.push(`/login?redirect=/booking/${movieId}/payment&data=${encodeURIComponent(JSON.stringify(bookingData))}`);
        } else if (type === 'register') {
            router.push(`/register?redirect=/booking/${movieId}/payment&data=${encodeURIComponent(JSON.stringify(bookingData))}`);
        } else {
            setCheckoutType(type);
        }
    };

    const handleGuestDataChange = (field: keyof typeof guestData, value: string) => {
        setGuestData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleApplyPromo = () => {
        // Simulasi promo code - bisa diganti dengan API call
        const validPromoCodes = {
            'STUDENT10': 0.1, // 10% discount
            'WEEKEND15': 0.15, // 15% discount
            'NEWUSER20': 0.2   // 20% discount
        };

        const discountRate = validPromoCodes[promoCode as keyof typeof validPromoCodes];
        if (discountRate) {
            setDiscount(discountRate);
            alert(`Promo code applied! You get ${discountRate * 100}% discount.`);
        } else {
            alert('Invalid promo code.');
            setDiscount(0);
        }
    };

    const calculateTotal = () => {
        if (!bookingData) return 0;
        const subtotal = bookingData.totalPrice;
        const serviceFee = 5000;
        const adminFee = 2500;
        const total = subtotal + serviceFee + adminFee;
        const discountAmount = total * discount;
        return total - discountAmount;
    };

    const handlePayment = async () => {
        if (!bookingData) return;

        // Validasi form guest jika checkout as guest
        if (checkoutType === 'guest') {
            if (!guestData.fullName || !guestData.email || !guestData.phone) {
                alert('Please fill in all required fields.');
                return;
            }
        }

        setIsProcessing(true);

        // Simulasi proses pembayaran
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Buat booking ID
            const bookingId = `BK${Date.now()}`;
            
            // Data untuk halaman konfirmasi
            const confirmationData = {
                ...bookingData,
                bookingId,
                paymentMethod,
                customerData: checkoutType === 'guest' ? guestData : null,
                finalAmount: calculateTotal(),
                discount,
                promoCode: discount > 0 ? promoCode : null
            };

            // Redirect ke halaman konfirmasi
            router.push(`/booking/${movieId}/confirmation?data=${encodeURIComponent(JSON.stringify(confirmationData))}`);
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const getPaymentMethodName = (method: PaymentMethod) => {
        switch (method) {
            case 'qris': return 'QRIS';
            case 'ewallet': return 'E-Wallet';
            case 'bank': return 'Bank Transfer';
            case 'credit': return 'Credit Card';
            default: return 'Unknown';
        }
    };

    if (!bookingData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-white">Loading payment page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="bg-stone-200 shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-stone-600">Complete Your Booking</h1>
                        <button 
                            onClick={() => router.back()}
                            className="flex items-center text-stone-500 hover:text-stone-800"
                        >
                            <span className="mr-2">←</span> Back
                        </button>
                    </div>
                    
                    <div className="flex justify-center items-center space-x-8">
                        {/* Step 1: Seat Selection */}
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-500 text-white text-sm font-medium">
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-stone-600">Seat Selection</span>
                        </div>
                        
                        <div className="w-16 h-1 bg-stone-500"></div>
                        
                        {/* Step 2: Payment (Current) */}
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-medium">
                                2
                            </div>
                            <span className="ml-2 text-sm font-medium text-blue-600">Payment</span>
                        </div>
                        
                        <div className="w-16 h-1 bg-gray-300"></div>
                        
                        {/* Step 3: Confirmation */}
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 text-sm font-medium">
                                3
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-500">Confirmation</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - Payment Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Checkout Options */}
                        <div className="bg-stone-200 shadow-md p-6">
                            <h3 className="text-xl font-bold text-stone-600 mb-4">How would you like to proceed?</h3>
                            <div className="space-y-3">
                                <div 
                                    onClick={() => handleCheckoutTypeChange('guest')}
                                    className={`p-4 border-2 cursor-pointer transition-all ${
                                        checkoutType === 'guest' 
                                            ? 'border-stone-700 bg-stone-300 hover:text-stone-100' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <h4 className="font-medium text-stone-700">Continue as Guest</h4>
                                    <p className="text-sm text-gray-600">Quick checkout without creating an account</p>
                                </div>
                                
                                <div 
                                    onClick={() => handleCheckoutTypeChange('login')}
                                    className="p-4 border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-all"
                                >
                                    <h4 className="font-medium text-stone-700">Already have an account? Login here</h4>
                                    <p className="text-sm text-gray-600">Access your saved information and booking history</p>
                                </div>
                                
                                <div 
                                    onClick={() => handleCheckoutTypeChange('register')}
                                    className="p-4 border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-all"
                                >
                                    <h4 className="font-medium text-stone-700">Don't have an account? Register here</h4>
                                    <p className="text-sm text-gray-600">Create an account to save preferences and get exclusive offers</p>
                                </div>
                            </div>
                        </div>

                        {/* Guest Information Form (only show if guest selected) */}
                        {checkoutType === 'guest' && (
                            <div className="bg-stone-100 shadow-md p-6">
                                <h3 className="text-xl font-bold text-stone-600 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            value={guestData.fullName}
                                            onChange={(e) => handleGuestDataChange('fullName', e.target.value)}
                                            placeholder="Enter your full name"
                                            className="w-full p-3 border border-stone-300 focus:ring-1 focus:ring-stone-400 focus:border-transparent text-stone-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            value={guestData.email}
                                            onChange={(e) => handleGuestDataChange('email', e.target.value)}
                                            placeholder="Enter your email address"
                                            className="w-full p-3 border border-stone-300 focus:ring-1 focus:ring-stone-400 focus:border-transparent text-stone-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={guestData.phone}
                                            onChange={(e) => handleGuestDataChange('phone', e.target.value)}
                                            placeholder="Enter your phone number"
                                            className="w-full p-3 border border-stone-300 focus:ring-1 focus:ring-stone-400 focus:border-transparent text-stone-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Methods */}
                        <div className="bg-stone-100 shadow-md p-6">
                            <h3 className="text-xl font-bold text-stone-600 mb-4">Choose Payment Method</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div 
                                    onClick={() => setPaymentMethod('qris')}
                                    className={`p-4 border-2 cursor-pointer text-center transition-all ${
                                        paymentMethod === 'qris' 
                                            ? 'border-stone-500 bg-stone-200' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">📱</div>
                                    <h4 className="font-medium text-stone-700">QRIS</h4>
                                    <p className="text-sm text-gray-600">Scan & Pay</p>
                                </div>
                                
                                <div 
                                    onClick={() => setPaymentMethod('ewallet')}
                                    className={`p-4 border-2 cursor-pointer text-center transition-all ${
                                        paymentMethod === 'ewallet' 
                                            ? 'border-stone-500 bg-stone-200' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">💰</div>
                                    <h4 className="font-medium text-stone-700">E-Wallet</h4>
                                    <p className="text-sm text-gray-600">GoPay, OVO, Dana</p>
                                </div>
                                
                                <div 
                                    onClick={() => setPaymentMethod('bank')}
                                    className={`p-4 border-2 cursor-pointer text-center transition-all ${
                                        paymentMethod === 'bank' 
                                            ? 'border-stone-500 bg-stone-200' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">🏦</div>
                                    <h4 className="font-medium text-stone-700">Bank Transfer</h4>
                                    <p className="text-sm text-gray-600">Virtual Account</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Booking Summary */}
                    <div className="bg-stone-100 shadow-md p-6 h-fit sticky top-8">
                        <h3 className="text-xl font-bold text-stone-600 mb-4">Booking Summary</h3>
                        
                        {/* Movie Information */}
                        <div className="mb-4 p-4 bg-white">
                            <h4 className="font-bold text-stone-700 mb-2">{bookingData.movieTitle}</h4>
                            <div className="text-sm text-stone-600 space-y-1">
                                <p>📅 {new Date().toLocaleDateString('id-ID', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</p>
                                <p>🕐 {bookingData.showtime}</p>
                                <p>🎭 {bookingData.cinemaName} - {bookingData.cinemaLocation}</p>
                                <p>🎥 {bookingData.cinemaType}</p>
                            </div>
                        </div>

                        {/* Selected Seats */}
                        <div className="mb-4">
                            <p className="font-medium text-stone-700 mb-2">Selected Seats:</p>
                            <div className="flex flex-wrap gap-2">
                                {bookingData.selectedSeats.map(seat => (
                                    <span 
                                        key={seat.id}
                                        className="px-3 py-1 bg-stone-300 text-stone-500 rounded-full text-sm"
                                    >
                                        {seat.id}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t border-gray-300 pt-4 mb-4 ">
                            <div className="space-y-2 text-sm text-stone-600">
                                <div className="flex justify-between">
                                    <span>Ticket Price ({bookingData.selectedSeats.length}x):</span>
                                    <span>Rp {bookingData.totalPrice.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Service Fee:</span>
                                    <span>Rp 5,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Admin Fee:</span>
                                    <span>Rp 2,500</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({promoCode}):</span>
                                        <span>-Rp {(calculateTotal() / (1 - discount) * discount).toLocaleString('id-ID')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total Amount:</span>
                                    <span className="text-stone-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="mb-6">
                            <h4 className="font-medium text-stone-700 mb-2">Have a Promo Code?</h4>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                    placeholder="Enter promo code"
                                    className="flex-1 p-2 border border-stone-600 text-sm text-stone-500"
                                />
                                <button
                                    onClick={handleApplyPromo}
                                    className="px-4 py-2 bg-stone-300 text-stone-500 text-sm hover:bg-stone-600 hover:text-stone-100 transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Try: STUDENT10, WEEKEND15, NEWUSER20</p>
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing || (checkoutType === 'guest' && (!guestData.fullName || !guestData.email || !guestData.phone))}
                            className={`w-full py-3 font-medium transition-all ${
                                isProcessing 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-stone-300 hover:bg-stone-500 text-stone-500 hover:text-stone-100 hover:shadow-lg'
                            }`}
                        >
                            {isProcessing 
                                ? 'Processing Payment...' 
                                : `Pay Rp ${calculateTotal().toLocaleString('id-ID')}`
                            }
                        </button>

                        <div className="mt-4 text-xs text-center text-gray-500">
                            <p>🔒 Your payment is secured with 256-bit SSL encryption</p>
                            <p className="mt-1">By proceeding, you agree to our Terms & Conditions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;