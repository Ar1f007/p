import React from 'react';
import { Service } from '../../types/service';
import { useBooking } from '../../context/BookingContext';
import { ArrowLeft, ChevronRight, Calendar, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface PackageConfirmationProps {
  selectedService: Service;
}

const PackageConfirmation: React.FC<PackageConfirmationProps> = ({ selectedService }) => {
  const { setBookingStep, setServiceId } = useBooking();
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-secondary-900">
          Package Details
        </h2>
      </div>
      
      <Card className="mb-8 p-0 overflow-hidden">
        <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-primary-900">{selectedService.name}</h3>
              <p className="text-primary-700">${selectedService.price} • {selectedService.duration} minutes total</p>
            </div>
            {selectedService.popular && (
              <Badge variant="warning">Popular</Badge>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-secondary-700 mb-6">{selectedService.description}</p>
          
          <div className="mb-6">
            <h4 className="font-medium text-secondary-900 mb-3">Package Includes:</h4>
            <ul className="space-y-3">
              {selectedService.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-secondary-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-secondary-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-secondary-900 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary-600" />
              How Sessions Are Scheduled
            </h4>
            <p className="text-sm text-secondary-700">
              After purchasing this package, you'll be able to schedule your individual sessions. Please click "Continue to Scheduling" to select your preferred dates and times for each session in the package.
            </p>
          </div>
          
          <div className="bg-primary-50 p-4 rounded-lg">
            <h4 className="font-medium text-primary-900 mb-1">Package Benefits</h4>
            <ul className="text-sm text-primary-800 space-y-1">
              <li>• Save ${Math.round(selectedService.price * 0.15)} compared to booking individual sessions</li>
              <li>• Priority scheduling with flexible booking</li>
              <li>• Extended support between sessions</li>
            </ul>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => setBookingStep('service')}
        >
          Back to Services
        </Button>
        
        <Button
          variant="primary"
          rightIcon={<ChevronRight className="w-4 h-4" />}
          onClick={() => setBookingStep('schedule')}
        >
          Continue to Scheduling
        </Button>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 p-4 md:hidden z-10">
        <Button
          variant="primary"
          isFullWidth
          rightIcon={<ChevronRight className="w-4 h-4" />}
          onClick={() => setBookingStep('schedule')}
        >
          Continue to Scheduling
        </Button>
      </div>
    </div>
  );
};

export default PackageConfirmation;