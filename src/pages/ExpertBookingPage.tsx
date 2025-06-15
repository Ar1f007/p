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

const ExpertBookingPage: React.FC = () => {
  const { bookingState } = useBooking();
  const selectedService = services.find(service => service.id === bookingState.serviceId) || null;
  const selectedTimeSlot = availableTimeSlots.find(slot => slot.id === bookingState.selectedTimeSlot) || null;
  
  // Determine the service type for FAQ filtering
  const serviceType = selectedService?.type || null;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BookingProgress currentStep={bookingState.step} />
      
      {bookingState.step === 'service' && (
        <>
          <ExpertProfile expert={expertData} />
          <div className="mt-12">
            <ServiceSelection services={services} />
          </div>
        </>
      )}
      
      {bookingState.step === 'schedule' && (
        <ScheduleSelector 
          timeSlots={availableTimeSlots} 
          selectedService={selectedService}
        />
      )}
      
      {bookingState.step === 'confirm' && (
        <BookingConfirmation
          expert={expertData}
          service={selectedService}
          timeSlot={selectedTimeSlot}
        />
      )}
      
      <FAQSection faqs={faqItems} serviceType={serviceType} />
    </div>
  );
};

export default ExpertBookingPage;