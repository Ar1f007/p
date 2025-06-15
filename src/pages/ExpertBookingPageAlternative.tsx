import React from 'react';
import { expertData } from '../data/expertData';
import { services, faqItems, availableTimeSlots } from '../data/serviceData';
import ExpertProfile from '../components/expert/ExpertProfile';
import ServiceSelection from '../components/services/ServiceSelection';
import BookingProgress from '../components/booking/BookingProgress';
import ScheduleSelector from '../components/booking/ScheduleSelector';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import FAQSection from '../components/faq/FAQSection';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, User } from 'lucide-react';
import Button from '../components/ui/Button';

const ExpertBookingPageAlternative: React.FC = () => {
  const { bookingState, setBookingStep } = useBooking();
  const selectedService = services.find(service => service.id === bookingState.serviceId) || null;
  const selectedTimeSlot = availableTimeSlots.find(slot => slot.id === bookingState.selectedTimeSlot) || null;
  
  // Determine the service type for FAQ filtering
  const serviceType = selectedService?.type || null;
  
  const renderExpertPreview = () => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center">
      <img 
        src={expertData.avatarUrl} 
        alt={expertData.name}
        className="w-16 h-16 rounded-full object-cover mr-4"
      />
      <div>
        <h3 className="font-bold text-secondary-900">{expertData.name}</h3>
        <p className="text-sm text-secondary-600">{expertData.title}</p>
        <Button 
          variant="link" 
          size="sm" 
          leftIcon={<User className="w-3 h-3" />}
          onClick={() => setBookingStep('expert-profile')}
        >
          View full profile
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BookingProgress currentStep={bookingState.step} />
      
      {/* Service Selection Step */}
      {bookingState.step === 'service' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <ServiceSelection services={services} />
            </div>
            <FAQSection faqs={faqItems} serviceType={serviceType} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ExpertProfile expert={expertData} />
            </div>
          </div>
        </div>
      )}
      
      {/* Expert Profile Step (new step to show detailed profile) */}
      {bookingState.step === 'expert-profile' && (
        <div className="animate-fade-in">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => setBookingStep('service')}
            className="mb-6"
          >
            Back to Services
          </Button>
          <ExpertProfile expert={expertData} />
          <FAQSection faqs={faqItems} serviceType={serviceType} />
        </div>
      )}
      
      {/* Schedule Step */}
      {bookingState.step === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          <div className="lg:col-span-2">
            <ScheduleSelector 
              timeSlots={availableTimeSlots} 
              selectedService={selectedService}
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {renderExpertPreview()}
              {selectedService && (
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <h3 className="font-bold text-secondary-900 mb-2">Selected Service</h3>
                  <p className="text-primary-700 font-medium">{selectedService.name}</p>
                  <p className="text-secondary-600 text-sm">${selectedService.price} • {selectedService.duration} minutes</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Step */}
      {bookingState.step === 'confirm' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          <div className="lg:col-span-2">
            <BookingConfirmation
              expert={expertData}
              service={selectedService}
              timeSlot={selectedTimeSlot}
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {renderExpertPreview()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertBookingPageAlternative;