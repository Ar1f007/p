import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { TimeSlot, Service } from '../../types/service';
import { format, isSameDay } from 'date-fns';
import { useBooking } from '../../context/BookingContext';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import '../booking/Calendar.css';
import Card from '../ui/Card';

interface ScheduleSelectorProps {
  timeSlots: TimeSlot[];
  selectedService: Service | null;
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({ 
  timeSlots, 
  selectedService 
}) => {
  const { bookingState, setSelectedDate, setSelectedTimeSlot, setBookingStep } = useBooking();
  const [viewDate, setViewDate] = useState<Date>(new Date());
  
  // Get available slots for the selected date
  const availableSlotsForDate = timeSlots.filter(
    slot => bookingState.selectedDate && 
    isSameDay(new Date(slot.startTime), bookingState.selectedDate) &&
    slot.available
  );
  
  // Group time slots by hour for better display
  const groupedSlots: Record<string, TimeSlot[]> = {};
  availableSlotsForDate.forEach(slot => {
    const hour = format(new Date(slot.startTime), 'h a');
    if (!groupedSlots[hour]) {
      groupedSlots[hour] = [];
    }
    groupedSlots[hour].push(slot);
  });
  
  // Function to check if a date has available slots
  const tileDisabled = ({ date }: { date: Date }) => {
    return !timeSlots.some(
      slot => isSameDay(new Date(slot.startTime), date) && slot.available
    );
  };
  
  // Function to add a class to dates with available slots
  const tileClassName = ({ date }: { date: Date }) => {
    return timeSlots.some(
      slot => isSameDay(new Date(slot.startTime), date) && slot.available
    )
      ? 'has-slots'
      : '';
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-secondary-900">
          Choose Date & Time
        </h2>
        
        <div className="hidden md:block">
          <Button
            variant="primary"
            rightIcon={<ChevronRight className="w-4 h-4" />}
            disabled={!bookingState.selectedTimeSlot}
            onClick={() => setBookingStep('confirm')}
          >
            Continue
          </Button>
        </div>
      </div>
      
      {selectedService && (
        <Card className="mb-6">
          <div className="p-3 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-primary-800">
              <span className="font-medium">Selected Service:</span> {selectedService.name} (${selectedService.price})
            </p>
          </div>
        </Card>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar */}
        <div className="w-full md:w-1/2">
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                setSelectedDate(value);
                setSelectedTimeSlot(null);
              }
            }}
            value={bookingState.selectedDate || undefined}
            onActiveStartDateChange={({ activeStartDate }) => {
              if (activeStartDate) setViewDate(activeStartDate);
            }}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // 90 days from now
            locale="en-US"
          />
        </div>
        
        {/* Time Slots */}
        <div className="w-full md:w-1/2">
          <Card>
            {bookingState.selectedDate ? (
              availableSlotsForDate.length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Available Times for {format(bookingState.selectedDate, 'MMMM d, yyyy')}
                  </h3>
                  <div className="space-y-4">
                    {Object.keys(groupedSlots).map(hour => (
                      <div key={hour}>
                        <h4 className="text-sm font-medium text-secondary-600 mb-2">{hour}</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {groupedSlots[hour].map(slot => (
                            <button
                              key={slot.id}
                              className={`py-2 px-3 text-sm rounded-md border transition-colors ${
                                bookingState.selectedTimeSlot === slot.id
                                  ? 'bg-primary-600 text-white border-primary-600'
                                  : 'bg-white text-secondary-700 border-secondary-300 hover:border-primary-500'
                              }`}
                              onClick={() => setSelectedTimeSlot(slot.id)}
                            >
                              {format(new Date(slot.startTime), 'h:mm a')}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-secondary-50 rounded-lg">
                  <p className="text-secondary-600 mb-2">No available time slots for this date.</p>
                  <p className="text-sm text-secondary-500">Please select another date from the calendar.</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-secondary-50 rounded-lg">
                <p className="text-secondary-600">Please select a date from the calendar to see available time slots.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => setBookingStep('service')}
        >
          Back
        </Button>
        
        <div className="md:hidden">
          <Button
            variant="primary"
            rightIcon={<ChevronRight className="w-4 h-4" />}
            disabled={!bookingState.selectedTimeSlot}
            onClick={() => setBookingStep('confirm')}
          >
            Continue
          </Button>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 p-4 md:hidden z-10">
        <Button
          variant="primary"
          isFullWidth
          rightIcon={<ChevronRight className="w-4 h-4" />}
          disabled={!bookingState.selectedTimeSlot}
          onClick={() => setBookingStep('confirm')}
        >
          Continue to Confirmation
        </Button>
      </div>
    </div>
  );
};

export default ScheduleSelector;