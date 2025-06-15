import { Expert } from '../types/expert';

export const expertData: Expert = {
  id: 'exp-1',
  name: 'Dr. Sarah Johnson',
  title: 'Business Strategy Consultant',
  avatarUrl: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=500',
  rating: 4.9,
  reviewCount: 127,
  hourlyRate: 150,
  shortBio: 'MBA from Harvard Business School with 12+ years of experience helping startups and SMEs optimize their growth strategies.',
  fullBio: `Dr. Sarah Johnson is a seasoned business strategist with over 12 years of experience in helping startups and established businesses optimize their growth strategies. 

With an MBA from Harvard Business School and a Ph.D. in Business Economics, Sarah brings a unique blend of academic rigor and practical business acumen to her consultations.

Sarah has worked with over 200 businesses across various industries, from tech startups to retail chains, helping them identify growth opportunities, streamline operations, and increase profitability. Her specialties include market expansion strategies, competitive analysis, and operational efficiency.

Prior to her consulting career, Sarah held executive positions at Fortune 500 companies, including Director of Strategy at TechCorp and VP of Business Development at GrowthMax. This corporate experience gives her valuable insights into the challenges and opportunities faced by businesses of all sizes.

Sarah's consulting approach focuses on practical, actionable strategies that can be implemented quickly to drive measurable results. Her clients consistently praise her ability to simplify complex business problems and provide clear, effective solutions.`,
  specialties: [
    'Business Growth Strategy',
    'Market Expansion',
    'Competitive Analysis',
    'Operational Efficiency',
    'Strategic Planning'
  ],
  credentials: [
    {
      id: 'cred-1',
      title: 'Ph.D. in Business Economics',
      institution: 'Stanford University',
      year: 2011
    },
    {
      id: 'cred-2',
      title: 'MBA',
      institution: 'Harvard Business School',
      year: 2008
    },
    {
      id: 'cred-3',
      title: 'Certified Management Consultant (CMC)',
      institution: 'Institute of Management Consultants',
      year: 2012
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Michael T.',
      rating: 5,
      date: '2023-12-15',
      comment: 'Dr. Johnson provided invaluable insights for our startup. Her strategy recommendations helped us secure an additional round of funding.',
      serviceType: 'Growth Strategy Package'
    },
    {
      id: 'rev-2',
      author: 'Jennifer L.',
      rating: 5,
      date: '2023-11-30',
      comment: 'Incredibly insightful consultation. Sarah asked the right questions and helped us identify blind spots in our business model.',
      serviceType: '60-Minute Strategy Session'
    },
    {
      id: 'rev-3',
      author: 'Robert K.',
      rating: 4,
      date: '2023-11-18',
      comment: 'Great session with practical advice we could implement immediately. Would definitely book again.',
      serviceType: '30-Minute Quick Consultation'
    },
    {
      id: 'rev-4',
      author: 'Lisa M.',
      rating: 5,
      date: '2023-10-25',
      comment: 'Sarah\'s comprehensive analysis of our market position was eye-opening. Her recommendations have already increased our sales by 22%.',
      serviceType: 'Market Analysis Package'
    }
  ],
  languages: ['English', 'Spanish', 'French'],
  yearsOfExperience: 12
};