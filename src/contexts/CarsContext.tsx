
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car, cars as initialCars } from '@/data/cars';

interface CarsContextType {
  cars: Car[];
  filteredCars: Car[];
  filterCars: (filters: CarFilters) => void;
  getCar: (id: string) => Car | undefined;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getBookingsForUser: (userId: string) => Booking[];
  cancelBooking: (bookingId: string) => void;
  updateBooking: (updated: Booking) => void;
}

export interface CarFilters {
  brand?: string;
  type?: string;
  priceRange?: [number, number];
  sortBy?: 'priceAsc' | 'priceDesc' | 'newest';
}

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date;
  returnDate: Date;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export const useCars = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};

interface CarsProviderProps {
  children: ReactNode;
}

export const CarsProvider = ({ children }: CarsProviderProps) => {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(initialCars);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings);
        // Convert string dates back to Date objects
        const bookingsWithDates = parsed.map((booking: any) => ({
          ...booking,
          pickupDate: new Date(booking.pickupDate),
          returnDate: new Date(booking.returnDate),
          createdAt: new Date(booking.createdAt)
        }));
        setBookings(bookingsWithDates);
      } catch (error) {
        console.error('Error parsing bookings:', error);
      }
    }
  }, []);

  const filterCars = (filters: CarFilters) => {
    let result = [...cars];

    if (filters.brand && filters.brand !== 'All') {
      result = result.filter(car => car.brand === filters.brand);
    }

    if (filters.type && filters.type !== 'All') {
      result = result.filter(car => car.type === filters.type);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(car => car.pricePerDay >= min && car.pricePerDay <= max);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'priceAsc':
          result.sort((a, b) => a.pricePerDay - b.pricePerDay);
          break;
        case 'priceDesc':
          result.sort((a, b) => b.pricePerDay - a.pricePerDay);
          break;
        case 'newest':
          result.sort((a, b) => b.year - a.year);
          break;
      }
    }

    setFilteredCars(result);
  };

  const cancelBooking = (bookingId: string) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };
  
  const updateBooking = (updatedBooking: Booking) => {
    const updated = bookings.map(b =>
      b.id === updatedBooking.id ? updatedBooking : b
    );
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  const getCar = (id: string) => {
    return cars.find(car => car.id === id);
  };

  const addBooking = (booking: Booking) => {
    const newBookings = [...bookings, booking];
    setBookings(newBookings);
    
    // Save to localStorage
    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  const getBookingsForUser = (userId: string) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const value = {
    cars,
    filteredCars,
    filterCars,
    getCar,
    bookings,
    addBooking,
    getBookingsForUser,
    cancelBooking,
    updateBooking
  };

  return <CarsContext.Provider value={value}>{children}</CarsContext.Provider>;
};
