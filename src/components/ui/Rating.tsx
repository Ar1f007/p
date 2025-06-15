import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showValue = true,
  className
}) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  
  const sizeClass = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn('fill-warning-500 text-warning-500', sizeClass[size])}
          />
        ))}
        
        {hasHalfStar && (
          <StarHalf
            className={cn('fill-warning-500 text-warning-500', sizeClass[size])}
          />
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn('text-secondary-300', sizeClass[size])}
          />
        ))}
      </div>
      
      {showValue && (
        <span className={cn('ml-1 font-medium text-secondary-700', textSize[size])}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;