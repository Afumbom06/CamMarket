import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface ReviewCardProps {
  review: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
    verified?: boolean;
    helpful?: number;
  };
  language: 'en' | 'fr';
}

export function ReviewCard({ review, language }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-green-100 text-green-700">
                {review.user.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p>{review.user}</p>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    {language === 'en' ? 'Verified Purchase' : 'Achat Vérifié'}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            <ThumbsUp className="h-4 w-4" />
            {language === 'en' ? 'Helpful' : 'Utile'}
            {review.helpful && review.helpful > 0 && (
              <span className="text-xs">({review.helpful})</span>
            )}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            <MessageCircle className="h-4 w-4" />
            {language === 'en' ? 'Reply' : 'Répondre'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
