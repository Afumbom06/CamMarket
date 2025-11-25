import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { QuantitySelector } from './QuantitySelector';
import { useState } from 'react';

interface BuyNowBarMobileProps {
  productId: number;
  price: number;
  discount?: number;
  stock: number;
  onAddToCart: (productId: number, quantity: number) => void;
  onBuyNow?: () => void;
  language: 'en' | 'fr';
}

export function BuyNowBarMobile({ 
  productId, 
  price, 
  discount,
  stock,
  onAddToCart,
  onBuyNow,
  language 
}: BuyNowBarMobileProps) {
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);

  const finalPrice = discount ? price - (price * discount) / 100 : price;
  const totalPrice = finalPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(productId, quantity);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      {/* Quantity Selector Bar - Slides up when needed */}
      <div 
        className={`px-4 py-3 border-b bg-gray-50 transition-all duration-300 ${
          showQuantity ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          maxStock={stock}
          language={language}
          size="sm"
        />
      </div>

      {/* Main Action Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Price Display */}
          <div className="flex-1">
            <p className="text-xs text-gray-500">
              {language === 'en' ? 'Total Price' : 'Prix Total'}
            </p>
            <p className="text-green-600">
              {totalPrice.toLocaleString('fr-FR')} FCFA
            </p>
          </div>

          {/* Quantity Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQuantity(!showQuantity)}
            className="px-3"
          >
            {quantity}x
          </Button>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="gap-2 flex-1"
          >
            <ShoppingCart className="h-4 w-4" />
            {language === 'en' ? 'Add' : 'Ajouter'}
          </Button>

          {/* Buy Now Button */}
          <Button
            size="sm"
            variant="default"
            onClick={onBuyNow}
            disabled={stock === 0}
            className="gap-2 flex-1 bg-green-600 hover:bg-green-700"
          >
            <ShoppingBag className="h-4 w-4" />
            {language === 'en' ? 'Buy' : 'Acheter'}
          </Button>
        </div>

        {stock > 0 && stock < 10 && (
          <p className="text-xs text-amber-600 text-center mt-2">
            {language === 'en' 
              ? `Only ${stock} left in stock!` 
              : `Plus que ${stock} en stock!`}
          </p>
        )}
      </div>
    </div>
  );
}
