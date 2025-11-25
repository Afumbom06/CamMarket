import { ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface AddToCartButtonProps {
  productId: number;
  quantity: number;
  stock: number;
  onAddToCart: (productId: number, quantity: number) => void;
  language: 'en' | 'fr';
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
}

export function AddToCartButton({ 
  productId, 
  quantity, 
  stock,
  onAddToCart,
  language,
  variant = 'default',
  size = 'lg',
  fullWidth = false
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddToCart(productId, quantity);
      toast.success(
        language === 'en' 
          ? `${quantity} item(s) added to cart!` 
          : `${quantity} article(s) ajouté(s) au panier!`
      );
      setIsLoading(false);
    }, 500);
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleClick}
      disabled={stock === 0 || isLoading}
      className={`gap-2 ${fullWidth ? 'w-full' : ''}`}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <ShoppingCart className="h-5 w-5" />
      )}
      {stock === 0 
        ? (language === 'en' ? 'Out of Stock' : 'Rupture de Stock')
        : (language === 'en' ? 'Add to Cart' : 'Ajouter au Panier')}
    </Button>
  );
}
