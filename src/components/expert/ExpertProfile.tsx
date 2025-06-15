import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Award, Globe, Clock } from 'lucide-react';
import { Expert } from '../../types/expert';
import Rating from '../ui/Rating';
import ExpertCredentials from './ExpertCredentials';
import ExpertReviews from './ExpertReviews';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

interface ExpertProfileProps {
  expert: Expert;
}

const ExpertProfile: React.FC<ExpertProfileProps> = ({ expert }) => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);
  
  // Compact view for sidebar
  if (!showFullProfile) {
    return (
      <Card>
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
            <img 
              src={expert.avatarUrl} 
              alt={expert.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="font-bold text-secondary-900 mb-1">{expert.name}</h3>
          <p className="text-sm text-secondary-600 mb-2">{expert.title}</p>
          
          <div className="flex items-center mb-3">
            <Rating value={expert.rating} className="mr-2" />
            <span className="text-sm text-secondary-600">({expert.reviewCount})</span>
          </div>
          
          <div className="text-sm text-secondary-700 mb-4">
            {expert.shortBio}
          </div>
          
          <button 
            onClick={() => setShowFullProfile(true)}
            className="text-primary-600 text-sm font-medium hover:underline"
          >
            View full profile
          </button>
        </div>
      </Card>
    );
  }
  
  // Full detailed profile
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Expert Photo and Basic Info */}
        <div className="w-full md:w-1/3">
          <div className="aspect-square rounded-lg overflow-hidden mb-4">
            <img 
              src={expert.avatarUrl} 
              alt={expert.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center mb-2">
            <Rating value={expert.rating} className="mr-2" />
            <span className="text-sm text-secondary-600">({expert.reviewCount} reviews)</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {expert.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary">
                {specialty}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-secondary-500" />
              <span>{expert.yearsOfExperience}+ years experience</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-secondary-500" />
              <span>{expert.credentials.length} credentials</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-secondary-500" />
              <span>{expert.languages.join(', ')}</span>
            </div>
          </div>
        </div>
        
        {/* Expert Name, Title, Bio */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
            {expert.name}
          </h1>
          <h2 className="text-lg text-secondary-700 mb-4">
            {expert.title}
          </h2>
          
          <div className="mb-6">
            <p className="text-secondary-700 mb-2">
              {bioExpanded ? expert.fullBio : expert.shortBio}
            </p>
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="flex items-center text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
            >
              {bioExpanded ? (
                <>
                  Show less <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {expert.specialties.map((specialty, index) => (
                <Badge key={index} variant="primary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
          
          <ExpertCredentials credentials={expert.credentials} />
        </div>
      </div>

      <div className="mt-8">
        <ExpertReviews reviews={expert.reviews} rating={expert.rating} count={expert.reviewCount} />
      </div>
      
      {/* Button to go back to compact view */}
      <button
        onClick={() => setShowFullProfile(false)}
        className="mt-4 text-primary-600 font-medium hover:underline inline-flex items-center"
      >
        <ChevronUp className="w-4 h-4 mr-1" />
        Close full profile
      </button>
    </div>
  );
};

export default ExpertProfile;