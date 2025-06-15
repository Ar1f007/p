import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isHoverable?: boolean;
  isSelected?: boolean;
  isElevated?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  isHoverable = false,
  isSelected = false,
  isElevated = false,
  onClick
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg p-6',
        isElevated ? 'shadow-md' : 'shadow-card',
        isHoverable && 'transition-shadow hover:shadow-card-hover',
        isSelected && 'ring-2 ring-primary-500',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return <div className={cn('mb-4', className)}>{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return <h3 className={cn('text-lg font-bold text-secondary-900', className)}>{children}</h3>;
};

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return <p className={cn('text-sm text-secondary-600', className)}>{children}</p>;
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return <div className={cn('mt-4 pt-4 border-t border-secondary-200', className)}>{children}</div>;
};

export default Card;