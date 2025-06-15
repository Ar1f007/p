export type BookingStep = 'service' | 'expert-profile' | 'schedule' | 'confirm';

export interface BookingState {
  step: BookingStep;
  expertId: string;
  serviceId: string | null;
  selectedDate: Date | null;
  selectedTimeSlot: string | null;
}