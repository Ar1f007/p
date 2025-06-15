import React from 'react';
import { Expert } from '../../types/expert';
import { Service, TimeSlot } from '../../types/service';
import { useBooking } from '../../context/BookingContext';
import { format } from 'date-fns';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { ArrowLeft, CalendarCheck, Clock, CreditCard } from 'lucide-react';

interface BookingConfirmationProps {
  expert: Expert;
  service: Service | null;
  timeSlot: TimeSlot | null;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  expert,
  service,
  timeSlot,
}) => {
  const { setBookingStep, resetBooking } = useBooking();
  
  if (!service || !timeSlot) {
    return <div>Please select a service and time slot first.</div>;
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-secondary-900">
          Confirm Your Booking
        </h2>
        
        <div className="hidden md:block">
          <Button
            variant="primary"
            onClick={() => {
              alert('Booking confirmed! In a real application, this would process payment and complete the booking.');
              resetBooking();
            }}
          >
            Confirm and Pay
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <img
              src={expert.avatarUrl}
              alt={expert.name}
              className="w-full rounded-lg object-cover"
            />
          </div>
          
          <div className="w-full md:w-3/4 md:pl-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-1">{expert.name}</h3>
            <p className="text-secondary-600 mb-4">{expert.title}</p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CalendarCheck className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-secondary-900">Service</h4>
                  <p className="text-secondary-700">
                    {service.name} - ${service.price}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-secondary-900">Date & Time</h4>
                  <p className="text-secondary-700">
                    {format(new Date(timeSlot.startTime), 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="text-secondary-700">
                    {format(new Date(timeSlot.startTime), 'h:mm a')} - {format(new Date(timeSlot.endTime), 'h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
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
          onClick={() => setBookingStep('schedule')}
        >
          Back
        </Button>
        
        <div className="md:hidden">
          <Button
            variant="primary"
            onClick={() => {
              alert('Booking confirmed! In a real application, this would process payment and complete the booking.');
              resetBooking();
            }}
          >
            Confirm & Pay
          </Button>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 p-4 md:hidden z-10">
        <Button
          variant="primary"
          isFullWidth
          onClick={() => {
            alert('Booking confirmed! In a real application, this would process payment and complete the booking.');
            resetBooking();
          }}
        >
          Confirm and Pay ${(service.price + service.price * 0.05).toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;