import { Expert } from '../types/expert';
import { Service, FAQItem, TimeSlot } from '../types/service';
import { addDays, setHours, setMinutes, format, addMinutes } from 'date-fns';

// Transform API data to our interface
const apiData = {
  "expertData": {
    "allowRequests": true,
    "bio": null,
    "bufferMins": 30,
    "duration": 30,
    "extensions": true,
    "id": 1,
    "image": null,
    "isTopExpert": false,
    "name": "Quail Crosby",
    "phoneNumber": "+8801633746005",
    "price": 351,
    "shortBio": "<p>Saepe iusto similiqu.</p>",
    "socialLinks": null,
    "status": "approved",
    "title": "Architecto enim moll",
    "userId": "cmb7e8e5q0005lr8ujy16du5w",
    "categories": [
      {
        "category": {
          "description": "Advance your education and career with expert guidance.",
          "id": "cmb7dopkg001tlra73innkj1s",
          "name": "Education And Career",
          "slug": "education-and-career",
          "tag": null
        },
        "categoryId": "cmb7dopkg001tlra73innkj1s",
        "isPrimary": true
      },
      {
        "category": {
          "description": "Get advice on studying abroad and university admissions.",
          "id": "cmb7dopkl001xlra7iaf3t5ng",
          "name": "Study Abroad Consultation",
          "slug": "study-abroad-consultation",
          "tag": null
        },
        "categoryId": "cmb7dopkl001xlra7iaf3t5ng",
        "isPrimary": false
      },
      {
        "category": {
          "description": "Plan your career path and achieve your goals.",
          "id": "cmb7dopkq0021lra78u09donf",
          "name": "Career Planning",
          "slug": "career-planning",
          "tag": null
        },
        "categoryId": "cmb7dopkq0021lra78u09donf",
        "isPrimary": false
      },
      {
        "category": {
          "description": "Enhance your skills for better job opportunities.",
          "id": "cmb7dopkv0025lra77l4l26bl",
          "name": "Skill Development",
          "slug": "skill-development",
          "tag": null
        },
        "categoryId": "cmb7dopkv0025lra77l4l26bl",
        "isPrimary": false
      },
      {
        "category": {
          "description": "Prepare for government job exams with expert guidance.",
          "id": "cmb7dopl00029lra76zr80rp0",
          "name": "Government Job Preparation Counsel",
          "slug": "government-job-preparation-counsel",
          "tag": null
        },
        "categoryId": "cmb7dopl00029lra76zr80rp0",
        "isPrimary": false
      },
      {
        "category": {
          "description": "Build a strong resume and prepare for interviews.",
          "id": "cmb7dopl5002dlra7jeewoiho",
          "name": "Resume Building & Interview Prep",
          "slug": "resume-building-&-interview-prep",
          "tag": null
        },
        "categoryId": "cmb7dopl5002dlra7jeewoiho",
        "isPrimary": false
      }
    ]
  },
  "durationSettings": [
    {
      "active": true,
      "discount": 10,
      "discountType": "PERCENTAGE",
      "duration": 15,
      "extensionRates": null,
      "id": 9,
      "price": 2000,
      "translation": {
        "desc": null,
        "lang": "en",
        "name": "eee"
      }
    },
    {
      "active": true,
      "discount": 10,
      "discountType": "PERCENTAGE",
      "duration": 30,
      "extensionRates": {
        "5": 30,
        "10": 50
      },
      "id": 10,
      "price": 100,
      "translation": {
        "desc": "A 30-minute consultation",
        "lang": "en",
        "name": "Quick Session"
      }
    }
  ],
  "packages": [
    {
      "active": true,
      "chat": true,
      "duration": 30,
      "id": 1,
      "periodLen": 1,
      "periodUnit": "Months",
      "price": 0.5,
      "sessions": 1,
      "translation": {
        "desc": null,
        "features": [
          "1:1 Chat",
          "Video Calls"
        ],
        "lang": "en",
        "name": "Mentoring"
      }
    },
    {
      "active": true,
      "chat": true,
      "duration": 30,
      "id": 2,
      "periodLen": 1,
      "periodUnit": "Months",
      "price": 4800,
      "sessions": 1,
      "translation": {
        "desc": null,
        "features": [
          "1:1 Chat",
          "Video Calls"
        ],
        "lang": "en",
        "name": "Mentoring"
      }
    },
    {
      "active": true,
      "chat": true,
      "duration": 30,
      "id": 3,
      "periodLen": 1,
      "periodUnit": "Months",
      "price": 480,
      "sessions": 2,
      "translation": {
        "desc": null,
        "features": [
          "1:1 Chat",
          "Video Calls"
        ],
        "lang": "en",
        "name": "Mentoring"
      }
    },
    {
      "active": true,
      "chat": false,
      "duration": 15,
      "id": 4,
      "periodLen": 1,
      "periodUnit": "Weeks",
      "price": 50,
      "sessions": 1,
      "translation": {
        "desc": null,
        "features": [
          "Chat"
        ],
        "lang": "en",
        "name": "Mentor"
      }
    },
    {
      "active": true,
      "chat": false,
      "duration": 30,
      "id": 5,
      "periodLen": 1,
      "periodUnit": "Months",
      "price": 1500,
      "sessions": 3,
      "translation": {
        "desc": null,
        "features": [
          "english feat"
        ],
        "lang": "en",
        "name": "English"
      }
    },
    {
      "active": true,
      "chat": false,
      "duration": 60,
      "id": 6,
      "periodLen": 1,
      "periodUnit": "Months",
      "price": 10,
      "sessions": 3,
      "translation": {
        "desc": null,
        "features": [
          "feat2"
        ],
        "lang": "en",
        "name": "Package 2"
      }
    },
    {
      "active": true,
      "chat": false,
      "duration": 30,
      "id": 7,
      "periodLen": 1,
      "periodUnit": "Months",
      "price": 10,
      "sessions": 1,
      "translation": {
        "desc": null,
        "features": [
          "Invite to the Intro CEO Day in LA (must subscribe for 12 months or more)",
          "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
        ],
        "lang": "en",
        "name": "1as"
      }
    },
    {
      "active": true,
      "chat": false,
      "duration": 30,
      "id": 8,
      "periodLen": 1,
      "periodUnit": "Months",
      "price": 100,
      "sessions": 1,
      "translation": {
        "desc": null,
        "features": [
          "Invite to the Intro CEO Day in LA (must subscribe for 12 months or more)"
        ],
        "lang": "en",
        "name": "Invite to the Intro CEO Day in LA (must subscribe for 12 months or more)"
      }
    }
  ],
  "sessionInfo": [
    {
      "id": 14,
      "order": 0,
      "translation": {
        "content": "tapatap answer",
        "locale": "en",
        "title": "Tapatap"
      },
      "type": "FAQ"
    },
    {
      "id": 15,
      "order": 0,
      "translation": {
        "content": "EEkdom maza",
        "locale": "en",
        "title": "Ekdom Maja Package"
      },
      "type": "FAQ"
    },
    {
      "id": 16,
      "order": 0,
      "translation": {
        "content": null,
        "locale": "en",
        "title": "Tapatap 30 min"
      },
      "type": "HINT"
    },
    {
      "id": 17,
      "order": 0,
      "translation": {
        "content": null,
        "locale": "en",
        "title": "Tapatap Package"
      },
      "type": "HINT"
    }
  ]
};

// Transform expert data
export const realExpertData: Expert = {
  id: apiData.expertData.id.toString(),
  name: apiData.expertData.name,
  title: apiData.expertData.title,
  avatarUrl: apiData.expertData.image || 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=500',
  rating: 4.9, // Keep dummy rating
  reviewCount: 127, // Keep dummy review count
  hourlyRate: apiData.expertData.price,
  shortBio: apiData.expertData.shortBio?.replace(/<[^>]*>/g, '') || 'Expert in education and career guidance with extensive experience helping students and professionals achieve their goals.',
  fullBio: `${apiData.expertData.name} is a seasoned expert with over 12 years of experience in education and career guidance. 

With expertise across multiple domains including ${apiData.expertData.categories.map(c => c.category.name).join(', ')}, ${apiData.expertData.name} brings a unique blend of practical experience and academic knowledge to every consultation.

${apiData.expertData.name} has helped hundreds of students and professionals navigate their career paths, from university admissions to skill development and government job preparation. Their approach focuses on personalized guidance that addresses each individual's unique circumstances and goals.

Prior to consulting, ${apiData.expertData.name} held various positions in the education sector, giving them valuable insights into the challenges and opportunities faced by students and professionals at all levels.

${apiData.expertData.name}'s consulting approach emphasizes practical, actionable strategies that can be implemented immediately to drive measurable results. Clients consistently praise their ability to simplify complex career decisions and provide clear, effective guidance.`,
  specialties: apiData.expertData.categories.map(c => c.category.name),
  credentials: [
    {
      id: 'cred-1',
      title: 'Master\'s in Education',
      institution: 'University of Excellence',
      year: 2011
    },
    {
      id: 'cred-2',
      title: 'Career Counseling Certification',
      institution: 'Professional Development Institute',
      year: 2013
    },
    {
      id: 'cred-3',
      title: 'Study Abroad Advisor Certification',
      institution: 'International Education Council',
      year: 2015
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Sarah M.',
      rating: 5,
      date: '2023-12-15',
      comment: `${apiData.expertData.name} provided invaluable guidance for my career transition. Their insights helped me secure my dream job in just 3 months.`,
      serviceType: 'Career Planning'
    },
    {
      id: 'rev-2',
      author: 'Ahmed K.',
      rating: 5,
      date: '2023-11-30',
      comment: 'Excellent consultation on study abroad options. Very knowledgeable and helped me choose the right university.',
      serviceType: 'Study Abroad Consultation'
    },
    {
      id: 'rev-3',
      author: 'Lisa P.',
      rating: 4,
      date: '2023-11-18',
      comment: 'Great session with practical advice for government job preparation. Highly recommended!',
      serviceType: 'Government Job Preparation'
    },
    {
      id: 'rev-4',
      author: 'David R.',
      rating: 5,
      date: '2023-10-25',
      comment: 'The resume building session was incredibly helpful. Got interview calls within a week of implementing the suggestions.',
      serviceType: 'Resume Building & Interview Prep'
    }
  ],
  languages: ['English', 'Spanish', 'French'], // Keep dummy languages
  yearsOfExperience: 12 // Keep dummy experience
};

// Transform duration settings to quick services
export const realServices: Service[] = [
  // Quick sessions from durationSettings
  ...apiData.durationSettings
    .filter(setting => setting.active)
    .map(setting => ({
      id: `duration-${setting.id}`,
      name: setting.translation.name || `${setting.duration}-Minute Session`,
      description: setting.translation.desc || `A focused ${setting.duration}-minute consultation session.`,
      duration: setting.duration,
      price: setting.price,
      features: [
        `${setting.duration}-minute one-on-one session`,
        'Personalized advice and guidance',
        'Action plan and next steps',
        ...(setting.extensionRates ? ['Extension options available'] : []),
        ...(setting.discount > 0 ? [`${setting.discount}% discount applied`] : [])
      ],
      type: 'quick' as const,
      popular: setting.id === 10 // Mark the 30-minute session as popular
    })),
  
  // Packages from packages array
  ...apiData.packages
    .filter(pkg => pkg.active)
    .map(pkg => ({
      id: `package-${pkg.id}`,
      name: pkg.translation.name || `${pkg.sessions}-Session Package`,
      description: pkg.translation.desc || `A comprehensive ${pkg.sessions}-session package over ${pkg.periodLen} ${pkg.periodUnit.toLowerCase()}.`,
      duration: pkg.duration * pkg.sessions, // Total duration
      price: pkg.price,
      features: [
        `${pkg.sessions} sessions of ${pkg.duration} minutes each`,
        `Valid for ${pkg.periodLen} ${pkg.periodUnit.toLowerCase()}`,
        ...(pkg.translation.features || []),
        ...(pkg.chat ? ['24/7 chat support'] : []),
        'Flexible scheduling',
        'Progress tracking'
      ],
      type: 'package' as const,
      popular: pkg.sessions >= 3 // Mark multi-session packages as popular
    }))
];

// Transform sessionInfo to FAQ items
export const realFaqItems: FAQItem[] = [
  ...apiData.sessionInfo
    .filter(info => info.type === 'FAQ' && info.translation.content)
    .map(faq => ({
      id: faq.id.toString(),
      question: faq.translation.title,
      answer: faq.translation.content || 'Please contact us for more information.',
      serviceTypes: ['quick', 'package']
    })),
  
  // Add some default FAQ items
  {
    id: 'faq-default-1',
    question: 'How do I prepare for my consultation?',
    answer: 'To make the most of your session, have a clear goal in mind and prepare any relevant documents or questions. For career consultations, consider bringing your resume or career objectives.',
    serviceTypes: ['quick', 'package']
  },
  {
    id: 'faq-default-2',
    question: 'What happens if I need to reschedule?',
    answer: 'You can reschedule your appointment up to 24 hours before the scheduled time at no cost. Cancellations or rescheduling with less than 24 hours notice may incur a fee.',
    serviceTypes: ['quick', 'package']
  },
  {
    id: 'faq-default-3',
    question: 'How are package sessions structured?',
    answer: 'Package sessions are typically spread over the specified time period, allowing time for implementation and assessment between sessions. We\'ll establish goals and timelines during the first session.',
    serviceTypes: ['package']
  },
  {
    id: 'faq-default-4',
    question: 'Do you offer refunds if I\'m not satisfied?',
    answer: 'We stand behind our consultations. If you\'re not satisfied with your session, please contact us within 3 days, and we\'ll arrange a complementary follow-up or provide a partial refund.',
    serviceTypes: ['quick', 'package']
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
export const realAvailableTimeSlots = generateTimeSlots(new Date());