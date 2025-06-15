import React, { useState } from 'react';
import { Service } from '../../types/service';
import ServiceList from './ServiceList';
import { useBooking } from '../../context/BookingContext';
import { Tab } from '../../types/ui';
import Button from '../ui/Button';
import { ChevronRight } from 'lucide-react';

interface ServiceSelectionProps {
  services: Service[];
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ services }) => {
  const { bookingState, setBookingStep } = useBooking();
  const [activeTab, setActiveTab] = useState<Tab>('quick');
  
  const tabs: Tab[] = ['quick', 'package'];
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-secondary-900">
          Choose Your Service
        </h2>
        
        <Button
          variant="primary"
          rightIcon={<ChevronRight className="w-4 h-4" />}
          disabled={!bookingState.serviceId}
          onClick={() => setBookingStep('schedule')}
        >
          Continue
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-secondary-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-600 hover:text-secondary-900'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'quick' ? 'Quick Sessions' : 'Packages'}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        {activeTab === 'quick' ? (
          <ServiceList services={services} type="quick" />
        ) : (
          <ServiceList services={services} type="package" />
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 p-4 md:hidden z-10">
        <Button
          variant="primary"
          isFullWidth
          rightIcon={<ChevronRight className="w-4 h-4" />}
          disabled={!bookingState.serviceId}
          onClick={() => setBookingStep('schedule')}
        >
          Continue to Scheduling
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelection;