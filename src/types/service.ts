export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  features: string[];
  popular?: boolean;
  type: 'quick' | 'package';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  serviceTypes: string[];
}

export type TimeSlot = {
  id: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  available: boolean;
};