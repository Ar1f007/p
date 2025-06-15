import React, { useState, useEffect } from 'react';
import { format, addDays, isSameDay, isAfter, isBefore, parseISO } from 'date-fns';
import { TimeSlot, Service } from '../../types/service';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Calendar, Clock, X, Info, Calendar as CalendarIcon, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import '../booking/Calendar.css';

interface MultiSlotCalendarProps {
  timeSlots: TimeSlot[];
  selectedService: Service | null;
  onComplete: (selectedSlots: TimeSlot[]) => void;
  onCancel: () => void;
}

const MultiSlotCalendar: React.FC<MultiSlotCalendarProps> = ({ 
  timeSlots, 
  selectedService, 
  onComplete,
  onCancel
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [viewDate, setViewDate] = useState<Date>(new Date());

  // Calculate required sessions based on service features
  const getRequiredSessions = (): number => {
    if (!selectedService) return 0;
    
    // Extract number of sessions from the service features
    // Look for patterns like "Three 60-minute sessions" or "4 sessions"
    const sessionFeature = selectedService.features.find(f => 
      f.toLowerCase().includes('session') || f.toLowerCase().includes('call')
    );
    
    if (sessionFeature) {
      const matches = sessionFeature.match(/(\w+)\s+(\d+)-minute sessions/i) || 
                     sessionFeature.match(/(\d+)\s+(\d+)-minute sessions/i) ||
                     sessionFeature.match(/(\w+)\s+sessions/i) ||
                     sessionFeature.match(/(\d+)\s+sessions/i) ||
                     sessionFeature.match(/(\w+)\s+calls/i) ||
                     sessionFeature.match(/(\d+)\s+calls/i);
      
      if (matches) {
        const sessionCount = matches[1];
        // Convert text number to digit
        const textToNumber: Record<string, number> = {
          'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
          'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
        };
        
        return textToNumber[sessionCount.toLowerCase()] || parseInt(sessionCount, 10);
      }
    }
    
    // Default to dividing total duration by 60 minutes if we can't parse
    return Math.max(1, Math.floor(selectedService.duration / 60));
  };

  // Calculate the valid booking window in days
  const getBookingWindowDays = (): number => {
    if (!selectedService) return 30; // Default to 30 days
    
    // Look for time windows in features like "30 days" or "4 weeks"
    const timeFeature = selectedService.features.find(f => 
      f.toLowerCase().includes('day') || 
      f.toLowerCase().includes('week') || 
      f.toLowerCase().includes('month')
    );
    
    if (timeFeature) {
      const dayMatches = timeFeature.match(/(\d+)\s+days/i);
      const weekMatches = timeFeature.match(/(\d+)\s+weeks/i);
      const monthMatches = timeFeature.match(/(\d+)\s+months/i);
      
      if (dayMatches) return parseInt(dayMatches[1], 10);
      if (weekMatches) return parseInt(weekMatches[1], 10) * 7;
      if (monthMatches) return parseInt(monthMatches[1], 10) * 30;
    }
    
    return 30; // Default to 30 days
  };
  
  const requiredSessions = getRequiredSessions();
  const bookingWindowDays = getBookingWindowDays();
  const maxDate = addDays(new Date(), bookingWindowDays);

  // Get available slots for the selected date
  const availableSlotsForDate = timeSlots.filter(
    slot => selectedDate && 
    isSameDay(parseISO(slot.startTime), selectedDate) &&
    slot.available &&
    // Don't show slots that are already selected
    !selectedTimeSlots.some(selected => selected.id === slot.id)
  );
  
  // Group time slots by hour for better display
  const groupedSlots: Record<string, TimeSlot[]> = {};
  availableSlotsForDate.forEach(slot => {
    const hour = format(parseISO(slot.startTime), 'h a');
    if (!groupedSlots[hour]) {
      groupedSlots[hour] = [];
    }
    groupedSlots[hour].push(slot);
  });

  // Function to check if a date has available slots
  const hasAvailableSlots = (date: Date): boolean => {
    return timeSlots.some(
      slot => isSameDay(parseISO(slot.startTime), date) && 
      slot.available &&
      !selectedTimeSlots.some(selected => selected.id === slot.id)
    );
  };

  // Function to handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Function to add a time slot
  const addTimeSlot = (slot: TimeSlot) => {
    if (selectedTimeSlots.length < requiredSessions) {
      setSelectedTimeSlots([...selectedTimeSlots, slot]);
    }
  };

  // Function to remove a time slot
  const removeTimeSlot = (slotId: string) => {
    setSelectedTimeSlots(selectedTimeSlots.filter(slot => slot.id !== slotId));
  };

  // Function to navigate to previous month
  const previousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  // Function to navigate to next month
  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Function to render calendar
  const renderCalendar = () => {
    // Get days in current month
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    
    // Generate array of days
    const days = [];
    
    // Add empty days for the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const isToday = isSameDay(date, new Date());
      const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
      const isAvailable = hasAvailableSlots(date);
      const isPast = isBefore(date, new Date());
      const isFuture = isAfter(date, maxDate);
      const isDisabled = isPast || isFuture || !isAvailable;
      
      const dateHasSelectedSlot = selectedTimeSlots.some(
        slot => isSameDay(parseISO(slot.startTime), date)
      );
      
      days.push(
        <button
          key={`day-${day}`}
          className={`h-10 w-10 rounded-full flex items-center justify-center relative ${
            isToday ? 'font-bold' : ''
          } ${
            isSelected 
              ? 'bg-primary-600 text-white' 
              : dateHasSelectedSlot
                ? 'bg-primary-100 text-primary-800 ring-2 ring-primary-500'
                : isDisabled
                  ? 'text-secondary-300 cursor-not-allowed'
                  : isAvailable
                    ? 'hover:bg-secondary-100 text-secondary-900'
                    : 'text-secondary-400 cursor-not-allowed'
          }`}
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
        >
          {day}
          {dateHasSelectedSlot && !isSelected && (
            <span className="absolute bottom-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
          )}
          {isAvailable && !isSelected && !dateHasSelectedSlot && (
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></span>
          )}
        </button>
      );
    }
    
    return days;
  };

  // Check if all required slots are selected
  const isSelectionComplete = selectedTimeSlots.length === requiredSessions;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar section */}
        <div className="w-full md:w-7/12">
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-secondary-900">
                Select {requiredSessions} Sessions
              </h3>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={previousMonth}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Prev
                </Button>
                <span className="text-secondary-900 font-medium">
                  {format(viewDate, 'MMMM yyyy')}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextMonth}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              </div>
            </div>
            
            <div className="mb-4 text-sm text-primary-700 p-3 bg-primary-50 rounded-lg flex items-start">
              <Info className="w-5 h-5 mr-2 flex-shrink-0 text-primary-600" />
              <p>
                You need to select {requiredSessions} sessions within the next {bookingWindowDays} days. 
                {selectedTimeSlots.length > 0 && (
                  <span> You've selected {selectedTimeSlots.length} of {requiredSessions} sessions.</span>
                )}
              </p>
            </div>
            
            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-secondary-600">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </Card>
          
          {/* Time slots */}
          {selectedDate && (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-secondary-900">
                  Available Times for {format(selectedDate, 'EEEE, MMMM d')}
                </h3>
                
                <Badge variant="primary">
                  {requiredSessions - selectedTimeSlots.length} sessions left
                </Badge>
              </div>
              
              {Object.keys(groupedSlots).length > 0 ? (
                <div className="space-y-4">
                  {Object.keys(groupedSlots).map(hour => (
                    <div key={hour}>
                      <h4 className="text-sm font-medium text-secondary-600 mb-2">{hour}</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {groupedSlots[hour].map(slot => (
                          <button
                            key={slot.id}
                            className="py-2 px-3 text-sm rounded-md border transition-colors
                              bg-white text-secondary-700 border-secondary-300 hover:border-primary-500
                              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-secondary-300"
                            onClick={() => addTimeSlot(slot)}
                            disabled={selectedTimeSlots.length >= requiredSessions}
                          >
                            {format(parseISO(slot.startTime), 'h:mm a')}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 bg-secondary-50 rounded-lg text-center">
                  <Clock className="w-8 h-8 text-secondary-400 mb-2" />
                  <p className="text-secondary-600">No available time slots for this date.</p>
                  <p className="text-sm text-secondary-500 mt-1">Please select another date from the calendar.</p>
                </div>
              )}
            </Card>
          )}
        </div>
        
        {/* Selected sessions panel */}
        <div className="w-full md:w-5/12">
          <Card className="sticky top-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-4">
              Your Selected Sessions
            </h3>
            
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-primary-600 mr-2" />
                <span className="font-medium text-secondary-900">
                  {selectedTimeSlots.length}/{requiredSessions} Sessions Selected
                </span>
              </div>
              
              {selectedTimeSlots.length > 0 && (
                <button 
                  className="text-sm text-primary-600 hover:underline"
                  onClick={() => setSelectedTimeSlots([])}
                >
                  Clear all
                </button>
              )}
            </div>
            
            {selectedTimeSlots.length > 0 ? (
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {selectedTimeSlots.map(slot => (
                  <div key={slot.id} className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                    <div>
                      <div className="font-medium text-secondary-900">
                        {format(parseISO(slot.startTime), 'MMMM d, yyyy')}
                      </div>
                      <div className="text-sm text-secondary-600">
                        {format(parseISO(slot.startTime), 'h:mm a')} - {format(parseISO(slot.endTime), 'h:mm a')}
                      </div>
                    </div>
                    <button 
                      className="p-1 text-secondary-500 hover:text-error-500 rounded-full hover:bg-secondary-100"
                      onClick={() => removeTimeSlot(slot.id)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-secondary-50 rounded-lg text-center mb-6">
                <Calendar className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                <p className="text-secondary-600">No sessions selected yet</p>
                <p className="text-sm text-secondary-500 mt-1">
                  Please select {requiredSessions} sessions from the calendar
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <Button
                variant="primary"
                isFullWidth
                disabled={!isSelectionComplete}
                leftIcon={isSelectionComplete ? <Check className="w-4 h-4" /> : undefined}
                onClick={() => onComplete(selectedTimeSlots)}
              >
                {isSelectionComplete ? 'Confirm Selected Sessions' : `Select ${requiredSessions - selectedTimeSlots.length} More Sessions`}
              </Button>
              
              <Button
                variant="outline"
                isFullWidth
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MultiSlotCalendar;