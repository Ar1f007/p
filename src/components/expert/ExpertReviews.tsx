import React, { useState } from 'react';
import { Review } from '../../types/expert';
import Rating from '../ui/Rating';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

interface ExpertReviewsProps {
  reviews: Review[];
  rating: number;
  count: number;
}

const ExpertReviews: React.FC<ExpertReviewsProps> = ({ reviews, rating, count }) => {
  const [expanded, setExpanded] = useState(false);
  const displayReviews = expanded ? reviews : reviews.slice(0, 2);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-secondary-900">
          Client Reviews
        </h3>
        <div className="flex items-center">
          <Rating value={rating} size="lg" />
          <span className="ml-2 text-secondary-600">({count} reviews)</span>
        </div>
      </div>
      
      <div className="space-y-4 mb-4">
        {displayReviews.map((review) => (
          <div key={review.id} className="border-b border-secondary-200 pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-secondary-900">{review.author}</h4>
                <p className="text-xs text-secondary-500">{review.serviceType}</p>
              </div>
              <div className="flex flex-col items-end">
                <Rating value={review.rating} size="sm" />
                <span className="text-xs text-secondary-500 mt-1">{review.date}</span>
              </div>
            </div>
            <p className="text-secondary-700 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {reviews.length > 2 && (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            rightIcon={<ChevronDown className="w-4 h-4" />}
          >
            {expanded ? 'Show Less' : `Show More (${reviews.length - 2})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpertReviews;