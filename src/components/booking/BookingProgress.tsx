import React from 'react';
import { BookingStep } from '../../types/booking';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

interface BookingProgressProps {
  currentStep: BookingStep;
}

const BookingProgress: React.FC<BookingProgressProps> = ({ currentStep }) => {
  const steps: { id: BookingStep; label: string }[] = [
    { id: 'service', label: 'Choose Service' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'confirm', label: 'Confirm' }
  ];
  
  const getStepStatus = (stepId: BookingStep) => {
    // Skip expert-profile in the progress tracking
    if (stepId === 'expert-profile') return 'hidden';
    
    const stepOrder = steps.findIndex(s => s.id === stepId);
    const currentStepIndex = currentStep === 'expert-profile' 
      ? steps.findIndex(s => s.id === 'service') // If viewing expert profile, highlight service step
      : steps.findIndex(s => s.id === currentStep);
    
    if (stepOrder < currentStepIndex) return 'completed';
    if (stepOrder === currentStepIndex) return 'current';
    return 'upcoming';
  };
  
  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  getStepStatus(step.id) === 'completed' 
                    ? "bg-primary-600 text-white" 
                    : getStepStatus(step.id) === 'current'
                      ? "bg-primary-100 text-primary-700 border-2 border-primary-600"
                      : "bg-secondary-100 text-secondary-500 border-2 border-secondary-200"
                )}
              >
                {getStepStatus(step.id) === 'completed' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span 
                className={cn(
                  "mt-2 text-xs font-medium",
                  getStepStatus(step.id) === 'completed' 
                    ? "text-primary-600" 
                    : getStepStatus(step.id) === 'current'
                      ? "text-primary-700"
                      : "text-secondary-500"
                )}
              >
                {step.label}
              </span>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "flex-1 h-0.5 mx-2",
                  getStepStatus(steps[index + 1].id) === 'upcoming' 
                    ? "bg-secondary-200" 
                    : "bg-primary-600"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingProgress;