import React, { useState } from 'react';
import { expertData } from '../data/expertData';
import { services, faqItems, availableTimeSlots } from '../data/serviceData';
import ExpertProfile from '../components/expert/ExpertProfile';
import ServiceSelection from '../components/services/ServiceSelection';
import BookingProgress from '../components/booking/BookingProgress';
import ScheduleSelector from '../components/booking/ScheduleSelector';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import MultiSlotCalendar from '../components/booking/MultiSlotCalendar';
import FAQSection from '../components/faq/FAQSection';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, ChevronRight, Calendar, User, CreditCard, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { TimeSlot } from '../types/service';
import { format } from 'date-fns';

const ExpertBookingPageAlternative6: React.FC = () => {
  const { bookingState, setBookingStep, setServiceId, resetBooking } = useBooking();
  const selectedService = services.find(service => service.id === bookingState.serviceId) || null;
  const selectedTimeSlot = availableTimeSlots.find(slot => slot.id === bookingState.selectedTimeSlot) || null;
  
  // State for multiple time slots (for packages)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  
  // For multi-session packages
  const isPackage = selectedService?.type === 'package';
  
  // Determine the service type for FAQ filtering
  const serviceType = selectedService?.type || null;
  
  // Progress steps
  const renderProgressSteps = () => {
    const steps = [
      { key: 'service', label: 'Choose Service', icon: <User className="w-5 h-5" /> },
      { key: 'schedule', label: 'Schedule', icon: <Calendar className="w-5 h-5" /> },
      { key: 'confirm', label: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
      { key: 'complete', label: 'Done', icon: <CheckCircle className="w-5 h-5" /> }
    ];
    
    // If it's a package, we still want to show the schedule step
    let currentStepIndex;
    if (bookingState.step === 'service') currentStepIndex = 0;
    else if (bookingState.step === 'schedule') currentStepIndex = 1;
    else if (bookingState.step === 'confirm') currentStepIndex = 2;
    else currentStepIndex = 0;
    
    return (
      <div className="hidden md:block mb-8">
        <div className="bg-white rounded-lg shadow-sm py-5 px-6">
          <div className="flex justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary-200"></div>
            
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.key} className="relative flex flex-col items-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted 
                      ? 'bg-success-500 text-white' 
                      : isCurrent
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border-2 border-secondary-300 text-secondary-400'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-xs font-medium ${
                    isCompleted 
                      ? 'text-success-600' 
                      : isCurrent
                        ? 'text-primary-700'
                        : 'text-secondary-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  // Handle completing the multi-slot selection
  const handleMultiSlotComplete = (slots: TimeSlot[]) => {
    setSelectedTimeSlots(slots);
    setBookingStep('confirm');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {renderProgressSteps()}
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-5">
          {bookingState.step === 'service' && (
            <div className="animate-fade-in">
              {/* Expert Profile Section - Using Original Design */}
              <div className="mb-12">
                <ExpertProfile expert={expertData} />
              </div>
              
              <Card className="mb-8">
                <h2 className="text-xl font-bold text-secondary-900 mb-6 flex items-center">
                  <span className="bg-primary-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Choose Your Service
                </h2>
                <ServiceSelection services={services} />
              </Card>
              
              <FAQSection faqs={faqItems} serviceType={serviceType} />
            </div>
          )}
          
          {bookingState.step === 'expert-profile' && (
            <div className="animate-fade-in">
              <Card className="mb-8">
                <Button
                  variant="outline"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  onClick={() => setBookingStep('service')}
                  className="mb-6"
                >
                  Back to Services
                </Button>
                <ExpertProfile expert={expertData} />
              </Card>
            </div>
          )}
          
          {bookingState.step === 'schedule' && (
            <div className="animate-fade-in">
              <Card className="mb-8">
                <h2 className="text-xl font-bold text-secondary-900 mb-6 flex items-center">
                  <span className="bg-primary-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  {isPackage ? 'Schedule Your Sessions' : 'Choose Date & Time'}
                </h2>
                
                {isPackage && selectedService ? (
                  <MultiSlotCalendar 
                    timeSlots={availableTimeSlots}
                    selectedService={selectedService}
                    onComplete={handleMultiSlotComplete}
                    onCancel={() => setBookingStep('service')}
                  />
                ) : (
                  <ScheduleSelector 
                    timeSlots={availableTimeSlots} 
                    selectedService={selectedService}
                  />
                )}
              </Card>
            </div>
          )}
          
          {bookingState.step === 'confirm' && (
            <div className="animate-fade-in">
              <Card className="mb-8">
                <h2 className="text-xl font-bold text-secondary-900 mb-6 flex items-center">
                  <span className="bg-primary-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Complete Your Booking
                </h2>
                
                {isPackage ? (
                  <PackageBookingConfirmation
                    expert={expertData}
                    service={selectedService}
                    selectedSlots={selectedTimeSlots}
                    onBack={() => setBookingStep('schedule')}
                    onComplete={() => {
                      alert('Booking confirmed! In a real application, this would process payment and complete the booking.');
                      resetBooking();
                    }}
                  />
                ) : (
                  <BookingConfirmation
                    expert={expertData}
                    service={selectedService}
                    timeSlot={selectedTimeSlot}
                  />
                )}
              </Card>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            {/* Booking Summary Card */}
            <Card className="mb-6">
              <h3 className="font-bold text-lg text-secondary-900 mb-4">Booking Summary</h3>
              
              {selectedService ? (
                <div>
                  <div className="flex items-center mb-4 pb-4 border-b border-secondary-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
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
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Service:</span>
                      <span className="font-medium text-secondary-900">{selectedService.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Duration:</span>
                      <span className="text-secondary-900">{selectedService.duration} min</span>
                    </div>
                    
                    {isPackage && (
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Sessions:</span>
                        <span className="text-secondary-900">{selectedTimeSlots.length} selected</span>
                      </div>
                    )}
                    
                    {!isPackage && selectedTimeSlot && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Date:</span>
                          <span className="text-secondary-900">
                            {format(new Date(selectedTimeSlot.startTime), 'MMM d, yyyy')}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Time:</span>
                          <span className="text-secondary-900">
                            {format(new Date(selectedTimeSlot.startTime), 'h:mm a')}
                          </span>
                        </div>
                      </>
                    )}
                    
                    <div className="pt-3 mt-1 border-t border-secondary-200">
                      <div className="flex justify-between">
                        <span className="font-medium text-secondary-900">Price:</span>
                        <span className="font-bold text-secondary-900">${selectedService.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="w-12 h-12 text-secondary-300 mb-3" />
                  <p className="text-secondary-600 mb-1">No service selected yet</p>
                  <p className="text-xs text-secondary-500">
                    Choose a service to see your booking details here
                  </p>
                </div>
              )}
            </Card>
            
            {/* Quick help card */}
            <Card className="bg-secondary-50">
              <h3 className="font-medium text-secondary-900 mb-3">Need Help?</h3>
              <p className="text-sm text-secondary-600 mb-4">
                Have questions about our services or booking process?
              </p>
              <Button
                variant="outline"
                size="sm"
                isFullWidth
              >
                Contact Support
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for displaying package booking confirmation
interface PackageBookingConfirmationProps {
  expert: any;
  service: any;
  selectedSlots: TimeSlot[];
  onBack: () => void;
  onComplete: () => void;
}

const PackageBookingConfirmation: React.FC<PackageBookingConfirmationProps> = ({
  expert,
  service,
  selectedSlots,
  onBack,
  onComplete
}) => {
  if (!service) return null;
  
  return (
    <div>
      <div className="mb-6">
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <h3 className="font-medium text-primary-800 mb-2">Package Summary</h3>
          <p className="text-primary-700 mb-3">{service.name} - ${service.price}</p>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
              <span className="text-sm text-primary-700">
                {selectedSlots.length} sessions selected
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
              <span className="text-sm text-primary-700">
                First session on {format(new Date(selectedSlots[0]?.startTime || new Date()), 'MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
              <span className="text-sm text-primary-700">
                Last session on {format(new Date(selectedSlots[selectedSlots.length-1]?.startTime || new Date()), 'MMMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium text-secondary-900 mb-3">Selected Sessions</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {selectedSlots.map((slot, index) => (
            <div key={slot.id} className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-secondary-900">Session {index + 1}</div>
                  <div className="text-sm text-secondary-600">
                    {format(new Date(slot.startTime), 'MMMM d, yyyy')}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {format(new Date(slot.startTime), 'h:mm a')} - {format(new Date(slot.endTime), 'h:mm a')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-secondary-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-secondary-900 mb-4">Payment Summary</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-secondary-700">{service.name}</span>
            <span className="text-secondary-900">${service.price}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-secondary-700">Processing Fee</span>
            <span className="text-secondary-900">${(service.price * 0.05).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="border-t border-secondary-200 pt-4">
          <div className="flex justify-between font-bold">
            <span className="text-secondary-900">Total</span>
            <span className="text-secondary-900">
              ${(service.price + service.price * 0.05).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-bold text-secondary-900">Payment Method</h3>
        <div className="border rounded-lg p-4 flex items-center">
          <CreditCard className="w-5 h-5 text-secondary-500 mr-3" />
          <div>
            <p className="font-medium text-secondary-900">Credit Card</p>
            <p className="text-sm text-secondary-600">
              You'll enter your payment details in the next step
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
        >
          Back
        </Button>
        
        <Button
          variant="primary"
          onClick={onComplete}
        >
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
};

export default ExpertBookingPageAlternative6;