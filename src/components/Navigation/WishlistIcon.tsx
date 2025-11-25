import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface WishlistIconProps {
  count: number;
  onClick: () => void;
  showLabel?: boolean;
  language?: 'en' | 'fr';
}

export function WishlistIcon({ count, onClick, showLabel = false, language = 'en' }: WishlistIconProps) {
  return (
    <Button 
      variant="ghost" 
      size={showLabel ? 'default' : 'icon'}
      className="relative gap-2 hidden sm:flex"
      onClick={onClick}
    >
      <div className="relative">
        <Heart className="h-5 w-5" />
        {count > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600 animate-in zoom-in duration-200">
            {count > 99 ? '99+' : count}
          </Badge>
        )}
      </div>
      {showLabel && (
        <span className="hidden md:inline">
          {language === 'en' ? 'Wishlist' : 'Favoris'}
        </span>
      )}
    </Button>
  );
}
