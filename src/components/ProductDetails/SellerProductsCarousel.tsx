import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Store } from 'lucide-react';
import { Button } from '../ui/button';
import { ProductCard } from '../ProductCard';
import { Product } from '../../lib/mock-data';

interface SellerProductsCarouselProps {
  products: Product[];
  sellerName: string;
  language: 'en' | 'fr';
  onProductClick?: (productId: number) => void;
}

export function SellerProductsCarousel({ 
  products, 
  sellerName, 
  language,
  onProductClick 
}: SellerProductsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(checkScroll, 300);
  };

  if (products.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl flex items-center gap-2">
          <Store className="h-5 w-5 text-green-600" />
          {language === 'en' 
            ? `More from ${sellerName}` 
            : `Plus de ${sellerName}`}
        </h3>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-[280px]"
            onClick={() => onProductClick?.(product.id)}
          >
            <ProductCard product={product} language={language} />
          </div>
        ))}
      </div>
    </div>
  );
}
