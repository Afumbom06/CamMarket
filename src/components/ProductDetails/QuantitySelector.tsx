import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  maxStock: number;
  language: 'en' | 'fr';
  size?: 'sm' | 'md' | 'lg';
}

export function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  maxStock,
  language,
  size = 'md'
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxStock) {
      onQuantityChange(quantity + 1);
    }
  };

  const sizeClasses = {
    sm: {
      button: 'h-8 w-8',
      icon: 'h-3 w-3',
      text: 'text-base w-10'
    },
    md: {
      button: 'h-10 w-10',
      icon: 'h-4 w-4',
      text: 'text-xl w-12'
    },
    lg: {
      button: 'h-12 w-12',
      icon: 'h-5 w-5',
      text: 'text-2xl w-16'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div>
      <label className="block text-sm mb-2 text-gray-700">
        {language === 'en' ? 'Quantity' : 'Quantité'}
      </label>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="icon"
          className={classes.button}
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          <Minus className={classes.icon} />
        </Button>
        
        <span className={`${classes.text} text-center`}>
          {quantity}
        </span>
        
        <Button 
          variant="outline" 
          size="icon"
          className={classes.button}
          onClick={handleIncrease}
          disabled={quantity >= maxStock}
        >
          <Plus className={classes.icon} />
        </Button>

        <span className="text-sm text-gray-500 ml-2">
          ({maxStock} {language === 'en' ? 'available' : 'disponible'})
        </span>
      </div>
    </div>
  );
}
