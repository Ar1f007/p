import React, { useState } from 'react';
import { FAQItem as FAQItemType } from '../../types/service';
import FAQItem from './FAQItem';

interface FAQSectionProps {
  faqs: FAQItemType[];
  serviceType: string | null;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, serviceType }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Filter FAQs based on the selected service type
  const filteredFaqs = serviceType 
    ? faqs.filter(faq => faq.serviceTypes.includes(serviceType))
    : faqs.filter(faq => faq.serviceTypes.includes('quick') && faq.serviceTypes.includes('package'));
  
  const toggleFaq = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="mt-12 bg-secondary-50 p-6 rounded-lg animate-fade-in">
      <h2 className="text-xl font-bold text-secondary-900 mb-6">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-3">
        {filteredFaqs.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isExpanded={expandedId === faq.id}
            onToggle={() => toggleFaq(faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;