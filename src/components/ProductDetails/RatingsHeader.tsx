import { Star } from 'lucide-react';
import { Progress } from '../ui/progress';

interface RatingsHeaderProps {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  language: 'en' | 'fr';
}

export function RatingsHeader({ 
  averageRating, 
  totalReviews, 
  ratingBreakdown,
  language 
}: RatingsHeaderProps) {
  const ratingPercentages = {
    5: (ratingBreakdown[5] / totalReviews) * 100,
    4: (ratingBreakdown[4] / totalReviews) * 100,
    3: (ratingBreakdown[3] / totalReviews) * 100,
    2: (ratingBreakdown[2] / totalReviews) * 100,
    1: (ratingBreakdown[1] / totalReviews) * 100,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50 rounded-lg">
      {/* Overall Rating */}
      <div className="flex flex-col items-center justify-center">
        <div className="text-6xl text-gray-900 mb-2">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 ${
                i < Math.floor(averageRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : i < averageRating
                  ? 'fill-yellow-200 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600">
          {language === 'en' 
            ? `Based on ${totalReviews} reviews` 
            : `Basé sur ${totalReviews} avis`}
        </p>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-16">
              <span className="text-sm">{rating}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
            <Progress 
              value={ratingPercentages[rating as keyof typeof ratingPercentages]} 
              className="flex-1 h-2"
            />
            <span className="text-sm text-gray-600 w-12 text-right">
              {ratingBreakdown[rating as keyof typeof ratingBreakdown]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
