import React from 'react';
import { Service } from '../../types/service';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Check, Clock } from 'lucide-react';
import Badge from '../ui/Badge';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onSelect }) => {
  return (
    <Card 
      isSelected={isSelected}
      isHoverable
      className="flex flex-col h-full transition-all duration-250 animate-fade-in"
    >
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle>{service.name}</CardTitle>
          {service.popular && (
            <Badge variant="warning">Popular</Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-secondary-600 mb-2">
          <Clock className="w-4 h-4 mr-1" />
          <span>{service.duration} minutes</span>
        </div>
        <p className="text-secondary-700">{service.description}</p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <h4 className="font-medium text-secondary-900 mb-2">What's included:</h4>
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-4 h-4 text-success-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-sm text-secondary-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="flex flex-col items-stretch">
        <div className="mb-3 text-center">
          <span className="text-xl font-bold text-secondary-900">${service.price}</span>
          {service.type === 'package' && (
            <span className="text-sm text-secondary-600"> package</span>
          )}
        </div>
        <Button
          isFullWidth
          variant={isSelected ? "primary" : "outline"}
          onClick={onSelect}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;