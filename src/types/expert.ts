export interface Expert {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  shortBio: string;
  fullBio: string;
  specialties: string[];
  credentials: Credential[];
  reviews: Review[];
  languages: string[];
  yearsOfExperience: number;
}

export interface Credential {
  id: string;
  title: string;
  institution: string;
  year: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  serviceType: string;
}