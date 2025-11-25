import { Star } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface RatingFilterProps {
  language: 'en' | 'fr';
  selectedRating: number;
  onSelect: (rating: number) => void;
}

export function RatingFilter({ language, selectedRating, onSelect }: RatingFilterProps) {
  const ratingOptions = [
    { value: 4, label: language === 'en' ? '4 Stars & Above' : '4 Étoiles et Plus' },
    { value: 3, label: language === 'en' ? '3 Stars & Above' : '3 Étoiles et Plus' },
    { value: 2, label: language === 'en' ? '2 Stars & Above' : '2 Étoiles et Plus' },
    { value: 0, label: language === 'en' ? 'All Ratings' : 'Toutes les Notes' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-medium">
        {language === 'en' ? 'Seller Rating' : 'Note du Vendeur'}
      </h3>
      
      <RadioGroup value={selectedRating.toString()} onValueChange={(val) => onSelect(Number(val))}>
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <label 
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <RadioGroupItem value={option.value.toString()} />
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm">{option.label}</span>
                {option.value > 0 && (
                  <div className="flex items-center">
                    {[...Array(option.value)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
