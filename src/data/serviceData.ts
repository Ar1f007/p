import { Service, FAQItem, TimeSlot } from '../types/service';
import { addDays, setHours, setMinutes, format, addMinutes } from 'date-fns';

export const services: Service[] = [
  {
    id: 'service-1',
    name: '15-Minute Quick Consultation',
    description: 'A focused session to address one specific business question or challenge.',
    duration: 15,
    price: 40,
    features: [
      'One specific business question',
      'Actionable next steps',
      'Email summary',
    ],
    type: 'quick'
  },
  {
    id: 'service-2',
    name: '30-Minute Strategy Session',
    description: 'Dive deeper into a specific area of your business with personalized advice.',
    duration: 30,
    price: 75,
    features: [
      'In-depth discussion on one business area',
      'Personalized recommendations',
      'Follow-up email with resources',
      'One week of email support',
    ],
    type: 'quick'
  },
  {
    id: 'service-3',
    name: '60-Minute Comprehensive Consultation',
    description: 'A thorough examination of your business strategy with detailed recommendations.',
    duration: 60,
    price: 140,
    features: [
      'Comprehensive business discussion',
      'SWOT analysis',
      'Detailed action plan',
      'Two weeks of email support',
      'One follow-up call (15 min)',
    ],
    popular: true,
    type: 'quick'
  },
  {
    id: 'service-4',
    name: 'Growth Strategy Package',
    description: 'A complete business growth strategy developed over multiple sessions.',
    duration: 180, // 3 hours total across multiple sessions
    price: 450,
    features: [
      'Three 60-minute sessions',
      'Comprehensive market analysis',
      'Competitive positioning',
      'Detailed growth roadmap',
      'Implementation plan',
      'One month of email support',
      'Two follow-up calls (30 min each)',
    ],
    type: 'package'
  },
  {
    id: 'service-5',
    name: 'Market Entry Package',
    description: 'Strategic guidance for entering new markets or launching new products.',
    duration: 240, // 4 hours total across multiple sessions
    price: 600,
    features: [
      'Four 60-minute sessions',
      'Market opportunity assessment',
      'Target customer analysis',
      'Go-to-market strategy',
      'Risk assessment',
      'Launch timeline',
      'Two months of email support',
      'Monthly follow-up calls for 3 months',
    ],
    type: 'package'
  }
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I prepare for my consultation?',
    answer: 'To make the most of your session, have a clear goal in mind and prepare any relevant business documents or metrics. For quick sessions, focus on one specific question. For longer consultations, consider sending background information ahead of time.',
    serviceTypes: ['quick', 'package']
  },
  {
    id: 'faq-2',
    question: 'What happens if I need to reschedule?',
    answer: 'You can reschedule your appointment up to 24 hours before the scheduled time at no cost. Cancellations or rescheduling with less than 24 hours notice may incur a fee of 50% of the session cost.',
    serviceTypes: ['quick', 'package']
  },
  {
    id: 'faq-3',
    question: 'How is the 15-minute session different from longer consultations?',
    answer: 'The 15-minute quick consultation is designed to address one very specific business question with actionable advice. It\'s ideal for focused guidance on a single issue rather than comprehensive business strategy.',
    serviceTypes: ['quick']
  },
  {
    id: 'faq-4',
    question: 'What\'s included in the follow-up after my session?',
    answer: 'After your consultation, you\'ll receive an email summary of key discussion points, recommendations, and agreed-upon next steps. For package consultations, you\'ll also receive detailed documentation and resources relevant to your business needs.',
    serviceTypes: ['quick', 'package']
  },
  {
    id: 'faq-5',
    question: 'How are the package sessions structured?',
    answer: 'Package consultations are typically spread over 2-4 weeks, allowing time for implementation and assessment between sessions. We\'ll establish goals and timelines during the first session and adjust as needed throughout the engagement.',
    serviceTypes: ['package']
  },
  {
    id: 'faq-6',
    question: 'What types of businesses do you typically work with?',
    answer: 'Our experts work with businesses of all sizes, from startups to established enterprises. They have experience across various industries including technology, retail, healthcare, financial services, and manufacturing.',
    serviceTypes: ['quick', 'package']
  },
  {
    id: 'faq-7',
    question: 'Do you offer refunds if I\'m not satisfied?',
    answer: 'We stand behind our consultations. If you\'re not satisfied with your session, please contact us within 3 days, and we\'ll arrange a complementary follow-up to address your concerns or provide a partial refund.',
    serviceTypes: ['quick', 'package']
  },
  {
    id: 'faq-8',
    question: 'How do the multiple sessions work in the packages?',
    answer: 'For multi-session packages, we\'ll work with you to schedule sessions at intervals that make sense for your business needs, typically 1-2 weeks apart. This allows time to implement recommendations and gather feedback between sessions.',
    serviceTypes: ['package']
  }
];

// Helper function to generate time slots for demo purposes
const generateTimeSlots = (baseDate: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let day = 0; day < 14; day++) { // Generate for next 14 days
    const currentDate = addDays(baseDate, day);
    
    // Skip weekends (Saturday=6, Sunday=0)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Generate slots every 30 minutes
      for (let minute of [0, 30]) {
        const startTime = setMinutes(setHours(currentDate, hour), minute);
        const endTime = addMinutes(startTime, 30);
        
        // Randomly set some slots as unavailable
        const available = Math.random() > 0.3;
        
        slots.push({
          id: `slot-${format(startTime, 'yyyy-MM-dd-HH-mm')}`,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          available
        });
      }
    }
  }
  
  return slots;
};

// Generate time slots starting from today
export const availableTimeSlots = generateTimeSlots(new Date());