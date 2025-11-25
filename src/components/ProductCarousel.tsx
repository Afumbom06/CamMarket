import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useRef } from 'react';

interface Product {
  id: number;
  name: string;
  nameFr: string;
  price: number;
  region: string;
  category: string;
  image: string;
  seller: string;
  rating: number;
  stock: number;
  isFlashSale?: boolean;
  discount?: number;
}

interface ProductCarouselProps {
  products: Product[];
  language: 'en' | 'fr';
  onViewProduct: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  wishlistItems: number[];
}

export function ProductCarousel({
  products,
  language,
  onViewProduct,
  onToggleWishlist,
  onAddToCart,
  wishlistItems
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {language === 'en' ? 'No products available' : 'Aucun produit disponible'}
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hidden md:flex"
        onClick={() => scroll('left')}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hidden md:flex"
        onClick={() => scroll('right')}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[280px] sm:w-[320px]">
            <ProductCard
              product={product}
              language={language}
              onViewProduct={onViewProduct}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              isInWishlist={wishlistItems.includes(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
