import React, { useState } from 'react';
import { expertData } from '../data/expertData';
import { services, faqItems, availableTimeSlots } from '../data/serviceData';
import ExpertProfile from '../components/expert/ExpertProfile';
import ServiceSelection from '../components/services/ServiceSelection';
import ScheduleSelector from '../components/booking/ScheduleSelector';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import PackageConfirmation from '../components/services/PackageConfirmation';
import FAQSection from '../components/faq/FAQSection';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, Info, Star, ChevronRight, Calendar, User, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Rating from '../components/ui/Rating';
import { Service, TimeSlot } from '../types/service';

const ExpertBookingPageAlternative3: React.FC = () => {
  const { bookingState, setBookingStep } = useBooking();
  const selectedService = services.find(service => service.id === bookingState.serviceId) || null;
  const selectedTimeSlot = availableTimeSlots.find(slot => slot.id === bookingState.selectedTimeSlot) || null;
  
  // Determine the service type for FAQ filtering
  const serviceType = selectedService?.type || null;
  const isPackage = selectedService?.type === 'package';
  
  // Function to render the current step
  const renderStepContent = () => {
    switch(bookingState.step) {
      case 'service':
        return (
          <div className="animate-slide-up">
            <div className="p-8 bg-white rounded-xl shadow-elevated mb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-8">
                <div className="w-full md:w-auto flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto md:mx-0">
                    <img 
                      src={expertData.avatarUrl} 
                      alt={expertData.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
                    {expertData.name}
                  </h1>
                  <p className="text-secondary-600 mb-2">{expertData.title}</p>
                  
                  <div className="flex items-center mb-3 justify-center md:justify-start">
                    <Rating value={expertData.rating} className="mr-2" />
                    <span className="text-secondary-600">({expertData.reviewCount} reviews)</span>
                  </div>
                  
                  <p className="text-secondary-700">{expertData.shortBio.substring(0, 140)}...</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                leftIcon={<Info className="w-4 h-4" />}
                onClick={() => setBookingStep('expert-profile')}
                className="w-full md:w-auto"
              >
                View complete profile and credentials
              </Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-elevated p-8 mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Select a Service
              </h2>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <button
                  className={`flex-1 p-4 rounded-lg font-medium text-center border-2 transition-colors ${
                    !bookingState.serviceId || services.find(s => s.id === bookingState.serviceId)?.type === 'quick'
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-secondary-200 text-secondary-600 hover:border-secondary-300'
                  }`}
                >
                  Quick Sessions
                </button>
                
                <button
                  className={`flex-1 p-4 rounded-lg font-medium text-center border-2 transition-colors ${
                    bookingState.serviceId && services.find(s => s.id === bookingState.serviceId)?.type === 'package'
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-secondary-200 text-secondary-600 hover:border-secondary-300'
                  }`}
                >
                  Packages
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter(service => !bookingState.serviceId || 
                    service.type === (services.find(s => s.id === bookingState.serviceId)?.type || 'quick'))
                  .map(service => (
                    <ServiceCard 
                      key={service.id}
                      service={service}
                      isSelected={bookingState.serviceId === service.id}
                      onSelect={() => {
                        // Handle different flow for packages vs quick sessions
                        if (service.type === 'package') {
                          // For packages, we'll skip scheduling and go to package confirmation
                          setBookingStep('confirm');
                        } else {
                          // For quick sessions, proceed to scheduling
                          setBookingStep('schedule');
                        }
                      }}
                    />
                  ))}
              </div>
            </div>
            
            <FAQSection faqs={faqItems} serviceType={serviceType} />
          </div>
        );
        
      case 'expert-profile':
        return (
          <div className="animate-slide-up">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setBookingStep('service')}
              className="mb-6"
            >
              Back to Services
            </Button>
            
            <div className="bg-white rounded-xl shadow-elevated p-8">
              <ExpertProfile expert={expertData} />
            </div>
          </div>
        );
        
      case 'schedule':
        // Only show scheduling for non-package services
        return (
          <div className="animate-slide-up">
            <div className="bg-white rounded-xl shadow-elevated p-8">
              <ScheduleSelector 
                timeSlots={availableTimeSlots} 
                selectedService={selectedService}
              />
            </div>
          </div>
        );
        
      case 'confirm':
        // For packages, show package confirmation instead of time slot confirmation
        if (isPackage && selectedService) {
          return (
            <div className="animate-slide-up">
              <PackageConfirmation selectedService={selectedService} />
            </div>
          );
        }
        
        // For quick sessions, show regular confirmation
        return (
          <div className="animate-slide-up">
            <div className="bg-white rounded-xl shadow-elevated p-8">
              <BookingConfirmation
                expert={expertData}
                service={selectedService}
                timeSlot={selectedTimeSlot}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const renderStepIndicator = () => {
    const steps = [
      { id: 'service', label: 'Choose Service', icon: <User className="w-5 h-5" /> },
      { id: 'schedule', label: isPackage ? 'Review Package' : 'Select Time', icon: <Calendar className="w-5 h-5" /> },
      { id: 'confirm', label: 'Payment', icon: <CreditCard className="w-5 h-5" /> }
    ];
    
    // Skip schedule step for packages
    const filteredSteps = isPackage 
      ? steps.filter(step => step.id !== 'schedule')
      : steps;
      
    // Get current step index, accounting for skipped steps
    const getCurrentStepIndex = () => {
      if (isPackage) {
        if (bookingState.step === 'service') return 0;
        if (bookingState.step === 'confirm') return 1;
        return 0;
      } else {
        if (bookingState.step === 'service') return 0;
        if (bookingState.step === 'schedule') return 1;
        if (bookingState.step === 'confirm') return 2;
        return 0;
      }
    };
    
    const currentIndex = getCurrentStepIndex();
    
    return (
      <div className="bg-white rounded-xl shadow-elevated p-6 mb-8">
        <div className="flex justify-between">
          {filteredSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* Line connector */}
              {index < filteredSteps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                  index < currentIndex ? 'bg-primary-500' : 'bg-secondary-200'
                }`} style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 1.5rem)' }}></div>
              )}
              
              {/* Step circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                index < currentIndex 
                  ? 'bg-primary-500 text-white' 
                  : index === currentIndex
                    ? 'bg-primary-100 border-2 border-primary-500 text-primary-500'
                    : 'bg-secondary-100 border-2 border-secondary-300 text-secondary-500'
              }`}>
                {step.icon}
              </div>
              
              {/* Step label */}
              <span className={`mt-2 text-xs font-medium ${
                index <= currentIndex ? 'text-primary-700' : 'text-secondary-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {renderStepIndicator()}
      {renderStepContent()}
    </div>
  );
};

// Custom service card component for this variation
interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onSelect }) => {
  return (
    <Card 
      isHoverable
      isElevated={isSelected}
      isSelected={isSelected}
      onClick={onSelect}
      className="flex flex-col h-full transition-all duration-250 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-secondary-900">{service.name}</h3>
        {service.popular && (
          <Badge variant="warning">Popular</Badge>
        )}
      </div>
      
      <div className="flex items-center text-sm text-secondary-600 mb-3">
        <Calendar className="w-4 h-4 mr-1" />
        <span>{service.duration} minutes</span>
      </div>
      
      <p className="text-sm text-secondary-700 mb-3">{service.description}</p>
      
      <div className="mt-auto pt-4 border-t border-secondary-100">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-secondary-900">${service.price}</span>
          <Button
            variant={isSelected ? "primary" : "outline"}
            size="sm"
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExpertBookingPageAlternative3;