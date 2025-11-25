import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface CartIconProps {
  count: number;
  onClick: () => void;
  showLabel?: boolean;
  language?: 'en' | 'fr';
}

export function CartIcon({ count, onClick, showLabel = false, language = 'en' }: CartIconProps) {
  return (
    <Button 
      variant="ghost" 
      size={showLabel ? 'default' : 'icon'}
      className="relative gap-2"
      onClick={onClick}
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        {count > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-in zoom-in duration-200">
            {count > 99 ? '99+' : count}
          </Badge>
        )}
      </div>
      {showLabel && (
        <span className="hidden sm:inline">
          {language === 'en' ? 'Cart' : 'Panier'}
        </span>
      )}
    </Button>
  );
}
