import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { products } from '../lib/mock-data';

interface TrendingProductsCarouselProps {
  language: 'en' | 'fr';
  onViewProduct?: (productId: number) => void;
  onToggleWishlist?: (productId: number) => void;
  onAddToCart?: (productId: number) => void;
  wishlistItems?: number[];
}

export function TrendingProductsCarousel({
  language,
  onViewProduct,
  onToggleWishlist,
  onAddToCart,
  wishlistItems = []
}: TrendingProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Select trending products (products with high ratings)
  const trendingProducts = products
    .filter(p => p.rating >= 4.7)
    .slice(0, 8);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  };

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return itemsPerView.mobile;
      if (window.innerWidth < 1024) return itemsPerView.tablet;
      return itemsPerView.desktop;
    }
    return itemsPerView.desktop;
  };

  const [itemsShown, setItemsShown] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsShown(getItemsPerView());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, trendingProducts.length - itemsShown);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    (e.currentTarget as HTMLElement).dataset.touchStart = String(touch.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchStart = Number((e.currentTarget as HTMLElement).dataset.touchStart);
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl">
                {language === 'en' ? 'Trending This Week' : 'Tendances de la Semaine'}
              </h2>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Most popular products from verified sellers' 
                  : 'Produits les plus populaires de vendeurs vérifiés'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="hidden sm:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="hidden sm:flex"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsShown)}%)`
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsShown}%` }}
              >
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

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-purple-600 w-8' 
                  : 'bg-gray-300 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
