import { Heart, ShoppingCart, Star, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { regions } from '../lib/mock-data';

interface Product {
  id: number;
  name: string;
  nameFr: string;
  price: number;
  region: string;
  image: string;
  seller: string;
  rating: number;
  stock: number;
  isFlashSale?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  language: 'en' | 'fr';
  onViewProduct?: (productId: number) => void;
  onToggleWishlist?: (productId: number) => void;
  onAddToCart?: (productId: number) => void;
  isInWishlist?: boolean;
}

export function ProductCard({ 
  product, 
  language,
  onViewProduct,
  onToggleWishlist,
  onAddToCart,
  isInWishlist = false
}: ProductCardProps) {
  const regionData = regions.find(r => r.id === product.region);
  const finalPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={language === 'en' ? product.name : product.nameFr}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
          onClick={() => onViewProduct?.(product.id)}
        />
        
        {product.isFlashSale && product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-transform hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product.id);
          }}
        >
          <Heart className={`h-4 w-4 transition-all ${isInWishlist ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            className="w-full gap-2" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product.id);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      <CardContent className="p-4 cursor-pointer" onClick={() => onViewProduct?.(product.id)}>
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="h-3 w-3" style={{ color: regionData?.color }} />
          <span className="text-xs text-gray-500">
            {language === 'en' ? regionData?.name : regionData?.nameFr}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 min-h-[3rem]">
          {language === 'en' ? product.name : product.nameFr}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{product.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({product.seller})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg text-green-600">
            {finalPrice.toLocaleString()} FCFA
          </span>
          {product.discount && (
            <span className="text-sm text-gray-400 line-through">
              {product.price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-2">
          <span className="text-xs text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
