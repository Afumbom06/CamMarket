import { VendorCard } from './VendorCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useRef } from 'react';

interface Vendor {
  id: number;
  name: string;
  nameFr?: string;
  region: string;
  rating: number;
  products: number;
  verified: boolean;
  badge: string;
  avatar?: string;
  description?: string;
  descriptionFr?: string;
}

interface VendorCarouselProps {
  vendors: Vendor[];
  language: 'en' | 'fr';
  onVisitShop?: (vendorId: number) => void;
}

export function VendorCarousel({ vendors, language, onVisitShop }: VendorCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (vendors.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {language === 'en' ? 'No vendors found in this region' : 'Aucun vendeur trouvé dans cette région'}
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
        {vendors.map((vendor) => (
          <div key={vendor.id} className="flex-shrink-0 w-full sm:w-[400px]">
            <VendorCard 
              vendor={vendor} 
              language={language}
              onVisitShop={onVisitShop}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
