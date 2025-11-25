import { ReviewCard } from './ReviewCard';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
  helpful?: number;
}

interface ReviewListProps {
  reviews: Review[];
  language: 'en' | 'fr';
  initialDisplay?: number;
}

export function ReviewList({ reviews, language, initialDisplay = 5 }: ReviewListProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplay);

  const visibleReviews = reviews.slice(0, displayCount);
  const hasMore = displayCount < reviews.length;

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 5, reviews.length));
  };

  return (
    <div className="space-y-4">
      {visibleReviews.map((review) => (
        <ReviewCard key={review.id} review={review} language={language} />
      ))}

      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" onClick={loadMore} className="gap-2">
            {language === 'en' 
              ? `Show More Reviews (${reviews.length - displayCount} remaining)` 
              : `Afficher Plus d'Avis (${reviews.length - displayCount} restants)`}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
