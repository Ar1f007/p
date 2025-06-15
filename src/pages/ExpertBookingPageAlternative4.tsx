import React, { useState } from 'react';
import { expertData } from '../data/expertData';
import { services, faqItems, availableTimeSlots } from '../data/serviceData';
import ExpertProfile from '../components/expert/ExpertProfile';
import PackageConfirmation from '../components/services/PackageConfirmation';
import FAQSection from '../components/faq/FAQSection';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, Check, ChevronsUpDown, CalendarCheck, Clock, BadgeCheck, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Service, TimeSlot } from '../types/service';
import { format } from 'date-fns';

const ExpertBookingPageAlternative4: React.FC = () => {
  const { bookingState, setBookingStep, setServiceId, setSelectedTimeSlot } = useBooking();
  const selectedService = services.find(service => service.id === bookingState.serviceId) || null;
  const selectedTimeSlot = availableTimeSlots.find(slot => slot.id === bookingState.selectedTimeSlot) || null;
  
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const isPackage = selectedService?.type === 'package';
  // Define serviceType variable based on selectedService
  const serviceType = selectedService?.type || 'quick';
  
  // Filtered services by type
  const quickServices = services.filter(s => s.type === 'quick');
  const packageServices = services.filter(s => s.type === 'package');
  
  // Step numbers with special handling for packages (which skip the schedule step)
  const getCurrentStep = () => {
    if (bookingState.step === 'service') return 1;
    if (bookingState.step === 'schedule') return 2;
    if (bookingState.step === 'confirm') {
      return isPackage ? 2 : 3;
    }
    return 1;
  };
  
  const getTotalSteps = () => isPackage ? 2 : 3;
  const currentStep = getCurrentStep();
  const totalSteps = getTotalSteps();
  
  const renderBookingSummary = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-8">
        <div className="p-6 border-b border-secondary-200">
          <h3 className="text-lg font-bold text-secondary-900 mb-4">Booking Summary</h3>
          
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
              <img 
                src={expertData.avatarUrl} 
                alt={expertData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-secondary-900">{expertData.name}</p>
              <p className="text-sm text-secondary-600">{expertData.title}</p>
            </div>
          </div>
          
          {selectedService && (
            <div>
              <div className="py-3 border-b border-dashed border-secondary-200">
                <div className="flex justify-between mb-1">
                  <span className="text-secondary-600 text-sm">Service</span>
                  <span className="font-medium text-secondary-900 text-sm">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 text-sm">Duration</span>
                  <span className="text-secondary-900 text-sm">{selectedService.duration} min</span>
                </div>
              </div>
              
              {selectedTimeSlot && (
                <div className="py-3 border-b border-dashed border-secondary-200">
                  <div className="flex justify-between mb-1">
                    <span className="text-secondary-600 text-sm">Date</span>
                    <span className="text-secondary-900 text-sm">
                      {format(new Date(selectedTimeSlot.startTime), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600 text-sm">Time</span>
                    <span className="text-secondary-900 text-sm">
                      {format(new Date(selectedTimeSlot.startTime), 'h:mm a')}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="py-3">
                <div className="flex justify-between mb-1">
                  <span className="text-secondary-600 text-sm">Price</span>
                  <span className="text-secondary-900 font-medium">${selectedService.price}</span>
                </div>
                
                {bookingState.step === 'confirm' && (
                  <>
                    <div className="flex justify-between mb-1">
                      <span className="text-secondary-600 text-sm">Processing Fee</span>
                      <span className="text-secondary-900 text-sm">
                        ${(selectedService.price * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 mt-3 border-t border-secondary-200">
                      <span className="text-secondary-900 font-bold">Total</span>
                      <span className="text-secondary-900 font-bold">
                        ${(selectedService.price + selectedService.price * 0.05).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        {bookingState.step === 'service' && (
          <div className="p-6 bg-primary-50">
            <div className="flex items-start mb-3">
              <div className="bg-white p-1 rounded-full mr-3">
                <BadgeCheck className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-sm text-primary-800">
                <span className="font-medium">100% Satisfaction Guarantee</span> - If you're not satisfied, we'll provide a full refund.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-white p-1 rounded-full mr-3">
                <CalendarCheck className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-sm text-primary-800">
                <span className="font-medium">Flexible Scheduling</span> - Reschedule up to 24 hours before your appointment.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Tabs for different service types
  const renderServiceTabs = () => {
    return (
      <div className="flex mb-6">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
            activeTabIndex === 0 
              ? 'text-primary-600 border-primary-600' 
              : 'text-secondary-600 border-secondary-200 hover:text-secondary-900'
          }`}
          onClick={() => setActiveTabIndex(0)}
        >
          Quick Sessions
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
            activeTabIndex === 1 
              ? 'text-primary-600 border-primary-600' 
              : 'text-secondary-600 border-secondary-200 hover:text-secondary-900'
          }`}
          onClick={() => setActiveTabIndex(1)}
        >
          Packages
        </button>
      </div>
    );
  };

  // Available time slots section
  const renderTimeSlots = () => {
    if (!bookingState.selectedDate) return null;
    
    const availableSlotsForDate = availableTimeSlots.filter(
      slot => new Date(slot.startTime).toDateString() === bookingState.selectedDate?.toDateString() && slot.available
    );
    
    return (
      <div className="mt-6">
        <h3 className="font-medium text-secondary-900 mb-3">
          Available Times for {format(bookingState.selectedDate, 'EEEE, MMMM d')}
        </h3>
        
        {availableSlotsForDate.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {availableSlotsForDate.map(slot => (
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
        ) : (
          <p className="text-secondary-600">No available times on this date. Please select another date.</p>
        )}
      </div>
    );
  };
  
  // Step indicator for the top of the page
  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="bg-primary-50 text-primary-700 font-medium text-sm py-1 px-3 rounded-full">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {renderStepIndicator()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {bookingState.step === 'service' && (
            <div className="animate-slide-up">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <img 
                  src={expertData.avatarUrl} 
                  alt={expertData.name} 
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-secondary-900">{expertData.name}</h1>
                  <p className="text-secondary-600">{expertData.title}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                {renderServiceTabs()}
                
                {activeTabIndex === 0 ? (
                  <div className="space-y-6">
                    {quickServices.map((service) => (
                      <ServiceRow 
                        key={service.id}
                        service={service}
                        isSelected={bookingState.serviceId === service.id}
                        onSelect={() => {
                          setServiceId(service.id);
                          setBookingStep('schedule');
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {packageServices.map((service) => (
                      <ServiceRow 
                        key={service.id}
                        service={service}
                        isSelected={bookingState.serviceId === service.id}
                        onSelect={() => {
                          setServiceId(service.id);
                          setBookingStep('confirm');
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <FAQSection faqs={faqItems} serviceType={serviceType} />
            </div>
          )}
          
          {bookingState.step === 'expert-profile' && (
            <div className="animate-slide-up">
              <Button
                variant="outline"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => setBookingStep('service')}
                className="mb-6"
              >
                Back to Services
              </Button>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <ExpertProfile expert={expertData} />
              </div>
            </div>
          )}
          
          {bookingState.step === 'schedule' && selectedService && (
            <div className="animate-slide-up">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-secondary-900">
                    Schedule Your Session
                  </h2>
                  <div className="hidden md:block">
                    <Button
                      variant="primary"
                      disabled={!bookingState.selectedTimeSlot}
                      onClick={() => setBookingStep('confirm')}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2">
                    <Calendar 
                      selectedService={selectedService} 
                      timeSlots={availableTimeSlots} 
                    />
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    {renderTimeSlots()}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-secondary-200 flex justify-between">
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
                      disabled={!bookingState.selectedTimeSlot}
                      onClick={() => setBookingStep('confirm')}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {bookingState.step === 'confirm' && (
            <div className="animate-slide-up">
              {isPackage && selectedService ? (
                <PackageConfirmation selectedService={selectedService} />
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <BookingConfirmation
                    expert={expertData}
                    service={selectedService}
                    timeSlot={selectedTimeSlot}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="hidden lg:block">
          {renderBookingSummary()}
        </div>
      </div>
    </div>
  );
};

// Custom service row component for this design variation
interface ServiceRowProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ service, isSelected, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className={`border rounded-lg transition-all ${
        isSelected 
          ? 'border-primary-500 shadow-sm' 
          : 'border-secondary-200 hover:border-secondary-300'
      }`}
    >
      <div 
        className="p-4 flex flex-col md:flex-row md:items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-grow mb-3 md:mb-0">
          <div className="flex flex-wrap items-start justify-between">
            <div>
              <h3 className="font-bold text-secondary-900">{service.name}</h3>
              <div className="flex items-center text-sm text-secondary-600 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                <span>{service.duration} minutes</span>
              </div>
            </div>
            
            <div className="md:text-right">
              <div className="text-xl font-bold text-secondary-900">${service.price}</div>
              {service.popular && (
                <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
          </div>
          
          <p className="text-secondary-700 text-sm mt-2">{service.description}</p>
        </div>
        
        <div className="md:ml-4 flex md:flex-col items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`py-2 px-4 rounded-lg text-sm font-medium mr-3 md:mr-0 md:mb-3 ${
              isSelected 
                ? 'bg-primary-600 text-white' 
                : 'bg-white border border-primary-600 text-primary-600 hover:bg-primary-50'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-1 rounded-full hover:bg-secondary-100"
          >
            <ChevronsUpDown className="w-4 h-4 text-secondary-500" />
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 border-t border-secondary-100">
          <h4 className="font-medium text-secondary-900 mb-2">What's included:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-4 h-4 text-success-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-secondary-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Simple Calendar component
interface CalendarProps {
  selectedService: Service;
  timeSlots: TimeSlot[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedService, timeSlots }) => {
  const { bookingState, setSelectedDate } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate days for the current month
  const getDaysInMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    const days = [];
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    
    // Add empty spaces for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      days.push(date);
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentMonth);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Check if date has available slots
  const hasAvailableSlots = (date: Date) => {
    return timeSlots.some(
      slot => new Date(slot.startTime).toDateString() === date.toDateString() && slot.available
    );
  };
  
  // Check if date is selected
  const isDateSelected = (date: Date) => {
    return bookingState.selectedDate?.toDateString() === date.toDateString();
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-secondary-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            className="p-1 rounded-md hover:bg-secondary-100"
          >
            &lt;
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            className="p-1 rounded-md hover:bg-secondary-100"
          >
            &gt;
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-secondary-600 py-2">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
            {day && (
              <button
                disabled={day < new Date() || !hasAvailableSlots(day)}
                onClick={() => setSelectedDate(day)}
                className={`w-full h-full flex items-center justify-center rounded-md text-sm relative ${
                  isDateSelected(day)
                    ? 'bg-primary-600 text-white' 
                    : day < new Date()
                      ? 'text-secondary-300 bg-secondary-50'
                      : hasAvailableSlots(day)
                        ? 'text-secondary-900 hover:bg-secondary-100'
                        : 'text-secondary-300 bg-secondary-50'
                }`}
              >
                {day.getDate()}
                {hasAvailableSlots(day) && !isDateSelected(day) && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></span>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Define the missing BookingConfirmation component (it seems to be used but not defined)
interface BookingConfirmationProps {
  expert: any;
  service: Service | null;
  timeSlot: TimeSlot | null;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ expert, service, timeSlot }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-secondary-900 mb-6">Confirm Your Booking</h2>
      
      {/* Payment form would go here */}
      <div className="border border-secondary-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-secondary-900 mb-3">Payment Details</h3>
        <p className="text-secondary-600 text-sm mb-4">
          Enter your payment information to complete your booking
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Card Number
            </label>
            <input 
              type="text" 
              placeholder="1234 5678 9012 3456"
              className="w-full p-2 border border-secondary-300 rounded-md"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Expiry Date
              </label>
              <input 
                type="text" 
                placeholder="MM/YY"
                className="w-full p-2 border border-secondary-300 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                CVC
              </label>
              <input 
                type="text" 
                placeholder="123"
                className="w-full p-2 border border-secondary-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-secondary-200 flex justify-between">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => {/* Handle back */}}
        >
          Back
        </Button>
        
        <Button
          variant="primary"
          leftIcon={<CreditCard className="w-4 h-4" />}
        >
          Complete Booking
        </Button>
      </div>
    </div>
  );
};

export default ExpertBookingPageAlternative4;