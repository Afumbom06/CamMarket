import { Badge } from '../ui/badge';

interface PriceTagProps {
  price: number;
  discount?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceTag({ price, discount, currency = 'FCFA', size = 'lg' }: PriceTagProps) {
  const finalPrice = discount ? price - (price * discount) / 100 : price;

  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const originalSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      <span className={`${sizeClasses[size]} text-green-600`}>
        {finalPrice.toLocaleString('fr-FR')} {currency}
      </span>
      
      {discount && (
        <>
          <span className={`${originalSizeClasses[size]} text-gray-400 line-through`}>
            {price.toLocaleString('fr-FR')} {currency}
          </span>
          <Badge variant="destructive" className="text-sm">
            -{discount}%
          </Badge>
        </>
      )}
    </div>
  );
}
