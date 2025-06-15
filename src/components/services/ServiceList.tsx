import React from 'react';
import { Service } from '../../types/service';
import ServiceCard from './ServiceCard';
import { useBooking } from '../../context/BookingContext';

interface ServiceListProps {
  services: Service[];
  type: 'quick' | 'package';
}

const ServiceList: React.FC<ServiceListProps> = ({ services, type }) => {
  const { bookingState, setServiceId } = useBooking();
  const filteredServices = services.filter(service => service.type === type);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredServices.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isSelected={bookingState.serviceId === service.id}
          onSelect={() => setServiceId(service.id)}
        />
      ))}
    </div>
  );
};

export default ServiceList;