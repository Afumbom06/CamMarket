import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, ShoppingCart, Star, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DealCardProps {
  product: {
    id: number;
    name: string;
    nameFr: string;
    price: number;
    image: string;
    rating: number;
    discount?: number;
  };
  language: 'en' | 'fr';
  timeLeft?: string;
  onViewProduct: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  isInWishlist: boolean;
}

export function DealCard({
  product,
  language,
  timeLeft,
  onViewProduct,
  onToggleWishlist,
  onAddToCart,
  isInWishlist
}: DealCardProps) {
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 border-red-200">
      <div className="relative">
        {/* Deal Badge */}
        {product.discount && (
          <Badge className="absolute top-2 left-2 z-10 bg-red-600 hover:bg-red-700 text-white animate-pulse">
            -{product.discount}%
          </Badge>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 z-10 bg-white/90 p-2 rounded-full hover:bg-white transition-all shadow-md"
        >
          <Heart
            className={`h-4 w-4 ${
              isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Product Image */}
        <div 
          className="h-48 bg-gray-100 cursor-pointer overflow-hidden"
          onClick={() => onViewProduct(product.id)}
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      <CardContent className="p-4">
        {/* Timer */}
        {timeLeft && (
          <div className="flex items-center gap-1 text-xs text-red-600 mb-2 bg-red-50 px-2 py-1 rounded">
            <Clock className="h-3 w-3 animate-pulse" />
            <span>{language === 'en' ? 'Ends in' : 'Se termine dans'}: {timeLeft}</span>
          </div>
        )}

        {/* Product Name */}
        <h3
          className="mb-2 line-clamp-2 cursor-pointer hover:text-green-600 transition-colors min-h-[3rem]"
          onClick={() => onViewProduct(product.id)}
        >
          {language === 'fr' ? product.nameFr : product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{product.rating.toFixed(1)}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl text-red-600">
              {discountedPrice.toLocaleString()} FCFA
            </span>
          </div>
          {product.discount && (
            <div className="text-sm text-gray-500 line-through">
              {product.price.toLocaleString()} FCFA
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full gap-2 bg-red-600 hover:bg-red-700"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          {language === 'en' ? 'Add to Cart' : 'Ajouter au Panier'}
        </Button>
      </CardContent>
    </Card>
  );
}
