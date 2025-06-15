import React, { useState } from 'react';
import { expertData } from '../data/expertData';
import { services, faqItems, availableTimeSlots } from '../data/serviceData';
import ExpertProfile from '../components/expert/ExpertProfile';
import ServiceSelection from '../components/services/ServiceSelection';
import BookingProgress from '../components/booking/BookingProgress';
import ScheduleSelector from '../components/booking/ScheduleSelector';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import FAQSection from '../components/faq/FAQSection';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, User, Calendar, ChevronRight, CreditCard, Menu, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Rating from '../components/ui/Rating';

const ExpertBookingPageAlternative2: React.FC = () => {
  const { bookingState, setBookingStep, setServiceId } = useBooking();
  const selectedService = services.find(service => service.id === bookingState.serviceId) || null;
  const selectedTimeSlot = availableTimeSlots.find(slot => slot.id === bookingState.selectedTimeSlot) || null;
  const [expertDrawerOpen, setExpertDrawerOpen] = useState(false);
  
  // Determine the service type for FAQ filtering
  const serviceType = selectedService?.type || null;
  
  const renderMobileHeader = () => (
    <div className="sticky top-0 z-20 bg-white border-b border-secondary-200 p-4 flex justify-between items-center md:hidden">
      <button 
        className="p-2 rounded-full hover:bg-secondary-100" 
        onClick={() => setExpertDrawerOpen(true)}
      >
        <Menu className="w-5 h-5 text-secondary-700" />
      </button>
      
      <div className="flex items-center">
        <img 
          src={expertData.avatarUrl} 
          alt={expertData.name} 
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        <span className="font-medium text-secondary-900">{expertData.name}</span>
      </div>
      
      <div>
        {/* Empty div to balance the flex layout */}
        <div className="w-5" />
      </div>
    </div>
  );

  // Mobile expert drawer
  const renderExpertDrawer = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity md:hidden ${
      expertDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`fixed top-0 left-0 w-4/5 h-full bg-white transform transition-transform ${
        expertDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-auto`}>
        <div className="p-4 border-b border-secondary-200 flex justify-between items-center">
          <h3 className="font-bold text-lg">Expert Profile</h3>
          <button 
            onClick={() => setExpertDrawerOpen(false)}
            className="p-1 rounded-full hover:bg-secondary-100"
          >
            <X className="w-5 h-5 text-secondary-700" />
          </button>
        </div>
        
        <div className="p-4">
          <ExpertProfile expert={expertData} />
        </div>
      </div>
    </div>
  );

  const renderExpertSidebar = () => (
    <div className="hidden md:block">
      <Card className="mb-6 overflow-hidden">
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
              <img 
                src={expertData.avatarUrl} 
                alt={expertData.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-4 px-4 text-center">
          <h3 className="font-bold text-xl text-secondary-900">{expertData.name}</h3>
          <p className="text-secondary-600 mb-2">{expertData.title}</p>
          
          <div className="flex justify-center mb-3">
            <Rating value={expertData.rating} />
            <span className="text-sm text-secondary-600 ml-1">({expertData.reviewCount})</span>
          </div>
          
          <p className="text-sm text-secondary-700 mb-4 px-2">
            {expertData.shortBio.substring(0, 120)}...
          </p>
          
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<User className="w-4 h-4" />}
            onClick={() => setBookingStep('expert-profile')}
          >
            View full profile
          </Button>
        </div>
      </Card>
      
      {selectedService && (
        <Card className="mb-6">
          <h3 className="font-medium text-secondary-900 mb-3">Your Selection</h3>
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-600">Service:</span>
              <span className="font-medium text-secondary-900">{selectedService.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Duration:</span>
              <span className="font-medium text-secondary-900">{selectedService.duration} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Price:</span>
              <span className="font-medium text-secondary-900">${selectedService.price}</span>
            </div>
            {bookingState.selectedDate && selectedTimeSlot && (
              <>
                <div className="border-t border-secondary-200 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Date:</span>
                  <span className="font-medium text-secondary-900">
                    {new Date(selectedTimeSlot.startTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Time:</span>
                  <span className="font-medium text-secondary-900">
                    {new Date(selectedTimeSlot.startTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
  
  const renderServiceIcons = () => (
    <div className="flex justify-center space-x-12 py-8 mb-8 bg-white rounded-lg shadow-sm border border-secondary-100">
      {[
        { name: 'Strategy', icon: <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center"><Calendar className="w-6 h-6 text-primary-600" /></div> },
        { name: 'Consultation', icon: <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center"><User className="w-6 h-6 text-primary-600" /></div> },
        { name: 'Planning', icon: <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center"><ChevronRight className="w-6 h-6 text-primary-600" /></div> },
        { name: 'Payment', icon: <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center"><CreditCard className="w-6 h-6 text-primary-600" /></div> }
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          {item.icon}
          <span className="mt-3 text-sm font-medium text-secondary-900">{item.name}</span>
        </div>
      ))}
    </div>
  );
  
  return (
    <>
      {renderMobileHeader()}
      {renderExpertDrawer()}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Visible booking progress steps */}
        <BookingProgress currentStep={bookingState.step} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="md:col-span-2">
            {/* Service Selection Step */}
            {bookingState.step === 'service' && (
              <div className="animate-fade-in">
                {renderServiceIcons()}
                <ServiceSelection services={services} />
                <FAQSection faqs={faqItems} serviceType={serviceType} />
              </div>
            )}
            
            {/* Expert Profile Step */}
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
              </div>
            )}
            
            {/* Schedule Step */}
            {bookingState.step === 'schedule' && (
              <div className="animate-fade-in">
                <ScheduleSelector 
                  timeSlots={availableTimeSlots} 
                  selectedService={selectedService}
                />
              </div>
            )}
            
            {/* Confirmation Step */}
            {bookingState.step === 'confirm' && (
              <div className="animate-fade-in">
                <BookingConfirmation
                  expert={expertData}
                  service={selectedService}
                  timeSlot={selectedTimeSlot}
                />
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="hidden md:block">
            <div className="sticky top-8">
              {renderExpertSidebar()}
              {bookingState.step !== 'service' && (
                <FAQSection faqs={faqItems} serviceType={serviceType} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertBookingPageAlternative2;