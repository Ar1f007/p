import React from 'react';
import { FAQItem as FAQItemType } from '../../types/service';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  faq: FAQItemType;
  isExpanded: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isExpanded, onToggle }) => {
  return (
    <div className="border border-secondary-200 rounded-lg bg-white overflow-hidden">
      <button
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset transition-colors"
        onClick={onToggle}
      >
        <span className="font-medium text-secondary-900">{faq.question}</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-secondary-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-secondary-500" />
        )}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-250 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 text-secondary-700 border-t border-secondary-200">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;