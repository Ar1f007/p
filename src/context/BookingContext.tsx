import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookingState, BookingStep } from '../types/booking';

interface BookingContextType {
  bookingState: BookingState;
  setBookingStep: (step: BookingStep) => void;
  setServiceId: (id: string | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTimeSlot: (timeSlotId: string | null) => void;
  resetBooking: () => void;
}

const defaultBookingState: BookingState = {
  step: 'service',
  expertId: 'exp-1', // Default expert ID
  serviceId: null,
  selectedDate: null,
  selectedTimeSlot: null,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>(defaultBookingState);

  const setBookingStep = (step: BookingStep) => {
    setBookingState((prev) => ({ ...prev, step }));
  };

  const setServiceId = (serviceId: string | null) => {
    setBookingState((prev) => ({ ...prev, serviceId }));
  };

  const setSelectedDate = (date: Date | null) => {
    setBookingState((prev) => ({ ...prev, selectedDate: date }));
  };

  const setSelectedTimeSlot = (timeSlotId: string | null) => {
    setBookingState((prev) => ({ ...prev, selectedTimeSlot: timeSlotId }));
  };

  const resetBooking = () => {
    setBookingState(defaultBookingState);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        setBookingStep,
        setServiceId,
        setSelectedDate,
        setSelectedTimeSlot,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}